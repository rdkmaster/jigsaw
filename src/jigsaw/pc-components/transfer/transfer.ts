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
    ChangeDetectionStrategy
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { animate, keyframes, style, transition, trigger } from "@angular/animations"
import { Subscription } from "rxjs/internal/Subscription";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { JigsawListModule } from "../list-and-tile/list";
import { JigsawCheckBoxModule } from "../checkbox/index";
import { ArrayCollection, LocalPageableArray, PageableArray } from "../../common/core/data/array-collection";
import { JigsawInputModule } from "../input/input";
import { CallbackRemoval, CommonUtils } from "../../common/core/utils/common-utils";
import { JigsawPaginationModule } from "../pagination/pagination";
import { InternalUtils } from "../../common/core/utils/internal-utils";
import { LoadingService } from "../../common/service/loading.service";
import { TranslateHelper } from "../../common/core/utils/translate-helper";
import { RequireMarkForCheck } from "../../common/decorator/mark-for-check";
import { WingsTheme, JigsawCommonModule, AbstractJigsawComponent } from "../../common/common";
import { SimpleTreeData } from '../../common/core/data/tree-data';
import { TableData, LocalPageableTableData, PageableTableData } from '../../common/core/data/table-data';
import { listOption, TransferListSourceRenderer, TransferListTargetRenderer, TransferTreeSourceRenderer, TransferTableSourceRenderer, TransferTableTargetRenderer, JigsawTransferRendererModule } from './renderer/transfer-renderer';
import { JigsawSearchInputModule } from '../input/search-input';
import { CheckBoxStatus } from '../checkbox/typings';
import { JigsawArray } from "../../common/core/utils/data-collection-utils";
import { JigsawLoadingModule } from 'jigsaw/common/components/loading/loading';

// 此处不能使用箭头函数
const transferFilterFunction = function (item) {
    let listResult = true;
    let keyResult = true;
    if (this.selectedItems) {
        if (this.selectedItems.some(si => CommonUtils.compareValue(item, si, this.trackItemBy))) {
            listResult = false;
        }
    }
    if (this.keyword !== null && this.keyword !== undefined) {
        keyResult = LocalPageableArray.filterItemByKeyword(item, this.keyword, this.fields);
    }
    return listResult && keyResult;
};

