import {debounceTime} from "rxjs/operators";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";
import {CallbackRemoval, CommonUtils} from "../utils/common-utils";

/**
 * 参考 `IAjaxComponentData.dataReviser`的说明
 */
export type DataReviser = (data: any) => any;

/**
 * `HttpClient`类的参数结构化信息类，与官方的参数结构完全兼容，这是对Angular的一些补充。
 *
 * $demo = /data-encapsulation/array-ssp
 */
export class HttpClientOptions {
    public url: string;
    public method?: 'get' | 'post' | 'put' | 'delete';
    /**
     * 当使用POST/PUT/DELETE请求时，参数必须放在这个属性里，这个属性的值（一个json对象）会被当做参数整体传输给服务端。
     */
    public body?: any;
    public headers?: HttpHeaders;
    public observe?: 'body' | 'events' | 'response';
    /**
     * 当使用GET请求时，参数必须放在这个属性里，会被当做url的一部分传输给服务端。
     * 这个属性的值（一个json对象）会被当做参数整体传输给服务端。
     *
     * $demo = /data-encapsulation/array-ssp
     */
    public params?: { [key: string]: any | any [] } | HttpParams;
    public reportProgress?: boolean;
    public responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    public withCredentials?: boolean;

    /**
     * Angular官方的`HttpClient`的`params`属性对象的键值对的值类型只支持字符串，而不支持数字，例如
     *
     * ```
     * const http: HttpClient = ...;
     * http.get({param: {num: 1}}); // compile error!
     * ```
     *
     * 这给我们传输数字给服务端的时候造成了一些麻烦，为了绕开这个麻烦，
     * 并且兼容官方，我们增加了一个`PreparedHttpClientOptions`类型的参数用于自动将数字转为字符串。
     * 通过这个静态方法就可以实现一键式的转换。一般Jigsaw内部使用，应用无需关注。
     *
     * @param {string | Object} options
     * @return {PreparedHttpClientOptions}
     */
    public static prepare(options: string | Object): PreparedHttpClientOptions {
        if (!options) {
            return;
        }
        if (typeof options === 'string') {
            options = {url: options, method: 'get'};
        }
        if (!options.hasOwnProperty('url')) {
            console.error('invalid http options, need a url property!');
            return;
        }
        const op = <any>options;
        const hco = new PreparedHttpClientOptions();
        hco.url = op.url;
        hco.method = options.hasOwnProperty('method') ? op.method : 'get';
        hco.body = op.body;
        hco.headers = op.headers;
        hco.observe = op.observe;
        hco.params = PreparedHttpClientOptions.prepareParams(op.params);
        hco.reportProgress = op.reportProgress;
        hco.responseType = op.responseType;
        hco.withCredentials = op.withCredentials;
        return hco;
    }
}

/**
 * 一般Jigsaw内部使用，应用无需关注，详情参考`HttpClientOptions.prepare`的说明。
 */
export class PreparedHttpClientOptions extends HttpClientOptions {
    public params?: { [key: string]: string | string[] } | HttpParams;

    public static prepareParams(params: any): { [key: string]: string | string[] } | HttpParams {
        if (params instanceof HttpParams) {
            return params;
        }
        const result: { [key: string]: string | string[] } = {};
        for (let p in params) {
            if (!params.hasOwnProperty(p)) {
                continue;
            }
            result[p] = typeof params[p] === 'object' ? JSON.stringify(params[p]) : params[p];
        }
        return result;
    }
}

