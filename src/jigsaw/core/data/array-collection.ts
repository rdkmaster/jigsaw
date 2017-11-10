import {EventEmitter} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/debounceTime';

import {
    ComponentDataHelper,
    DataReviser,
    IAjaxComponentData, IFilterable,
    IPageable, ISortable,
    PagingInfo,
    DataFilterInfo,
    DataSortInfo,
    SortAs,
    SortOrder, IServerSidePageable, HttpClientOptions
} from "./component-data";

import {TableData} from "./table-data";
import {CallbackRemoval, CommonUtils} from "../utils/common-utils";

// we have to implement the Array<T> interface due to this breaking change:
// https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
// https://github.com/Microsoft/TypeScript/issues/14869
export class JigsawArray<T> implements Array<T> {
    private _agent: T[] = [];

    public set(index: number, value: T): void {
        this._length = this._length > index ? this._length : index + 1;
        const thiz: any = this;
        thiz[index] = value;
    }

    public get(index: number): T {
        return this[index];
    }

    private _length: number = 0;

    public get length(): number {
        return this._length;
    }

    public set length(value: number) {
        this._length = value;
    }

    readonly [n: number]: T;

    public includes(searchElement: T, fromIndex?: number): boolean {
        return this._agent.includes.apply(this, arguments);
    }

    public toString(): string {
        return this._agent.toString.apply(this, arguments);
    }

    public toLocaleString(): string {
        return this._agent.toLocaleString.apply(this, arguments);
    }

    public push(...items: T[]): number {
        return this._agent.push.apply(this, arguments);
    }

    public pop(): T {
        return this._agent.pop.apply(this, arguments);
    }

    public concat(...items: any[]): any {
        return this._agent.concat.apply(this, arguments);
    }

    public join(separator?: string): string {
        return this._agent.join.apply(this, arguments);
    }

    public reverse(): T[] {
        return this._agent.reverse.apply(this, arguments);
    }

    public shift(): T {
        return this._agent.shift.apply(this, arguments);
    }

    public slice(start?: number, end?: number): T[] {
        return this._agent.slice.apply(this, arguments);
    }

    public sort(compareFn?: (a: T, b: T) => number): any {
        return this._agent.sort.apply(this, arguments);
    }

    public splice(start: any, deleteCount?: any, ...rest: any[]): T[] {
        return this._agent.splice.apply(this, arguments);
    }

    public unshift(...items: T[]): number {
        return this._agent.unshift.apply(this, arguments);
    }

    public indexOf(searchElement: T, fromIndex?: number): number {
        return this._agent.indexOf.apply(this, arguments);
    }

    public lastIndexOf(searchElement: T, fromIndex?: number): number {
        return this._agent.lastIndexOf.apply(this, arguments);
    }

    public every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean {
        return this._agent.every.apply(this, arguments);
    }

    public some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean {
        return this._agent.some.apply(this, arguments);
    }

    public forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
        return this._agent.forEach.apply(this, arguments);
    }

    public map(callbackfn: any, thisArg?: any): [any, any, any, any, any] {
        return this._agent.map.apply(this, arguments);
    }

    public filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[] {
        return this._agent.filter.apply(this, arguments);
    }

    public reduce(callbackfn: any, initialValue?: any): T {
        return this._agent.reduce.apply(this, arguments);
    }

    public reduceRight(callbackfn: any, initialValue?: any): T {
        return this._agent.reduceRight.apply(this, arguments);
    }

    [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; } {
        const iterator = this._agent[Symbol.unscopables];
        return iterator.apply(this);
    }

    [Symbol.iterator](): IterableIterator<T> {
        const iterator = this._agent[Symbol.iterator];
        return iterator.apply(this);
    }

    public entries(): IterableIterator<[number, T]> {
        return this._agent.entries.apply(this, arguments);
    }

    public keys(): IterableIterator<number> {
        return this._agent.keys.apply(this, arguments);
    }

    public values(): IterableIterator<T> {
        return this._agent.values.apply(this, arguments);
    }

    public find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T {
        return this._agent.find.apply(this, arguments);
    }

    public findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number {
        return this._agent.findIndex.apply(this, arguments);
    }

    public fill(value: T, start?: number, end?: number): any {
        return this._agent.fill.apply(this, arguments);
    }

    public copyWithin(target: number, start: number, end?: number): any {
        return this._agent.copyWithin.apply(this, arguments);
    }
}

/**
 * 这是Jigsaw数据体系中两大分支之一：数组类型的基类。
 */
