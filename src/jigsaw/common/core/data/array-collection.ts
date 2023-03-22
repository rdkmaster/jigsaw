import {debounceTime, map} from "rxjs/operators";
import {Subject, Subscription} from "rxjs";
import {EventEmitter} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {
    ComponentDataHelper,
    DataReviser,
    DataSortInfo,
    fixAjaxOptionsByMethod,
    HttpClientOptions,
    IAjaxComponentData,
    IEmittable,
    IFilterable,
    IPageable,
    IServerSidePageable,
    ISortable,
    PagingInfo,
    serializeFilterFunction,
    SortAs,
    SortOrder
} from "./component-data";

import {TableData} from "./table-data";
import {CallbackRemoval, CommonUtils} from "../utils/common-utils";
import {JigsawArray} from "../utils/data-collection-utils";
import {DataFilterInfo} from "./unified-paging/paging";

function _fromArray(dest: ArrayCollection<any>, source: any[]): boolean {
    source = source instanceof Array || (source as any) instanceof ArrayCollection ?
        source : CommonUtils.isDefined(source) ? [source] : [];
    const needRefresh = dest.length > 0 || source.length > 0;

    dest.splice(0, dest.length);
    if (source.length > 0) {
        source.forEach(item => dest.push(item));
    }

    return needRefresh;
}

/**
 * 这是Jigsaw数据体系中两大分支之一：数组类型的基类。
 *
 * 关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
 */
export class ArrayCollection<T> extends JigsawArray<T> implements IAjaxComponentData, IEmittable {
    /**
     * 用于发起网络请求，在调用`fromAjax()`之前必须设置好此值。
     */
    public http: HttpClient;

    public dataReviser: DataReviser;

    public concat(...items: any[]): ArrayCollection<T> {
        const acArr = [];
        for (let i = 0; i < this.length; i++) {
            acArr.push(this[i])
        }
        let itemArr = [];
        items.forEach(item => {
            itemArr = itemArr.concat(item);
        });
        return new ArrayCollection<T>(acArr.concat(itemArr));
    }

    public slice(start?: number, end?: number): ArrayCollection<T> {
        const acArr = [];
        for (let i = 0; i < this.length; i++) {
            acArr.push(this[i])
        }
        return new ArrayCollection<T>(acArr.slice(start, end));
    }

    constructor(source?: T[]) {
        super();
        _fromArray(this, source);
    }

    protected _busy: boolean = false;

    get busy(): boolean {
        return this._busy;
    }

    /**
     * 调用在`onAjaxStart`里注册的所有回调函数。
     */
    protected ajaxStartHandler(): void {
        this._busy = true;
        this.componentDataHelper.invokeAjaxStartCallback();
    }