/**
 * Jigsaw的数据总体分成两大分支：
 * - `ArrayCollection` 这个分支只关注数组类型的集合；
 * - `GeneralCollection` 这个分支只关注通用的key-value结构（即JSON对象）的集合；
 *
 * 每个分支下面都派生出许许多多的适合特定场景使用的数据对象，在使用Jigsaw组件的时候，按照自己的场景需要挑选合适的数据对象可以达到事半功倍的效果。
 *
 * 所有可用的数据对象可以查看<a onclick="location.hash = 'relationship'">数据关系图</a>小节。
 *
 * #### 主要数据接口介绍
 *
 * 本小节主要介绍Jigsaw数据对象中重要的接口，理解这些接口以及每个属性、方法的作用对使用好这些数据对象有着重要的帮助。
 *
 * 主要的接口包括：
 * - `IComponentData` 这是所有Jigsaw数据接口的根；
 * - `IAjaxComponentData` 实现了这个接口的数据对象都具备访问ajax的能力；
 * - `IPageable` 实现了这个接口的类都具备分页能力；
 * - `IServerSidePageable` 描述了服务端分页的更具体的接口，实现了这个接口的类就具备服务端分页的能力；
 * - `ISortable` 实现了这个接口的类就具备了数据排序的能力；
 * - `IFilterable` 实现了这个接口的类就具备了数据过滤的能力；
 * - `ISlicedData` 实现了这个接口的类就具备切片能力的数据；
 *
 * #### 常用数据对象介绍
 * - 数组对象
 *     - `ArrayCollection` 一个基础数组对象。
 *     - `PageableArray` 一个支持服务端分页、排序、过滤的数组对象。
 *     - `LocalPageableArray` 一个支持本地分页、排序、过滤的数组对象。
 * - 表格数据对象
 *     - `TableData` 一个基础的表格数据对象。
 *     - `PageableTableData` 一个支持服务端分页、排序、过滤的表格数据对象。
 *     - `LocalPageableTableData` 一个支持本地分页、排序、过滤的表格数据对象。
 *     - `BigTableData` 一个支持海量数据常数级呈现的表格数据对象。
 * - 图形数据对象
 *     - `GraphData` 通用的图形数据。
 *     - `PieGraphData` 通用的饼图数据。
 *     - `PieGraphDataByRow` 基于数据库表的行关系生成的饼图。
 *     - `PieGraphDataByColumn` 基于数据库表的列关系生成的饼图。
 *     - `LineBarGraphData` 通用的折线柱状图数据。
 * - 层次关系数据
 *     - `TreeData` 用于有层次关系的组件，包括树、鱼骨图等。
 * - 动态布局数据
 *     - `LayoutData` 用于动态布局页面的数据。
 *
 * 目前而言，Jigsaw在数组数据对象和表格数据对象方面的抽象程度较高，已经能够满足绝大部分场景，因此较为稳定。
 * 相对而言，图形数据、层次关系数据这2个方面还比较欠缺，后续需要进一步的抽象和扩展，也难免会引入一些破坏性修改。
 *
 * <a name="relationship"></a>
 * #### 数据关系图
 *
 * 下面这个图描述了Jigsaw的数据对象之间的关系，有点复杂，但是它对理解Jigsaw的数据之间的关系非常有帮助。
 *
 * 提示：单击图上的类名可转到它的api说明页面。
 *
 * <object type="image/svg+xml" data="/jigsaw/source/docs/image/comp-data-relationship.svg">
 * </object>
 *
 */
export interface IComponentData {
    /**
     * Angular的变化检测机制无法检测到我们对一个对象的某个属性所做的修改，例如我们将一个数组通过输入属性的方式绑定给了一个组件之后，
     * 直接在这个数组中插入一个元素，组件内部是难以获知这个变化的。`refresh()`这个方法就是为了解决这个问题而存在的，
     * 当你更新了数据之后，请务必调用一下这个方法以通知组件及时更新。
     *
     * **这是Jigsaw向性能妥协后的产物。**
     *
     * 我们都知道，Angular里没有了脏检查了，性能提升了没错，但是Angular开发团队却把问题留给了我们，组件内部只能感知到对象引用的变化，
     * 而无法感知到对象内部结构的变化。换句话说，应用直接修改复杂对象的内部结构的行为是没有高效的方式可以感知到的。
     * 因此他们也就无法采用最低廉的方式给Jigsaw发出通知，而Jigsaw在这个情况下也就无法及时更新视图了。
     *
     * 那为啥说这是向性能妥协的产物呢？前面我说了，angular是难以感知到对象的内部结构的变化，但是这不意味着angular做不到，
     * 实际上是能够做到的，通过`DoCheck`这个钩子，可以检测到任何变化，在这个钩子里，通过一些复杂的代码，是可以精确的筛选出这个变化的。
     * 但是这个事情的性能代价是非常昂贵，在IE11这个搓货上，体验会很差。经过相当长的纠结之后，我们决定放弃自动检测，
     * 和Angular团队一样，把问题丢给应用，**由应用在修改了对象内部结构后，通过`refresh()`方法来通知Jigsaw更新视图**。
     *
     * $demo = data-encapsulation/refresh
     */
    refresh(): void;

