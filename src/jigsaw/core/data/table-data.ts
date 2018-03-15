import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/debounceTime';

import {AbstractGeneralCollection} from "./general-collection";
import {
    DataFilterInfo,
    DataSortInfo, HttpClientOptions, ViewportData,
    IFilterable,
    IPageable,
    IServerSidePageable, ISlicedData,
    ISortable,
    PagingInfo,
    SortAs,
    SortOrder
} from "./component-data";
import {CommonUtils} from "../utils/common-utils";

export type TableMatrixRow = any[];
export type TableDataHeader = string[];
export type TableDataField = string[];
export type TableDataMatrix = TableMatrixRow[];
export type RawTableData = {
    field: TableDataField,
    header: TableDataHeader,
    data: TableDataMatrix,
    [property: string]: any
};

export class TableDataBase extends AbstractGeneralCollection<any> {
    public static isTableData(data: any): boolean {
        return data && data.hasOwnProperty('data') && data.data instanceof Array &&
            data.hasOwnProperty('header') && data.header instanceof Array &&
            data.hasOwnProperty('field') && data.field instanceof Array;
    }

    constructor(public data: TableDataMatrix = [],
                public field: TableDataField = [],
                public header: TableDataHeader = []) {
        super();
    }

    protected isDataValid(data): boolean {
        return TableDataBase.isTableData(data);
    }

    protected ajaxSuccessHandler(data): void {
        if (this.isDataValid(data)) {
            this.fromObject(data);
        } else {
            console.log('invalid raw TableData received from server...');
            this.clear();
            this.refresh();
        }
        this._busy = false;
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    public fromObject(data: any): TableDataBase {
        if (!this.isDataValid(data)) {
            throw new Error('invalid raw TableData object!');
        }

        this.clear();

        TableDataBase.arrayAppend(this.data, data.data);
        TableDataBase.arrayAppend(this.field, data.field);
        TableDataBase.arrayAppend(this.header, data.header);

        this.refresh();

        return this;
    }

    protected static arrayAppend(dest: any[], source: any): void {
        if (!source) {
            return;
        }
        if (source instanceof Array) {
            source.forEach(item => dest.push(item));
        } else {
            dest.push(source);

        }
    }

    public toArray(): any[] {
        const result: any[] = [];
        if (!this.data || !this.field) {
            return result;
        }

        this.data.forEach(row => {
            let item = {};
            this.field.forEach((field, index) => item[field] = row[index]);
            result.push(item);
        });
        return result;
    }

    public clear(): void {
        this.data.splice(0, this.data.length);
        this.header.splice(0, this.header.length);
        this.field.splice(0, this.field.length);
    }

    public destroy(): void {
        super.destroy();
        this.clear();
        console.log('destroying TableDataBase....');
    }

    public insertColumn(column: number, data: any | any[], field: string, header: string): void {
        column = isNaN(column) ? this.data.length : column;
        this.data.forEach((row, index) => row.splice(column, 0, data instanceof Array ? data[index] : data));
        this.field.splice(column, 0, field);
        this.header.splice(column, 0, header);
    }

    public removeColumn(column: number): TableData {
        if (isNaN(column) || column < 0 || column >= this.field.length) {
            return new TableData();
        }
        const matrix = [];
        this.data.forEach(row => matrix.push(row.splice(column, 1)));
        const field = this.field.splice(column, 1);
        const header = this.header.splice(column, 1);
        return new TableData(matrix, field, header);
    }
}

/**
 * 这是最基础的表格数据对象，只具备最基本的表格数据展示能力，无法分页,实际使用的场景并不多。
 *
 * 相关的表格数据对象：
 * - {@link PageableTableData} 适用于需要在服务端进行分页、过滤、排序的场景，这是最常用的一个数据对象；
 * - {@link LocalPageableTableData} 适用于需要在浏览器本地进行分页、过滤、排序的场景，受限于数据量，不是很常用；
 * - {@link BigTableData} 适用于海量数据的展示场景，它可以做到在常数时间内展示**任意量级**的数据。
 */
export class TableData extends TableDataBase implements ISortable, IFilterable {
    /**
     * 将如下结构的json对象转为{@link TableData}对象：
     *
     * ```
     * { data: [], field: [], header: [], ... }
     * ```
     *
     * 注意：源对象的 `data` / `field` / `header` 属性会被**浅拷贝**到目标{@link TableData}对象中。
     *
     * 这是一个静态方法。
     *
     * @param rawData 结构为 `{ data: [], field: [], header: [] }` 的json对象
     * @returns {TableData}
     */
    public static of(rawData: any): TableData {
        return TableData.isTableData(rawData) ? new TableData(rawData.data, rawData.field, rawData.header) : new TableData();
    }

