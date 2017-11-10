import {CallbackRemoval, CommonUtils} from "../utils/common-utils";
import {HttpHeaders} from "@angular/common/http";

export type DataReviser = (data: any) => any;

export class HttpClientOptions {
    public url: string;
    public method?: 'get' | 'post' | 'put' | 'delete';
    public body?: any;
    public headers?: HttpHeaders;
    public observe?: 'body' | 'events' | 'response';
    public params?: { [key: string]: any | any [] };
    public reportProgress?: boolean;
    public responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    public withCredentials?: boolean;

    public static prepare(options: string | Object): PreparedHttpClientOptions {
        if (!options) {
            return;
        }
        if (typeof options === 'string') {
            options = {url: options, method: 'get'};
        }
        if (!options.hasOwnProperty('url')) {
            console.error('invalid http options, need a url property!');
            return;
        }
        const op = <any>options;
        const hco = new PreparedHttpClientOptions();
        hco.url = op.url;
        hco.method = options.hasOwnProperty('method') ? op.method : 'get';
        hco.body = op.body;
        hco.headers = op.headers;
        hco.observe = op.observe;
        hco.params = PreparedHttpClientOptions.prepareParams(op.params);
        hco.reportProgress = op.reportProgress;
        hco.responseType = op.responseType;
        hco.withCredentials = op.withCredentials;
        return hco;
    }
}

export class PreparedHttpClientOptions extends HttpClientOptions {
    public params?: { [key: string]: string | string[] };

    public static prepareParams(params): { [key: string]: string | string[] } {
        const result: { [key: string]: string | string[] } = {};
        for (let p in params) {
            if (!params.hasOwnProperty(p)) {
                continue;
            }
            result[p] = typeof params[p] === 'object' ? JSON.stringify(params[p]) : params[p];
        }
        return result;
    }
}

export interface IComponentData {
    /**
     * Angular的变化检测机制无法检测到我们对一个对象的某个属性所做的修改，例如我们将一个数组通过输入属性的方式绑定给了一个组件之后，
     * 直接在这个数组中插入一个元素，组件内部是难以获知这个变化的。`refresh()`这个方法就是为了解决这个问题而存在的，
     * 当你更新了数据之后，请务必调用一下这个方法以通知组件及时更新。
     */
    refresh(): void;

    /**
     * 数据销毁时要做的事情，一般无需直接调用它。
     */
    destroy(): void;

    /**
     * 注册数据有更新时的处理逻辑，一般无需直接调用它。
     */
    onRefresh(callback: (thisData: IComponentData) => void, context?: any): CallbackRemoval;
}

/**
 * 实现了这个接口的数据对象都具备访问ajax的能力
 */
export interface IAjaxComponentData extends IComponentData {
    /**
     * 这个属性用于标志当前数据的忙闲状态，为`true`时表示请求正在进行中，为`false`表示数据请求已经结束；
     * 常常用于界面上的loading状态是否显示或者组件的disabled状态是否激活。
     * 可参考[这个demo](http://rdk.zte.com.cn/jigsaw/data-encapsulation/array-ssp)。
     *
     * @type boolean
     */
    busy: boolean;

    /**
     * 这是一个函数，作用是在数据从服务端请求回来之后，对服务端返回的数据做修正，并返回修正后的数据。
     * 一般用于数据结构的转换或者数据的微调。
     *
     * 可参考[这个demo](http://rdk.zte.com.cn/jigsaw/data-encapsulation/array-ajax)。
     *
     * @type (data: any) => any
     */
    dataReviser: DataReviser;

    /**
     * 使用`options`对应的信息请求一笔数据。
     *
     * @param {HttpClientOptions} options
     */
    fromAjax(options?: HttpClientOptions): void;

    /**
     * 通过GET的方法请求`url`对应的数据，如果需要通过POST/PUT等方法请求数据，则请提供一个`HttpClientOptions`对象作为入参。
     *
     * @param {string} url 提供数据的url，提示：参数可以带在url的query域中
     */
    fromAjax(url?: string): void;