    /**
     * 数据销毁时要做的事情，往往由Jigsaw的各个组件使用，应用一般无需调用此方法。
     */
    destroy(): void;

    /**
     * 注册数据有更新时的处理逻辑，往往由Jigsaw的各个组件使用，应用一般无需调用此方法。
     */
    onRefresh(callback: (thisData: IComponentData) => void, context?: any): CallbackRemoval;
}

/**
 * 实现了这个接口的数据对象都具备访问ajax的能力
 */
export interface IAjaxComponentData extends IComponentData {
    /**
     * 当前数据对象是否正在进行网络请求，请求过程中值为true，否则为false。
     * 通常可以使用这个值与组件的disabled属性绑定使用，这样可以方便的实现网络请求过程中组件不可交互的目的。
     *
     * **注意**：当它的值为true时，此数据对象无法再次发起网络查询，控制台将出现错误打印。
     *
     * $demo = data-encapsulation/array-ssp
     */
    busy: boolean;

    /**
     * 这是一个函数，作用是在数据从服务端请求回来之后，对服务端返回的数据做修正，并返回修正后的数据。
     * 一般用于数据结构的转换或者数据的微调。
     *
     * $demo = data-encapsulation/array-ajax
     */
    dataReviser: DataReviser;

    /**
     * 通知组件数据向服务端发起一次获取数据的请求，在收到服务端返回的数据之后，绑定这个数据对象的组件会自动使用新收到的数据更新视图。
     *
     * $demo = data-encapsulation/array-ajax
     *
     * @param {string} url 采用GET方法请求这个服务，如果省略，则请求上一次指定的服务。
     * 提示：可以将参数放到url中带给服务端；如果需要采用POST等其他方法，请提供一个`HttpClientOptions`类型的参数。
     */
    fromAjax(url?: string): void;

    /**
     * @param {HttpClientOptions} options 指定了本次网络请求的各种参数，如果省略，则采用上一次请求所设置的参数。
     */
    fromAjax(options?: HttpClientOptions): void;

    /**
     * Ajax请求开始的时候，执行`callback`函数，一般可以在这个函数里触发loading效果。
     *
     * $demo = data-encapsulation/ajax-events
     *
     * @param {() => void} callback 回调函数，必选
     * @param context 回调函数`callback`执行的上下文，可选
     * @returns {CallbackRemoval} 返回一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    onAjaxStart(callback: () => void, context?: any): CallbackRemoval;

    /**
     * Ajax请求成功的时候，执行`callback`函数，一般需要在这个函数里停止loading效果。
     *
     * $demo = data-encapsulation/ajax-events
     *
     * @param {(data: any) => void} callback 回调函数
     * @param context 回调函数`callback`执行的上下文
     * @returns {CallbackRemoval} 返回一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    onAjaxSuccess (callback: (data: any) => void, context?: any): CallbackRemoval;

    /**
     * Ajax请求失败的时候，执行`callback`函数，一般需要在这个函数里停止loading效果。
     *
     * $demo = data-encapsulation/ajax-events
     *
     * @param {(data: any) => void} callback 回调函数
     * @param context 回调函数`callback`执行的上下文
     * @returns {CallbackRemoval} 返回一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    onAjaxError(callback: (error: Response) => void, context?: any): CallbackRemoval;

    /**
     * Ajax请求结束的时候，执行`callback`函数。由于`HttpClient`在调用了无效的url的时候不会触发对应事件导致注册在这个事件上的回调没有被执行，
     * 因此为了稳妥起见，请在`onAjaxSuccess`和`onAjaxError`里同时注册ajax请求的结果处理逻辑。
     *
     * $demo = data-encapsulation/ajax-events
     *
     * @param {(data: any) => void} callback 回调函数
     * @param context 回调函数`callback`执行的上下文
     * @returns {CallbackRemoval} 返回一个函数，调用它后，`callback`则不会再次被触发。
     * 如果你注册了这个回调，则请在组件的`ngOnDestroy()`方法中调用一下这个函数，避免内存泄露。
     */
    onAjaxComplete(callback: () => void, context?: any): CallbackRemoval;
}

