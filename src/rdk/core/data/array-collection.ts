import {
    IAjaxComponentData, ComponentDataHelper, DataRefreshCallback, DataReviser, CallbackRemoval,
    IPagableData, PagingBasicInfo, PagingFilterInfo, PagingSortInfo, SortAs, SortOrder, AjaxSuccessCallback,
    AjaxErrorCallback, AjaxCompleteCallback
} from "./component-data";
import {TableData} from "./table-data";

import {Http, RequestOptionsArgs, URLSearchParams, Response} from "@angular/http";
import {Subject} from "rxjs";
import 'rxjs/add/operator/map';


export class ArrayCollection<T> extends Array<T> implements IAjaxComponentData {
    public busy: boolean;
    public http: Http;

    constructor(source?: T[]) {
        super();
        this._fromArray(source);
    }

    protected wrappedDataReviser: DataReviser;
    private _originDataReviser: DataReviser;

    public get dataReviser(): DataReviser {
        return this._originDataReviser;
    }

    public set dataReviser(value: DataReviser) {
        this._originDataReviser = value;
        this.wrappedDataReviser = (data) => {
            try {
                return this._originDataReviser(data);
            } catch (e) {
                console.error('revise data error: ' + e);
                console.error(e.stack);
                return data;
            }
        }
    }

    protected ajaxSuccessHandler(data: T[]): void {
        if (data instanceof Array) {
            this.fromArray(data);
        } else {
            console.error('invalid data type: ' + typeof(data) + ', need Array.');
            this.fromArray([]);
        }
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    protected ajaxErrorHandler(error: Response): void {
        console.error('get data from paging server error!! detail: ' + error);

        this.busy = false;
        this.fromArray([]);
        this.componentDataHelper.invokeAjaxErrorCallback(error);
    }

    protected ajaxCompleteHandler(): void {
        console.log('get data from paging server complete!!');

        this.busy = false;
        this.componentDataHelper.invokeAjaxCompleteCallback();
    }

    protected reviseData(response: Response): any {
        return this.wrappedDataReviser ? this.wrappedDataReviser(response.json()) : response.json();
    }

    public fromAjax(url: string, options?: RequestOptionsArgs): void {
        if (!this.http) {
            console.error('set a valid Http instance to ArrayCollection.http before invoking ArrayCollection.fromAjax()!');
            return;
        }

        this.busy = true;
        this.http.request(url, options)
            .map(res => this.reviseData(res) as T[])
            .subscribe(
                data => this.ajaxSuccessHandler(data),
                error => this.ajaxErrorHandler(error),
                () => this.ajaxCompleteHandler()
            );
    }

    public fromArray(source: T[]): ArrayCollection<T> {
        if (this._fromArray(source)) {
            this.refresh();
        }
        return this;
    }

    private _fromArray(source: T[]): boolean {
        let needRefresh = this.length > 0;

        this.splice(0, this.length);
        if (source) {
            needRefresh = needRefresh || source.length > 0;
            source.forEach(item => this.push(item));
        }

        return needRefresh;
    }

    protected componentDataHelper: ComponentDataHelper = new ComponentDataHelper(this);

    public refresh(): void {
        this.componentDataHelper.invokeRefreshCallback();
    }

    public onRefresh(callback: DataRefreshCallback): CallbackRemoval {
        return this.componentDataHelper.getRefreshRemoval(callback);
    }

    public onAjaxSuccess(callback: AjaxSuccessCallback): CallbackRemoval {
        return this.componentDataHelper.getAjaxSuccessRemoval(callback);
    }

    public onAjaxError(callback: AjaxErrorCallback): CallbackRemoval {
        return this.componentDataHelper.getAjaxErrorRemoval(callback);
    }

    public onAjaxComplete(callback: AjaxCompleteCallback): CallbackRemoval {
        return this.componentDataHelper.getAjaxCompleteRemoval(callback);
    }

    public destroy(): void {
        console.log('destroying ArrayCollection....');
        this.splice(0, this.length);

        this.componentDataHelper.clearCallbacks();
        this.componentDataHelper = null;

        this.wrappedDataReviser = null;
        this._originDataReviser = null;
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

    constructor(public http: Http, public sourceUrl: string, public sourceRequestOptions?: RequestOptionsArgs) {
        super();

        if (!http) {
            throw new Error('invalid http!');
        }
        this.pagingInfo = new PagingBasicInfo();

        this._initRequestOptions();
        this._initSubjects();
    }

    private _initRequestOptions(): void {
        if (!this.sourceUrl) {
            throw new Error('invalid source url!');
        }
        if (!this.sourceRequestOptions) {
            this.sourceRequestOptions = {method: 'get'};
        }

        let originSearch = this.sourceRequestOptions.search;
        this.sourceRequestOptions.search = new URLSearchParams();
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
                const val = originSearch.get(next.value);
                try {
                    pp[next.value] = JSON.parse(val);
                } catch (e) {
                    pp[next.value] = val;
                }
            }

            this.sourceRequestOptions.search.set('peerParam', JSON.stringify(pp));
        }
        this.sourceRequestOptions.search.set('service', this.sourceUrl);
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
        this.sourceUrl = url;
        this.updateRequestOptions(options);
    }

