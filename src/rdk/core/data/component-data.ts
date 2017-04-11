import {RequestOptionsArgs, Response} from "@angular/http";

export type DataReviser = (data: any) => any;
export type CallbackRemoval = () => void;

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
    public static castToRequestOptionsArgs(args:RequestOptionsArgs|string):RequestOptionsArgs {
        return typeof args === 'string' ? {url: args, method: 'get'} : args;
    }

    constructor() {
    }

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
    private _ajaxSuccessCallbacks: AjaxSuccessCallback[] = [];
    private _ajaxErrorCallbacks: AjaxSuccessCallback[] = [];
    private _ajaxCompleteCallbacks: AjaxSuccessCallback[] = [];

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
            this._refreshCallbacks.forEach(callback => ComponentDataHelper._safeInvokeCallback(callback.context, callback.fn));
            this._timeout = null;
        }, 0);
    }

    public invokeAjaxSuccessCallback(data: any): void {
        this._ajaxSuccessCallbacks.forEach(callback => ComponentDataHelper._safeInvokeCallback(callback.context, callback.fn, data));
    }

    public invokeAjaxErrorCallback(error: Response): void {
        this._ajaxErrorCallbacks.forEach(callback => ComponentDataHelper._safeInvokeCallback(callback.context, callback.fn, error));
    }

    public invokeAjaxCompleteCallback(): void {
        this._ajaxCompleteCallbacks.forEach(callback => ComponentDataHelper._safeInvokeCallback(callback.context, callback.fn));
    }

    private static _safeInvokeCallback(context: any, callback: Function, ...args): any {
        try {
            return callback.apply(context, args);
        } catch (e) {
            console.error('invoke callback error: ' + e);
            console.error(e.stack);
        }
    }

    public clearCallbacks(): void {
        this._refreshCallbacks.splice(0, this._refreshCallbacks.length);
        this._ajaxSuccessCallbacks.splice(0, this._ajaxSuccessCallbacks.length);
        this._ajaxErrorCallbacks.splice(0, this._ajaxErrorCallbacks.length);
        this._ajaxCompleteCallbacks.splice(0, this._ajaxCompleteCallbacks.length);
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

    fromAjax(options: RequestOptionsArgs|string): void;
    onAjaxSuccess (callback: (data: any) => void, context?: any): CallbackRemoval;
    onAjaxError   (callback: (error: Response) => void, context?: any): CallbackRemoval;
    onAjaxComplete(callback: () => void, context?: any): CallbackRemoval;
}

export class PagingBasicInfo {
    constructor(public currentPage: number = 1,
                public pageSize: number = 20,
                public totalPage: number = 1,
                public totalRecord: number = 0) {
    }
}

export class PagingFilterInfo {
    constructor(public key: string = '', public field?: string[] | number[]) {
    }
}

export enum SortAs {
    string, number
}

export enum SortOrder {
    asc, des, default
}

export class PagingSortInfo {
    constructor(public as: SortAs = SortAs.string,
                public order: SortOrder = SortOrder.asc,
                public field: string | number) {
    }
}

export interface IPagableData extends IAjaxComponentData {
    pagingInfo: PagingBasicInfo;
    filterInfo: PagingFilterInfo;
    sortInfo: PagingSortInfo;

    pagingFilter(term: string, fields?: string[] | number[]): void;
    pagingFilter(term: PagingFilterInfo): void;

    pagingSort(as: SortAs, order: SortOrder, field: string | number): void;
    pagingSort(sort: PagingSortInfo): void;
}