/**
 * 实现了这个接口的类都具备分页能力，分页能力主要有两种，分别是本地分页和服务端分页，其中：
 * - **本地分页** 数据全量保存在浏览器内存中，分页过程在浏览器本地内存中完成，不涉及到服务端请求过程，
 * 由于浏览器内存的限制导致数据量不可能太大，因此一般很少会使用这样的分页方式，仅在特定的简单场景中使用；
 * - **服务端分页** 数据全量保存在服务端，分页过程在服务端完成，因此分页过程需要与服务端发生ajax交互。
 * 这是最主要最常用的分页方式，可以适用于几乎所有的的分页场景。
 */
export interface IPageable extends IAjaxComponentData {
    /**
     * 分页信息
     */
    pagingInfo: PagingInfo;

    /**
     * 设置数据对象的当前页为`currentPage`。
     *
     * @param {number} currentPage 新的当前页序号，从1开始
     * @param {number} pageSize 新的单页记录数，可选，不提供则不改变单页记录数。
     */
    changePage(currentPage: number, pageSize?: number): void;

    /**
     * @param {PagingInfo} info 当前页的结构化信息
     */
    changePage(info: PagingInfo): void;

    /**
     * 直接跳转到第一页
     */
    firstPage(): void;

    /**
     * 跳转到前一页
     */
    previousPage(): void;

    /**
     * 跳转到下一页
     */
    nextPage(): void;

    /**
     * 跳转到最后一页
     */
    lastPage(): void;
}

/**
 * 描述了服务端分页的更具体的接口，实现了这个接口的类就具备服务端分页的能力。
 */
export interface IServerSidePageable extends IPageable {
    /**
     * 更新数据源信息，一个分页数据对象在查询条件发生变化之后，可以通过调用这个方法来更新数据的查询条件。
     * 注意，在切换分页的时候，这些查询条件会发送给服务端，以确保能够查询到正确的数据。
     *
     * @param {HttpClientOptions} options 数据源的结构化信息，需要通过POST等方式请求时，必须提供此类参数
     */
    updateDataSource(options: HttpClientOptions): void;

    /**
     * @param {string} url 数据源的url，查询参数可以在url的query区中提供，只支持GET方式请求。
     */
    updateDataSource(url: string): void;
}

/**
 * 实现了这个接口的类就具备了数据排序的能力，数据排序能力分两种，分别是本地排序和服务端排序，含义和本地分页以及服务端分页类似。
 */
export interface ISortable extends IAjaxComponentData {
    /**
     * 排序信息
     */
    sortInfo: DataSortInfo;

    /**
     * 对数据进行排序。
     *
     * $demo = table/sortable
     *
     * @param {(a: any[], b: any[]) => number} compareFn 对比函数，此函数需要返回 -1 / 0 / 1，分别表示小于等于和大于
     */
    sort(compareFn?: (a: any[], b: any[]) => number): void;

    /**
     * $demo = table/sortable
     *
     * @param {SortAs} as 作为数字/字符串类型来排序
     * @param {SortOrder} order 排序顺序
     * @param {string | number} field 对此字段进行排序
     */
    sort(as: SortAs, order: SortOrder, field: string | number): void;

    /**
     * $demo = table/sortable
     *
     * @param {DataSortInfo} sort 排序参数的结构化信息
     */
    sort(sort: DataSortInfo): void;
}

/**
 * 实现了这个接口的类就具备了数据过滤的能力，数据过滤能力分两种，分别是本地过滤和服务端过滤，含义和本地分页以及服务端分页类似。
 */
export interface IFilterable extends IAjaxComponentData {
    /**
     * 过滤信息
     */
    filterInfo: DataFilterInfo;

    /**
     * 对数据进行过滤。
     *
     * $demo = combo-select/searchable
     *
     * @param {(value: any, index: number, array: any[]) => any} compareFn 实行过滤的函数。
     * 返回有效值时，该值会被保留，否则该值被丢弃
     * @param thisArg 执行过滤函数的上下文对象
     * @returns {any} 返回一个过滤后的新对象，原对象不变
     */
    filter(compareFn: (value: any, index: number, array: any[]) => any, thisArg?: any): any;