    /**
     * 调用在`onAjaxSuccess`里注册的所有回调函数。
     */
    protected ajaxSuccessHandler(data: T[]): void {
        console.log('get data from paging server success!!');

        if (data instanceof Array) {
            this.fromArray(data);
        } else {
            console.error('invalid data type: ' + typeof (data) + ', need Array.');
            this.fromArray([]);
        }
        this._busy = false;
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    /**
     * 调用在`onAjaxError`里注册的所有回调函数。
     */
    protected ajaxErrorHandler(error: Response): void {
        if (!error) {
            const reason = 'the array collection is busy now!';
            console.error('get data from paging server error!! detail: ' + reason);
            error = new Response(reason, {status: 409, statusText: reason});
        } else {
            console.error('get data from paging server error!! detail: ' + error['message']);
            this.fromArray([]);
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

    /**
     * 安全地调用`dataReviser`函数。
     *
     * @param originData
     *
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
            console.error('set a valid Http instance to ArrayCollection.http before invoking ArrayCollection.fromAjax()!');
            return;
        }
        if (this._busy) {
            this.ajaxErrorHandler(null);
            return;
        }

        this.ajaxStartHandler();

        const op = HttpClientOptions.prepare(optionsOrUrl);
        this.http.request(op.method, op.url, op)
            .pipe(map(res => this.reviseData(res) as T[]))
            .subscribe(
                data => this.ajaxSuccessHandler(data),
                error => this.ajaxErrorHandler(error),
                () => this.ajaxCompleteHandler()
            );
    }

    /**
     * 将一个普通数组对象`source`的所有元素浅拷贝到当前数据对象中。
     *
     * ```
     * const ac = new ArrayCollection<number>();
     * ac.fromArray([1, 2, 3]);
     * console.log(ac); // [1, 2, 3]
     * ```
     *
     * @param source 源数据
     * @returns 返回当前数据对象的引用
     */
    public fromArray(source: T[]): ArrayCollection<T> {
        if (_fromArray(this, source)) {
            this.refresh();
            this.componentDataHelper.invokeChangeCallback();
        }
        return this;
    }

    protected componentDataHelper: ComponentDataHelper = new ComponentDataHelper();

    public refresh(): void {
        this.componentDataHelper.invokeRefreshCallback();
    }

    public onRefresh(callback: (thisData: ArrayCollection<T>) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getRefreshRemoval({fn: callback, context: context});
    }

    public onChange(callback: (thisData: ArrayCollection<T>) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getChangeRemoval({fn: callback, context: context});
    }

    public onAjaxStart(callback: () => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxStartRemoval({fn: callback, context: context});
    }

    public onAjaxSuccess(callback: (data: any) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxSuccessRemoval({fn: callback, context: context});
    }

    public onAjaxError(callback: (error: Response) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxErrorRemoval({fn: callback, context: context});
    }

    public onAjaxComplete(callback: () => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxCompleteRemoval({fn: callback, context: context});
    }

    public destroy(): void {
        console.log('destroying ArrayCollection....');
        this.splice(0, this.length);

        this.componentDataHelper && this.componentDataHelper.clearCallbacks();
        this.componentDataHelper = null;
        this.dataReviser = null;
        this._emitter && this._emitter.unsubscribe();
        this._emitter = null;
    }

    private _emitter = new EventEmitter<any>();

    public emit(value?: any): void {
        this._emitter.emit(value);
    }

    public subscribe(callback?: (value: any) => void): Subscription {
        return this._emitter.subscribe(callback);
    }

    public unsubscribe() {
        this._emitter.unsubscribe();
    }
}

/**
 * 这是实际使用时最常用的数组对象，具备服务端分页、服务端排序、服务端过滤能力。
 * 注意：需要有一个统一的具备服务端分页、服务端排序、服务端过滤能力的REST服务配合使用，
 * 更多信息请参考`PagingInfo.pagingServerUrl`
 *
 * 实际用法请参考[这个demo]($demo=data-encapsulation/array-ssp)
 *
 * 关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
 */
export class PageableArray extends ArrayCollection<any> implements IServerSidePageable, ISortable, IFilterable {
    public pagingInfo: PagingInfo;
    public filterInfo: DataFilterInfo;
    public sortInfo: DataSortInfo;

    public pagingServerUrl: string;

    /**
     * 参考`PageableTableData.sourceRequestOptions`的说明
     */
    public sourceRequestOptions: HttpClientOptions;

    private _filterSubject = new Subject<DataFilterInfo>();
    private _sortSubject = new Subject<DataSortInfo>();
    private _dataSourceChanged: boolean = false;

    constructor(public http: HttpClient, requestOptionsOrUrl: HttpClientOptions | string) {
        super();

        if (!http) {
            throw new Error('invalid http!');
        }

        this.pagingInfo = new PagingInfo();
        this.pagingInfo.subscribe(() => {
            this._ajax();
        });
        this.sourceRequestOptions = typeof requestOptionsOrUrl === 'string' ? {url: requestOptionsOrUrl} : requestOptionsOrUrl;

        this._initSubjects();
    }

    private _initSubjects(): void {
        this._filterSubject.pipe(debounceTime(300)).subscribe(filter => {
            this.filterInfo = filter;
            this._ajax();
        });
        this._sortSubject.pipe(debounceTime(300)).subscribe(sort => {
            this.sortInfo = sort;
            this._ajax();
        });
    }

    public updateDataSource(options: HttpClientOptions): void
    public updateDataSource(url: string): void;
    /**
     * @internal
     */
    public updateDataSource(optionsOrUrl: HttpClientOptions | string): void {
        this.sourceRequestOptions = typeof optionsOrUrl === 'string' ? {url: optionsOrUrl} : optionsOrUrl;
        this.pagingInfo.currentPage = 1;
        this.pagingInfo.totalRecord = 0;
        this.filterInfo = null;
        this.sortInfo = null;
        this._dataSourceChanged = true;
    }

    public fromAjax(url?: string): void;
    public fromAjax(options?: HttpClientOptions): void;
    /**
     * @internal
     */
    public fromAjax(optionsOrUrl?: HttpClientOptions | string): void {
        if (optionsOrUrl instanceof HttpClientOptions) {
            this.updateDataSource(<HttpClientOptions>optionsOrUrl);
        } else if (!!optionsOrUrl) {
            this.updateDataSource(<string>optionsOrUrl);
        } else {
            this._dataSourceChanged = true;
        }
        this._ajax();
    }

    private _fixAjaxOptionsByMethod = fixAjaxOptionsByMethod.bind(this);

    protected _ajax(): void {
        if (this._busy) {
            this.ajaxErrorHandler(null);
            return;
        }
        const options = HttpClientOptions.prepare(this.sourceRequestOptions);
        if (!options) {
            console.error('invalid source request options, use updateDataSource() to reset the option.');
            return;
        }

        this._busy = true;
        this.ajaxStartHandler();

        this._fixAjaxOptionsByMethod(options);

        const pagingService = this.pagingServerUrl || PagingInfo.pagingServerUrl;

        this.http.request(options.method, pagingService, options)
            .pipe(
                map(res => this.reviseData(res)),
                map(data => {
                    this._updatePagingInfo(data);

                    const tableData: TableData = new TableData();
                    if (TableData.isTableData(data)) {
                        tableData.fromObject(data);
                    } else {
                        console.error('invalid data format, need a TableData object.');
                    }
                    return tableData;
                }))
            .subscribe(
                tableData => this.ajaxSuccessHandler(tableData),
                error => this.ajaxErrorHandler(error),
                () => this.ajaxCompleteHandler()
            );
    }

    protected _updatePagingInfo(data: any): void {
        if (!data.hasOwnProperty('paging')) {
            return;
        }
        const paging = data.paging;
        this.pagingInfo.totalRecord = paging.hasOwnProperty('totalRecord') ? paging.totalRecord : this.pagingInfo.totalRecord;
    }

    protected ajaxSuccessHandler(data: any): void {
        console.log('get data from paging server success!!');
        if (_fromArray(this, data.toArray())) {
            this.refresh();
            if (this._dataSourceChanged) {
                this.componentDataHelper.invokeChangeCallback();
            }
        }
        this._dataSourceChanged = false;
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    public filter(callback: (value: any, index: number, array: any[]) => any, thisArg?: any): PageableArray;
    public filter(term: string, fields?: string[] | number[]): PageableArray;
    public filter(term: DataFilterInfo): PageableArray;
    /**
     * @internal
     */
    public filter(term: string | DataFilterInfo | Function, fields?: string[] | number[]): PageableArray {
        let pfi: DataFilterInfo;
        if (term instanceof DataFilterInfo) {
            pfi = term;
        } else if (term instanceof Function) {
            // 这里的fields相当于thisArg，即函数执行的上下文对象
            pfi = new DataFilterInfo(undefined, undefined, serializeFilterFunction(term), fields);
        } else {
            pfi = new DataFilterInfo(term, fields);
        }
        this._filterSubject.next(pfi);
        return this;
    }

    public sort(compareFn?: (a: any, b: any) => number): PageableArray;
    public sort(as: SortAs, order: SortOrder, field: string | number): PageableArray;
    public sort(sort: DataSortInfo): PageableArray;
    /**
     * @internal
     */
    public sort(as, order?: SortOrder, field?: string | number): PageableArray {
        if (as instanceof Function) {
            throw 'compare function is NOT accepted by this class!';
        }
        const psi = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
        this._sortSubject.next(psi);
        return this;
    }

    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
    /**
     * @internal
     */
    public changePage(currentPage, pageSize?: number): void {
        pageSize = isNaN(+pageSize) ? this.pagingInfo.pageSize : pageSize;
        const pi: PagingInfo = currentPage instanceof PagingInfo ? currentPage : new PagingInfo(currentPage, +pageSize);
        let needRefresh: boolean = false;

        if (pi.currentPage >= 1 && pi.currentPage <= this.pagingInfo.totalPage) {
            this.pagingInfo.currentPage = pi.currentPage;
            needRefresh = true;
        } else {
            console.error(`invalid currentPage[${pi.currentPage}], it should be between in [1, ${this.pagingInfo.totalPage}]`);
        }
        if (pi.pageSize > 0) {
            this.pagingInfo.pageSize = pi.pageSize;
            needRefresh = true;
        } else {
            console.error(`invalid pageSize[${pi.pageSize}], it should be greater than 0`);
        }
        if (needRefresh) {
            this._ajax();
        }
    }

    public firstPage(): void {
        this.changePage(1);
    }

    public previousPage(): void {
        this.changePage(this.pagingInfo.currentPage - 1);
    }

    public nextPage(): void {
        this.changePage(this.pagingInfo.currentPage + 1);
    }

    public lastPage(): void {
        this.changePage(this.pagingInfo.pageSize);
    }

    public destroy(): void {
        super.destroy();

        this.http = null;
        this.sourceRequestOptions = null;
        this.pagingInfo && this.pagingInfo.unsubscribe();
        this.pagingInfo = null;
        this.filterInfo = null;
        this.sortInfo = null;
        this._filterSubject && this._filterSubject.unsubscribe();
        this._filterSubject = null;
        this._sortSubject && this._sortSubject.unsubscribe();
        this._sortSubject = null;
    }
}

/**
 * 如果你没有统一的服务端分页、过滤、排序服务，则需要使用这个数据对象，并且请求的提供数据的服务需要自行处理分页、过滤、排序等。
 *
 * Jigsaw暂未实现此功能，如有需要，请给我们[提issue](https://github.com/rdkmaster/jigsaw/issues/new)。
 *
 * 关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
 */
export class DirectPageableArray extends PageableArray {
    protected _ajax(): void {
        if (this._busy) {
            this.ajaxErrorHandler(null);
            return;
        }
        const options = HttpClientOptions.prepare(this.sourceRequestOptions);
        if (!options) {
            console.error('invalid source request options, use updateDataSource() to reset the option.');
            return;
        }

        this._busy = true;
        this.ajaxStartHandler();

        this.http.request(options.method, options.url, options)
            .pipe(
                map(res => this.reviseData(res)),
                map(data => {
                    this._updatePagingInfo(data);

                    const tableData: TableData = new TableData();
                    if (TableData.isTableData(data)) {
                        tableData.fromObject(data);
                    } else {
                        console.error('invalid data format, need a TableData object.');
                    }
                    return tableData;
                }))
            .subscribe(
                tableData => this.ajaxSuccessHandler(tableData),
                error => this.ajaxErrorHandler(error),
                () => this.ajaxCompleteHandler()
            );
    }
}

/**
 * 在本地分页、排序、过滤的数组。
 *
 * 关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
 */
export class LocalPageableArray<T> extends ArrayCollection<T> implements IPageable {
    public pagingInfo: PagingInfo;

    private _bakData: T[] = [];

    private _filterSubject = new Subject<DataFilterInfo>();
    private _sortSubject = new Subject<DataSortInfo>();

    private _filteredData: T[];

    public get filteredData(): T[] {
        return this._filteredData;
    }

    public set filteredData(value: T[]) {
        this._filteredData = value;
        if (this._filteredData instanceof Array || (this._filteredData as any) instanceof ArrayCollection) {
            this.pagingInfo.totalRecord = this._filteredData.length;
        }
    }

    private _dataSourceChanged: boolean = false;

    constructor(source?: T[]) {
        super(source);
        this._bakData = source;
        this.pagingInfo = new PagingInfo();
        this.pagingInfo.subscribe(() => {
            if (!this.filteredData) {
                return;
            }
            this._setDataByPageInfo();
            this.refresh();
            if (this._dataSourceChanged) {
                this.componentDataHelper.invokeChangeCallback();
                this._dataSourceChanged = false;
            }
        });
        this._initSubjects();
    }

    public fromArray(source: T[]): ArrayCollection<T> {
        this._bakData = source;
        this.filteredData = source;
        this.firstPage();
        this._dataSourceChanged = true;
        return this;
    }

    /**
     * @internal
     * @param item
     * @param keyword
     * @param fields
     *
     */
    public static filterItemByKeyword(item: any, keyword: string, fields: any[]): boolean {
        if (typeof item == 'string') {
            return item.toLowerCase().includes(keyword.toLowerCase())
        } else if (fields) {
            return fields.find(field => {
                const value: string = !item || item[field] === undefined || item[field] === null ? '' : item[field].toString();
                return value.toLowerCase().includes(keyword.toLowerCase())
            })
        } else {
            return false
        }
    }

    private _initSubjects(): void {
        this._filterSubject.pipe(debounceTime(300)).subscribe(filter => {
            this.filteredData = this._bakData.filter(item => LocalPageableArray.filterItemByKeyword(item, filter.key, filter.field));
            this.firstPage();
        });

        this._sortSubject.pipe(debounceTime(300)).subscribe((sortInfo: DataSortInfo) => {
            const orderFlag = sortInfo.order == SortOrder.asc ? 1 : -1;
            if (sortInfo.as == SortAs.number) {
                this.filteredData.sort((a, b) => orderFlag * (Number(sortInfo.field ? a[sortInfo.field] : a) - Number(sortInfo.field ? b[sortInfo.field] : b)));
            } else {
                this.filteredData.sort((a, b) => orderFlag * String(sortInfo.field ? a[sortInfo.field] : a).localeCompare(String(sortInfo.field ? b[sortInfo.field] : b)));
            }
            this.firstPage();
        })
    }

    public filter(callback: (value: any, index: number, array: any[]) => any, context?: any): LocalPageableArray<T>;
    public filter(term: string, fields?: string[] | number[]): LocalPageableArray<T>;
    public filter(term: DataFilterInfo): LocalPageableArray<T>;
    /**
     * @internal
     */
    public filter(term, fields?: string[] | number[]): LocalPageableArray<T> {
        if (!this._bakData) {
            return this;
        }
        if (term instanceof Function) {
            this.filteredData = this._bakData.filter(term.bind(fields));
            this.firstPage();
        } else {
            const pfi = term instanceof DataFilterInfo ? term : new DataFilterInfo(term, fields);
            this._filterSubject.next(pfi);
        }
        return this;
    }

    public sort(compareFn?: (a: any, b: any) => number): LocalPageableArray<T>;
    public sort(as: SortAs, order: SortOrder, field?: string | number): LocalPageableArray<T>;
    public sort(sort: DataSortInfo): LocalPageableArray<T>;
    /**
     * @internal
     */
    public sort(as, order?: SortOrder, field?: string | number): LocalPageableArray<T> {
        if (!this.filteredData) {
            return this;
        }
        if (as instanceof Function) {
            this.filteredData.sort(as);
            this.firstPage();
        }
        const psi = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
        this._sortSubject.next(psi);
        return this;
    }

    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
    /**
     * @internal
     */
    public changePage(currentPage, pageSize?: number): void {
        if (!this.filteredData) {
            return;
        }

        if (!isNaN(pageSize) && +pageSize > 0) {
            this.pagingInfo.pageSize = pageSize;
        }

        let cp: number = 0;
        if (currentPage instanceof PagingInfo) {
            this.pagingInfo.pageSize = currentPage.pageSize;
            cp = currentPage.currentPage;
        } else if (!isNaN(+currentPage)) {
            cp = +currentPage;
        }
        if (cp >= 1 && cp <= this.pagingInfo.totalPage) {
            this.pagingInfo.currentPage = cp;
        } else {
            console.error(`invalid currentPage[${cp}], it should be between in [1, ${this.pagingInfo.totalPage}]`);
        }
    }

    private _setDataByPageInfo() {
        let source: T[];
        if (this.pagingInfo.pageSize == Infinity) {
            source = this.filteredData;
        } else {
            const begin = (this.pagingInfo.currentPage - 1) * this.pagingInfo.pageSize;
            const end = this.pagingInfo.currentPage * this.pagingInfo.pageSize < this.pagingInfo.totalRecord ?
                this.pagingInfo.currentPage * this.pagingInfo.pageSize : this.pagingInfo.totalRecord;
            source = this.filteredData.slice(begin, end);
        }
        if (_fromArray(this, source)) {
            this.refresh();
        }
    }

    protected ajaxErrorHandler(error: Response): void {
        if (!error) {
            super.ajaxErrorHandler(error);
            return;
        }

        console.error('get data from paging server error!! detail: ' + error['message']);
        if (_fromArray(this, [])) {
            this.refresh();
            this.componentDataHelper.invokeChangeCallback();
        }
        this._busy = false;
        this.componentDataHelper.invokeAjaxErrorCallback(error);
    }

    public firstPage(): void {
        this.changePage(1);
    }

    public previousPage(): void {
        this.changePage(this.pagingInfo.currentPage - 1);
    }

    public nextPage(): void {
        this.changePage(this.pagingInfo.currentPage + 1);
    }

    public lastPage(): void {
        this.changePage(this.pagingInfo.totalPage);
    }

    public destroy() {
        super.destroy();
        this._filterSubject && this._filterSubject.unsubscribe();
        this._sortSubject && this._sortSubject.unsubscribe();
        this.pagingInfo && this.pagingInfo.unsubscribe();
        this._bakData = null;
        this.filteredData = null;
        this.pagingInfo = null;
        this._filterSubject = null;
        this._sortSubject = null;
    }
}

export class PageableSelectArray extends ArrayCollection<any> implements IServerSidePageable, ISortable, IFilterable {
    public pagingInfo: PagingInfo;
    public filterInfo: DataFilterInfo;
    public sortInfo: DataSortInfo;

    public pagingServerUrl: string;

    /**
     * 参考`PageableTableData.sourceRequestOptions`的说明
     */
    public sourceRequestOptions: HttpClientOptions;

    private _filterSubject = new Subject<DataFilterInfo>();
    private _sortSubject = new Subject<DataSortInfo>();
    private _dataSourceChanged: boolean = false;

    constructor(public http: HttpClient, requestOptionsOrUrl: HttpClientOptions | string) {
        super();

        if (!http) {
            throw new Error('invalid http!');
        }

        this.pagingInfo = new PagingInfo();
        this.pagingInfo.subscribe(() => {
            this._ajax();
        });
        this.sourceRequestOptions = typeof requestOptionsOrUrl === 'string' ? {url: requestOptionsOrUrl} : requestOptionsOrUrl;

        this._initSubjects();
    }

    private _initSubjects(): void {
        this._filterSubject.pipe(debounceTime(300)).subscribe(filter => {
            this.filterInfo = filter;
            this._ajax();
        });
        this._sortSubject.pipe(debounceTime(300)).subscribe(sort => {
            this.sortInfo = sort;
            this._ajax();
        });
    }

    public updateDataSource(options: HttpClientOptions): void
    public updateDataSource(url: string): void;
    /**
     * @internal
     */
    public updateDataSource(optionsOrUrl: HttpClientOptions | string): void {
        this.sourceRequestOptions = typeof optionsOrUrl === 'string' ? {url: optionsOrUrl} : optionsOrUrl;
        this.pagingInfo.currentPage = 1;
        this.pagingInfo.totalRecord = 0;
        this.filterInfo = null;
        this.sortInfo = null;
        this._dataSourceChanged = true;
    }

    public fromAjax(url?: string): void;
    public fromAjax(options?: HttpClientOptions): void;
    /**
     * @internal
     */
    public fromAjax(optionsOrUrl?: HttpClientOptions | string): void {
        if (optionsOrUrl instanceof HttpClientOptions) {
            this.updateDataSource(<HttpClientOptions>optionsOrUrl);
        } else if (!!optionsOrUrl) {
            this.updateDataSource(<string>optionsOrUrl);
        } else {
            this._dataSourceChanged = true;
        }
        this._ajax();
    }

    private _fixAjaxOptionsByMethod = fixAjaxOptionsByMethod.bind(this);

    protected _ajax(): void {
        if (this._busy) {
            this.ajaxErrorHandler(null);
            return;
        }
        const options = HttpClientOptions.prepare(this.sourceRequestOptions);
        if (!options) {
            console.error('invalid source request options, use updateDataSource() to reset the option.');
            return;
        }

        this._busy = true;
        this.ajaxStartHandler();

        this._fixAjaxOptionsByMethod(options);

        const pagingService = this.pagingServerUrl || PagingInfo.pagingServerUrl;

        this.http.request(options.method, pagingService, options)
            .pipe(
                map(res => this.reviseData(res)),
                map(data => {
                    this._updatePagingInfo(data);

                    const tableData: TableData = new TableData();
                    if (TableData.isTableData(data)) {
                        tableData.fromObject(data);
                    } else {
                        console.error('invalid data format, need a TableData object.');
                    }
                    return tableData;
                }))
            .subscribe(
                tableData => this.ajaxSuccessHandler(tableData),
                error => this.ajaxErrorHandler(error),
                () => this.ajaxCompleteHandler()
            );
    }

    protected _updatePagingInfo(data: any): void {
        if (!data.hasOwnProperty('paging')) {
            return;
        }
        const paging = data.paging;
        this.pagingInfo.totalRecord = paging.hasOwnProperty('totalRecord') ? paging.totalRecord : this.pagingInfo.totalRecord;
    }

    protected ajaxSuccessHandler(data: any): void {
        console.log('get data from paging server success!!');
        if (_fromArray(this, data.toArray())) {
            this.refresh();
            if (this._dataSourceChanged) {
                this.componentDataHelper.invokeChangeCallback();
            }
        }
        this._dataSourceChanged = false;
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    public filter(callback: (value: any, index: number, array: any[]) => any, thisArg?: any): PageableSelectArray;
    public filter(term: string, fields?: string[] | number[]): PageableSelectArray;
    public filter(term: DataFilterInfo): PageableSelectArray;
    /**
     * @internal
     */
    public filter(term: string | DataFilterInfo | Function, fields?: string[] | number[]): PageableSelectArray {
        let pfi: DataFilterInfo;
        if (term instanceof DataFilterInfo) {
            pfi = term;
        } else if (term instanceof Function) {
            // 这里的fields相当于thisArg，即函数执行的上下文对象
            pfi = new DataFilterInfo(undefined, undefined, serializeFilterFunction(term), fields);
        } else {
            pfi = new DataFilterInfo(term, fields);
        }
        this._filterSubject.next(pfi);
        return this;
    }

    public sort(compareFn?: (a: any, b: any) => number): PageableSelectArray;
    public sort(as: SortAs, order: SortOrder, field: string | number): PageableSelectArray;
    public sort(sort: DataSortInfo): PageableSelectArray;
    /**
     * @internal
     */
    public sort(as, order?: SortOrder, field?: string | number): PageableSelectArray {
        if (as instanceof Function) {
            throw 'compare function is NOT accepted by this class!';
        }
        const psi = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
        this._sortSubject.next(psi);
        return this;
    }

    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
    /**
     * @internal
     */
    public changePage(currentPage, pageSize?: number): void {
        pageSize = isNaN(+pageSize) ? this.pagingInfo.pageSize : pageSize;
        const pi: PagingInfo = currentPage instanceof PagingInfo ? currentPage : new PagingInfo(currentPage, +pageSize);
        let needRefresh: boolean = false;

        if (pi.currentPage >= 1 && pi.currentPage <= this.pagingInfo.totalPage) {
            this.pagingInfo.currentPage = pi.currentPage;
            needRefresh = true;
        } else {
            console.error(`invalid currentPage[${pi.currentPage}], it should be between in [1, ${this.pagingInfo.totalPage}]`);
        }
        if (pi.pageSize > 0) {
            this.pagingInfo.pageSize = pi.pageSize;
            needRefresh = true;
        } else {
            console.error(`invalid pageSize[${pi.pageSize}], it should be greater than 0`);
        }
        if (needRefresh) {
            this._ajax();
        }
    }

    public firstPage(): void {
        this.changePage(1);
    }

    public previousPage(): void {
        this.changePage(this.pagingInfo.currentPage - 1);
    }

    public nextPage(): void {
        this.changePage(this.pagingInfo.currentPage + 1);
    }

    public lastPage(): void {
        this.changePage(this.pagingInfo.pageSize);
    }

    public destroy(): void {
        super.destroy();

        this.http = null;
        this.sourceRequestOptions = null;
        this.pagingInfo && this.pagingInfo.unsubscribe();
        this.pagingInfo = null;
        this.filterInfo = null;
        this.sortInfo = null;
        this._filterSubject && this._filterSubject.unsubscribe();
        this._filterSubject = null;
        this._sortSubject && this._sortSubject.unsubscribe();
        this._sortSubject = null;
    }
}