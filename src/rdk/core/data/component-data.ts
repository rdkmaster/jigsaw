import {RequestOptionsArgs, Response} from "@angular/http";

export type DataReviser          = (data: any)                => any;
export type CallbackRemoval      = ()                         => void;
export type DataRefreshCallback  = (thisData: IComponentData) => void;
export type AjaxSuccessCallback  = (data: any)                => void;
export type AjaxErrorCallback    = (error: Response)          => void;
export type AjaxCompleteCallback = ()                         => void;

export class ComponentDataHelper {
  constructor(public ownerData: IComponentData) {
  }

  private _getRemoval<T>(callbacks:Array<T>, callback:T):CallbackRemoval {
    callbacks.push(callback);
    return () => {
      const idx = callbacks.indexOf(callback);
      if (idx != -1) {
        callbacks.splice(idx, 1);
      }
    }
  }

  private _timeout: any = null;
  private _refreshCallbacks: Array<DataRefreshCallback> = [];
  private _ajaxSuccessCallbacks: Array<AjaxSuccessCallback> = [];
  private _ajaxErrorCallbacks: Array<AjaxSuccessCallback> = [];
  private _ajaxCompleteCallbacks: Array<AjaxSuccessCallback> = [];

  public getAjaxSuccessRemoval(callback:AjaxSuccessCallback):CallbackRemoval {
    return this._getRemoval(this._ajaxSuccessCallbacks, callback);
  }

  public getAjaxErrorRemoval(callback:AjaxSuccessCallback):CallbackRemoval {
    return this._getRemoval(this._ajaxErrorCallbacks, callback);
  }

  public getAjaxCompleteRemoval(callback:AjaxSuccessCallback):CallbackRemoval {
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
      this._refreshCallbacks.forEach(callback => ComponentDataHelper._safeInvokeCallback(callback, this.ownerData));
      this._timeout = null;
    }, 0);
  }

  public invokeAjaxSuccessCallback(data:any):void {
    this._ajaxSuccessCallbacks.forEach(callback => ComponentDataHelper._safeInvokeCallback(callback, data));
  }

  public invokeAjaxErrorCallback(error:Response):void {
    this._ajaxErrorCallbacks.forEach(callback => ComponentDataHelper._safeInvokeCallback(callback, error));
  }

  public invokeAjaxCompleteCallback():void {
    this._ajaxCompleteCallbacks.forEach(callback => ComponentDataHelper._safeInvokeCallback(callback));
  }

  private static _safeInvokeCallback(callback:Function, ...args):any {
    try {
      return callback.apply(callback, args);
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
  onRefresh(callback: DataRefreshCallback): CallbackRemoval;
}

export interface IAjaxComponentData extends IComponentData {
  busy: boolean;

  fromAjax(url: string, options?: RequestOptionsArgs): void;
  onAjaxSuccess (callback: AjaxSuccessCallback): CallbackRemoval;
  onAjaxError   (callback: AjaxErrorCallback): CallbackRemoval;
  onAjaxComplete(callback: AjaxCompleteCallback): CallbackRemoval;
}

export class PagingBasicInfo {
  constructor(public currentPage: number = 1, public pageSize: number = 20, public totalPage: number = 1) {
  }
}

export class PagingFilterInfo {
  constructor(public key: string = '', public field?: Array<string|number>) {
  }
}

export enum SortAs {
  string, number
}

export enum SortOrder {
  asc, desc
}
export class PagingSortInfo {
  constructor(public as: SortAs = SortAs.string, public order: SortOrder = SortOrder.asc, public field: string|number) {
  }
}

export interface IPagableData extends IAjaxComponentData {
  pagingInfo: PagingBasicInfo;
  filterInfo: PagingFilterInfo;
  sortInfo: PagingSortInfo;

  pagingFilter(term: string, fields?: Array<string|number>): void;
  pagingFilter(term: PagingFilterInfo): void;

  pagingSort(as: SortAs, order: SortOrder, field: string|number): void;
  pagingSort(sort: PagingSortInfo): void;
}