    public updateRequestOptions(options: RequestOptionsArgs): void {
        this.sourceRequestOptions = options;
        this._initRequestOptions();
    }

    public fromAjax(url: string, options?: RequestOptionsArgs): void {
        this.updateDataSource(url, options);
        this._ajax();
    }

    private _ajax(): void {
        this.busy = true;

        if (this.sourceRequestOptions.search instanceof URLSearchParams) {
            this.sourceRequestOptions.search.set('paging', JSON.stringify(this.pagingInfo));
            if (this.filterInfo) {
                this.sourceRequestOptions.search.set('filter', JSON.stringify(this.filterInfo));
            }
            if (this.sortInfo) {
                this.sourceRequestOptions.search.set('sort', JSON.stringify(this.sortInfo));
            }
        }

        this.http.request(this.pagingServerUrl, this.sourceRequestOptions)
            .map(res => this.reviseData(res))
            .map(data => {
                const tableData: TableData = new TableData();
                if (TableData.isTableData(data)) {
                    tableData.fromObject(data);
                } else {
                    console.error('invalid data format, need a TableData object.');
                }
                return tableData;
            })
            .subscribe(
                tableData => this.ajaxSuccessHandler(tableData),
                error => this.ajaxErrorHandler(error),
                () => this.ajaxCompleteHandler()
            );
    }

    protected ajaxSuccessHandler(tableData: any): void {
        this.fromArray(tableData.toArray());
        this.componentDataHelper.invokeAjaxSuccessCallback(tableData);
    }

    public pagingFilter(term: string, fields?: string[] | number[]): void;
    public pagingFilter(term: PagingFilterInfo): void;
    public pagingFilter(term: string|PagingFilterInfo, fields?: string[] | number[]): void {
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

        this.http = null;
        this.sourceRequestOptions = null;
        this.pagingInfo = null;
        this.filterInfo = null;
        this.sortInfo = null;
        this._filterSubject.unsubscribe();
        this._filterSubject = null;
        this._sortSubject.unsubscribe();
        this._sortSubject = null;
    }
}

export class DirectServerSidePagingArray extends ServerSidePagingArray {
    constructor(private _http$: Http, private _sourceUrl$: string, private _sourceRequestOptions$: RequestOptionsArgs) {
        super(_http$, _sourceUrl$, _sourceRequestOptions$);
        console.error("unsupported yet!");
    }
}

export class LocalPagingArray extends ArrayCollection<any> implements IPagableData {
    public pagingInfo: PagingBasicInfo;
    public filterInfo: PagingFilterInfo;
    public sortInfo: PagingSortInfo;
    public busy: boolean = false;

    constructor() {
        super();
        console.error("unsupported yet!");
    }

    public pagingFilter(term: string, fields?: string[] | number[]): void;
    public pagingFilter(term: PagingFilterInfo): void;
    public pagingFilter(term, fields?: string[] | number[]): void {
    }

    public pagingSort(as: SortAs, order: SortOrder, field: string|number): void;
    public pagingSort(sort: PagingSortInfo): void;
    public pagingSort(as, order?: SortOrder, field?: string|number): void {
    }
}
