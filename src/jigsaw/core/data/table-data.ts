import {Http, RequestOptionsArgs, URLSearchParams} from "@angular/http";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/debounceTime';

import {AbstractGeneralCollection} from "./general-collection";
import {
    DataFilterInfo,
    DataSortInfo,
    IFilterable,
    IServerSidePageable,
    ISortable,
    PagingInfo,
    SortAs,
    SortOrder,
    IPageable
} from "./component-data";
import {CommonUtils} from "../utils/common-utils";

export type TableMatrixRow = any[];
export type TableDataHeader = string[];
export type TableDataField = string[];
export type TableDataMatrix = TableMatrixRow[];

export class TableDataBase extends AbstractGeneralCollection<any> {
    public static isTableData(data: any): boolean {
        return data && data.hasOwnProperty('data') && data.data instanceof Array &&
            data.hasOwnProperty('header') && data.header instanceof Array &&
            data.hasOwnProperty('field') && data.field instanceof Array;
    }

    constructor(public data?: TableDataMatrix,
                public field?: TableDataField,
                public header?: TableDataHeader) {
        super();
        if (!data) {
            this.data = [];
        }
        if (!field) {
            this.field = [];
        }
        if (!header) {
            this.header = [];
        }
    }

    protected isDataValid(data): boolean {
        return TableDataBase.isTableData(data);
    }