    /**
     * $demo = combo-select/searchable
     *
     * @param {string} term 过滤关键字
     * @param {(string | number)[]} fields 对这些字段进行过滤
     */
    filter(term: string, fields?: (string | number)[]): void;

    /**
     * $demo = combo-select/searchable
     *
     * 过滤参数的结构化信息
     * @param {DataFilterInfo} term
     */
    filter(term: DataFilterInfo): void;
}

/**
 * 一个抽象的视口数据，记录了这些信息：
 * - 视口尺寸：`width` / `height`
 * - 视口所处区域的尺寸：`maxWidth` / `maxHeight`
 * - 视口左上角位置：`horizontalTo` / `verticalTo`
 */
export class ViewportData {
    /**
     * 视口当前的宽度值
     */
    width: number;
    /**
     * 视口当前的高度值
     */
    height: number;

    /**
     * 视口所处区域的最大宽度值
     */
    maxWidth: number;
    /**
     * 视口所处区域的最大高度值
     */
    maxHeight: number;

    /**
     * 视口的左上角当前处于全局的水平位置，从0开始计数。
     */
    horizontalTo: number;
    /**
     * 视口的左上角当前处于全局的垂直位置，从0开始计数。
     */
    verticalTo: number;
}

/**
 * 具备切片能力的数据，这种数据对象往往数据量非常巨大，并且需要非常高的渲染性能，已知的实现类有`BigTableData`。
 */
export interface ISlicedData extends IComponentData {
    /**
     * 视口数据
     */
    viewport: ViewportData;

    /**
     * 将视口中的视图滚动到参数指定的位置
     *
     * @param {number} verticalTo 水平位置
     * @param {number} horizontalTo 垂直位置
     */
    scroll(verticalTo: number, horizontalTo: number): void;

    /**
     * 将视口中的视图在垂直方向上滚动到参数指定的位置
     *
     * @param {number} scrollTo 垂直位置
     */
    vScroll(scrollTo: number): void;

    /**
     * 将视口中的视图在水平方向上滚动到参数指定的位置
     *
     * @param {number} scrollTo 水平位置
     */
    hScroll(scrollTo: number): void;
}

export class DataRefreshCallback {
    constructor(public fn: (thisData: IComponentData) => void,
                public context?: any) {
        this.context = !!context ? context : fn;
    }
}

export class AjaxSuccessCallback {
    constructor(public fn: (data: any) => void,
                public context?: any) {
        this.context = !!context ? context : fn;
    }
}

export class AjaxErrorCallback {
    constructor(public fn: (error: Response) => void,
                public context?: any) {
        this.context = !!context ? context : fn;
    }
}

export class AjaxCompleteCallback {
    constructor(public fn: () => void,
                public context?: any) {
        this.context = !!context ? context : fn;
    }
}

export class ComponentDataHelper {
    private _getRemoval<T>(callbacks: T[], callback: T): CallbackRemoval {
        callbacks.push(callback);
        return () => {
            const idx = callbacks.indexOf(callback);
            if (idx != -1) {
                callbacks.splice(idx, 1);
            }
        }
    }

    private _timeout: any = null;
    private _refreshCallbacks: DataRefreshCallback[] = [];
    private _ajaxStartCallbacks: AjaxSuccessCallback[] = [];
    private _ajaxSuccessCallbacks: AjaxSuccessCallback[] = [];
    private _ajaxErrorCallbacks: AjaxSuccessCallback[] = [];
    private _ajaxCompleteCallbacks: AjaxSuccessCallback[] = [];

    public getAjaxStartRemoval(callback: AjaxSuccessCallback): CallbackRemoval {
        return this._getRemoval(this._ajaxStartCallbacks, callback);
    }

    public getAjaxSuccessRemoval(callback: AjaxSuccessCallback): CallbackRemoval {
        return this._getRemoval(this._ajaxSuccessCallbacks, callback);
    }

    public getAjaxErrorRemoval(callback: AjaxSuccessCallback): CallbackRemoval {
        return this._getRemoval(this._ajaxErrorCallbacks, callback);
    }

