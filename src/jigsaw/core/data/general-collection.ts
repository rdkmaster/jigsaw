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
     * 在服务端返回的数据需要修正时，Jigsaw会调用这个函数对数据进行修正。常见的场景是：
     * - 服务端返回的数据结构不利于视图使用时；
     * - 服务端返回的数据结构不完整，需要“清洗”一下；
     * - 需要在服务端返回的数据上，增加一些额外的数据时；
     */
    public dataReviser: DataReviser;

    /**
     * 与`busy`具有相同含义
     */
    protected _busy: boolean;

    /**
     * 当前数据对象是否正在进行网络请求，请求过程中值为true，否则为false。
     * 通常可以使用这个值与组件的disabled属性绑定使用，这样可以方便的实现网络请求过程中组件不可交互的目的。
     *
     * **注意**：当它的值为true时，此数据对象无法再次发起网络查询，控制台将出现错误打印。
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
     * 发起网络请求
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

    public destroy(): void {
        super.destroy();
        console.log('destroying GeneralCollection....');

        this.propList.forEach((prop: string) => {
            delete this[prop];
        });
        this.propList.splice(0, this.propList.length);
    }
}
