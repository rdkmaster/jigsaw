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

/**
 * 代表表格数据矩阵`TableDataMatrix`里的一行
 */
export type TableMatrixRow = any[];
/**
 * 代表表格的列头描述，其个数需要与表格数据`TableDataMatrix`的列数相等并一一对应
 * 这里的数据将会显示在界面上，需要确保对他们进行国际化处理
 */
export type TableDataHeader = string[];
/**
 * 代表表格的列头字段，其个数需要与表格数据`TableDataMatrix`的列数相等并一一对应，
 * 并且不能重复，建议以数据库表字段对应起来。
 * 这些数据对表格识别列至关重要，无效的、重复的值将会被忽略
 */
export type TableDataField = string[];
/**
 * 代表表格的数据区，是一个二维矩阵。矩阵的列数需要和`TableDataField`以及`TableDataHeader`的个数一致且一一对应。
 */
export type TableDataMatrix = TableMatrixRow[];

/**
 * 原始表格数据结构，Jigsaw的表格组件接收的唯一数据结构。
 */
export class RawTableData {
    /**
     * 表格数据的字段序列，这个序列决定了`JigsawTable`实际渲染出来哪些列。无效、重复的字段将被抛弃。
     */
    field: TableDataField;
    /**
     * 表格的列头，这里的文本将会直接显示在界面上，请确保他们已经被正确国际化过。
     */
    header: TableDataHeader;
    /**
     * 表格的数据，是一个二维数组。
     */
    data: TableDataMatrix;
    [property: string]: any;
}

/**
 * 表格数据的基类，应用一般无需直接使用这个类。
 */
export class TableDataBase extends AbstractGeneralCollection<any> {
    /**
     * 给出`data`的数据结构是否和`RawTableData`一致，即`data`是否是一个合法的表格数据。
     * 注意此方法并非使用类的血缘关系来判断，而是通过数据结构的特征来判断。
     *
     * @param data
     * @return {boolean}
     */
    public static isTableData(data: any): boolean {
        return data && data.hasOwnProperty('data') && data.data instanceof Array &&
            data.hasOwnProperty('header') && data.header instanceof Array &&
            data.hasOwnProperty('field') && data.field instanceof Array;
    }

    constructor(/**
                 * 表格的数据，是一个二维数组。
                 * @type {TableDataMatrix}
                 */
                public data: TableDataMatrix = [],
                /**
                 * 表格数据的字段序列，这个序列决定了`JigsawTable`实际渲染出来哪些列。无效、重复的字段将被抛弃。
                 * @type {TableDataField}
                 */
                public field: TableDataField = [],
                /**
                 * 表格的列头，这里的文本将会直接显示在界面上，请确保他们已经被正确国际化过。
                 * @type {TableDataHeader}
                 */
                public header: TableDataHeader = []) {
        super();
    }

    /**
     * 参考 `TableData.isTableData`
     *
     * @param data
     * @return {boolean}
     */
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

    /**
     * 参考 `TableData.toArray`
     * @returns {any[]}
     */
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

    /**
     * 清空此对象上的所有数据，避免潜在的内存泄露风险
     */
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

    /**
     * 在当前表格数据的`column`位置处插入一个新列。常常用于表格数据的`dataReviser`函数内，对服务端返回的数据做调整时用到。
     *
     * @param {number} column 新列所在的位置
     * @param cellData 新列的单元格的值，新插入列的每个单元格的值都相同。
     * @param {string} field 新插入列的字段，不允许与已有字段相同。
     * @param {string} header 新插入列的列头信息。
     */
    public insertColumn(column: number, cellData: any, field: string, header: string): void;
    /**
     * @param {number} column
     * @param {any[]} cellDatas 新列的单元格的值，每个单元格的值与此数组的元素一一对应
     * @param {string} field
     * @param {string} header
     */
    public insertColumn(column: number, cellDatas: any[], field: string, header: string): void;
    /**
     * @internal
     */
    public insertColumn(column: number, data: any | any[], field: string, header: string): void {
        column = isNaN(column) ? this.data.length : column;
        this.data.forEach((row, index) => row.splice(column, 0, data instanceof Array ? data[index] : data));
        this.field.splice(column, 0, field);
        this.header.splice(column, 0, header);
    }