    /**
     * 将一个`{ data: [], field: [], header: []}`对象转为一个json对象数组。
     *
     * 虽然`{ data: [], field: [], header: []}`这样的数据结构有很多好处，比如利于网络传输，利于表格展示，在占用更小的内存等，
     * 但是由于这不是一个典型的json对象结构，因此如果需要将它使用到表格以外的场合，则会产生一些麻烦。你可以通过这个方法将它转换为一个典型的json对象。
     *
     * 原始原始数据：
     *
     * ```
     * {
     *     data: [
     *         [11, 12, 13],
     *         [21, 22, 23],
     *         [31, 32, 33]
     *     ],
     *     field: ['field1', 'field2', 'field3'],
     *     header: ['header1', 'header2', 'header3']
     * }
     * ```
     *
     * 将被转换为：
     *
     * ```
     * [
     *     {field1: 11, field2: 12, field3: 13},
     *     {field1: 21, field2: 22, field3: 23},
     *     {field1: 31, field2: 32, field3: 33},
     * ]
     * ```
     *
     * 这是一个静态方法。
     *
     * @param rawData
     * @returns {any[]}
     */
    public static toArray(rawData: any): any[] {
        return TableData.of(rawData).toArray();
    }

    public sortInfo: DataSortInfo;

    public sort(compareFn?: (a: any[], b: any[]) => number): void;
    public sort(as: SortAs, order: SortOrder, field: string | number): void;
    public sort(sort: DataSortInfo): void;
    public sort(as: SortAs | DataSortInfo | Function, order?: SortOrder, field?: string | number): void {
        this.sortData(this.data, as, order, field);
    }

    protected sortData(data: TableDataMatrix, as: SortAs | DataSortInfo | Function, order?: SortOrder, field?: string | number) {
        field = typeof field === 'string' ? this.field.indexOf(field) : field;
        if (as instanceof Function) {
            // cast to any to peace the compiler.
            data.sort(<any>as);
        } else {
            this.sortInfo = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
            const orderFlag = this.sortInfo.order == SortOrder.asc ? 1 : -1;
            if (this.sortInfo.as == SortAs.number) {
                data.sort((a, b) => orderFlag * (Number(a[field]) - Number(b[field])));
            } else {
                data.sort((a, b) => orderFlag * String(a[field]).localeCompare(String(b[field])));
            }
        }
        this.refresh();
    }

    public filterInfo: DataFilterInfo;

