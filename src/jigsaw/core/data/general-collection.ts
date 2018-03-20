import {EventEmitter} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Subscription} from "rxjs/Subscription";
import {ComponentDataHelper, DataReviser, HttpClientOptions, IAjaxComponentData, IEmittable} from "./component-data";
import {CallbackRemoval} from "../utils/common-utils";

export abstract class AbstractGeneralCollection<T = any> implements IAjaxComponentData, IEmittable {
    /**
     * 将一个任意类型的数据转为一个当前类型的数据对象。
     *
     * @param {T} data 原始数据
     * @returns {AbstractGeneralCollection<T>} 返回持有输入的原始数据的当前数据对象
     */
    public abstract fromObject(data: T): AbstractGeneralCollection<T>;

    /**
     * 调用在`onAjaxSuccess`里注册的所有回调函数。
     */
    protected abstract ajaxSuccessHandler(data): void;

    /**
     * 用于发起网络请求，在调用`fromAjax()`之前必须设置好此值。
     */
    public http: HttpClient;

    public dataReviser: DataReviser;

    /**
     * 与`busy`具有相同功能
     */
    protected _busy: boolean;

    get busy(): boolean {
        return this._busy;
    }

    /**
     * 安全地调用`dataReviser`函数。
     *
     * @param originData
     * @return {any}
     */
    protected reviseData(originData: any): any {
        if (!this.dataReviser) {
            return originData;
        }
        try {
            const revisedData = this.dataReviser(originData);
            if (revisedData == undefined) {
                console.error('a dataReviser function should NOT return undefined,' +
                    'use null is you do not have any valid value!' +
                    'Jigsaw is ignoring this result and using the original value.');
                return originData;
            } else {
                return revisedData;
            }
        } catch (e) {
            console.error('revise data error: ' + e);
            console.error(e.stack);
            return originData;
        }
    }

    public fromAjax(url?: string): void;
    public fromAjax(options?: HttpClientOptions): void;
    /**
     * @internal
     */
    public fromAjax(optionsOrUrl?: HttpClientOptions | string): void {
        if (!this.http) {
            console.error('set a valid HttpClient instance to the http attribute before invoking fromAjax()!');
            return;
        }
        if (this._busy) {
            this.ajaxErrorHandler(null);
            return;
        }

        this.ajaxStartHandler();

        const op = HttpClientOptions.prepare(optionsOrUrl);
        this.http.request(op.method, op.url, op)
            .map(res => this.reviseData(res))
            .subscribe(
                data => this.ajaxSuccessHandler(data),
                error => this.ajaxErrorHandler(error),
                () => this.ajaxCompleteHandler()
            );
    }

    protected componentDataHelper: ComponentDataHelper = new ComponentDataHelper();

    public refresh(): void {
        this.componentDataHelper.invokeRefreshCallback();
    }

    public onRefresh(callback: (thisData: AbstractGeneralCollection<T>) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getRefreshRemoval({fn: callback, context: context});
    }

    public onAjaxStart(callback: (data: T) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxStartRemoval({fn: callback, context: context});
    }

    public onAjaxSuccess(callback: (data: T) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxSuccessRemoval({fn: callback, context: context});
    }

    public onAjaxError(callback: (error: Response) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxErrorRemoval({fn: callback, context: context});
    }

    public onAjaxComplete(callback: () => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxCompleteRemoval({fn: callback, context: context});
    }

    /**
     * 调用在`onAjaxStart`里注册的所有回调函数。
     */
    protected ajaxStartHandler(): void {
        this._busy = true;
        this.componentDataHelper.invokeAjaxStartCallback();
    }

    /**
     * 调用在`onAjaxError`里注册的所有回调函数。
     */
    protected ajaxErrorHandler(error: Response): void {
        if (!error) {
            const reason = 'the data collection is busy now!';
            console.warn('get data from paging server error!! detail: ' + reason);
            error = new Response(reason, {status: 409, statusText: reason});
        } else {
            console.error('get data from paging server error!! detail: ' + error['message']);
            this._busy = false;
        }

        this.componentDataHelper.invokeAjaxErrorCallback(error);
    }

    /**
     * 调用在`onAjaxComplete`里注册的所有回调函数。
     */
    protected ajaxCompleteHandler(): void {
        console.log('get data from paging server complete!!');
        this._busy = false;
        this.componentDataHelper.invokeAjaxCompleteCallback();
    }

    public destroy(): void {
        this._emitter.unsubscribe();
        this._emitter = null;
        this.componentDataHelper.clearCallbacks();
        this.componentDataHelper = null;
        this.dataReviser = null;
    }

    private _emitter = new EventEmitter<any>();

    public emit(value?: any): void {
        this._emitter.emit(value);
    }

    public subscribe(callback?: (value:any) => void): Subscription {
        return this._emitter.subscribe(callback);
    }

    public unsubscribe() {
        this._emitter.unsubscribe();
    }
}

/**
 * 这是Jigsaw数据体系中两大分支之一：通用的key-value（即JSON对象）的集合类型的基类。
 */
export class GeneralCollection<T> extends AbstractGeneralCollection<T> {
    [index: string]: any;

    protected ajaxSuccessHandler(data: T): void {
        this.fromObject(data);
        this._busy = false;
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    protected propList: string[] = [];

    public fromObject(data: T): GeneralCollection<T> {
        if (data instanceof GeneralCollection) {
            console.error("unable to make data from another GeneralCollection instance!");
            return;
        }

        let needRefresh = false;

        this.propList.forEach(prop => {
            needRefresh = true;
            delete this[prop];
        });
        this.propList.splice(0, this.propList.length);

        if (data) {
            for (let key in data) {
                if (!data.hasOwnProperty(key) || data[key] instanceof Function) {
                    continue;
                }
                needRefresh = true;
                this[key] = data[key];
                this.propList.push(key);
            }
        }

        if (needRefresh) {
            this.refresh();
        }

        return this;
    }

    public destroy(): void {
        super.destroy();
        console.log('destroying GeneralCollection....');

        this.propList.forEach((prop: string) => {
            delete this[prop];
        });
        this.propList.splice(0, this.propList.length);
    }
}