    /**
     * Ajax请求开始的时候，执行`callback`函数，一般可以在这个函数里触发loading效果。
     *
     * @param {() => void} callback 回调函数
     * @param context 回调函数`callback`执行的上下文
     * @returns {CallbackRemoval} 这是一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    onAjaxStart   (callback: () => void, context?: any): CallbackRemoval;

    /**
     * Ajax请求成功的时候，执行`callback`函数。
     *
     * @param {(data: any) => void} callback 回调函数
     * @param context 回调函数`callback`执行的上下文
     * @returns {CallbackRemoval} 这是一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    onAjaxSuccess (callback: (data: any) => void, context?: any): CallbackRemoval;

    /**
     * Ajax请求失败的时候，执行`callback`函数。
     *
     * @param {(data: any) => void} callback 回调函数
     * @param context 回调函数`callback`执行的上下文
     * @returns {CallbackRemoval} 这是一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    onAjaxError   (callback: (error: Response) => void, context?: any): CallbackRemoval;

    /**
     * Ajax请求结束（无论成功还是失败）的时候，执行`callback`函数，一般可以在这个函数里停止loading效果。
     *
     * @param {(data: any) => void} callback 回调函数
     * @param context 回调函数`callback`执行的上下文
     * @returns {CallbackRemoval} 这是一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    onAjaxComplete(callback: () => void, context?: any): CallbackRemoval;
}

/**
 * 实现了这个接口的类都具备分页能力，分页能力主要有两种，分别是本地分页和服务端分页，其中：
 * - **本地分页** 数据全量保存在浏览器内存中，分页过程在浏览器本地内存中完成，不涉及到服务端请求过程，
 * 由于浏览器内存的限制导致数据量不可能太大，因此一般很少会使用这样的分页方式，仅在特定的简单场景中使用；
 * - **服务端分页** 数据全量保存在服务端，分页过程在服务端完成，因此分页过程需要与服务端发生ajax交互。
 * 这是最主要最常用的分页方式，可以适用于几乎所有的的分页场景。
 */
export interface IPageable extends IAjaxComponentData {
    /**
     * 分页信息
     */
    pagingInfo: PagingInfo;

    /**
     * 设置数据对象的当前页为`currentPage`
     *
     * @param {number} currentPage 新的当前页序号，从1开始
     * @param {number} pageSize 新的单页记录数，可选，不提供则不改变单页记录数。
     */
    changePage(currentPage: number, pageSize?: number): void;

    changePage(info: PagingInfo): void;

    /**
     * 直接跳转到第1页
     */
    firstPage(): void;

    /**
     * 跳转到前一页
     */
    previousPage(): void;

    /**
     * 跳转到下一页
     */
    nextPage(): void;

    /**
     * 跳转到最后一页
     */
    lastPage(): void;
}

/**
 * 描述了服务端分页的更具体的接口，实现了这个接口的类就具备服务端分页的能力。
 *
 */
export interface IServerSidePageable extends IPageable {
    /**
     * 更新数据源信息，一个分页数据对象在查询条件发生变化之后，可以通过调用这个方法来更新数据的查询条件。
     * 注意，在切换分页的时候，这些查询条件会发送给服务端，以确保能够查询到正确的数据。
     *
     * @param {HttpClientOptions} options
     */
    updateDataSource(options: HttpClientOptions): void;
}

/**
 * 实现了这个接口的类就具备了数据排序的能力，数据排序能力分两种，分别是本地排序和服务端排序，含义和本地分页以及服务端分页类似。
 */
export interface ISortable extends IAjaxComponentData {
    sortInfo: DataSortInfo;

    sort(compareFn?: (a: any[], b: any[]) => number): void;

    sort(as: SortAs, order: SortOrder, field: string | number): void;

    sort(sort: DataSortInfo): void;
}

/**
 * 实现了这个接口的类就具备了数据过滤的能力，数据过滤能力分两种，分别是本地过滤和服务端过滤，含义和本地分页以及服务端分页类似。
 */
export interface IFilterable extends IAjaxComponentData {
    filterInfo: DataFilterInfo;

    filter(compareFn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;

    filter(term: string, fields?: (string | number)[]): void;

    filter(term: DataFilterInfo): void;
}

export class ViewportData {
    width: number;
    height: number;

    maxWidth: number;
    maxHeight: number;

    horizontalTo: number;
    verticalTo: number;
}

/**
 * 具备切片能力的数据，这种数据对象往往数据量非常巨大，并且需要非常高的渲染性能，已知的实现类有`BigTableData`。
 */
export interface ISlicedData extends IComponentData {
    viewport: ViewportData;

    scroll(verticalTo: number, horizontalTo: number): void;

    vScroll(scrollTo: number): void;

