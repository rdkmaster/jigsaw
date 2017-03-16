import {
  IComponentData, ComponentDataHelper, DataRefreshCallback, DataReviser, OnRefreshToken,
  IPagableData, PagingBasicInfo, PagingFilterInfo, PagingSortInfo, SortAs, SortOrder, TableData
} from "./component-data";
import {Http, RequestOptionsArgs, Response, URLSearchParams} from "@angular/http";
import {Observable, Subject} from "rxjs";
import 'rxjs/add/operator/map';


export class ArrayCollection<T> extends Array<T> implements IComponentData {
  public http: Http;
  protected _dataReviser: DataReviser;
  private _originDataReviser: DataReviser;

  constructor(source?: Array<T>) {
    super();
    this._fromArray(source);
  }

  public get dataReviser(): DataReviser {
    return this._originDataReviser;
  }

  public set dataReviser(value: DataReviser) {
    this._originDataReviser = value;
    this._dataReviser = (data) => {
      try {
        return this._originDataReviser(data);
      } catch (e) {
        console.error('revise data error: ' + e);
        console.error(e.stack);
        return data;
      }
    }
  }

  public fromAjax(url: string, options?: RequestOptionsArgs): void {
    if (!this.http) {
      console.error('set a valid Http instance to ArrayCollection.http before invoking ArrayCollection.fromAjax()!');
      return;
    }

    const method: string = options && options.method ? options.method.toString() : 'get';
    const observable: Observable<Response> = this.http[method](url, options);

    observable
      .map(res => (this._dataReviser ? this._dataReviser(res.json()) : res.json())  as Array<T>)
      .subscribe((list: Array<T>) => {
        if (list instanceof Array) {
          this.fromArray(list);
        } else {
          console.error('invalid data type: ' + typeof(list) + ', need Array.');
          this.fromArray([]);
        }
      });
  }

  public fromArray(source: Array<T>): ArrayCollection<T> {
    if (this._fromArray(source)) {
      this.refresh();
    }
    return this;
  }

  private _fromArray(source: Array<T>): boolean {
    let needRefresh = this.length > 0;

    this.splice(0, this.length);
    if (source) {
      needRefresh = needRefresh || source.length > 0;
      source.forEach(item => this.push(item));
    }

    return needRefresh;
  }

  private _componentDataHelper: ComponentDataHelper = new ComponentDataHelper(this);

  public refresh(): void {
    this._componentDataHelper.invokeCallback();
  }

  public onRefresh(callback: DataRefreshCallback): OnRefreshToken {
    return this._componentDataHelper.getRemoval(callback);
  }

  public destroy(): void {
    console.log('destroying ArrayCollection....');
    this.splice(0, this.length);

    this._componentDataHelper.clearCallbacks();
    this._componentDataHelper = null;

    this.dataReviser = null;
  }

}

export class ServerSidePagingArray extends ArrayCollection<any> implements IPagableData {
  public pagingServerUrl: string = '/rdk/service/app/common/paging';

  public pagingInfo: PagingBasicInfo;
  public filterInfo: PagingFilterInfo;
  public sortInfo: PagingSortInfo;
  public busy: boolean = false;

  private _filterSubject = new Subject<PagingFilterInfo>();
  private _sortSubject = new Subject<PagingSortInfo>();

  constructor(private _http: Http, private _sourceUrl: string, private _sourceRequestOptions?: RequestOptionsArgs) {
    super();

    if (!_http) {
      throw new Error('invalid _http!');
    }
    this.pagingInfo = new PagingBasicInfo();

    this._initRequestOptions();
    this._initSubjects();
  }