    public getAjaxCompleteRemoval(callback: AjaxSuccessCallback): CallbackRemoval {
        return this._getRemoval(this._ajaxCompleteCallbacks, callback);
    }

    public getRefreshRemoval(callback: DataRefreshCallback): CallbackRemoval {
        return this._getRemoval(this._refreshCallbacks, callback);
    }

    public invokeRefreshCallback(): void {
        if (this._timeout !== null) {
            return;
        }
        this._timeout = setTimeout(() => {
            this._timeout = null;
            this._refreshCallbacks.forEach(callback => CommonUtils.safeInvokeCallback(callback.context, callback.fn));
        }, 0);
    }

    public invokeAjaxStartCallback(): void {
        this._ajaxStartCallbacks.forEach(callback => CommonUtils.safeInvokeCallback(callback.context, callback.fn));
    }

    public invokeAjaxSuccessCallback(data: any): void {
        this._ajaxSuccessCallbacks.forEach(callback => CommonUtils.safeInvokeCallback(callback.context, callback.fn, [data]));
    }

    public invokeAjaxErrorCallback(error: Response): void {
        this._ajaxErrorCallbacks.forEach(callback => CommonUtils.safeInvokeCallback(callback.context, callback.fn, [error]));
    }

    public invokeAjaxCompleteCallback(): void {
        this._ajaxCompleteCallbacks.forEach(callback => CommonUtils.safeInvokeCallback(callback.context, callback.fn));
    }

    public clearCallbacks(): void {
        this._refreshCallbacks.splice(0, this._refreshCallbacks.length);
        this._ajaxStartCallbacks.splice(0, this._ajaxStartCallbacks.length);
        this._ajaxSuccessCallbacks.splice(0, this._ajaxSuccessCallbacks.length);
        this._ajaxErrorCallbacks.splice(0, this._ajaxErrorCallbacks.length);
        this._ajaxCompleteCallbacks.splice(0, this._ajaxCompleteCallbacks.length);
    }
}

/**
 * 分页信息，在各个属性发生变化后，可以对外发出通知，参考[这个demo]($demo=pagination/with-page-info)
 */
export class PagingInfo implements IEmittable {
    /**
     * 这个属性指定了统一的在服务端进行分页、排序、过滤的服务的url。
     * - 如果你有自己的实现，则请更改这个属性指向你提供的服务；
     * - 如果你没有自己的实现，则建议使用[RDK](https://github.com/rdkmaster/rdk)提供服务，
     * 我们也建议你尽量使用[RDK](https://github.com/rdkmaster/rdk)提供的这个服务；
     *
     * @type {string}
     */
    public static pagingServerUrl: string = '/rdk/service/app/common/paging';

    constructor(currentPage: number = 1,
                pageSize: number = 20,
                totalPage: number = 1,
                totalRecord: number = 0) {
        this._currentPage = currentPage;
        this._pageSize = pageSize;
        this._totalPage = totalPage;
        this.totalRecord = totalRecord;
    }

    private _currentPage: number = 1;
    private _pageSize: number = 20;
    private _totalPage: number = 1;

    /**
     * 总记录数
     * @type {number}
     */
    public totalRecord: number = 0;

    /**
     * 当前单页记录数
     *
     * $demo = pagination/with-page-info
     *
     * @return {number}
     */
    public get pageSize(): number {
        return this._pageSize;
    }

    public set pageSize(value: number) {
        if (isNaN(value) || value < 1) return;
        this._pageSize = value;
        this.emit();
    }

    /**
     * 当前页索引，从1开始计数。修改此属性后，`PagingInfo`会发出获取对应页数据的事件，通过`subscribe`添加监听器可处理此事件。
     *
     * $demo = pagination/with-page-info
     *
     * @return {number}
     */
    public get currentPage(): number {
        return this._currentPage;
    }

    public set currentPage(value: number) {
        if (isNaN(value) || value < 1 || value > this.totalPage) return;
        this._currentPage = value;
        this.emit();
    }

    /**
     * 总页数
     *
     * $demo = pagination/with-page-info
     *
     * @return {number}
     */
    public get totalPage(): number {
        return this.totalRecord && this.pageSize != Infinity ? Math.ceil(this.totalRecord / this.pageSize) : 1;
    }