    /**
     * 删除当前表格数据`column`位置处的列。常常用于表格数据的`dataReviser`函数内，对服务端返回的数据做调整时用到。
     *
     * @param {number} column 待删除的列索引
     * @returns {TableData} 返回删除后的`TableData`对象，当前对象不变
     */
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
 * 这是最基础的表格数据对象，只具备最基本的表格数据展示能力，无法分页，
 * 一般用于以下类型的表格数据无法满足需求时，实现自定义表格数据的基础数据。
 *
 * - {@link PageableTableData} 适用于需要在服务端进行分页、过滤、排序的场景，这是最常用的一个数据对象；
 * - {@link LocalPageableTableData} 适用于需要在浏览器本地进行分页、过滤、排序的场景，受限于数据量，不是很常用；
 * - {@link BigTableData} 适用于海量数据的展示场景，它可以做到在常数时间内展示**任意量级**的数据。
 *
 * 建议尽可能的挑选以上类型的表格数据，以减少定制化的开发工作量。
 */
export class TableData extends TableDataBase implements ISortable, IFilterable {
    /**
     * 将`RawTableData`对象转为`TableData`对象。
     *
     * 注意：源对象的 `data` / `field` / `header` 属性会被**浅拷贝**到目标`TableData`对象中。
     *
     * @param rawData 结构为 `RawTableData` 的json对象
     * @returns {TableData} 返回持有输入数据的`TableData`实例
     */
    public static of(rawData: any): TableData {
        return TableData.isTableData(rawData) ? new TableData(rawData.data, rawData.field, rawData.header) : new TableData();
    }

    /**
     * 将一个`RawTableData`对象转为一个json对象数组。
     *
     * 虽然`RawTableData`这样的数据结构有很多好处，比如利于网络传输，利于表格展示，在占用更小的内存等，
     * 但是由于这不是一个典型的json对象结构，因此如果需要将它使用到表格以外的场合，则会产生一些麻烦。
     * 可以通过这个方法将它转换为一个典型的json对象。
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
    /**
     * @internal
     */
    public sort(as: SortAs | DataSortInfo | Function, order?: SortOrder, field?: string | number): void {
        this.sortData(this.data, as, order, field);
    }

    /**
     * 对输入的数据进行排序
     *
     * @param {TableDataMatrix} data 输入的数据
     * @param {SortAs | DataSortInfo | Function} as 排序参数
     * @param {SortOrder} order 排序顺序
     * @param {string | number} field 排序字段
     */
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
    /**
     * @internal
     */
    public filter(term, fields?: (string | number)[]): void {
        throw new Error("Method not implemented.");
    }

    public destroy() {
        super.destroy();
        this.sortInfo = null;
        this.filterInfo = null;
    }
}

/**
 * 这是实际使用时做常用的表格数据对象，它具备服务端分页、服务端排序、服务端过滤能力。
 * 详细用法请参考[这个demo]($demo/table/pageable)。
 *
 * 注意：需要有一个统一的具备服务端分页、服务端排序、服务端过滤能力的REST服务配合使用，
 * 更多信息请参考`PagingInfo.pagingServerUrl`
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
     * 或者在需要获取数据之前，一次性通过`updateDataSource`来更新这个对象。
     */
    public sourceRequestOptions: HttpClientOptions;

