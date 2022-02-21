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
    EventEmitter
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

// 此处不能使用箭头函数
const transferFilterFunction = function (item) {
    let listResult = true;
    let keyResult = true;
    if (this.selectedItems) {
        if (this.selectedItems.some(si => CommonUtils.compareWithKeyProperty(item, si, this.trackItemBy))) {
            listResult = false;
        }
    }
    if (this.keyword !== null && this.keyword !== undefined) {
        keyResult = LocalPageableArray.filterItemByKeyword(item, this.keyword, this.fields);
    }
    return listResult && keyResult;
};

const transferServerFilterFunction = function (item) {
    function compareWithKeyProperty(item1: any, item2: any, trackItemBy: string[]): boolean {
        if (trackItemBy && trackItemBy.length > 0) {
            for (let i = 0; i < trackItemBy.length; i++) {
                if (!item1 || !item2) {
                    // 过滤掉 typeof null == 'object'
                    return false;
                } else if (typeof item1 === 'object' && typeof item2 === 'object') {
                    if (item1[trackItemBy[i]] != item2[trackItemBy[i]]) {
                        return false;
                    }
                } else if (typeof item1 !== 'object' && typeof item2 === 'object') {
                    if (item1 != item2[trackItemBy[i]]) {
                        return false;
                    }
                } else if (typeof item1 === 'object' && typeof item2 !== 'object') {
                    if (item1[trackItemBy[i]] != item2) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            return item1 == item2;
        }
    }

    let listResult = true;
    let keyResult = true;
    if (this.selectedItems && this.selectedItems.length && typeof this.selectedItems[0] == 'object') {
        const itemJson = Object.create(null);
        Object.keys(this.selectedItems[0]).forEach((k, i) => {
            itemJson[k] = item[i];
        });
        if (this.selectedItems.some(si => compareWithKeyProperty(itemJson, si, this.trackItemBy))) {
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
    //changeDetection: ChangeDetectionStrategy.OnPush
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
                        this._removeFilterSubscriber = value.pagingInfo.subscribe(() => {
                            this.sourceComponent._$data = new ArrayCollection(value)
                            this.targetComponent._$data = this.selectedItems;
                        })
                        this.sourceComponent.dataFilter(value, this.selectedItems)
                    }
                } else if (value instanceof ArrayCollection) {
                    const data = new LocalPageableArray<listOption>();
                    data.pagingInfo.pageSize = Infinity;

                    const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
                        removeUpdateSubscriber.unsubscribe();
                        this._data = data;
                        this._removeFilterSubscriber = this.data.pagingInfo.subscribe(() => {
                            this.sourceComponent._$data = new ArrayCollection(this.data)
                            this.targetComponent._$data = this.selectedItems;
                        })
                        this.sourceComponent.dataFilter(this.data, this.selectedItems)
                    });
                    data.fromArray(value);
                    value.onRefresh(() => {
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
                    if (value instanceof LocalPageableTableData) {
                        this._data = value;
                        if (this._removePageableCallbackListener) {
                            this._removePageableCallbackListener();
                        }
                        this._removePageableCallbackListener = value.onAjaxComplete(() => {
                            this._removeFilterSubscriber = value.pagingInfo.subscribe(() => {
                                this._$viewData = new TableData();
                                this._$viewData.fromObject({ data: value.data, field: value.field, header: value.header })
                                this.sourceComponent._$data = this._$viewData;
                                this.targetComponent._$data = this.selectedItems;
                            })
                            this.sourceComponent.dataFilter(value, this.selectedItems)
                        })
                    }
                    this._data = value;
                    this._$viewData = this.data;
                } else if (value instanceof TableData) {
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
        })
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
        this._selectedItems = value;
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
    public valid: boolean;

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
        if (this.targetComponent._$selectedItems.length === this.sourceComponent._$validData.length) {
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
            this.data.pagingInfo.subscribe(() => {
                this.sourceComponent._$data = new ArrayCollection(this.data)
            })
            this.sourceComponent.searchFilter(this.data, this.selectedItems, $event)
        } else if (this.sourceRenderer === TransferTreeSourceRenderer) {
            this.sourceComponent._$data.fromObject(this.sourceComponent.searchFilter(this.data, this.selectedItems, $event));
            this.sourceComponent.update();
        } else if (this.sourceRenderer === TransferTableSourceRenderer) {
            this.data.pagingInfo.subscribe(() => {
                this._$viewData = new TableData();
                this._$viewData.fromObject({ data: this.data.data, field: this.data.field, header: this.data.header })
                this.sourceComponent._$data = this._$viewData;
                this.sourceComponent.additionalData.reset();
                this.sourceComponent.additionalData.refresh();
            })
            this.sourceComponent.searchFilter(this.data, this.selectedItems, $event)
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
        this.selectedItemsChange.emit(this.selectedItems)
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
        this._$targetSearchKey = '';
        this.selectedItemsChange.emit(this.selectedItems)
    }

    /**
     * 更新transfer的样式信息
     * @internal
     */
    public _$transferClass: {};

    private _removePageableCallbackListener: CallbackRemoval;
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
    }
}

@NgModule({
    imports: [JigsawListModule, JigsawCheckBoxModule, PerfectScrollbarModule, JigsawInputModule, JigsawPaginationModule, CommonModule, TranslateModule, JigsawTransferRendererModule, JigsawCommonModule, JigsawSearchInputModule],
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