    private _emitter = new EventEmitter<any>();

    public emit(value?: any): void {
        this._emitter.emit(value);
    }

    public subscribe(callback?: (value:any) => void): Subscription {
        return this._emitter.pipe(debounceTime(300)).subscribe(callback);
    }

    public unsubscribe() {
        this._emitter.unsubscribe();
    }

    /**
     * 获取分页数据的结构化信息
     *
     * @return {any} 返回一个JSON对象
     */
    public valueOf(): any {
        return {
            totalRecord: this.totalRecord, currentPage: this.currentPage,
            pageSize: this.pageSize, totalPage: this.totalPage
        }
    }
}

/**
 * 数据过滤信息，是数据过滤参数的结构化信息类
 *
 * $demo = combo-select/searchable
 */
export class DataFilterInfo {
    constructor(/**
                 * 过滤关键字
                 *
                 * @type {string}
                 */
                public key: string = '',
                /**
                 * 在这些字段中过滤
                 */
                public field?: string[] | number[],
                /**
                 * 过滤函数源码，主要是传给服务端做自定义过滤用的
                 */
                public rawFunction?: string,
                /**
                 * `rawFunction`执行时的上下文
                 */
                public context?: any
                ) {
    }
}

/**
 * 表示将数据以何种类型来排序。当被排序的对象是一串数字时，以何种类型对他们进行排序对排序的结果会有较大影响。
 *
 * 例如 `2` 和 `11` 这两个数据，在以数字方式降序排序时的顺序是 `2` -> `11`，
 * 但是以字符串方式降序排序时的顺序是 `11` -> `2`，排序结果截然相反。
 *
 * $demo = table/sortable
 */
export enum SortAs {
    string, number
}

/**
 * 表示排序顺序，分别是升序、降序、默认序
 *
 * $demo = table/sortable
 */
export enum SortOrder {
    asc, desc, default
}

/**
 * 数据排序信息，是数据排序参数的结构化信息类
 *
 * $demo = table/sortable
 */
export class DataSortInfo {
    constructor(public as: SortAs = SortAs.string,
                public order: SortOrder | string = SortOrder.asc,
                public field: string | number) {
    }
}

/**
 * 实现了此接口的类都具备事件发送和监听的能力，Jigsaw有类型繁多的组件数据封装类，他们大多都实现了此接口。
 * 可以利用这些数据类的事件交互能力传递事件，这样可以避免应用自己定义和维护事件发射器，
 * 从而大大减少你的视图交互逻辑。
 */
export interface IEmittable {
    /**
     * 通过这个方法来发出一个事件。注意，你需要在此之前先调用`subscribe`方法注册监听器，
     * 否则此事件可能无法被正确捕获和处理。示例：
     *
     * ```
     * const td = new TableData();
     * td.subscribe(data => console.log(data));
     * ...
     * td.emit('hello event emitter!');
     * ```
     *
     * @param value 此事件所携带的数据
     */
    emit(value?: any): void;

    /**
     * 添加事件处理函数，在执行此函数之后，`emit`函数发出事件时，参数`callback`就会被调用。
     * 注意请及时清理掉不必要的订阅以提升页面性能。示例：
     *
     * ```
     * const td = new TableData();
     * const subscriber = td.subscribe(data => console.log(data));
     * ...
     * // 注销本次订阅。其他的订阅不受影响
     * subscriber.unsubscribe();
     * ...
     * // 取消所有订阅
     * td.unsubscribe();
     * ```
     *
     * @param {Function} callback 事件回调函数
     * @returns {Subscription} 返回当前订阅的回执，利用它可以取消本次订阅
     */
    subscribe(callback?: (value:any) => void): Subscription;

    /**
     * 取消当前对象上的所有订阅，执行它之后，任何事件监听器都将会失效。
     */
    unsubscribe();
}

export function serializeFilterFunction(filter: Function): string {
    if (!filter) {
        return undefined;
    }
    let funcString = filter.toString();
    if (!funcString.match(/(const|var|let)\s+_this\s*=\s*this\b/)) {
        // 在函数的开头添加一行 `var _this = this;`
        funcString = funcString.replace(/{/, '{\nvar _this = this;\n');
    }
    return funcString;
}