export class ArrayCollection<T> extends JigsawArray<T> implements IAjaxComponentData {
    public http: HttpClient;
    /**
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IAjaxComponentData#dataReviser)
     */
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
        this._fromArray(source);
    }

    protected _busy: boolean = false;

    /**
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IAjaxComponentData#busy)
     *
     * @returns {boolean}
     */
    get busy(): boolean {
        return this._busy;
    }

    protected ajaxStartHandler(): void {
        this._busy = true;
        this.componentDataHelper.invokeAjaxStartCallback();
    }

    protected ajaxSuccessHandler(data: T[]): void {
        console.log('get data from paging server success!!');

        if (data instanceof Array) {
            this.fromArray(data);
        } else {
            console.error('invalid data type: ' + typeof(data) + ', need Array.');
            this.fromArray([]);
        }
        this._busy = false;
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

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

    protected ajaxCompleteHandler(): void {
        console.log('get data from paging server complete!!');
        this._busy = false;
        this.componentDataHelper.invokeAjaxCompleteCallback();
    }

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

    /**
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IAjaxComponentData#fromAjax)
     *
     * @returns {boolean}
     */
    public fromAjax(url?: string): void;
    public fromAjax(options?: HttpClientOptions): void;
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
            .map(res => this.reviseData(res) as T[])
            .subscribe(
                data => this.ajaxSuccessHandler(data),
                error => this.ajaxErrorHandler(error),
                () => this.ajaxCompleteHandler()
            );
    }

    /**
     * 将一个普通数组对象`source`的所有元素浅拷贝到当前数据对象中。
     *
     * @param {T[]} source 源数据
     * @returns {ArrayCollection<T>} 当前数据对象的引用
     */
    public fromArray(source: T[]): ArrayCollection<T> {
        if (this._fromArray(source)) {
            this.refresh();
        }
        return this;
    }

    private _fromArray(source: T[]): boolean {
        source = source instanceof Array ? source : CommonUtils.isDefined(source) ? [source] : [];
        let needRefresh = this.length > 0;

        this.splice(0, this.length);
        if (source.length > 0) {
            needRefresh = needRefresh || source.length > 0;
            source.forEach(item => this.push(item));
        }

        return needRefresh;
    }

    protected componentDataHelper: ComponentDataHelper = new ComponentDataHelper();

    /**
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IComponentData#refresh)
     */
    public refresh(): void {
        this.componentDataHelper.invokeRefreshCallback();
    }

    public onRefresh(callback: (thisData: ArrayCollection<T>) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getRefreshRemoval({fn: callback, context: context});
    }

    /**
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IAjaxComponentData#onAjaxStart)
     */
    public onAjaxStart(callback: () => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxStartRemoval({fn: callback, context: context});
    }

    /**
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IAjaxComponentData#onAjaxSuccess)
     */
    public onAjaxSuccess(callback: (data: any) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxSuccessRemoval({fn: callback, context: context});
    }

    /**
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IAjaxComponentData#onAjaxError)
     */
    public onAjaxError(callback: (error: Response) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxErrorRemoval({fn: callback, context: context});
    }

    /**
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IAjaxComponentData#onAjaxComplete)
     */
    public onAjaxComplete(callback: () => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getAjaxCompleteRemoval({fn: callback, context: context});
    }

    /**
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IComponentData#destroy)
     */
    public destroy(): void {
        console.log('destroying ArrayCollection....');
        this.splice(0, this.length);

        this.componentDataHelper.clearCallbacks();
        this.componentDataHelper = null;
        this.dataReviser = null;
        this._emitter.unsubscribe();
    }

    private _emitter = new EventEmitter<any>();

    /**
     * 发出一个事件，所有事先调用了[`subscribe()`](#subscribe)方法注册了的回调函数都可以处理这个事件。
     *
     * @param value 事件中携带的数据，任意类型
     */
    public emit(value?: any): void {
        this._emitter.emit(value);
    }

    /**
     * 注册回调函数，注册之后，所有在这个数据对象上[`emit()`](#emit)出来的事件，`callback`函数都会被调用。
     *
     * @param callback 事件的回调函数
     * @returns {Function} 取消本次订阅的函数，执行之后，后续即使有事件发出，本次订阅的回调函数也不会再被执行
     */
    public subscribe(callback?: any): Function {
        return this._emitter.subscribe(callback);
    }

    /**
     * 取消本数据对象上的所有回调函数。
     */
    public unsubscribe() {
        this._emitter.unsubscribe();
    }
}

/**
 * 具备服务端分页、服务端排序、服务端过滤能力的数组。需要有一个统一的具备服务端分页、服务端排序、服务端过滤能力的REST服务配合使用，
 * 更多信息请[参考这里](http://10.9.233.35:52580/components/classes/api?apiItem=PagingInfo#pagingServerUrl)
 *
 * 实际用法请参考[这个demo]()
 */
export class PageableArray extends ArrayCollection<any> implements IServerSidePageable, ISortable, IFilterable {
    public pagingInfo: PagingInfo;
    public filterInfo: DataFilterInfo;
    public sortInfo: DataSortInfo;

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
        this._requestOptions = HttpClientOptions.prepare(this.sourceRequestOptions);
        if (!this._requestOptions) {
            return;
        }

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