    public filter(compareFn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;
    public filter(term: string, fields?: (string | number)[]): void;
    public filter(term: DataFilterInfo): void;
    public filter(term, fields?: (string | number)[]): void {
        throw new Error("Method not implemented.");
    }

    public destroy() {
        this.sortInfo = null;
        this.filterInfo = null;
    }
}

/**
 * 这是实际使用时做常用的表格数据对象，它具备服务端分页、服务端排序、服务端过滤能力。
 * 详细用法请参考[这个demo](/components/table/demo#pageable)。
 *
 * 注意：需要有一个统一的具备服务端分页、服务端排序、服务端过滤能力的REST服务配合使用，
 * 更多信息请参考[PagingInfo.pagingServerUrl]{@link PagingInfo#pagingServerUrl}
 *
 * 相关的表格数据对象：
 * - {@link PageableTableData} 适用于需要在服务端进行分页、过滤、排序的场景，这是最常用的一个数据对象；
 * - {@link LocalPageableTableData} 适用于需要在浏览器本地进行分页、过滤、排序的场景，受限于数据量，不是很常用；
 * - {@link BigTableData} 适用于海量数据的展示场景，它可以做到在常数时间内展示**任意量级**的数据。
 */
export class PageableTableData extends TableData implements IServerSidePageable, IFilterable, ISortable {
    /**
     * 当前数据对象的查询参数，注意这个参数在进行分页、排序、过滤的时候，都会带给服务端。
     * 提示：可将这个对象对应属性通过双向绑定的方式提供给查询条件的视图，这样在视图上数据更新了后，这里的值就可立即得到更新，例如：
     *
     * ```
     * <j-input [(value)]="tableData?.sourceRequestOptions?.params?.value">
     * </j-input>
     * ```
     *
     * 或者在需要获取数据之前，一次性通过{@link updateDataSource}来更新这个对象。
     */
    public sourceRequestOptions: HttpClientOptions;
    public pagingInfo: PagingInfo;

    private _filterSubject = new Subject<DataFilterInfo>();
    private _sortSubject = new Subject<DataSortInfo>();
    private _ajaxSubject = new Subject();
    private _requestOptions: HttpClientOptions;

    constructor(public http: HttpClient, requestOptionsOrUrl: HttpClientOptions | string) {
        super();

        if (!http) {
            throw new Error('invalid http!');
        }
        this.pagingInfo = new PagingInfo();
        this.sourceRequestOptions = typeof requestOptionsOrUrl === 'string' ? {url: requestOptionsOrUrl} : requestOptionsOrUrl;

        this._initRequestOptions();
        this._initSubjects();
    }

    private _initRequestOptions(): void {
        if (!this.sourceRequestOptions || !this.sourceRequestOptions.url) {
            throw new Error('invalid data source request options or invalid url!');
        }
        this._requestOptions = HttpClientOptions.prepare(this.sourceRequestOptions);

        const paramKey = this._requestOptions.method.toLowerCase() == 'post' ? 'body' : 'params';

        const originParams = this.sourceRequestOptions[paramKey];
        const peerParams = CommonUtils.isDefined(originParams) ? CommonUtils.shallowCopy(originParams) : {};
        this._requestOptions[paramKey] = {};
        this._requestOptions[paramKey].peerParam = JSON.stringify(peerParams);
        this._requestOptions[paramKey].service = this.sourceRequestOptions.url;
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
        this._ajaxSubject.debounceTime(300).subscribe(() => {
            this._ajax();
        })
    }

    /**
     * 在使用此方法之前，请先阅读一下{@link sourceRequestOptions}的说明，你需要先了解它的作用之后，
     * 才能够知道如何恰当的使用这个方法来更新{@link sourceRequestOptions}。
     *
     * 这个方法除了更新{@link sourceRequestOptions}以外，还会自动重置{@link pagingInfo}的各个参数，
     * 清空{@link filterInfo}和{@link sortInfo}。
     *
     * @param {HttpClientOptions | string} optionsOrUrl
     */
    public updateDataSource(optionsOrUrl: HttpClientOptions | string): void {
        this.sourceRequestOptions = typeof optionsOrUrl === 'string' ? {url: optionsOrUrl} : optionsOrUrl;
        this.pagingInfo.currentPage = 1;
        this.pagingInfo.totalPage = 1;
        this.pagingInfo.totalRecord = 0;
        this.filterInfo = null;
        this.sortInfo = null;
        this._initRequestOptions();
    }

    /**
     * 请参考[IAjaxComponentData.fromAjax]{@link IAjaxComponentData#fromAjax}
     * @param {string} url
     */
    public fromAjax(url?: string): void;
    public fromAjax(options?: HttpClientOptions): void;
    public fromAjax(optionsOrUrl?: HttpClientOptions | string): void {
        if (!!optionsOrUrl) {
            this.updateDataSource(optionsOrUrl);
        }
        this._ajaxSubject.next();
    }