const transferServerFilterFunction = function (item) {
    function isUndefined(value) {
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
    let keyResult = true;
    if (this.selectedItems && this.selectedItems.length && typeof this.selectedItems[0] == 'object') {
        const itemJson = Object.create(null);
        Object.keys(this.selectedItems[0]).forEach((k, i) => {
            itemJson[k] = item[i];
        });
        if (this.selectedItems.some(si => compareValue(itemJson, si, this.trackItemBy))) {
            listResult = false;
        }
    }
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

const transferTableFilterFunction = function (item) {
    const trackItemByfiledIndex = this.field.findIndex(item => { return item === this.trackItemBy })
    const labelFieldfiledIndex = this.field.findIndex(item => { return item === this.labelField })

    if (trackItemByfiledIndex === -1) {
        console.warn("trackItemBy值在filed中未找到！")
        return;
    }

    if (labelFieldfiledIndex === -1) {
        console.warn("labelField值在filed中未找到！")
        return;
    }

    let listResult = true;
    let keyResult = true;

    if (this.selectedItems) {
        if (this.selectedItems.some(si => CommonUtils.compareValue(item[trackItemByfiledIndex], si[this.trackItemBy]))) {
            listResult = false;
        }
    }
    if (this.keyword !== null && this.keyword !== undefined) {
        const value: string = !item || item[labelFieldfiledIndex] === undefined || item[labelFieldfiledIndex] === null ? '' : item[labelFieldfiledIndex].toString();
        return value.toLowerCase().includes(this.keyword.toLowerCase());
    }
    return listResult && keyResult;
};

const transferTableServerFilterFunction = function (item) {
    function isUndefined(value) {
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

    const trackItemByfiledIndex = this.data.field.findIndex(item => { return item === this.trackItemBy })
    const labelFieldfiledIndex = this.data.field.findIndex(item => { return item === this.labelField })

    if (trackItemByfiledIndex === -1) {
        console.warn("trackItemBy值在filed中未找到！")
        return;
    }

    if (labelFieldfiledIndex === -1) {
        console.warn("labelField值在filed中未找到！")
        return;
    }

    let listResult = true;
    let keyResult = true;

    if (this.selectedItems) {
        if (this.selectedItems.some(si => compareValue(item[trackItemByfiledIndex], si[this.trackItemBy]))) {
            listResult = false;
        }
    }

    if (this.keyword !== null && this.keyword !== undefined) {
        const value: string = !item || item[labelFieldfiledIndex] === undefined || item[labelFieldfiledIndex] === null ? '' : item[labelFieldfiledIndex].toString();
        return value.toLowerCase().includes(this.keyword.toLowerCase());
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
        protected _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector,
        protected componentFactoryResolver: ComponentFactoryResolver) {
        super();
    }

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
    public _$targetButton: boolean = false;

    /**
     * @internal
     */
    public _$sourceCheckbox: boolean = true;

    /**
     * @internal
     */
    public _$targetCheckbox: boolean = true;

    @ViewChild('transferSourceRendererHost', { read: ViewContainerRef })
    protected sourceRendererHost: ViewContainerRef;

    @ViewChild('transferTargetRendererHost', { read: ViewContainerRef })
    protected targetRendererHost: ViewContainerRef;

    public sourceComponent;
    public targetComponent;

    public sourceToggleButtonSubscribe: Subscription;
    public targetToggleButtonSubscribe: Subscription;

    public sourceSelectedItemsChangeSubscribe: Subscription;
    public targetSelectedItemsChangeSubscribe: Subscription;

    /**
     * 全选
     *
     * @internal
     */
    public _$sourceSelectAllChecked = CheckBoxStatus.unchecked;
    public _$targetSelectAllChecked = CheckBoxStatus.unchecked;

    /**
     * @internal
     */
    public _data: ArrayCollection<listOption> | any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data() {
        return this._data;
    }

    public set data(value) {
        this.runMicrotask(() => {
            let sourceComponentFactory;
            let targetComponentFactory;

            sourceComponentFactory = this.componentFactoryResolver.resolveComponentFactory(this.sourceRenderer);
            targetComponentFactory = this.componentFactoryResolver.resolveComponentFactory(this.targetRenderer);

            const sourceComponentRef = this.sourceRendererHost.createComponent(sourceComponentFactory);
            const targetComponentRef = this.targetRendererHost.createComponent(targetComponentFactory);
            this.sourceComponent = sourceComponentRef.instance;
            this.targetComponent = targetComponentRef.instance;
            this.sourceComponent.transferHost = this;
            this.targetComponent.transferHost = this;

            this.sourceComponent.labelField = CommonUtils.isDefined(this.labelField) ? this.labelField : this.sourceComponent.labelField;
            this.targetComponent.labelField = CommonUtils.isDefined(this.labelField) ? this.labelField : this.targetComponent.labelField;

            this.sourceComponent.subLabelField = CommonUtils.isDefined(this.subLabelField) ? this.subLabelField : this.sourceComponent.subLabelField;
            this.targetComponent.subLabelField = CommonUtils.isDefined(this.subLabelField) ? this.subLabelField : this.targetComponent.subLabelField;

            this.sourceComponent.trackItemBy = CommonUtils.isDefined(this.trackItemBy) ? this.trackItemBy : this.sourceComponent.trackItemBy;
            this.targetComponent.trackItemBy = CommonUtils.isDefined(this.trackItemBy) ? this.trackItemBy : this.targetComponent.trackItemBy;

            this._$sourceCheckbox = this.sourceComponent._$setting.selectAll;
            this._$targetCheckbox = this.targetComponent._$setting.selectAll;

            this.sourceSelectedItemsChangeSubscribe = this.sourceComponent.selectedItemsChange.subscribe(() => {
                this._checkSourceSelectAll();
            });
            this.targetSelectedItemsChangeSubscribe = this.targetComponent.selectedItemsChange.subscribe(() => {
                this._checkTargetSelectAll();
            });

            if (this.sourceRenderer === TransferListSourceRenderer) {
                if (value instanceof LocalPageableArray || value instanceof PageableArray) {
                    this.sourceComponent.filterFunction = this._getFilterFunction('list', value instanceof PageableArray ? 'server' : 'local', false);
                    this.targetComponent.filterFunction = this._getFilterFunction('list', value instanceof PageableArray ? 'server' : 'local', true);
                    if (value instanceof LocalPageableArray) {
                        this._data = value;
                        if (this._removePageableCallbackListener) {
                            this._removePageableCallbackListener();
                        }
                        this._removePageableCallbackListener = value.onAjaxComplete(() => {
                            this._removeFilterSubscriber = value.pagingInfo.subscribe(() => {
                                this.sourceComponent._$data = new ArrayCollection(value)
                                this.targetComponent._$data = this.selectedItems;
                            })
                            this.sourceComponent.dataFilter(value, this.selectedItems)
                        })
                    } else {
                        this._data = value;
                        value.onRefresh(() => {
                            this.sourceComponent._$data = new ArrayCollection(value)
                            this.targetComponent._$data = this.selectedItems;
                        })
                        this.sourceComponent.dataFilter(value, this.selectedItems)
                    }
                } else if (value instanceof ArrayCollection) {
                    this.sourceComponent.filterFunction = this._getFilterFunction('list', 'local', false);
                    this.targetComponent.filterFunction = this._getFilterFunction('list', 'local', true);
                    const data = new LocalPageableArray<listOption>();
                    data.pagingInfo.pageSize = Infinity;

                    const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
                        removeUpdateSubscriber.unsubscribe();
                        this._data = data;
                        if (this._removeFilterSubscriber) {
                            this._removeFilterSubscriber.unsubscribe();
                            this._removeFilterSubscriber = null;
                        }
                        this._removeFilterSubscriber = this.data.pagingInfo.subscribe(() => {
                            this.sourceComponent._$data = new ArrayCollection(this.data)
                            this.targetComponent._$data = this.selectedItems;
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
                    })
                } else {
                    console.warn("输入的数据结构与渲染器不匹配")
                }
            } else if (this.sourceRenderer === TransferTreeSourceRenderer) {
                if (value instanceof SimpleTreeData) {
                    this._data = value;
                    this.sourceComponent._$data.fromObject(this.sourceComponent.dataFilter(this.data, this.selectedItems));
                    this.sourceComponent.update();
                    this.targetComponent._$data = this.selectedItems;
                } else {
                    console.warn("输入的数据结构与渲染器不匹配")
                }
            } else if (this.sourceRenderer === TransferTableSourceRenderer) {
                if (value instanceof LocalPageableTableData || value instanceof PageableTableData) {
                    this.sourceComponent.filterFunction = this._getFilterFunction('table', value instanceof PageableTableData ? 'server' : 'local', false);
                    if (value instanceof LocalPageableTableData) {
                        this._data = value;
                        if (this._removePageableCallbackListener) {
                            this._removePageableCallbackListener();
                        }
                        this._removePageableCallbackListener = value.onAjaxComplete(() => {
                            this._removeFilterSubscriber = value.pagingInfo.subscribe(() => {
                                this.sourceComponent._$data = new TableData();
                                this.sourceComponent._$data.fromObject({ data: value.data, field: value.field, header: value.header })
                                this.targetComponent._$data = this.selectedItems;
                            })
                            this.sourceComponent.dataFilter(value, this.selectedItems)
                        })
                    } else {
                        this._data = value;
                        value.onRefresh(() => {
                            this._$viewData = new TableData();
                            this._$viewData.fromObject({ data: value.data, field: value.field, header: value.header })
                            this.sourceComponent._$data = this._$viewData;
                            this.targetComponent._$data = this.selectedItems;
                        })
                        this.sourceComponent.dataFilter(value, this.selectedItems)
                    }
                } else if (value instanceof TableData) {
                    this.sourceComponent.filterFunction = this._getFilterFunction('table', 'local', false);
                    const data = new LocalPageableTableData();
                    data.pagingInfo.pageSize = Infinity;
                    const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
                        removeUpdateSubscriber.unsubscribe();
                        this._data = data;
                        this._removeFilterSubscriber = this.data.pagingInfo.subscribe(() => {
                            this._$viewData = new TableData();
                            this._$viewData.fromObject({ data: this.data.data, field: this.data.field, header: this.data.header })
                            this.sourceComponent._$data = this._$viewData;
                            this.targetComponent._$data = this.selectedItems;
                        })
                        this.sourceComponent.dataFilter(this.data, this.selectedItems)
                    });
                    data.fromObject({ data: value.data, field: value.field, header: value.header });
                    value.onRefresh(() => {
                        data.fromObject({ data: value.data, field: value.field, header: value.header });
                        this.sourceComponent.dataFilter(this.data, this.selectedItems)
                    })
                } else {
                    console.warn("输入的数据结构与渲染器不匹配")
                }
            } else {
                this.sourceComponent._$data = value;
                this.targetComponent._$data = this.selectedItems;
            }

            this._changeDetectorRef.markForCheck();
        })
    }

    private _getFilterFunction(rendererType: 'list' | 'table' | 'tree', pagingType: 'local' | 'server', isTarget: boolean): (item: any) => boolean {
        if (rendererType == 'list') {
            if (isTarget) {
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
    @RequireMarkForCheck()
    @Input()
    public _$viewData: any;

    private _selectedItems: ArrayCollection<listOption> | any = [];

    @RequireMarkForCheck()
    @Input()
    public get selectedItems() {
        return this._selectedItems;
    }

    public set selectedItems(value: ArrayCollection<listOption> | any) {
        if (!(value instanceof Array) && !(value instanceof ArrayCollection)) {
            return;
        }
        if (value instanceof Array) {
            value = new ArrayCollection(value);
        }
        this._selectedItems = value;
        if (this._removeSelectedItemsChangeListener) {
            this._removeSelectedItemsChangeListener();
            this._removeSelectedItemsChangeListener = null;
        }
        this._removeSelectedItemsChangeListener = this._selectedItems.onRefresh(() => {
            this.sourceComponent.dataFilter(this.data, this.selectedItems)
        })
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
    public targetRenderer: any = TransferListTargetRenderer;

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
     * 选择结果发生变化时，向外面发送事件
     */
    @Output()
    public selectedItemsChange = new EventEmitter();

    /**
     * @internal
     */
    public _$infinity = Infinity;

    /**
     * @NoMarkForCheckRequired
     */
    public _$sourceSearchKey: string;
    public _$targetSearchKey: string;

    public getSourceItemsCount(): string {
        if (!this.sourceComponent || !this.sourceComponent._$validData) {
            return
        }
        const selectedItemsCount = this.sourceComponent._$selectedItems ? this.sourceComponent._$selectedItems.length : 0;
        return `${selectedItemsCount} / ${this.sourceComponent._$validData.length} 项`
    }

    public getTargetItemsCount(): string {
        if (!this.targetComponent || !this.targetComponent._$validData) {
            return
        }
        const selectedItemsCount = this.targetComponent._$selectedItems ? this.targetComponent._$selectedItems.length : 0;
        return `${selectedItemsCount} / ${this.targetComponent._$validData.length} 项`
    }

    private _checkSourceSelectAll() {
        this._$sourceButton = this.sourceComponent._$selectedItems.length > 0;
        this.sourceComponent.update();
        if (!this.sourceComponent._$selectedItems || this.sourceComponent._$selectedItems.length === 0) {
            this._$sourceSelectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this.sourceComponent._$selectedItems.length === this.sourceComponent._$validData.length) {
            this._$sourceSelectAllChecked = CheckBoxStatus.checked;
        } else {
            this._$sourceSelectAllChecked = CheckBoxStatus.indeterminate;
        }
    }

    private _checkTargetSelectAll() {
        this._$targetButton = this.targetComponent._$selectedItems.length > 0;
        this.targetComponent.update();
        if (!this.targetComponent._$selectedItems || this.targetComponent._$selectedItems.length === 0) {
            this._$targetSelectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this.targetComponent._$selectedItems.length === this.targetComponent._$validData.length) {
            this._$targetSelectAllChecked = CheckBoxStatus.checked;
        } else {
            this._$targetSelectAllChecked = CheckBoxStatus.indeterminate;
        }
    }

    /**
     * @internal
     */
    public _$sourceSelectAll() {
        this.sourceComponent.selectAll();
        this._$sourceButton = this.sourceComponent._$selectedItems.length > 0;
    }

    /**
     * @internal
     */
    public _$targetSelectAll() {
        this.targetComponent.selectAll();
        this._$targetButton = this.targetComponent._$selectedItems.length > 0;
    }

    /**
     * @internal
     */
    public _$sourceSearching($event) {
        if (this.sourceRenderer === TransferListSourceRenderer) {
            this.sourceComponent.searchFilter(this.data, this.selectedItems, $event, false)
        } else if (this.sourceRenderer === TransferTreeSourceRenderer) {
            this.sourceComponent._$data.fromObject(this.sourceComponent.searchFilter(this.data, this.selectedItems, $event, false));
            this.sourceComponent.update();
        } else if (this.sourceRenderer === TransferTableSourceRenderer) {
            this.data.pagingInfo.subscribe(() => {
                this._$viewData = new TableData();
                this._$viewData.fromObject({ data: this.data.data, field: this.data.field, header: this.data.header })
                this.sourceComponent._$data = this._$viewData;
                this.sourceComponent.additionalData.reset();
                this.sourceComponent.additionalData.refresh();
            })
            this.sourceComponent.searchFilter(this.data, this.selectedItems, $event, false)
        }
        this.sourceComponent._$selectedItems.splice(0, this.sourceComponent._$selectedItems.length)
        this._checkSourceSelectAll()
    }

    /**
     * @internal
     */
    public _$targetSearching($event) {
        this.targetComponent.searchFilter(this.selectedItems, $event);
        this.targetComponent._$selectedItems.splice(0, this.targetComponent._$selectedItems.length)
        this._checkTargetSelectAll()
    }

    public _$sourceTransfer() {
        if (!this._$sourceButton) {
            return
        }
        this.selectedItems.push(...this.sourceComponent._$selectedItems)
        if (this.sourceRenderer === TransferListSourceRenderer) {
            this.sourceComponent.dataFilter(this.data, this.selectedItems)
        } else if (this.sourceRenderer === TransferTreeSourceRenderer) {
            this.sourceComponent._$data.fromObject(this.sourceComponent.dataFilter(this.data, this.selectedItems));
            this.sourceComponent.update();
        } else if (this.sourceRenderer === TransferTableSourceRenderer) {
            this.sourceComponent.dataFilter(this.data, this.selectedItems)
            this.sourceComponent.additionalData.reset();
            this.sourceComponent.additionalData.refresh();
        }
        this.sourceComponent._$selectedItems.splice(0, this.sourceComponent._$selectedItems.length)
        this._checkSourceSelectAll();
        this._checkTargetSelectAll();
        this._$sourceSearchKey = '';
        this._$targetSearchKey = '';
        this.selectedItemsChange.emit(this.selectedItems)
        // this._changeDetectorRef.markForCheck();
    }

    public _$targetTransfer() {
        if (!this._$targetButton) {
            return
        }
        this.targetComponent._$selectedItems.forEach(selectedItem => {
            this.selectedItems.forEach((item, i) => {
                if (CommonUtils.compareValue(item, selectedItem, this.trackItemBy)) {
                    this.selectedItems.splice(i, 1);
                    return;
                }
            })
        })
        this.targetComponent._$selectedItems.splice(0, this.targetComponent._$selectedItems.length)
        if (this.sourceRenderer === TransferTreeSourceRenderer) {
            this.sourceComponent._$data.fromObject(this.sourceComponent.dataFilter(this.data, this.selectedItems));
            this.sourceComponent.update();
        } else {
            this.sourceComponent.dataFilter(this.data, this.selectedItems);
        }
        this._checkSourceSelectAll();
        this._checkTargetSelectAll();
        this._$sourceSearchKey = '';
        this._$targetSearchKey = '';
        this.selectedItemsChange.emit(this.selectedItems)
    }

    public _$sourcePageChanged(){

    }

    /**
     * 更新transfer的样式信息
     * @internal
     */
    public _$transferClass: {};

    private _removePageableCallbackListener: CallbackRemoval;
    private _removeSelectedItemsChangeListener: CallbackRemoval;
    private _removeInputDataChangeListener: CallbackRemoval;
    private _removeFilterSubscriber: Subscription;

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removePageableCallbackListener) {
            this._removePageableCallbackListener();
            this._removePageableCallbackListener = null;
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
    imports: [JigsawListModule, JigsawCheckBoxModule, PerfectScrollbarModule, JigsawInputModule, JigsawPaginationModule, CommonModule, TranslateModule, JigsawTransferRendererModule, JigsawCommonModule, JigsawSearchInputModule, JigsawLoadingModule],
    declarations: [JigsawTransfer],
    exports: [JigsawTransfer],
    providers: [TranslateService, LoadingService]
})
export class JigsawTransferModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'transfer', {
            zh: {
                items: '项',
                total: '共',
            },
            en: {
                items: 'Items',
                total: 'Total',
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            translateService.use(langInfo.curLang);
        });
    }
}
