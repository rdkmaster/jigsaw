import {EventEmitter} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/debounceTime';
import {Subscription} from "rxjs/Subscription";

import {
    ComponentDataHelper,
    DataReviser,
    IAjaxComponentData, IFilterable,
    IPageable, ISortable,
    PagingInfo,
    DataFilterInfo,
    DataSortInfo,
    SortAs,
    SortOrder, IServerSidePageable, HttpClientOptions, IEmittable
} from "./component-data";

import {TableData} from "./table-data";
import {CallbackRemoval, CommonUtils} from "../utils/common-utils";

/**
 * we have to implement the `Array<T>` interface due to this breaking change:
 * <https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work>
 * <https://github.com/Microsoft/TypeScript/issues/14869>
 */
export class JigsawArray<T> implements Array<T> {
    private _agent: T[] = [];

    /**
     * 将位置`index`处的数据更新为`value`。`JigsawArray`不支持采用方括号表达式设置一个值，因此必须通过这个方法来替代。
     *
     * ```
     * const a = new ArrayCollection<any>();
     * a[0] = 123;    // compile error!
     * a.set(0, 123); // everything is fine.
     * ```
     *
     * @param {number} index
     * @param {T} value
     */
    public set(index: number, value: T): void {
        this._length = this._length > index ? this._length : index + 1;
        const thiz: any = this;
        thiz[index] = value;
    }

    /**
     * 获取`index`位置处的数据，和数组的方括号表达式的作用一样。
     *
     * ```
     * const a = new ArrayCollection<any>([{}]);
     * a.get(0) === a[0] // true
     * ```
     *
     * @param {number} index
     * @returns {T}
     */
    public get(index: number): T {
        return this[index];
    }

    private _length: number = 0;

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length>
     * @return {number}
     */
    public get length(): number {
        return this._length;
    }

    public set length(value: number) {
        this._length = value;
    }