    private _ajax(): void {
        if (this._busy) {
            this.ajaxErrorHandler(null);
            return;
        }

        this._busy = true;
        this.ajaxStartHandler();

        const params: any = this._requestOptions.method.toLowerCase() == 'post' ?
            this._requestOptions.body : this._requestOptions.params;
        params.paging = JSON.stringify(this.pagingInfo);
        if (this.filterInfo) {
            params.filter = JSON.stringify(this.filterInfo);
        }
        if (this.sortInfo) {
            params.sort = JSON.stringify(this.sortInfo);
        }

        this.http.request(this._requestOptions.method, PagingInfo.pagingServerUrl, this._requestOptions)
            .map(res => this.reviseData(res))
            .map(data => {
                this._updatePagingInfo(data);

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

    private _updatePagingInfo(data: any): void {
        if (!data.hasOwnProperty('paging')) {
            return;
        }
        const paging = data.paging;
        this.pagingInfo.totalPage = paging.hasOwnProperty('totalPage') ? paging.totalPage : this.pagingInfo.totalPage;
        this.pagingInfo.totalRecord = paging.hasOwnProperty('totalRecord') ? paging.totalRecord : this.pagingInfo.totalRecord;
    }

    public filter(compareFn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;
    public filter(term: string, fields?: string[] | number[]): void;
    public filter(term: DataFilterInfo): void;
    public filter(term, fields?: string[] | number[]): void {
        if (term instanceof Function) {
            throw new Error('compare function is not supported by PageableTableData which filters data in the server side');
        }
        const pfi = term instanceof DataFilterInfo ? term : new DataFilterInfo(term, fields);
        this._filterSubject.next(pfi);
    }

    public sort(compareFn?: (a: any[], b: any[]) => number): void;
    public sort(as: SortAs, order: SortOrder, field: string | number): void;
    public sort(sort: DataSortInfo): void;
    public sort(as, order?: SortOrder, field?: string | number): void {
        if (as instanceof Function) {
            throw new Error('compare function is not supported by PageableTableData which sorts data in the server side');
        }
        const psi = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
        psi.order = SortOrder[psi.order];
        this._sortSubject.next(psi);
    }

    /**
     * 请参考[IPageable.changePage]{@link IPageable#changePage}
     * @param {number} currentPage
     * @param {number} pageSize
     */
    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
    public changePage(): void;
    public changePage(currentPage?, pageSize?: number): void {
        if (CommonUtils.isUndefined(currentPage)) {
            this._ajaxSubject.next();
            return;
        }

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
            this.fromAjax();
        }
    }

    /**
     * 请参考[IPageable.firstPage]{@link IPageable#firstPage}
     */
    public firstPage(): void {
        this.changePage(1);
    }

    /**
     * 请参考[IPageable.previousPage]{@link IPageable#previousPage}
     */
    public previousPage(): void {
        this.changePage(this.pagingInfo.currentPage - 1);
    }

    /**
     * 请参考[IPageable.nextPage]{@link IPageable#nextPage}
     */
    public nextPage(): void {
        this.changePage(this.pagingInfo.currentPage + 1);
    }

    /**
     * 请参考[IPageable.lastPage]{@link IPageable#lastPage}
     */
    public lastPage(): void {
        this.changePage(this.pagingInfo.totalPage);
    }

    /**
     * 请参考[IComponentData.destroy]{@link IComponentData#destroy}
     */
    public destroy(): void {
        super.destroy();

        this.http = null;
        this.sourceRequestOptions = null;
        this.pagingInfo = null;
        this._requestOptions = null;
        this._filterSubject.unsubscribe();
        this._filterSubject = null;
        this._sortSubject.unsubscribe();
        this._sortSubject = null;
        this._ajaxSubject.unsubscribe();
        this._ajaxSubject = null;
    }
}

export class TableViewportData extends ViewportData {
    public maxWidth: number = 0;
    public maxHeight: number = 0;

    constructor(private _bigTableData: BigTableData) {
        super();
    }

    private _rows = 25;

    public set rows(value: number) {
        if (value <= 0 || this._rows == value) {
            return;
        }
        this._rows = value;
        if (this.maxHeight > 0 && this._verticalTo + value > this.maxHeight) {
            this._verticalTo = this.maxHeight - value;
            this._verticalTo = this._verticalTo >= 0 ? this._verticalTo : 0;
        }
        this._sliceData();
    }

    public get rows(): number {
        return this._rows;
    }

    private _columns = 15;

    public set columns(value: number) {
        if (value <= 0 || this._columns == value) {
            return;
        }
        this._columns = value;
        if (this.maxWidth > 0 && this._horizontalTo + value > this.maxWidth) {
            this._horizontalTo = this.maxWidth - value;
            this._horizontalTo = this._horizontalTo >= 0 ? this._horizontalTo : 0;
        }
        this._sliceData();
    }

    public get columns(): number {
        return this._columns;
    }

    private _verticalTo = 0;

    public set verticalTo(value: number) {
        value = value < 0 ? 0 : value;
        if (this._verticalTo == value) {
            return;
        }
        // `vScroll` will update `_fromRow` to a proper value
        this._bigTableData.vScroll(value);
    }

    public get verticalTo(): number {
        return this._verticalTo;
    }

    public setVerticalPositionSilently(value: number) {
        this._verticalTo = value < 0 ? this._verticalTo : value;
    }

    private _horizontalTo = 0;

    public set horizontalTo(value: number) {
        value = value < 0 ? 0 : value;
        if (this._horizontalTo == value) {
            return;
        }
        // `hScroll` will update `_horizontalTo` to a proper value
        this._bigTableData.hScroll(value);
    }

    public get horizontalTo(): number {
        return this._horizontalTo;
    }

    public setHorizontalPositionSilently(value: number) {
        this._horizontalTo = value < 0 ? this._horizontalTo : value;
    }

    private _sliceData() {
        // ts 没有 friend 关键字，只好出此下策了
        this._bigTableData['sliceData']();
    }

    public set width(value: number) {
        this.columns = value;
    }

    public get width(): number {
        return this.columns;
    }

    public set height(value: number) {
        this.rows = value;
    }

    public get height(): number {
        return this.rows;
    }
}

/**
 * 详细用法和相关说明，请参考[这个demo](/components/table/demo#big-table)。
 *
 * 注意：需要有一个统一的具备服务端分页、服务端排序、服务端过滤能力的REST服务配合使用，
 * 更多信息请参考[PagingInfo.pagingServerUrl]{@link PagingInfo#pagingServerUrl}
 *
 * 相关的表格数据对象：
 * - {@link PageableTableData} 适用于需要在服务端进行分页、过滤、排序的场景，这是最常用的一个数据对象；
 * - {@link LocalPageableTableData} 适用于需要在浏览器本地进行分页、过滤、排序的场景，受限于数据量，不是很常用；
 * - {@link BigTableData} 适用于海量数据的展示场景，它可以做到在常数时间内展示**任意量级**的数据。
 */
export class BigTableData extends PageableTableData implements ISlicedData {

    public readonly viewport: TableViewportData = new TableViewportData(this);
    public numCachedPages = 3;
    public fetchDataThreshold = .5;

    protected reallyBusy = false;

    constructor(public http: HttpClient, requestOptionsOrUrl: HttpClientOptions | string) {
        super(http, requestOptionsOrUrl);
        this.pagingInfo.pageSize = 1000;
    }

    private _cache: RawTableData = {field: [], header: [], data: [], startPage: 1, endPage: 1};

    get cache(): RawTableData {
        return this._cache;
    }

    private _isCacheAvailable(): boolean {
        return this._cache && !!this._cache.field.length && !!this._cache.header.length && !!this._cache.data.length;
    }

    protected sliceData(): void {
        if (!this._isCacheAvailable()) {
            return;
        }

        const toColumn = this.viewport.columns + this.viewport.horizontalTo;
        this.field = this._cache.field.slice(this.viewport.horizontalTo, toColumn);
        this.header = this._cache.header.slice(this.viewport.horizontalTo, toColumn);

        const toRow = this.viewport.rows + this.viewport.verticalTo;
        const data = this._cache.data.slice(this.viewport.verticalTo, toRow);
        this.data = data.map(item => item.slice(this.viewport.horizontalTo, toColumn));

        this.refresh();
    }

    public scroll(verticalTo: number, horizontalTo: number = NaN): void {
        if (!this._isCacheAvailable()) {
            return;
        }

        //从html模板中传过来的，仍然有可能是一个字符串，这也算是ts的一个坑了
        verticalTo = parseInt(verticalTo + "");
        verticalTo = isNaN(verticalTo) ? this.viewport.verticalTo : verticalTo;
        this.checkCache(verticalTo);
        verticalTo = verticalTo + this.viewport.rows > this._cache.data.length ?
            this._cache.data.length - this.viewport.rows : verticalTo;

        horizontalTo = parseInt(horizontalTo + "");
        horizontalTo = isNaN(horizontalTo) ? this.viewport.horizontalTo : horizontalTo;
        horizontalTo = horizontalTo + this.viewport.columns > this._cache.field.length ?
            this._cache.field.length - this.viewport.columns : horizontalTo;

        if (verticalTo != this.viewport.verticalTo || horizontalTo != this.viewport.horizontalTo) {
            this.viewport.setVerticalPositionSilently(verticalTo);
            this.viewport.setHorizontalPositionSilently(horizontalTo);
            this.sliceData();
        }
    }

    public vScroll(scrollTo: number): void {
        this.scroll(scrollTo);
    }

    public hScroll(scrollTo: number): void {
        this.scroll(this.viewport.verticalTo, scrollTo);
    }

    protected checkCache(verticalTo: number): void {
        const pages = this._cache.endPage - this._cache.startPage + 1;
        const threshold = this.fetchDataThreshold > 0 && this.fetchDataThreshold < 1 ? this.fetchDataThreshold : .5;
        if (verticalTo < this.pagingInfo.pageSize * threshold) {
            // fetch last page...
            this.fetchData(this._cache.startPage - 1, verticalTo);
        } else if (verticalTo > pages * this.pagingInfo.pageSize - this.pagingInfo.pageSize * threshold) {
            // fetch next page...
            this.fetchData(this._cache.endPage + 1, verticalTo);
        } else {
            // do not need to fetch any data.
        }
    }

    protected fetchData(targetPage, verticalTo): void {
        if (targetPage < 1 || targetPage > this.pagingInfo.totalPage) {
            return;
        }

        if (this._busy) {
            console.log('the data fetching session is busy now...');
        } else {
            super.changePage(targetPage);
        }

        const requestedPage = Math.ceil((verticalTo + this.viewport.rows) / this.pagingInfo.pageSize);
        // it is really busy if the request page is out of the cached page range.
        this.reallyBusy = this._busy && requestedPage > this._cache.endPage - this._cache.startPage + 1;
        if (this.reallyBusy) {
            console.error('it is really busy now, please wait for a moment...');
        }
    }

    protected ajaxSuccessHandler(rawTableData): void {
        super.ajaxSuccessHandler(rawTableData);

        this.updateCache();
        console.log(`data fetched, startPage=${this._cache.startPage}, endPage=${this._cache.endPage}`);
    }

    protected updateCache(): void {
        this._cache.field = this.field;
        this._cache.header = this.header;

        if (this.pagingInfo.currentPage >= this._cache.endPage) {
            this._cache.data = this._cache.data.concat(this.data);
            this._cache.endPage = this.pagingInfo.currentPage;
        } else if (this.pagingInfo.currentPage <= this._cache.startPage) {
            this._cache.data = this.data.concat(this._cache.data);
            this._cache.startPage = this.pagingInfo.currentPage;
        } else {
            this._printPageError();
            return;
        }

        let numCachedPages;
        if (this.numCachedPages <= 0 || isNaN(this.numCachedPages)) {
            numCachedPages = Infinity;
        } else {
            numCachedPages = this.numCachedPages >= 3 ? this.numCachedPages : 3;
        }

        const pages = this._cache.endPage - this._cache.startPage + 1;
        if (pages > numCachedPages) {
            // the cached data exceeded the configured reserved data, need to clear.
            // because we don't know the scroll direction, we need to calculate the `verticalTo` value
            // to find out which one is closer to the `startPage` or the `endPage`,
            // and truncate from the further point.
            const deltaStart = this.viewport.verticalTo;
            const deltaEnd = pages * this.pagingInfo.pageSize - this.viewport.verticalTo;
            if (deltaStart > deltaEnd) {
                this._cache.startPage++;
                console.log('truncating data from top');
                this.viewport.setVerticalPositionSilently(this.viewport.verticalTo - this.pagingInfo.pageSize);
                this._cache.data.splice(0, this.pagingInfo.pageSize);
            } else {
                this._cache.endPage--;
                this.viewport.setVerticalPositionSilently(this.viewport.verticalTo + this.pagingInfo.pageSize);
                console.log('truncating data from bottom');
                this._cache.data.splice(this.pagingInfo.pageSize * numCachedPages, this.pagingInfo.pageSize);
            }
        }

        this._updateViewPortSize();
        this.sliceData();
    }

    private _printPageError(): void {
        console.error(`unknown error, currentPage=${this.pagingInfo.currentPage}, startPage=${this._cache.startPage}, endPage=${this._cache.endPage}`);
        throw new Error('_printPageError')
    }

    protected ajaxErrorHandler(error): void {
        super.ajaxErrorHandler(error);
        this._cache = {field: [], header: [], data: [], startPage: 1, endPage: 1};
        this._updateViewPortSize();
    }

    private _updateViewPortSize(): void {
        this.viewport.maxWidth = this._cache.field.length;
        this.viewport.maxHeight = this._cache.data.length;
    }

    public get busy(): boolean {
        return this.reallyBusy;
    }

    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
    public changePage(): void;
    public changePage(currentPage?, pageSize?: number): void {
        throw new Error('BigTableData do not support changePage action.');
    }
}


/**
 * 它具备浏览器本地内存中进行分页、服务端排序、服务端过滤能力，受限于浏览器内存的限制，无法操作大量的数据，因此使用场景并不多。
 * 详细用法请参考[这个demo](/components/table/demo#local-paging-data)。
 *
 * 注意：需要有一个统一的具备服务端分页、服务端排序、服务端过滤能力的REST服务配合使用，
 * 更多信息请参考[PagingInfo.pagingServerUrl]{@link PagingInfo#pagingServerUrl}
 *
 * 相关的表格数据对象：
 * - {@link PageableTableData} 适用于需要在服务端进行分页、过滤、排序的场景，这是最常用的一个数据对象；
 * - {@link LocalPageableTableData} 适用于需要在浏览器本地进行分页、过滤、排序的场景，受限于数据量，不是很常用；
 * - {@link BigTableData} 适用于海量数据的展示场景，它可以做到在常数时间内展示**任意量级**的数据。
 */
export class LocalPageableTableData extends TableData implements IPageable, IFilterable, ISortable {
    public pagingInfo: PagingInfo;
    public filteredData: TableDataMatrix;
    public originalData: TableDataMatrix;

    constructor() {
        super();
        this.pagingInfo = new PagingInfo();
    }

    public fromObject(data: any): LocalPageableTableData {
        super.fromObject(data);
        this.originalData = this.data.concat();
        this.filteredData = this.originalData;
        this.firstPage();
        return this;
    }

    public filter(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;
    public filter(term: string, fields?: string[] | number[]): void;
    public filter(term: DataFilterInfo): void;
    public filter(term, fields?: (string | number)[]): void {
        if (term instanceof Function) {
            this.filteredData = this.originalData.filter(term);
        } else {
            let key: string;
            if (term instanceof DataFilterInfo) {
                key = term.key;
                fields = term.field
            } else {
                key = term;
            }
            if (fields && fields.length != 0) {
                let numberFields: number[];
                if (typeof fields[0] === 'string') {
                    numberFields = [];
                    (<string[]>fields).forEach(field => {
                            numberFields.push(this.field.findIndex(item => item == field))
                        }
                    )
                } else {
                    numberFields = <number[]>fields;
                }
                this.filteredData = this.originalData.filter(
                    row => row.filter(
                        (item, index) => numberFields.find(num => num == index)
                    ).filter(
                        item => (item + '').indexOf(key) != -1
                    ).length != 0
                );
            } else {
                this.filteredData = this.originalData.filter(
                    row => row.filter(
                        item => (<string>item).indexOf(key) != -1
                    ).length != 0
                );
            }
        }
        this.firstPage();
    }

    public sort(compareFn?: (a: any, b: any) => number): any;
    public sort(as: SortAs, order: SortOrder, field: string | number): void;
    public sort(sort: DataSortInfo): void;
    public sort(as, order?: SortOrder, field?: string | number): void {
        super.sortData(this.filteredData, as, order, field);
        this.changePage(this.pagingInfo.currentPage, undefined);
    }

    private _updatePagingInfo() {
        this.pagingInfo.totalRecord = this.filteredData.length;
        this.pagingInfo.totalPage = Math.ceil(this.pagingInfo.totalRecord / this.pagingInfo.pageSize);
    }

    /**
     * 请参考[IPageable.changePage]{@link IPageable#changePage}
     * @param {number} currentPage
     * @param {number} pageSize
     */
    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
    public changePage(): void;
    public changePage(currentPage?, pageSize?: number): void {
        if (!this.filteredData) {
            return;
        }

        if (CommonUtils.isUndefined(currentPage)) {
            this._setDataByPageInfo();
            this.refresh();
            return;
        }

        const pi: PagingInfo = currentPage instanceof PagingInfo ? currentPage : new PagingInfo(currentPage, pageSize ? +pageSize : this.pagingInfo.pageSize);
        if (pi.pageSize <= 0) {
            console.error(`invalid pageSize[${pi.pageSize}], it should be greater than 0`);
            return;
        }
        this.pagingInfo.pageSize = pi.pageSize;
        this._updatePagingInfo();

        if (pi.currentPage >= 1 && pi.currentPage <= this.pagingInfo.totalPage) {
            this.pagingInfo.currentPage = pi.currentPage;
            this._setDataByPageInfo();
        } else {
            this.data.length = 0;
        }
        this.refresh();
    }

    private _setDataByPageInfo() {
        const begin = (this.pagingInfo.currentPage - 1) * this.pagingInfo.pageSize;
        const end = this.pagingInfo.currentPage * this.pagingInfo.pageSize < this.pagingInfo.totalRecord ? this.pagingInfo.currentPage * this.pagingInfo.pageSize : this.pagingInfo.totalRecord;
        this.data = this.filteredData.slice(begin, end);
    }

    /**
     * 请参考[IPageable.firstPage]{@link IPageable#firstPage}
     */
    public firstPage(): void {
        this.changePage(1);
    }

    /**
     * 请参考[IPageable.previousPage]{@link IPageable#previousPage}
     */
    public previousPage(): void {
        this.changePage(this.pagingInfo.currentPage - 1);
    }

    /**
     * 请参考[IPageable.nextPage]{@link IPageable#nextPage}
     */
    public nextPage(): void {
        this.changePage(this.pagingInfo.currentPage + 1);
    }

    /**
     * 请参考[IPageable.lastPage]{@link IPageable#lastPage}
     */
    public lastPage(): void {
        this.changePage(this.pagingInfo.totalPage);
    }

    /**
     * 请参考[IComponentData.destroy]{@link IComponentData#destroy}
     */
    public destroy(): void {
        super.destroy();
        this.pagingInfo = null;
        this.sortInfo = null;
        this.filteredData = null;
        this.originalData = null;
    }
}