    /**
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IServerSidePageable#updateDataSource)
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
     * [参考这里](http://rdk.zte.com.cn/components/interfaces/api?apiItem=IAjaxComponentData#fromAjax)
     *
     * @returns {boolean}
     */
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
        this.pagingInfo.currentPage = paging.hasOwnProperty('currentPage') ? paging.currentPage : this.pagingInfo.currentPage;
        this.pagingInfo.totalPage = paging.hasOwnProperty('totalPage') ? paging.totalPage : this.pagingInfo.totalPage;
        this.pagingInfo.totalRecord = paging.hasOwnProperty('totalRecord') ? paging.totalRecord : this.pagingInfo.totalRecord;
    }

    protected ajaxSuccessHandler(tableData: any): void {
        console.log('get data from paging server success!!');
        this.fromArray(tableData.toArray());
        this.componentDataHelper.invokeAjaxSuccessCallback(tableData);
    }

    public filter(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;
    public filter(term: string, fields?: string[] | number[]): void;
    public filter(term: DataFilterInfo): void;
    public filter(term: string | DataFilterInfo | Function, fields?: string[] | number[]): void {
        if (term instanceof Function) {
            throw 'filter function is NOT accepted by this class!';
        }
        const pfi = term instanceof DataFilterInfo ? term : new DataFilterInfo(term, fields);
        this._filterSubject.next(pfi);
    }

    public sort(compareFn?: (a: any, b: any) => number): any;
    public sort(as: SortAs, order: SortOrder, field: string | number): void;
    public sort(sort: DataSortInfo): void;
    public sort(as, order?: SortOrder, field?: string | number): void {
        if (as instanceof Function) {
            throw 'compare function is NOT accepted by this class!';
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

    public destroy(): void {
        super.destroy();

        this.http = null;
        this.sourceRequestOptions = null;
        this.pagingInfo = null;
        this.filterInfo = null;
        this.sortInfo = null;
        this._requestOptions = null;
        this._filterSubject.unsubscribe();
        this._filterSubject = null;
        this._sortSubject.unsubscribe();
        this._sortSubject = null;
    }
}

/**
 * 如果你没有统一的服务端分页、过滤、排序服务，则需要使用这个数据对象，并且请求的提供数据的服务需要自行处理分页、过滤、排序等。
 *
 * Jigsaw暂未实现此功能，如有需要，请给我们[提issue](https://github.com/rdkmaster/jigsaw/issues/new)。
 */
export class DirectPageableArray extends PageableArray {
    constructor(public http: HttpClient, public sourceRequestOptions: HttpClientOptions) {
        super(http, sourceRequestOptions);
        console.error("unsupported yet!");
    }
}

/**
 * 在本地分页、排序、过滤的数组。
 *
 * 部分功能未实现，如有需要，请给我们[提issue](https://github.com/rdkmaster/jigsaw/issues/new)。
 */
export class LocalPageableArray<T> extends ArrayCollection<T> implements IPageable {
    public pagingInfo: PagingInfo;

    private _bakData: T[] = [];

    private _filterSubject = new Subject<DataFilterInfo>();

    constructor(source?: T[]) {
        super(source);
        this._bakData = source;
        this._initSubjects();
    }

    public fromArray(source: T[]): ArrayCollection<T> {
        const result = super.fromArray(source);
        this._bakData = source;
        return result;
    }

    private _initSubjects(): void {
        this._filterSubject.debounceTime(300).subscribe(filter => {
            super.fromArray(this._bakData.filter(item => (<any[]>filter.field).find(field => {
                const value: string = item[field] === undefined || item[field] === null ? '' : item[field].toString();
                return value.includes(filter.key)
            })));
        });
    }

    public filter(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;
    public filter(term: string, fields?: string[] | number[]): void;
    public filter(term: DataFilterInfo): void;
    public filter(term, fields?: string[] | number[]): void {
        if (term instanceof Function) {
            throw 'filter function is NOT accepted by this class!';
        }
        const pfi = term instanceof DataFilterInfo ? term : new DataFilterInfo(term, fields);
        this._filterSubject.next(pfi);
    }

    public sort(compareFn?: (a: any, b: any) => number): any;
    public sort(as: SortAs, order: SortOrder, field: string | number): void;
    public sort(sort: DataSortInfo): void;
    public sort(as, order?: SortOrder, field?: string | number): void {
        throw new Error('not implemented yet!');
    }

    public changePage(currentPage: number, pageSize?: number): void;
    public changePage(info: PagingInfo): void;
    public changePage(currentPage, pageSize?: number): void {
        throw new Error('not implemented yet!');
    }

    public firstPage(): void {
        throw new Error('not implemented yet!');
    }

    public previousPage(): void {
        throw new Error('not implemented yet!');
    }

    public nextPage(): void {
        throw new Error('not implemented yet!');
    }

    public lastPage(): void {
        throw new Error('not implemented yet!');
    }

    public destroy() {
        super.destroy();
        this._filterSubject.unsubscribe();
        this._bakData = null;
    }
}