    readonly [n: number]: T;

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes>
     *
     * @param {T} searchElement
     * @param {number} fromIndex
     * @return {boolean}
     */
    public includes(searchElement: T, fromIndex?: number): boolean {
        return this._agent.includes.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString>
     * @return {string}
     */
    public toString(): string {
        return this._agent.toString.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString>
     * @return {string}
     */
    public toLocaleString(): string {
        return this._agent.toLocaleString.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push>
     * @param {T} items
     * @return {number}
     */
    public push(...items: T[]): number {
        return this._agent.push.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop>
     * @return {T}
     */
    public pop(): T {
        return this._agent.pop.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat>
     * @param items
     * @return {any}
     */
    public concat(...items: any[]): any {
        return this._agent.concat.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join>
     * @param {string} separator
     * @return {string}
     */
    public join(separator?: string): string {
        return this._agent.join.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse>
     * @return {T[]}
     */
    public reverse(): T[] {
        return this._agent.reverse.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift>
     * @return {T}
     */
    public shift(): T {
        return this._agent.shift.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice>
     * @param {number} start
     * @param {number} end
     * @return {T[]}
     */
    public slice(start?: number, end?: number): T[] {
        return this._agent.slice.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort>
     * @param {(a: T, b: T) => number} compareFn
     * @return {any}
     */
    public sort(compareFn?: (a: T, b: T) => number): any {
        return this._agent.sort.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice>
     * @param start
     * @param deleteCount
     * @param rest
     * @return {T[]}
     */
    public splice(start: any, deleteCount?: any, ...rest: any[]): T[] {
        return this._agent.splice.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift>
     * @param {T} items
     * @return {number}
     */
    public unshift(...items: T[]): number {
        return this._agent.unshift.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf>
     * @param {T} searchElement
     * @param {number} fromIndex
     * @return {number}
     */
    public indexOf(searchElement: T, fromIndex?: number): number {
        return this._agent.indexOf.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf>
     * @param {T} searchElement
     * @param {number} fromIndex
     * @return {number}
     */
    public lastIndexOf(searchElement: T, fromIndex?: number): number {
        return this._agent.lastIndexOf.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every>
     * @param {(value: T, index: number, array: T[]) => boolean} callbackfn
     * @param thisArg
     * @return {boolean}
     */
    public every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean {
        return this._agent.every.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some>
     * @param {(value: T, index: number, array: T[]) => boolean} callbackfn
     * @param thisArg
     * @return {boolean}
     */
    public some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean {
        return this._agent.some.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach>
     * @param {(value: T, index: number, array: T[]) => void} callbackfn
     * @param thisArg
     */
    public forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
        return this._agent.forEach.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map>
     * @param callbackfn
     * @param thisArg
     * @return {[any , any , any , any , any]}
     */
    public map(callbackfn: any, thisArg?: any): [any, any, any, any, any] {
        return this._agent.map.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter>
     * @param {(value: T, index: number, array: T[]) => any} callbackfn
     * @param thisArg
     * @return {T[]}
     */
    public filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[] {
        return this._agent.filter.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce>
     * @param callbackfn
     * @param initialValue
     * @return {T}
     */
    public reduce(callbackfn: any, initialValue?: any): T {
        return this._agent.reduce.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight>
     * @param callbackfn
     * @param initialValue
     * @return {T}
     */
    public reduceRight(callbackfn: any, initialValue?: any): T {
        return this._agent.reduceRight.apply(this, arguments);
    }

    /**
     * @internal
     */
    [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; } {
        const iterator = this._agent[Symbol.unscopables];
        return iterator.apply(this);
    }

    /**
     * @internal
     */
    [Symbol.iterator](): IterableIterator<T> {
        const iterator = this._agent[Symbol.iterator];
        return iterator.apply(this);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries>
     * @return {IterableIterator<[number , T]>}
     */
    public entries(): IterableIterator<[number, T]> {
        return this._agent.entries.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys>
     * @return {IterableIterator<number>}
     */
    public keys(): IterableIterator<number> {
        return this._agent.keys.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values>
     * @return {IterableIterator<T>}
     */
    public values(): IterableIterator<T> {
        return this._agent.values.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find>
     * @param {(value: T, index: number, obj: T[]) => boolean} predicate
     * @param thisArg
     * @return {T}
     */
    public find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T {
        return this._agent.find.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex>
     * @param {(value: T, index: number, obj: T[]) => boolean} predicate
     * @param thisArg
     * @return {number}
     */
    public findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number {
        return this._agent.findIndex.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill>
     * @param {T} value
     * @param {number} start
     * @param {number} end
     * @return {any}
     */
    public fill(value: T, start?: number, end?: number): any {
        return this._agent.fill.apply(this, arguments);
    }

    /**
     * 参考这里 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin>
     * @param {number} target
     * @param {number} start
     * @param {number} end
     * @return {any}
     */
    public copyWithin(target: number, start: number, end?: number): any {
        return this._agent.copyWithin.apply(this, arguments);
    }
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
        this._fromArray(source);
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
            console.error('invalid data type: ' + typeof(data) + ', need Array.');
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
     * @return {any}
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
     * ```
     * const ac = new ArrayCollection<number>();
     * ac.fromArray([1, 2, 3]);
     * console.log(ac); // [1, 2, 3]
     * ```
     *
     * @param {T[]} source 源数据
     * @returns {ArrayCollection<T>} 返回当前数据对象的引用
     */
    public fromArray(source: T[]): ArrayCollection<T> {
        if (this._fromArray(source)) {
            this.refresh();
        }
        return this;
    }

    private _fromArray(source: T[]): boolean {
        source = source instanceof Array || source instanceof ArrayCollection ? source : CommonUtils.isDefined(source) ? [source] : [];
        let needRefresh = this.length > 0;

        this.splice(0, this.length);
        if (source.length > 0) {
            needRefresh = needRefresh || source.length > 0;
            source.forEach(item => this.push(item));
        }

        return needRefresh;
    }

    protected componentDataHelper: ComponentDataHelper = new ComponentDataHelper();

    public refresh(): void {
        this.componentDataHelper.invokeRefreshCallback();
    }

    public onRefresh(callback: (thisData: ArrayCollection<T>) => void, context?: any): CallbackRemoval {
        return this.componentDataHelper.getRefreshRemoval({fn: callback, context: context});
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

        this.componentDataHelper.clearCallbacks();
        this.componentDataHelper = null;
        this.dataReviser = null;
        this._emitter.unsubscribe();
        this._emitter = null;
    }

    private _emitter = new EventEmitter<any>();

    public emit(value?: any): void {
        this._emitter.emit(value);
    }

    public subscribe(callback?: (value:any) => void): Subscription {
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

    /**
     * 参考`PageableTableData.sourceRequestOptions`的说明
     */
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
        } else if (!!optionsOrUrl) {
            this.updateDataSource(<string>optionsOrUrl);
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
        params.paging = JSON.stringify(this.pagingInfo.valueOf());
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
        this.pagingInfo.totalRecord = paging.hasOwnProperty('totalRecord') ? paging.totalRecord : this.pagingInfo.totalRecord;
    }

    protected ajaxSuccessHandler(data: any): void {
        console.log('get data from paging server success!!');
        this.fromArray(data.toArray());
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    public filter(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;
    public filter(term: string, fields?: string[] | number[]): void;
    public filter(term: DataFilterInfo): void;
    /**
     * @internal
     */
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
    /**
     * @internal
     */
    public sort(as, order?: SortOrder, field?: string | number): void {
        if (as instanceof Function) {
            throw 'compare function is NOT accepted by this class!';
        }
        const psi = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
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
 *
 * 关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
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
 * 关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
 */
export class LocalPageableArray<T> extends ArrayCollection<T> implements IPageable {
    public pagingInfo: PagingInfo;

    private _bakData: T[] = [];

    private _filterSubject = new Subject<DataFilterInfo>();
    private _sortSubject = new Subject<DataSortInfo>();

    public filteredData: T[];

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
        });
        this._initSubjects();
    }

    public fromArray(source: T[]): ArrayCollection<T> {
        this._bakData = source;
        this.filteredData = source;
        this.firstPage();
        return this;
    }

    private _initSubjects(): void {
        this._filterSubject.debounceTime(300).subscribe(filter => {
            this.filteredData = this._bakData.filter(item => {
                if (typeof item == 'string') {
                    return item.toLowerCase().includes(filter.key.toLowerCase())
                } else if (filter.field) {
                    return (<any[]>filter.field).find(field => {
                        const value: string = !item || item[field] === undefined || item[field] === null ? '' : item[field].toString();
                        return value.toLowerCase().includes(filter.key.toLowerCase())
                    })
                } else {
                    return false
                }
            });
            this.firstPage();
        });

        this._sortSubject.debounceTime(300).subscribe((sortInfo: DataSortInfo) => {
            const orderFlag = sortInfo.order == SortOrder.asc ? 1 : -1;
            if (sortInfo.as == SortAs.number) {
                this.filteredData.sort((a, b) => orderFlag * (Number(sortInfo.field ? a[sortInfo.field] : a) - Number(sortInfo.field ? b[sortInfo.field] : b)));
            } else {
                this.filteredData.sort((a, b) => orderFlag * String(sortInfo.field ? a[sortInfo.field] : a).localeCompare(String(sortInfo.field ? b[sortInfo.field] : b)));
            }
            this.firstPage();
        })
    }

    public filter(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;
    public filter(term: string, fields?: string[] | number[]): void;
    public filter(term: DataFilterInfo): void;
    /**
     * @internal
     */
    public filter(term, fields?: string[] | number[]): void {
        if (term instanceof Function) {
            this.filteredData = this._bakData.filter(term);
            this.firstPage();
        }
        const pfi = term instanceof DataFilterInfo ? term : new DataFilterInfo(term, fields);
        this._filterSubject.next(pfi);
    }

    public sort(compareFn?: (a: any, b: any) => number): any;
    public sort(as: SortAs, order: SortOrder, field?: string | number): void;
    public sort(sort: DataSortInfo): void;
    /**
     * @internal
     */
    public sort(as, order?: SortOrder, field?: string | number): void {
        if(!this.filteredData) return;
        if (as instanceof Function) {
            this.filteredData.sort(as);
            this.firstPage();
        }
        const psi = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
        this._sortSubject.next(psi);
    }

    private _updatePagingInfo() {
        this.pagingInfo.totalRecord = this.filteredData.length;
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
        this._updatePagingInfo();

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
        if(this.pagingInfo.pageSize == Infinity) {
            super.fromArray(this.filteredData);
        } else {
            const begin = (this.pagingInfo.currentPage - 1) * this.pagingInfo.pageSize;
            const end = this.pagingInfo.currentPage * this.pagingInfo.pageSize < this.pagingInfo.totalRecord ? this.pagingInfo.currentPage * this.pagingInfo.pageSize : this.pagingInfo.totalRecord;
            super.fromArray(this.filteredData.slice(begin, end));
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
        this.changePage(this.pagingInfo.totalPage);
    }

    public destroy() {
        super.destroy();
        this._filterSubject.unsubscribe();
        this._bakData = null;
        this.pagingInfo.unsubscribe();
        this.pagingInfo = null;
        this.filteredData = null;
    }
}
