import {
    ChangeDetectorRef,
    Component,
    Input,
    NgModule,
    OnDestroy,
    ViewChild,
    Injector,
    ComponentFactoryResolver,
    ViewContainerRef,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ComponentFactory,
    ComponentRef
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { animate, keyframes, style, transition, trigger } from "@angular/animations"
import { Subscription } from "rxjs";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { JigsawListModule } from "../list-and-tile/list";
import { JigsawCheckBoxModule } from "../checkbox/index";
import { ArrayCollection, LocalPageableArray, PageableArray } from "../../common/core/data/array-collection";
import { JigsawInputModule } from "../input/input";
import { CallbackRemoval, CommonUtils } from "../../common/core/utils/common-utils";
import { JigsawPaginationModule } from "../pagination/pagination";
import { LoadingService } from "../../common/service/loading.service";
import { TranslateHelper } from "../../common/core/utils/translate-helper";
import { RequireMarkForCheck } from "../../common/decorator/mark-for-check";
import { WingsTheme, JigsawCommonModule, AbstractJigsawComponent } from "../../common/common";
import { SimpleTreeData } from '../../common/core/data/tree-data';
import { TableData, LocalPageableTableData, PageableTableData } from '../../common/core/data/table-data';
import {
    ListOption,
    TransferListSourceRenderer,
    TransferListDestRenderer,
    TransferTreeSourceRenderer,
    TransferTableSourceRenderer,
    TransferTableDestRenderer, AbstractTransferRendererBase
} from './renderer/transfer-renderer';
import { JigsawSearchInputModule } from '../input/search-input';
import { CheckBoxStatus } from '../checkbox/typings';
import { JigsawLoadingModule } from '../../common/components/loading/loading';
import { JigsawTreeExtModule } from "../tree/tree-ext";
import { JigsawTableModule } from "../table/table";

/**
 * 此处不能使用箭头函数
 * 而且不能依赖任何外部函数、功能
 */
const transferFilterFunction = function (item: any): boolean {
    let listResult = true;
    if (this.selectedItems) {
        if (this.selectedItems.some(si => CommonUtils.compareValue(item, si, this.trackItemBy))) {
            listResult = false;
        }
    }
    let keyResult = true;
    if (this.keyword !== null && this.keyword !== undefined) {
        keyResult = LocalPageableArray.filterItemByKeyword(item, this.keyword, this.fields);
    }
    return listResult && keyResult;
};

/**
 * 此处不能使用箭头函数
 * 而且不能依赖任何外部函数、功能
 */
const transferServerFilterFunction = function (item: any): boolean {
    function isUndefined(value: any) {
        return value === undefined || value === null;
    }

    function compareValue(item1: any, item2: any, trackItemBy?: string[] | string): boolean {
        // 排除掉非法值和基础类型，如果比对的值是这两种之一的，则采用简单比较方式
        if (isUndefined(item1) || isUndefined(item2)) {
            return item1 == item2;
        }
        const typeOfItem1 = typeof item1, typeOfItem2 = typeof item2;
        if (typeOfItem1 == 'string' || typeOfItem1 == 'boolean' || typeOfItem1 == 'number' ||
            typeOfItem2 == 'string' || typeOfItem2 == 'boolean' || typeOfItem2 == 'number') {
            return item1 == item2;
        }

        // 对数组类型，认为应该比较各自包含的元素，即不把数组当做对象去比较，因此数组与非数组的比较没有意义
        const isArr1 = item1 instanceof Array;
        const isArr2 = item2 instanceof Array;
        if ((isArr1 && !isArr2) || (!isArr1 && isArr2)) {
            return false;
        }
        if (isArr1 && isArr2) {
            if (item1.length != item2.length) {
                // 不等长的数组必然不相等
                return false;
            }
            for (let i = 0, len = item1.length; i < len; i++) {
                if (!compareValue(item1[i], item2[i], trackItemBy)) {
                    return false;
                }
            }
            return true;
        }

        // 到这里说明item1和item2都是非数组的json对象了
        if (item1 === item2) {
            return true;
        }
        const trackBy: string[] = typeof trackItemBy == 'string' ? trackItemBy.split(/\s*,\s*/) : trackItemBy;
        if (!trackBy || trackBy.length == 0) {
            return item1 == item2;
        }
        for (let i = 0, len = trackBy.length; i < len; i++) {
            if (item1[trackBy[i]] != item2[trackBy[i]]) {
                return false;
            }
        }
        return true;
    }

    let listResult = true;
    if (this.selectedItems && this.selectedItems.length && typeof this.selectedItems[0] == 'object') {
        const itemJson = Object.create(null);
        Object.keys(this.selectedItems[0]).forEach((k, i) => {
            itemJson[k] = item[i];
        });
        if (this.selectedItems.some(si => compareValue(itemJson, si, this.trackItemBy))) {
            listResult = false;
        }
    }
    let keyResult = true;
    if (this.keyword !== null && this.keyword !== undefined) {
        if (typeof item == 'string') {
            keyResult = item.toLowerCase().includes(this.keyword.toLowerCase())
        } else if (this.fields) {
            keyResult = (<any[]>this.fields).find(field => {
                const value: string = !item || item[field] === undefined || item[field] === null ? '' : item[field].toString();
                return value.toLowerCase().includes(this.keyword.toLowerCase())
            })
        } else {
            keyResult = false
        }
    }
    return listResult && keyResult;
};

/**
 * 此处不能使用箭头函数
 * 而且不能依赖任何外部函数、功能
 */
const transferTableFilterFunction = function (item: any): boolean {
    const trackItemByFiledIndex = this.field.findIndex(item => item === this.trackItemBy);
    if (trackItemByFiledIndex === -1) {
        console.error("trackItemBy值在filed中未找到！")
        return;
    }

    const labelFieldFiledIndex = this.field.findIndex(item => item === this.labelField);
    if (labelFieldFiledIndex === -1) {
        console.error("labelField值在filed中未找到！")
        return;
    }

    let listResult = true;
    if (this.selectedItems) {
        if (this.selectedItems.some(si => CommonUtils.compareValue(item[trackItemByFiledIndex], si[this.trackItemBy]))) {
            listResult = false;
        }
    }
    let keyResult = true;
    if (this.keyword !== null && this.keyword !== undefined) {
        const value: string = !item || item[labelFieldFiledIndex] === undefined || item[labelFieldFiledIndex] === null ? '' : item[labelFieldFiledIndex].toString();
        keyResult = value.toLowerCase().includes(this.keyword.toLowerCase());
    }
    return listResult && keyResult;
};

/**
 * 此处不能使用箭头函数
 * 而且不能依赖任何外部函数、功能
 */
const transferTableServerFilterFunction = function (item: any): boolean {
    function isUndefined(value: any) {
        return value === undefined || value === null;
    }

    function compareValue(item1: any, item2: any, trackItemBy?: string[] | string): boolean {
        // 排除掉非法值和基础类型，如果比对的值是这两种之一的，则采用简单比较方式
        if (isUndefined(item1) || isUndefined(item2)) {
            return item1 == item2;
        }
        const typeOfItem1 = typeof item1, typeOfItem2 = typeof item2;
        if (typeOfItem1 == 'string' || typeOfItem1 == 'boolean' || typeOfItem1 == 'number' ||
            typeOfItem2 == 'string' || typeOfItem2 == 'boolean' || typeOfItem2 == 'number') {
            return item1 == item2;
        }

        // 对数组类型，认为应该比较各自包含的元素，即不把数组当做对象去比较，因此数组与非数组的比较没有意义
        const isArr1 = item1 instanceof Array;
        const isArr2 = item2 instanceof Array;
        if ((isArr1 && !isArr2) || (!isArr1 && isArr2)) {
            return false;
        }
        if (isArr1 && isArr2) {
            if (item1.length != item2.length) {
                // 不等长的数组必然不相等
                return false;
            }
            for (let i = 0, len = item1.length; i < len; i++) {
                if (!compareValue(item1[i], item2[i], trackItemBy)) {
                    return false;
                }
            }
            return true;
        }

        // 到这里说明item1和item2都是非数组的json对象了
        if (item1 === item2) {
            return true;
        }
        const trackBy: string[] = typeof trackItemBy == 'string' ? trackItemBy.split(/\s*,\s*/) : trackItemBy;
        if (!trackBy || trackBy.length == 0) {
            return item1 == item2;
        }
        for (let i = 0, len = trackBy.length; i < len; i++) {
            if (item1[trackBy[i]] != item2[trackBy[i]]) {
                return false;
            }
        }
        return true;
    }

    const trackItemByFiledIndex = this.field.findIndex(item => item === this.trackItemBy);
    if (trackItemByFiledIndex === -1) {
        console.error("trackItemBy值在filed中未找到！")
        return;
    }
    const labelFieldFiledIndex = this.field.findIndex(item => item === this.labelField);
    if (labelFieldFiledIndex === -1) {
        console.error("labelField值在filed中未找到！")
        return;
    }

    let listResult = true;
    if (this.selectedItems) {
        if (this.selectedItems.some(si => compareValue(item[trackItemByFiledIndex], si[this.trackItemBy]))) {
            listResult = false;
        }
    }

    let keyResult = true;
    if (this.keyword !== null && this.keyword !== undefined) {
        const value: string = !item || item[labelFieldFiledIndex] === undefined || item[labelFieldFiledIndex] === null ? '' : item[labelFieldFiledIndex].toString();
        keyResult = value.toLowerCase().includes(this.keyword.toLowerCase());
    }
    return listResult && keyResult;
};

const animations = [
    trigger('loading', [
        transition('void => *', [
            animate(300, keyframes([
                style({ opacity: 0 }),
                style({ opacity: 0.6 })
            ]))
        ]),
        transition('* => void', [
            animate(300, keyframes([
                style({ opacity: 0.6 }),
                style({ opacity: 0 })
            ]))
        ])
    ])];

@WingsTheme('transfer.scss')
@Component({
    selector: 'jigsaw-transfer, j-transfer',
    templateUrl: './transfer.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-transfer-host]': 'true',
        '[class.jigsaw-transfer-error]': '!valid'
    },
    animations,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class JigsawTransfer extends AbstractJigsawComponent implements OnDestroy {
    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _translateService: TranslateService) {
        super();
    }

    @ViewChild('transferSourceRendererHost', { read: ViewContainerRef })
    protected sourceRendererHost: ViewContainerRef;

    @ViewChild('transferDestRendererHost', { read: ViewContainerRef })
    protected destRendererHost: ViewContainerRef;

    public sourceComponent: AbstractTransferRendererBase;
    public destComponent: AbstractTransferRendererBase;

    public sourceToggleButtonSubscribe: Subscription;
    public sourceSelectedItemsChangeSubscribe: Subscription;
    public destSelectedItemsChangeSubscribe: Subscription;

    private _data: any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): any {
        return this._data;
    }

    public set data(value: any) {
        this.runMicrotask(() => {
            this._render();

            if (this.sourceRenderer === TransferListSourceRenderer) {
                if (value instanceof LocalPageableArray || value instanceof PageableArray) {
                    this.sourceComponent.filterFunction = this._getFilterFunction('list', value instanceof PageableArray ? 'server' : 'local', false);
                    this.destComponent.filterFunction = this._getFilterFunction('list', value instanceof PageableArray ? 'server' : 'local', true);
                    this._data = value;
                    this._$selectedItems.pagingInfo.pageSize = value.pagingInfo.pageSize;
                    if (this._removeOnChangeListener) {
                        this._removeOnChangeListener();
                        this._removeOnChangeListener = null;
                    }
                    this._removeOnChangeListener = value.onChange(() => {
                        this._refreshForPageableArray(value);
                        this.sourceComponent.reset();
                    })
                    this._refreshForPageableArray(value);
                } else if (value instanceof ArrayCollection || value instanceof Array) {
                    value = value instanceof Array ? new ArrayCollection(value) : value;
                    this._refreshForArray(value);
                } else {
                    console.error("输入的数据结构与渲染器不匹配")
                }
            } else if (this.sourceRenderer === TransferTreeSourceRenderer) {
                if (value instanceof SimpleTreeData) {
                    this._data = value;
                    if (this._removeOnChangeListener) {
                        this._removeOnChangeListener();
                        this._removeOnChangeListener = null;
                    }
                    this._removeOnChangeListener = value.onChange(() => {
                        this._refreshForTreeData(value);
                        this.sourceComponent.reset();
                    })
                    this._refreshForTreeData(value);
                    this.sourceComponent.reset();
                } else {
                    console.error("输入的数据结构与渲染器不匹配")
                }
            } else if (this.sourceRenderer === TransferTableSourceRenderer) {
                if (value instanceof LocalPageableTableData || value instanceof PageableTableData) {
                    this.sourceComponent.filterFunction = this._getFilterFunction('table', value instanceof PageableTableData ? 'server' : 'local', false);
                    this._data = value;
                    this._$selectedItems.pagingInfo.pageSize = value.pagingInfo.pageSize;
                    if (this._removeOnChangeListener) {
                        this._removeOnChangeListener();
                        this._removeOnChangeListener = null;
                    }
                    this._removeOnChangeListener = value.onChange(() => {
                        this._refreshForPageableTableData(value);
                        this.sourceComponent.reset();
                    })
                    this._refreshForPageableTableData(value);
                } else if (value instanceof TableData) {
                    this._refreshForTableData(value);
                } else {
                    console.error("输入的数据结构与渲染器不匹配")
                }
            } else {
                this.sourceComponent.data = value;
                this.destComponent.data = this.selectedItems;
            }

            if (this.sourceComponent) {
                this.sourceComponent.reset();
            }

            this.changeDetectorRef.markForCheck();
        })
    }

    private _render(): void {
        let sourceComponentFactory: ComponentFactory<any>;
        let destComponentFactory: ComponentFactory<any>;

        sourceComponentFactory = this._componentFactoryResolver.resolveComponentFactory(this.sourceRenderer);
        destComponentFactory = this._componentFactoryResolver.resolveComponentFactory(this.destRenderer);

        this.sourceRendererHost.clear();
        this.destRendererHost.clear();

        const sourceComponentRef: ComponentRef<any> = this.sourceRendererHost.createComponent(sourceComponentFactory);
        const destComponentRef: ComponentRef<any> = this.destRendererHost.createComponent(destComponentFactory);

        this.sourceComponent = sourceComponentRef.instance;
        this.destComponent = destComponentRef.instance;
        this.sourceComponent.transferHost = this;
        this.destComponent.transferHost = this;
        this.sourceComponent.theme = this.theme;
        this.destComponent.theme = this.theme;

        this.sourceComponent.labelField = CommonUtils.isDefined(this.labelField) ? this.labelField : this.sourceComponent.labelField;
        this.destComponent.labelField = CommonUtils.isDefined(this.labelField) ? this.labelField : this.destComponent.labelField;

        this.sourceComponent.subLabelField = CommonUtils.isDefined(this.subLabelField) ? this.subLabelField : this.sourceComponent.subLabelField;
        this.destComponent.subLabelField = CommonUtils.isDefined(this.subLabelField) ? this.subLabelField : this.destComponent.subLabelField;

        this.sourceComponent.trackItemBy = CommonUtils.isDefined(this.trackItemBy) ? this.trackItemBy : this.sourceComponent.trackItemBy;
        this.destComponent.trackItemBy = CommonUtils.isDefined(this.trackItemBy) ? this.trackItemBy : this.destComponent.trackItemBy;

        this._$sourceCheckbox = this.sourceComponent.setting.selectAll;
        this._$destCheckbox = this.destComponent.setting.selectAll;

        this.sourceSelectedItemsChangeSubscribe = this.sourceComponent.selectedItemsChange.subscribe((currentSelectedItems) => {
            this._checkSourceSelectAll();
            this.sourceChecked.emit(currentSelectedItems);
        });
        this.destSelectedItemsChangeSubscribe = this.destComponent.selectedItemsChange.subscribe((currentSelectedItems) => {
            this._checkDestSelectAll();
            this.destinationChecked.emit(currentSelectedItems);
        });
    }

    private _refreshForArray(value: ArrayCollection<any>): void {
        this.sourceComponent.filterFunction = this._getFilterFunction('list', 'local', false);
        const data = new LocalPageableArray<ListOption>();
        data.pagingInfo.pageSize = Infinity;

        const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
            removeUpdateSubscriber.unsubscribe();
            this._data = data;
            if (this._removeFilterSubscriber) {
                this._removeFilterSubscriber.unsubscribe();
                this._removeFilterSubscriber = null;
            }
            this._removeFilterSubscriber = this.data.pagingInfo.subscribe(() => {
                this.sourceComponent.data = new ArrayCollection(this.data)
                this.destComponent.data = this.selectedItems;
            })
            this.sourceComponent.dataFilter(this.data, this.selectedItems)
        });
        data.fromArray(value);
        if (this._removeInputDataChangeListener) {
            this._removeInputDataChangeListener();
            this._removeInputDataChangeListener = null;
        }
        this._removeInputDataChangeListener = value.onRefresh(() => {
            data.fromArray(value)
            this.sourceComponent.dataFilter(this.data, this.selectedItems)
            this.sourceComponent.reset();
            this._checkSourceSelectAll();
        });
    }

    private _refreshForPageableArray(data: LocalPageableArray<any> | PageableArray): void {
        if (this._removeOnRefreshListener) {
            this._removeOnRefreshListener();
            this._removeOnRefreshListener = null;
        }
        this._removeOnRefreshListener = data.onRefresh(() => {
            this.sourceComponent.data = new ArrayCollection(data);
            this.destComponent.data = this._$selectedItems;
        });
        this.sourceComponent.dataFilter(data, this.selectedItems)
    }

    private _refreshForPageableTableData(data: LocalPageableTableData | PageableTableData): void {
        if (this._removeOnRefreshListener) {
            this._removeOnRefreshListener();
            this._removeOnRefreshListener = null;
        }
        this._removeOnRefreshListener = data.onRefresh(() => {
            if (CommonUtils.isUndefined(this.sourceComponent.data)) {
                this.sourceComponent.data = new TableData();
            }
            this.sourceComponent.data.fromObject({ data: data.data, field: data.field, header: data.header })
            this.destComponent.data = this.selectedItems;
        });
        this.sourceComponent.dataFilter(data, this.selectedItems);
    }

    private _refreshForTableData(value: TableData): void {
        this.sourceComponent.filterFunction = this._getFilterFunction('table', 'local', false);
        const data = new LocalPageableTableData();
        data.pagingInfo.pageSize = Infinity;
        const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
            removeUpdateSubscriber.unsubscribe();
            this._data = data;
            if (this._removeFilterSubscriber) {
                this._removeFilterSubscriber.unsubscribe();
                this._removeFilterSubscriber = null;
            }
            this._removeFilterSubscriber = this.data.pagingInfo.subscribe(() => {
                if (CommonUtils.isUndefined(this.sourceComponent.data)) {
                    this.sourceComponent.data = new TableData();
                }
                this.sourceComponent.data.fromObject({ data: this.data.data, field: this.data.field, header: this.data.header })
                this.destComponent.data = this.selectedItems;
            })
            this.sourceComponent.dataFilter(this.data, this.selectedItems)
        });
        data.fromObject({ data: value.data, field: value.field, header: value.header });
        value.onRefresh(() => {
            data.fromObject({ data: value.data, field: value.field, header: value.header });
            this.sourceComponent.dataFilter(this.data, this.selectedItems);
            this.sourceComponent.additionalData.reset();
            this.sourceComponent.additionalData.refresh();
        });
    }

    private _refreshForTreeData(value: SimpleTreeData): void {
        this.sourceComponent.data = value;
        this.sourceComponent.update();
        this.sourceComponent.dataFilter(this.selectedItems, this.changeDetectorRef);
        this.destComponent.data = this.selectedItems;
    }

    private _getFilterFunction(rendererType: 'list' | 'table' | 'tree', pagingType: 'local' | 'server', isDest: boolean): (item: any) => boolean {
        if (rendererType == 'list') {
            if (isDest) {
                return transferFilterFunction
            }
            return pagingType == 'server' ? transferServerFilterFunction : transferFilterFunction;
        }
        if (rendererType == 'table') {
            return pagingType == 'server' ? transferTableServerFilterFunction : transferTableFilterFunction;
        }
        return null;
    }

    /**
     * @internal
     */
    public _$selectedItems: LocalPageableArray<ListOption> = new LocalPageableArray([]);

    @RequireMarkForCheck()
    @Input()
    public get selectedItems(): ArrayCollection<ListOption> | any[] {
        return this._$selectedItems.source;
    }

    public set selectedItems(value: ArrayCollection<ListOption> | any[]) {
        if (!(value instanceof Array) && !(value instanceof ArrayCollection)) {
            return;
        }

        if (value instanceof ArrayCollection) {
            if (this._removeOnValueRefreshListener) {
                this._removeOnValueRefreshListener();
                this._removeOnValueRefreshListener = null;
            }
            this._removeOnValueRefreshListener = value.onRefresh(() => {
                this._refreshForSelectedItems(value);
                this.sourceComponent.reset();
            })
        }
        
        this._refreshForSelectedItems(value);
    }

    private _refreshForSelectedItems(value: ArrayCollection<ListOption> | any[]): void {
        this._$selectedItems = new LocalPageableArray<ListOption>();
        this._$selectedItems.pagingInfo.pageSize = this.isPageable ? this.data.pagingInfo.pageSize : Infinity;
        this._$selectedItems.fromArray(value as any[]);

        if (this.destComponent) {
            this.destComponent.data = this._$selectedItems;
            this.destComponent.reset();
            this.sourceComponent.dataFilter(this.data, this.selectedItems);
        }

        if (this._removeSelectedItemsChangeListener) {
            this._removeSelectedItemsChangeListener();
            this._removeSelectedItemsChangeListener = null;
        }

        this._removeSelectedItemsChangeListener = this._$selectedItems.onRefresh(() => {
            this.sourceComponent.dataFilter(this.data, this.selectedItems)
            this.destComponent.reset();
            this._checkDestSelectAll();
        })

        this.changeDetectorRef.markForCheck();
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public sourceRenderer: any = TransferListSourceRenderer;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public destRenderer: any = TransferListDestRenderer;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public subLabelField: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public trackItemBy: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public valid: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public searchable: boolean = true;

    /**
     * 设置按钮不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     * $demo = transfer/disabled
     */
    private _disabled: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(value: boolean) {
        this._disabled = value;
    }

    /**
     * @internal
     */
    public _$sourceButton: boolean = false;

    /**
     * @internal
     */
    public _$destButton: boolean = false;

    /**
     * @internal
     */
    public _$sourceCheckbox: boolean = true;

    /**
     * @internal
     */
    public _$destCheckbox: boolean = true;

    /**
     * 全选
     *
     * @internal
     */
    public _$sourceSelectAllChecked = CheckBoxStatus.unchecked;

    /**
     * @internal
     */
    public _$destSelectAllChecked = CheckBoxStatus.unchecked;

    /**
     * 选择结果发生变化时，向外面发送事件
     */
    @Output()
    public selectedItemsChange = new EventEmitter();

    /**
     * 源数据的选中状态发生变化时，向外发送事件
     */
    @Output()
    public sourceChecked: EventEmitter<ArrayCollection<ListOption>> = new EventEmitter<ArrayCollection<ListOption>>();

    /**
     * 源数据的选中状态发生变化时，向外发送事件
     */
    @Output()
    public destinationChecked: EventEmitter<ArrayCollection<ListOption>> = new EventEmitter<ArrayCollection<ListOption>>();

    public get isPageable(): boolean {
        return this.data && this.data.pagingInfo && this.data.pagingInfo.pageSize != Infinity;
    }

    /**
     * @internal
     * @NoMarkForCheckRequired
     */
    public _$sourceSearchKey: string;

    /**
     * @internal
     * @NoMarkForCheckRequired
     */
    public _$destSearchKey: string;

    public get getSourceTitle(): string {
        if (!this.sourceComponent || !this.sourceComponent.validData) {
            return;
        }

        if (this.isPageable) {
            const selectedItemsCount = this.sourceComponent.currentSelectedItems ? this.sourceComponent.currentSelectedItems.length : 0;
            return `${selectedItemsCount} / ${this.sourceComponent.validData.length} ${this._translateService.instant('transfer.items')}`
        } else {
            const selectedItemsCount = this.sourceComponent.selectedItems ? this.sourceComponent.selectedItems.length : 0;
            return `${selectedItemsCount} / ${this.sourceComponent.validData.length} ${this._translateService.instant('transfer.items')}`
        }
    }

    public get getSourceSubTitle(): string {
        if (!this.sourceComponent || !this.sourceComponent.validData || !this.isPageable) {
            return
        }
        const selectedItemsCount = this.sourceComponent.selectedItems ? this.sourceComponent.selectedItems.length : 0;
        return `${selectedItemsCount} / ${this.data.pagingInfo.totalRecord} ${this._translateService.instant('transfer.items')}`
    }

    public get getDestTitle(): string {
        if (!this.destComponent || !this.destComponent.validData) {
            return
        }
        const selectedItemsCount = this.destComponent.selectedItems ? this.destComponent.selectedItems.length : 0;
        return `${selectedItemsCount} / ${this.destComponent.validData.length} ${this._translateService.instant('transfer.items')}`
    }

    private _checkSourceSelectAll(): void {
        this._$sourceButton = this.sourceComponent.selectedItems.length > 0;
        this.sourceComponent.update();
        if (CommonUtils.isUndefined(this.sourceComponent.currentSelectedItems)) {
            this._$sourceSelectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this.sourceComponent.currentSelectedItems.length === 0) {
            this._$sourceSelectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this.sourceComponent.currentSelectedItems.length === this.sourceComponent.validData.length) {
            this._$sourceSelectAllChecked = CheckBoxStatus.checked;
        } else {
            this._$sourceSelectAllChecked = CheckBoxStatus.indeterminate;
        }
    }

    private _checkDestSelectAll(): void {
        this._$destButton = this.destComponent.selectedItems.length > 0;
        this.destComponent.update();
        if (!this.destComponent.selectedItems || this.destComponent.selectedItems.length === 0) {
            this._$destSelectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this.destComponent.selectedItems.length === this.destComponent.validData.length) {
            this._$destSelectAllChecked = CheckBoxStatus.checked;
        } else {
            this._$destSelectAllChecked = CheckBoxStatus.indeterminate;
        }
    }

    /**
     * @internal
     */
    public _$sourceSelectAll(): void {
        this.sourceComponent.selectAll();
        this._$sourceButton = this.sourceComponent.selectedItems.length > 0;
        this.sourceChecked.emit(this.sourceComponent.selectedItems);
    }

    /**
     * @internal
     */
    public _$destSelectAll(): void {
        this.destComponent.selectAll();
        this._$destButton = this.destComponent.selectedItems.length > 0;
        this.destinationChecked.emit(this.destComponent.selectedItems);
    }

    /**
     * @internal
     */
    public _$sourceSearching($event: string): void {
        if (this.sourceRenderer === TransferListSourceRenderer) {
            this.sourceComponent.searchFilter(this.data, this.selectedItems, $event, false)
        } else if (this.sourceRenderer === TransferTreeSourceRenderer) {
            this.sourceComponent.searchFilter(this.selectedItems, $event, this.changeDetectorRef);
            this.sourceComponent.update();
        } else if (this.sourceRenderer === TransferTableSourceRenderer) {
            this.sourceComponent.searchFilter(this.data, this.selectedItems, $event, false)
            this.sourceComponent.additionalData.reset();
            this.sourceComponent.additionalData.refresh();
        }
        this.sourceComponent.selectedItems.splice(0, this.sourceComponent.selectedItems.length)
        this._checkSourceSelectAll();
    }

    /**
     * @internal
     */
    public _$destSearching($event: string): void {
        this.destComponent.searchFilter(this.selectedItems, $event);
        this.destComponent.selectedItems.splice(0, this.destComponent.selectedItems.length)
        this._checkDestSelectAll();
    }

    /**
     * @internal
     */
    public _$sourceTransfer(): void {
        if (!this._$sourceButton) {
            return
        }
        this.selectedItems.push(...this.sourceComponent.selectedItems);
        if (this.sourceRenderer === TransferListSourceRenderer) {
            this.sourceComponent.dataFilter(this.data, this.selectedItems);
        } else if (this.sourceRenderer === TransferTreeSourceRenderer) {
            this.sourceComponent.dataFilter(this.selectedItems, this.changeDetectorRef);
            this.sourceComponent.update();
        } else if (this.sourceRenderer === TransferTableSourceRenderer) {
            this.sourceComponent.dataFilter(this.data, this.selectedItems);
            this.sourceComponent.additionalData.reset();
            this.sourceComponent.additionalData.refresh();
        }
        this.sourceComponent.selectedItems.splice(0, this.sourceComponent.selectedItems.length)
        this._$selectedItems.fromArray(this.selectedItems as ListOption[]);
        // 等待_$selectedItems更新，是一次性操作
        const selectedItemsRefreshListener = this._$selectedItems.onRefresh(() => {
            selectedItemsRefreshListener();
            this._updateStatus();
            this.selectedItemsChange.emit(this.selectedItems)
        });
    }

    /**
     * @internal
     */
    public _$destTransfer(): void {
        if (!this._$destButton) {
            return
        }
        this.destComponent.selectedItems.forEach(selectedItem => {
            this.selectedItems.forEach((item, i) => {
                if (CommonUtils.compareValue(item, selectedItem, this.trackItemBy)) {
                    this.selectedItems.splice(i, 1);
                }
            });
        });
        this.destComponent.selectedItems.splice(0, this.destComponent.selectedItems.length)
        if (this.sourceRenderer === TransferTreeSourceRenderer) {
            this.sourceComponent.dataFilter(this.selectedItems, this.changeDetectorRef);
            this.sourceComponent.update();
        } else {
            this.sourceComponent.dataFilter(this.data, this.selectedItems);
        }
        this._$selectedItems.fromArray(this.selectedItems as ListOption[]);
        // 等待_$selectedItems更新，是一次性操作
        const selectedItemsRefreshListener = this._$selectedItems.onRefresh(() => {
            selectedItemsRefreshListener();
            this._updateStatus();
            this.selectedItemsChange.emit(this.selectedItems);
        });
    }

    private _updateStatus() {
        this._checkSourceSelectAll();
        this._checkDestSelectAll();
        this._$sourceSearchKey = '';
        this._$destSearchKey = '';
    }

    private _removeOnChangeListener: CallbackRemoval;
    private _removeOnRefreshListener: CallbackRemoval;
    private _removeOnValueRefreshListener: CallbackRemoval;
    private _removeSelectedItemsChangeListener: CallbackRemoval;
    private _removeInputDataChangeListener: CallbackRemoval;
    private _removeFilterSubscriber: Subscription;

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeOnChangeListener) {
            this._removeOnChangeListener();
            this._removeOnChangeListener = null;
        }
        if (this._removeOnRefreshListener) {
            this._removeOnRefreshListener();
            this._removeOnRefreshListener = null;
        }
        if (this._removeOnValueRefreshListener) {
            this._removeOnValueRefreshListener();
            this._removeOnValueRefreshListener = null;
        }
        if (this._removeFilterSubscriber) {
            this._removeFilterSubscriber.unsubscribe();
        }
        if (this._removeSelectedItemsChangeListener) {
            this._removeSelectedItemsChangeListener();
            this._removeSelectedItemsChangeListener = null;
        }
        if (this._removeInputDataChangeListener) {
            this._removeInputDataChangeListener();
            this._removeInputDataChangeListener = null;
        }
    }
}

@NgModule({
    imports: [
        JigsawTreeExtModule, JigsawTableModule, JigsawListModule, JigsawCheckBoxModule, PerfectScrollbarModule,
        JigsawInputModule, JigsawPaginationModule, CommonModule, TranslateModule.forChild(), JigsawCommonModule,
        JigsawSearchInputModule, JigsawLoadingModule
    ],
    declarations: [
        JigsawTransfer, TransferListSourceRenderer, TransferListDestRenderer, TransferTreeSourceRenderer,
        TransferTableSourceRenderer, TransferTableDestRenderer
    ],
    exports: [JigsawTransfer],
    providers: [TranslateService, LoadingService]
})
export class JigsawTransferModule {
    constructor() {
        TranslateHelper.initI18n('transfer', {
            zh: {
                items: '项',
                total: '共',
            },
            en: {
                items: 'Items',
                total: 'Total',
            }
        });
    }
}