    public pagingInfo: PagingInfo;

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
    }

    /**
     * 在使用此方法之前，请先阅读一下`sourceRequestOptions`的说明，你需要先了解它的作用之后，
     * 才能够知道如何恰当的使用这个方法来更新`sourceRequestOptions`。
     *
     * 这个方法除了更新`sourceRequestOptions`以外，还会自动重置`pagingInfo`的各个参数，
     * 以及清空`filterInfo`和`sortInfo`。
     *
     * @param {HttpClientOptions} options 数据源的结构化信息
     */
    public updateDataSource(options: HttpClientOptions): void;
    /**
     * @param {string} url 包含查询参数的url，只能通过GET访问它。
     */
    public updateDataSource(url: string): void;
    /**
     * @internal
     */
    public updateDataSource(optionsOrUrl: HttpClientOptions | string): void {
        if (CommonUtils.isUndefined(optionsOrUrl)) {
            optionsOrUrl = this.sourceRequestOptions;
        }
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
    /**
     * @internal
     */
    public fromAjax(optionsOrUrl?: HttpClientOptions | string): void {
        if (optionsOrUrl instanceof HttpClientOptions) {
            this.updateDataSource(<HttpClientOptions>optionsOrUrl);
        } else {
            this.updateDataSource(<string>optionsOrUrl);
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
    /**
     * @internal
     */
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
    /**
     * @internal
     */
    public sort(as, order?: SortOrder, field?: string | number): void {
        if (as instanceof Function) {
            throw new Error('compare function is not supported by PageableTableData which sorts data in the server side');
        }
        const psi = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
        psi.order = SortOrder[psi.order];
        this._sortSubject.next(psi);
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
 * 详细用法和相关说明，请参考[这个demo]($demo/table/big-table)。
 *
 * 注意：{@link BigTableData}需要有一个统一的具备服务端分页、服务端排序、服务端过滤能力的REST服务配合使用，
 * 更多信息请参考`PagingInfo.pagingServerUrl`。
 *
 * 如果你的服务端无法给提供一个统一的分页服务，
 * 则可以通过[Angular的拦截器](https://angular.cn/guide/http#intercepting-requests-and-responses)来模拟。
 * {@link BigTableData}在需要获取下一页数据时，会将请求做一层包装后发给统一分页服务，实际的数据请求是在统一分页服务里完成的。
 * 你需要做的事情是实现一个拦截器，将{@link BigTableData}发给统一分页服务的请求拦截下来，解析被拦截的请求里的实际请求参数，
 * 并将这些请求转发给实际提供数据的服务。
 *
 * 相关的表格数据对象：
 * - {@link PageableTableData} 适用于需要在服务端进行分页、过滤、排序的场景，这是最常用的一个数据对象；
 * - {@link LocalPageableTableData} 适用于需要在浏览器本地进行分页、过滤、排序的场景，受限于数据量，不是很常用；
 * - {@link BigTableData} 适用于海量数据的展示场景，它可以做到在常数时间内展示**任意量级**的数据。
 */
export class BigTableData extends PageableTableData implements ISlicedData {

    public readonly viewport: TableViewportData = new TableViewportData(this);

    /**
     * 缓存数据页数，这里的页指的是服务端单次返回的数据集，和传统服务端分页数据的概念是相同的。
     *
     * 这个数值越大，表格数据浏览的体验更好，更流畅，但是需要占用的浏览器内存越多；
     * 相反的，给的数值越小，表格找服务端请求数据的机会越多，数据浏览体验下降，但是浏览器所需内存越小。
     * 需要根据服务端性能以及单页数据量而定。最小值为3页。
     *
     * @type {number}
     */
    public numCachedPages = 3;

    /**
     *
     * @type {number}
     */
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

    /**
     * @internal
     */
    public changePage(currentPage: number, pageSize?: number): void;
    /**
     * @internal
     */
    public changePage(info: PagingInfo): void;
    /**
     * @internal
     */
    public changePage(currentPage, pageSize?: number): void {
        throw new Error('BigTableData do not support changePage action.');
    }
}


/**
 * 它具备浏览器本地内存中进行分页、服务端排序、服务端过滤能力，受限于浏览器内存的限制，无法操作大量的数据，因此使用场景并不多。
 * 详细用法请参考[这个demo]($demo/table/local-paging-data)。
 *
 * 注意：需要有一个统一的具备服务端分页、服务端排序、服务端过滤能力的REST服务配合使用，
 * 更多信息请参考`PagingInfo.pagingServerUrl`
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

    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
    /**
     * @internal
     */
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