    hScroll(scrollTo: number): void;
}

export class DataRefreshCallback {
    constructor(public fn: (thisData: IComponentData) => void,
                public context?: any) {
        this.context = !!context ? context : fn;
    }
}

export class AjaxSuccessCallback {
    constructor(public fn: (data: any) => void,
                public context?: any) {
        this.context = !!context ? context : fn;
    }
}

export class AjaxErrorCallback {
    constructor(public fn: (error: Response) => void,
                public context?: any) {
        this.context = !!context ? context : fn;
    }
}

export class AjaxCompleteCallback {
    constructor(public fn: () => void,
                public context?: any) {
        this.context = !!context ? context : fn;
    }
}

export class ComponentDataHelper {
    private _getRemoval<T>(callbacks: T[], callback: T): CallbackRemoval {
        callbacks.push(callback);
        return () => {
            const idx = callbacks.indexOf(callback);
            if (idx != -1) {
                callbacks.splice(idx, 1);
            }
        }
    }

    private _timeout: any = null;
    private _refreshCallbacks: DataRefreshCallback[] = [];
    private _ajaxStartCallbacks: AjaxSuccessCallback[] = [];
    private _ajaxSuccessCallbacks: AjaxSuccessCallback[] = [];
    private _ajaxErrorCallbacks: AjaxSuccessCallback[] = [];
    private _ajaxCompleteCallbacks: AjaxSuccessCallback[] = [];

    public getAjaxStartRemoval(callback: AjaxSuccessCallback): CallbackRemoval {
        return this._getRemoval(this._ajaxStartCallbacks, callback);
    }

    public getAjaxSuccessRemoval(callback: AjaxSuccessCallback): CallbackRemoval {
        return this._getRemoval(this._ajaxSuccessCallbacks, callback);
    }

    public getAjaxErrorRemoval(callback: AjaxSuccessCallback): CallbackRemoval {
        return this._getRemoval(this._ajaxErrorCallbacks, callback);
    }

    public getAjaxCompleteRemoval(callback: AjaxSuccessCallback): CallbackRemoval {
        return this._getRemoval(this._ajaxCompleteCallbacks, callback);
    }

    public getRefreshRemoval(callback: DataRefreshCallback): CallbackRemoval {
        return this._getRemoval(this._refreshCallbacks, callback);
    }

    public invokeRefreshCallback(): void {
        if (this._timeout !== null) {
            return;
        }
        this._timeout = setTimeout(() => {
            this._timeout = null;
            this._refreshCallbacks.forEach(callback => CommonUtils.safeInvokeCallback(callback.context, callback.fn));
        }, 0);
    }

    public invokeAjaxStartCallback(): void {
        this._ajaxStartCallbacks.forEach(callback => CommonUtils.safeInvokeCallback(callback.context, callback.fn));
    }

    public invokeAjaxSuccessCallback(data: any): void {
        this._ajaxSuccessCallbacks.forEach(callback => CommonUtils.safeInvokeCallback(callback.context, callback.fn, [data]));
    }

    public invokeAjaxErrorCallback(error: Response): void {
        this._ajaxErrorCallbacks.forEach(callback => CommonUtils.safeInvokeCallback(callback.context, callback.fn, [error]));
    }

    public invokeAjaxCompleteCallback(): void {
        this._ajaxCompleteCallbacks.forEach(callback => CommonUtils.safeInvokeCallback(callback.context, callback.fn));
    }

    public clearCallbacks(): void {
        this._refreshCallbacks.splice(0, this._refreshCallbacks.length);
        this._ajaxStartCallbacks.splice(0, this._ajaxStartCallbacks.length);
        this._ajaxSuccessCallbacks.splice(0, this._ajaxSuccessCallbacks.length);
        this._ajaxErrorCallbacks.splice(0, this._ajaxErrorCallbacks.length);
        this._ajaxCompleteCallbacks.splice(0, this._ajaxCompleteCallbacks.length);
    }
}

export class PagingInfo {
    /**
     * 这个属性指定了统一的在服务端进行分页、排序、过滤的服务的url。
     * - 如果你有自己的实现，则请更改这个属性指向你提供的服务；
     * - 如果你没有自己的实现，则建议使用[RDK](https://github.com/rdkmaster/rdk)提供服务，
     * 我们也建议你尽量使用[RDK](https://github.com/rdkmaster/rdk)提供的这个服务；
     *
     * @type {string}
     */
    public static pagingServerUrl: string = '/rdk/service/app/common/paging';

    constructor(public currentPage: number = 1,
                public pageSize: number = 20,
                public totalPage: number = 1,
                public totalRecord: number = 0) {
    }
}

export class DataFilterInfo {
    constructor(public key: string = '', public field?: string[] | number[]) {
    }
}

export enum SortAs {
    string, number
}

export enum SortOrder {
    asc, des, default
}

export class DataSortInfo {
    constructor(public as: SortAs = SortAs.string,
                public order: SortOrder = SortOrder.asc,
                public field: string | number) {
    }
}
