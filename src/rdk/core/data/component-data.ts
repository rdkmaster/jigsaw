import {RequestOptionsArgs, Http, Response} from "@angular/http";

export type DataReviser = (data: any) => any;
export type DataRefreshCallback = (thisData: IComponentData) => void;
export type OnRefreshToken = () => void;

export class ComponentDataHelper {
  constructor(public ownerData: IComponentData) {
  }

  private timeout: any = null;
  private callbacks: Array<DataRefreshCallback> = [];

  public getRemoval(callback: DataRefreshCallback): OnRefreshToken {
    this.callbacks.push(callback);
    return () => {
      let idx = this.callbacks.indexOf(callback);
      if (idx != -1) {
        this.callbacks.splice(idx, 1);
      }
    }
  }

  public invokeCallback(): void {
    if (this.timeout !== null) {
      return;
    }
    this.timeout = setTimeout(() => {
      this.callbacks.forEach((callback: DataRefreshCallback) => {
        try {
          callback(this.ownerData);
        } catch (e) {
          console.error('call data refresh callback error:');
          console.error(e.stack);
        }
      });
      this.timeout = null;
    }, 0);
  }

  public clearCallbacks(): void {
    this.callbacks.splice(0, this.callbacks.length);
  }
}

export interface IComponentData {
  dataReviser: DataReviser;

  refresh(): void;
  onRefresh(callback: DataRefreshCallback): OnRefreshToken;
  fromAjax(url: string, options?: RequestOptionsArgs): void;
  destroy(): void;
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

export interface IPagableData extends IComponentData {
  pagingInfo: PagingBasicInfo;
  filterInfo: PagingFilterInfo;
  sortInfo: PagingSortInfo;

  busy: boolean;

  pagingFilter(term: string, fields?: Array<string|number>): void;
  pagingFilter(term: PagingFilterInfo): void;

  pagingSort(as: SortAs, order: SortOrder, field: string|number): void;
  pagingSort(sort: PagingSortInfo): void;
}

export class TableData {
  constructor(public header: Array<string> = [],
              public field: Array<string> = [],
              public data: Array< Array<string|number> > = []) {
  }

  public fromObject(data:any):void {
    if (!TableData.isTableData(data)) {
      throw new Error('the input data is NOT a TableData type!');
    }
    this.data = data.data;
    this.field = data.field;
    this.header = data.header;
  }

  public toArray(): Array<any> {
    const result: Array<any> = [];
    if (!this.data || !this.field) {
      return result;
    }

    this.data.forEach(row => {
      let item = {};
      this.field.forEach((field, index) => {
        item[field] = row[index];
      });
      result.push(item);
    });
    return result;
  }

  public static isTableData(data:any):boolean {
    return data && data.hasOwnProperty('data') && data.data instanceof Array &&
        data.hasOwnProperty('header') && data.header instanceof Array &&
        data.hasOwnProperty('field') && data.field instanceof Array;
  }
}
