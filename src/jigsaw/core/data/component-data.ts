import {CallbackRemoval, CommonUtils} from "../utils/common-utils";
import {HttpHeaders} from "@angular/common/http";

export type DataReviser = (data: any) => any;

export class HttpClientOptions {
    public url: string;
    public method?: 'get' | 'post' | 'put' | 'delete';
    public body?: any;
    public headers?: HttpHeaders;
    public observe?: 'body' | 'events' | 'response';
    public params?: {[key: string]: any | any []};
    public reportProgress?: boolean;
    public responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    public withCredentials?: boolean;

    public static of(options: string|Object): HttpClientOptions {
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
        const hco = new HttpClientOptions();
        hco.url = op.url;
        hco.method = options.hasOwnProperty('method') ? op.method : 'get';
        hco.body = op.body;
        hco.headers = op.headers;
        hco.observe = op.observe;
        hco.params = op.params;
        hco.reportProgress = op.reportProgress;
        hco.responseType = op.responseType;
        hco.withCredentials = op.withCredentials;
        return hco;
    }
}

export interface IComponentData {
    dataReviser: DataReviser;

    refresh(): void;

    destroy(): void;

    onRefresh(callback: (thisData: IComponentData) => void, context?: any): CallbackRemoval;
}

export interface IAjaxComponentData extends IComponentData {
    busy: boolean;

    fromAjax(options: HttpClientOptions | string): void;

    onAjaxStart   (callback: () => void, context?: any): CallbackRemoval;

    onAjaxSuccess (callback: (data: any) => void, context?: any): CallbackRemoval;

    onAjaxError   (callback: (error: Response) => void, context?: any): CallbackRemoval;

    onAjaxComplete(callback: () => void, context?: any): CallbackRemoval;
}

export interface IPageable extends IAjaxComponentData {
    pagingInfo: PagingInfo;

    changePage(currentPage: number, pageSize?: number): void;

    changePage(info: PagingInfo): void;

    firstPage(): void;

    previousPage(): void;

    nextPage(): void;

    lastPage(): void;
}

export interface IServerSidePageable extends IPageable {
    updateDataSource(options: HttpClientOptions): void;
}

export interface ISortable extends IAjaxComponentData {
    sortInfo: DataSortInfo;

    sort(compareFn?: (a: any[], b: any[]) => number): void;

    sort(as: SortAs, order: SortOrder, field: string | number): void;

    sort(sort: DataSortInfo): void;
}

export interface IFilterable extends IAjaxComponentData {
    filterInfo: DataFilterInfo;

    filter(compareFn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;

    filter(term: string, fields?: (string | number)[]): void;

    filter(term: DataFilterInfo): void;
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