  private _initRequestOptions(): void {
    if (!this._sourceUrl) {
      throw new Error('invalid source url!');
    }
    if (!this._sourceRequestOptions) {
      this._sourceRequestOptions = {method: 'get'};
    }

    let originSearch = this._sourceRequestOptions.search;
    this._sourceRequestOptions.search = new URLSearchParams();
    if (originSearch) {
      if (typeof originSearch === 'string') {
        originSearch = new URLSearchParams(originSearch);
      }

      //将坑爹的 a=1&b=2&... 转为json对象
      const keys = originSearch.paramsMap.keys();
      const pp: any = {};
      while (true) {
        const next = keys.next();
        if (next.done) break;
        pp[next.value] = originSearch.get(next.value);
      }

      this._sourceRequestOptions.search.set('peerParam', JSON.stringify(pp));
    }
    this._sourceRequestOptions.search.set('service', this._sourceUrl);
  }

  private _initSubjects(): void {
    this._filterSubject.debounceTime(300).subscribe(filter => {
      this.filterInfo = filter;
      this._ajax();
    });
    this._sortSubject.debounceTime(300).subscribe(sort => {
      this.sortInfo = sort;
      this._ajax();
    });
  }

  public updateDataSource(url: string, options?: RequestOptionsArgs): void {
    this._sourceUrl = url;
    this._sourceRequestOptions = options;
    this._initRequestOptions();
  }

  public updateRequestOptions(options: RequestOptionsArgs): void {
    this._sourceRequestOptions = options;
    this._initRequestOptions();
  }

  public fromAjax(url: string, options?: RequestOptionsArgs): void {
    this.updateDataSource(url, options);
    this._ajax();
  }

  private _ajax(): void {
    this.busy = true;

    if (this._sourceRequestOptions.search instanceof URLSearchParams) {
      this._sourceRequestOptions.search.set('paging', JSON.stringify(this.pagingInfo));
      if (this.filterInfo) {
        this._sourceRequestOptions.search.set('filter', JSON.stringify(this.filterInfo));
      }
      if (this.sortInfo) {
        this._sourceRequestOptions.search.set('sort', JSON.stringify(this.sortInfo));
      }
    }

    this._http.request(this.pagingServerUrl, this._sourceRequestOptions)
      .map(res => this._dataReviser ? this._dataReviser(res.json()) : res.json())
      .map(data => {
        const tableData: TableData = new TableData();
        if (TableData.isTableData(data)) {
          tableData.fromObject(data);
        } else {
          console.error('invalid data format, need a TableData object.');
        }
        return tableData;
      })
      .subscribe(tableData => {
        this.fromArray(tableData.toArray());
      }, (error) => {
        console.error('get data from paging server error!! detail: ' + error);
        this.busy = false;
        this.fromArray([]);
      }, () => {
        console.log('get data from paging server complete!!');
        this.busy = false;
      });
  }

  public pagingFilter(term: string, fields?: Array<string|number>): void;
  public pagingFilter(term: PagingFilterInfo): void;
  public pagingFilter(term: string|PagingFilterInfo, fields?: Array<string|number>): void {
    const pfi = term instanceof PagingFilterInfo ? term : new PagingFilterInfo(term, fields);
    this._filterSubject.next(pfi);
  }

  public pagingSort(as: SortAs, order: SortOrder, field: string|number): void;
  public pagingSort(sort: PagingSortInfo): void;
  public pagingSort(as, order?: SortOrder, field?: string|number): void {
    const psi = as instanceof PagingSortInfo ? as : new PagingSortInfo(as, order, field);
    this._sortSubject.next(psi);
  }

  public destroy(): void {
    super.destroy();

    this._http = null;
    this._sourceRequestOptions = null;
    this.pagingInfo = null;
    this.filterInfo = null;
    this.sortInfo = null;
    this._filterSubject.unsubscribe();
    this._filterSubject = null;
    this._sortSubject.unsubscribe();
    this._sortSubject = null;
  }
}

// export class DirectServerSidePagingArray<T> extends ServerSidePagingArray<T> {
//   constructor(private _http:Http, private _sourceUrl:string, private _sourceRequestOptions:RequestOptionsArgs) {
//     super(_http, _sourceUrl, _sourceRequestOptions);
//     console.error("unsupported yet!");
//   }
// }
