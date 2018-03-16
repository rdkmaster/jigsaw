import {EventEmitter} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {
    IAjaxComponentData, DataReviser, ComponentDataHelper, HttpClientOptions
} from "./component-data";
import {CallbackRemoval} from "../utils/common-utils";

export abstract class AbstractGeneralCollection<T = any> implements IAjaxComponentData {
    public abstract fromObject(data: T): AbstractGeneralCollection<T>;

    protected abstract ajaxSuccessHandler(data): void;

    /**
     * 用于发起网络请求，在调用`fromAjax()`之前必须设置好此值。
     */
    public http: HttpClient;

    /**
     * 对服务端返回的数据进行修正，详情请参考`IAjaxComponentData.dataReviser`
     */
    public dataReviser: DataReviser;

    /**
     * 与`busy`具有相同功能
     */
    protected _busy: boolean;

    /**
     * 当前数据对象是否正在进行网络请求，请求过程中值为true，否则为false。
     * 详情请参考 `IAjaxComponentData.busy`
     *
     * @return {boolean}
     */
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

    /**
     * 发起网络请求，详情请参考`IAjaxComponentData.fromAjax`
     *
     * @param {string} url 采用GET方法请求这个服务，如果省略，则请求上一次指定的服务。
     * 提示：可以将参数放到url中带给服务端；如果需要采用POST等其他方法，请提供一个`HttpClientOptions`类型的参数。
     */
    public fromAjax(url?: string): void;
    /**
     * @param {HttpClientOptions} options 指定了本次网络请求的各种参数，如果省略，则采用上一次请求所设置的参数。
     */
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

    /**
     * 参考`IComponentData.refresh`的说明
     */
    public refresh(): void {
        this.componentDataHelper.invokeRefreshCallback();
    }

    /**
     * 数据销毁时要做的事情，详情请参考 `IComponentData.onRefresh`
     */
    public onRefresh(callback: (thisData: AbstractGeneralCollection<T>) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getRefreshRemoval({fn: callback, context: context});
    }

    /**
     * 详情请参考 `IAjaxComponentData.onAjaxStart`
     *
     * @param {() => void} callback 回调函数，必选
     * @param context 回调函数`callback`执行的上下文，可选
     * @returns {CallbackRemoval} 这是一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    public onAjaxStart(callback: (data: T) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxStartRemoval({fn: callback, context: context});
    }

    /**
     * 详情请参考 `IAjaxComponentData.onAjaxSuccess`
     *
     * @param {(data: any) => void} callback 回调函数
     * @param context 回调函数`callback`执行的上下文
     * @returns {CallbackRemoval} 这是一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    public onAjaxSuccess(callback: (data: T) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxSuccessRemoval({fn: callback, context: context});
    }

    /**
     * 详情请参考 `IAjaxComponentData.onAjaxError`
     *
     * @param {(data: any) => void} callback 回调函数
     * @param context 回调函数`callback`执行的上下文
     * @returns {CallbackRemoval} 这是一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    public onAjaxError(callback: (error: Response) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxErrorRemoval({fn: callback, context: context});
    }

    /**
     * 详情请参考 `IAjaxComponentData.onAjaxComplete`
     *
     * @param {(data: any) => void} callback 回调函数
     * @param context 回调函数`callback`执行的上下文
     * @returns {CallbackRemoval} 这是一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    public onAjaxComplete(callback: () => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxCompleteRemoval({fn: callback, context: context});
    }

    protected ajaxStartHandler(): void {
        this._busy = true;
        this.componentDataHelper.invokeAjaxStartCallback();
    }

    protected ajaxErrorHandler(error: Response): void {
        if (!error) {
            const reason = 'the data collection is busy now!';
            console.error('get data from paging server error!! detail: ' + reason);
            error = new Response(reason, {status: 409, statusText: reason});
        } else {
            console.error('get data from paging server error!! detail: ' + error['message']);
            this._busy = false;
        }

        this.componentDataHelper.invokeAjaxErrorCallback(error);
    }

    protected ajaxCompleteHandler(): void {
        console.log('get data from paging server complete!!');
        this._busy = false;
        this.componentDataHelper.invokeAjaxCompleteCallback();
    }

    /**
     * 数据销毁时要做的事情，详情请参考 `IComponentData.destroy`
     */
    public destroy(): void {
        this.componentDataHelper.clearCallbacks();
        this.componentDataHelper = null;
        this.dataReviser = null;
    }

    private _emitter = new EventEmitter<any>();

    public emit(value?: any): void {
        this._emitter.emit(value);
    }

    public subscribe(generatorOrNext?: any, error?: any, complete?: any): any {
        return this._emitter.subscribe(generatorOrNext, error, complete);
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

    /**
     * 数据销毁时要做的事情，详情请参考 `IComponentData.destroy`
     */
    public destroy(): void {
        super.destroy();
        console.log('destroying GeneralCollection....');

        this.propList.forEach((prop: string) => {
            delete this[prop];
        });
        this.propList.splice(0, this.propList.length);
    }
}
