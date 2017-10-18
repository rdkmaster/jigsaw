import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/debounceTime';

import {AbstractGeneralCollection} from "./general-collection";
import {
    DataFilterInfo,
    DataSortInfo, HttpClientOptions, IDataViewPort,
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
            this.field.forEach((field, index) => {
                item[field] = row[index];
            });
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

export class TableData extends TableDataBase implements ISortable, IFilterable {
    public static of(rawData: any): TableData {
        return TableData.isTableData(rawData) ? new TableData(rawData.data, rawData.field, rawData.header) : new TableData();
    }

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

export class PageableTableData extends TableData implements IServerSidePageable, IFilterable, ISortable {
    public pagingInfo: PagingInfo;
    public sourceRequestOptions: HttpClientOptions;

    private _filterSubject = new Subject<DataFilterInfo>();
    private _sortSubject = new Subject<DataSortInfo>();
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

        const originParams = this.sourceRequestOptions.params;
        const peerParams = CommonUtils.isDefined(originParams) ? CommonUtils.shallowCopy(originParams) : {};
        this._requestOptions.params = {};
        this._requestOptions.params.peerParam = JSON.stringify(peerParams);
        this._requestOptions.params.service = this.sourceRequestOptions.url;
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

    public updateDataSource(optionsOrUrl: HttpClientOptions | string): void {
        this.sourceRequestOptions = typeof optionsOrUrl === 'string' ? {url: optionsOrUrl} : optionsOrUrl;
        this.pagingInfo.currentPage = 1;
        this.pagingInfo.totalPage = 1;
        this.pagingInfo.totalRecord = 0;
        this.filterInfo = null;
        this.sortInfo = null;
        this._initRequestOptions();
    }

    public fromAjax(url?: string): void;
    public fromAjax(options?: HttpClientOptions): void;
    public fromAjax(optionsOrUrl?: HttpClientOptions | string): void {
        if (!!optionsOrUrl) {
            this.updateDataSource(optionsOrUrl);
        }
        this._ajax();
    }

    private _ajax(): void {
        if (this._busy) {
            this.ajaxErrorHandler(null);
            return;
        }

        this._busy = true;
        this.ajaxStartHandler();

        const params: any = this._requestOptions.params;
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
        this._sortSubject.next(psi);
    }

    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
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
            this.fromAjax();
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

    public fromObject(data: any): TableDataBase {
        throw new Error('not supported yet!');
    }

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
    }
}

export class TableDataViewPort implements IDataViewPort {
    public maxWidth: number = 0;
    public maxHeight: number = 0;

    constructor(private _bigTableData: BigTableData) {
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
        if (value < 0 || this._verticalTo == value) {
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
        if (value < 0 || this._horizontalTo == value) {
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
        this.rows = value;
    }

    public get width(): number {
        return this.rows;
    }

    public set height(value: number) {
        this.columns = value;
    }

    public get height(): number {
        return this.columns;
    }
}

export class BigTableData extends PageableTableData implements ISlicedData {

    public readonly viewPort: TableDataViewPort = new TableDataViewPort(this);
    public reservedPages = 3;
    public fetchDataThreshold = .5;

    protected ongoingPage = -1;
    protected reallyBusy = false;

    constructor(public http: HttpClient, requestOptionsOrUrl: HttpClientOptions | string) {
        super(http, requestOptionsOrUrl);
        this.pagingInfo.pageSize = 500;
    }

    private _cache: RawTableData = {field: [], header: [], data: [], startIndex: 1, endIndex: 1};

    get cache(): RawTableData {
        return this._cache;
    }

    // private _takeSnapshot(): void {
    //     if (this._cache) {
    //         return;
    //     }
    //     this._cache = {
    //         field: this.field, header: this.header, data: this.data
    //     };
    //     this._updateViewPortSize();
    // }

    private _updateViewPortSize(): void {
        this.viewPort.maxWidth = this._cache.field.length;
        this.viewPort.maxHeight = this._cache.data.length;
    }

    private _isCacheAvailable():boolean {
        return this._cache && !!this._cache.field.length && !!this._cache.header.length && !!this._cache.data.length;
    }

    protected sliceData(): void {
        // this._takeSnapshot();
        if (!this._isCacheAvailable()) {
            return;
        }

        const toColumn = this.viewPort.columns + this.viewPort.horizontalTo;
        this.field = this._cache.field.slice(this.viewPort.horizontalTo, toColumn);
        this.header = this._cache.header.slice(this.viewPort.horizontalTo, toColumn);

        const toRow = this.viewPort.rows + this.viewPort.verticalTo;
        const data = this._cache.data.slice(this.viewPort.verticalTo, toRow);
        this.data = data.map(item => item.slice(this.viewPort.horizontalTo, toColumn));

        this.refresh();
    }

    public scroll(verticalTo: number, horizontalTo: number = NaN): void {
        // this._takeSnapshot();
        if (!this._isCacheAvailable()) {
            return;
        }

        verticalTo = isNaN(verticalTo) ? this.viewPort.verticalTo : verticalTo;
        verticalTo = verticalTo + this.viewPort.rows > this._cache.data.length ?
            this._cache.data.length - this.viewPort.rows : verticalTo;

        horizontalTo = isNaN(horizontalTo) ? this.viewPort.horizontalTo : horizontalTo;
        horizontalTo = horizontalTo + this.viewPort.columns > this._cache.field.length ?
            this._cache.field.length - this.viewPort.columns : horizontalTo;

        if (verticalTo != this.viewPort.verticalTo || horizontalTo != this.viewPort.horizontalTo) {
            this.viewPort.setVerticalPositionSilently(verticalTo);
            this.viewPort.setHorizontalPositionSilently(horizontalTo);
            this.sliceData();
        }
    }

    public vScroll(scrollTo: number): void {
        this.scroll(scrollTo);
    }

    public hScroll(scrollTo: number): void {
        this.scroll(this.viewPort.verticalTo, scrollTo);
    }

    protected checkDataStorage(verticalTo: number): void {
        const reservedPages = this.reservedPages >= 1 ? this.reservedPages : 2;
        const threshold = this.fetchDataThreshold > 0 && this.fetchDataThreshold < 1 ? this.fetchDataThreshold : .5;
        const delta = this.pagingInfo.pageSize * reservedPages * threshold;
        if (this.viewPort.verticalTo < delta && this.pagingInfo.currentPage > 0) {
            // fetch last page...
        } else if (this._cache.data.length - this.viewPort.verticalTo < delta
            && this.pagingInfo.currentPage < this.pagingInfo.totalPage) {
            // fetch next page...
        } else {
            console.error('internal error: this message should not be printed');
        }
    }

    protected fetchData(targetPage): void {
        if (this._busy) {
            // it's really busy if the last fetching job has not been finished.
            this.reallyBusy = targetPage !== this.ongoingPage;
            return;
        }
    }

    protected ajaxSuccessHandler(rawTableData): void {
        super.ajaxSuccessHandler(rawTableData);

        this._cache.field = this.field;
        this._cache.header = this.header;
        this._cache.data.concat(this.data);
        this._cache.endIndex = this.pagingInfo.currentPage;

        let reservedPages;
        if (this.reservedPages <= 0 || isNaN(this.reservedPages)) {
            reservedPages = Infinity;
        } else {
            reservedPages = this.reservedPages >= 3 ? this.reservedPages : 3;
        }

        if (this._cache.endIndex - this._cache.startIndex >= reservedPages) {
            this._cache.startIndex = this._cache.endIndex - reservedPages + 1;
            const deleteCount = this._cache.data.length - this.pagingInfo.pageSize * reservedPages;
            this.viewPort.verticalTo -= deleteCount;
            this._cache.data.splice(0, deleteCount);
        }

        this._updateViewPortSize();
        this.sliceData();
    }

    protected ajaxErrorHandler(error): void {
        super.ajaxErrorHandler(error);
        this._cache = {field: [], header: [], data: [], startIndex: 1, endIndex: 1};
        this._updateViewPortSize();
    }

    public get busy(): boolean {
        return this.reallyBusy;
    }
}

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

    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
    public changePage(currentPage, pageSize?: number): void {
        if (!this.filteredData) {
            return;
        }

        const pi: PagingInfo = currentPage instanceof PagingInfo ? currentPage : new PagingInfo(currentPage, pageSize ? +pageSize : this.pagingInfo.pageSize);
        if (pi.pageSize <= 0) {
            console.error(`invalid pageSize[${pi.pageSize}], it should be greater than 0`);
            return;
        }
        this.pagingInfo.pageSize = pi.pageSize;
        // this.pagingInfo.totalPage = Math.ceil(this.pagingInfo.totalRecord / this.pagingInfo.pageSize);
        this._updatePagingInfo();

        if (pi.currentPage >= 1 && pi.currentPage <= this.pagingInfo.totalPage) {
            this.pagingInfo.currentPage = pi.currentPage;
            const begin = (this.pagingInfo.currentPage - 1) * this.pagingInfo.pageSize;
            const end = this.pagingInfo.currentPage * this.pagingInfo.pageSize < this.pagingInfo.totalRecord ? this.pagingInfo.currentPage * this.pagingInfo.pageSize : this.pagingInfo.totalRecord;
            this.data = this.filteredData.slice(begin, end);
        } else {
            this.data.length = 0;
        }
        this.refresh();
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
        this.pagingInfo = null;
        this.sortInfo = null;
        this.filteredData = null;
        this.originalData = null;
    }
}