    protected ajaxSuccessHandler(data): void {
        if (this.isDataValid(data)) {
            this.fromObject(data);
        } else {
            console.log('invalid raw TableData received from server...');
            this.clearData();
            this.refresh();
        }
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    public fromObject(data: any): TableDataBase {
        if (!this.isDataValid(data)) {
            throw new Error('invalid raw TableData object!');
        }

        this.clearData();

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

    protected clearData(): void {
        this.data.splice(0, this.data.length);
        this.header.splice(0, this.header.length);
        this.field.splice(0, this.field.length);
    }

    public destroy(): void {
        super.destroy();
        this.clearData();
        console.log('destroying TableDataBase....');
    }

    public insertColumn(column: number, data: any | any[], field: string, header: string):void {
        column = isNaN(column) ? this.data.length : column;
        this.data.forEach((row, index) => row.splice(column, 0, data instanceof Array ? data[index] : data));
        this.field.splice(column, 0, field);
        this.header.splice(column, 0, header);
    }

    public removeColumn(column:number):TableData {
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
    public sortInfo: DataSortInfo;
    public sort(as: SortAs, order: SortOrder, field: string | number): void;
    public sort(sort: DataSortInfo): void;
    public sort(as: SortAs | DataSortInfo, order?: SortOrder, field?: string | number): void {
        this.sortData(this.data, as, order, field);
    }

    protected sortData(data: TableDataMatrix, as: SortAs | DataSortInfo, order?: SortOrder, field?: string | number) {
        field = typeof field === 'string' ? this.field.indexOf(field) : field;
        this.sortInfo = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
        const orderFlag = this.sortInfo.order == SortOrder.asc ? 1 : -1;
        if (this.sortInfo.as == SortAs.number) {
            data.sort((a, b) => orderFlag * (Number(a[field]) - Number(b[field])));
        } else {
            data.sort((a, b) => orderFlag * String(a[field]).localeCompare(String(b[field])));
        }
        this.refresh();
    }

    public filterInfo: DataFilterInfo;
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

    private _filterSubject = new Subject<DataFilterInfo>();
    private _sortSubject = new Subject<DataSortInfo>();
    private _requestOptions: RequestOptionsArgs;

    constructor(public http: Http, public sourceRequestOptions: RequestOptionsArgs) {
        super();

        if (!http) {
            throw new Error('invalid http!');
        }
        this.pagingInfo = new PagingInfo();

        this._initRequestOptions();
        this._initSubjects();
    }

    private _initRequestOptions(): void {
        if (!this.sourceRequestOptions || !this.sourceRequestOptions.url) {
            throw new Error('invalid data source request options or invalid url!');
        }
        this._requestOptions = {
            method: this.sourceRequestOptions.method,
            params: new URLSearchParams(),
            headers: this.sourceRequestOptions.headers,
            body: this.sourceRequestOptions.body,
            withCredentials: this.sourceRequestOptions.withCredentials,
            responseType: this.sourceRequestOptions.responseType
        };

        let params = {};
        const rawParams = this.sourceRequestOptions.params;
        if (rawParams) {
            if (rawParams instanceof URLSearchParams || typeof rawParams === 'string') {
                const p = rawParams instanceof URLSearchParams ? rawParams : new URLSearchParams(rawParams);
                for (let key in p) {
                    params[key] = p.get(key);
                }
            } else {
                params = rawParams;
            }

            (<URLSearchParams>this._requestOptions.params).set('peerParam', JSON.stringify(params));
        }
        (<URLSearchParams>this._requestOptions.params).set('service', this.sourceRequestOptions.url);
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

    public updateDataSource(options: RequestOptionsArgs): void {
        this.sourceRequestOptions = options;
        this.pagingInfo.currentPage = 1;
        this.pagingInfo.totalPage = 1;
        this.pagingInfo.totalRecord = 0;
        this.filterInfo = null;
        this.sortInfo = null;
        this._initRequestOptions();
    }

    public fromAjax(options?: RequestOptionsArgs): void {
        if (!!options) {
            this.updateDataSource(options);
        }
        this._ajax();
    }

    private _ajax(): void {
        this._busy = true;

        const params: URLSearchParams = this._requestOptions.params as URLSearchParams;
        params.set('paging', JSON.stringify(this.pagingInfo));
        if (this.filterInfo) {
            params.set('filter', JSON.stringify(this.filterInfo));
        }
        if (this.sortInfo) {
            params.set('sort', JSON.stringify(this.sortInfo));
        }

        this.http.request(PagingInfo.pagingServerUrl, this._requestOptions)
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

    public filter(term: string, fields?: string[] | number[]): void;
    public filter(term: DataFilterInfo): void;
    public filter(term, fields?: string[] | number[]): void {
        const pfi = term instanceof DataFilterInfo ? term : new DataFilterInfo(term, fields);
        this._filterSubject.next(pfi);
    }

    public sort(as: SortAs, order: SortOrder, field: string | number): void;
    public sort(sort: DataSortInfo): void;
    public sort(as, order?: SortOrder, field?: string | number): void {
        const psi = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
        this._sortSubject.next(psi);
    }

    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
    public changePage(currentPage, pageSize?: number): void {
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
        this.filteredData = this.data;
        this.originalData = <TableDataMatrix>CommonUtils.deepCopy(this.data);
        this._updatePagingInfo();
        return this;
    }

    private _updatePagingInfo() {
        this.pagingInfo.totalRecord = this.filteredData.length;
        this.pagingInfo.totalPage = Math.ceil(this.pagingInfo.totalRecord / this.pagingInfo.pageSize);
        this.firstPage();
    }

    public filter(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;
    public filter(term: string, fields?: string[] | number[]): void;
    public filter(term: DataFilterInfo): void;
    public filter(term, fields?: (string | number)[]): void {
        if (term instanceof Function) {
            this.filteredData = this.originalData.filter(term);
        }
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
                (<string[]>fields).forEach(field => {
                        numberFields.push(this.field.findIndex(item => item == field))
                    }
                )
            } else {
                numberFields = <number[]>fields;
            }
            this.filteredData = this.originalData.filter(
                row => row.filter(
                    (index, item) => numberFields.find(num => num == index)
                ).filter(
                    item => (<string>item).indexOf(key) != -1
                ).length != 0
            );
        } else {
            this.filteredData = this.originalData.filter(
                row => row.filter(
                    item => (<string>item).indexOf(key) != -1
                ).length != 0
            );
        }
        this._updatePagingInfo();
    }

    public sort(compareFn?: (a: any, b: any) => number): any;
    public sort(as: SortAs, order: SortOrder, field: string | number): void;
    public sort(sort: DataSortInfo): void;
    public sort(as, order?: SortOrder, field?: string | number): void {
        super.sortData(this.filteredData, as, order, field);
        this.changePage(this.pagingInfo.currentPage, undefined);
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
        this.pagingInfo.totalPage = Math.ceil(this.pagingInfo.totalRecord / this.pagingInfo.pageSize);

        if (pi.currentPage >= 1 && pi.currentPage <= this.pagingInfo.totalPage) {
            this.pagingInfo.currentPage = pi.currentPage;
        } else {
            console.error(`invalid currentPage[${pi.currentPage}], it should be between in [1, ${this.pagingInfo.totalPage}]`);
            return;
        }

        const begin = (this.pagingInfo.currentPage - 1) * this.pagingInfo.pageSize;
        const end = this.pagingInfo.currentPage * this.pagingInfo.pageSize < this.pagingInfo.totalRecord ? this.pagingInfo.currentPage * this.pagingInfo.pageSize : this.pagingInfo.totalRecord;
        this.data = this.filteredData.slice(begin, end);

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
