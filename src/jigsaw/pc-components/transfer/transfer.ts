import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    NgModule,
    OnDestroy,
    Optional,
    ViewChild,
    Injector,
    AfterViewInit,
    ComponentFactoryResolver,
    TemplateRef,
    ViewContainerRef,
    ElementRef,
    OnInit
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
import { GroupOptionValue } from "../list-and-tile/group-common";
import { AbstractJigsawGroupLiteComponent } from "../list-and-tile/group-lite-common";
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

export class JigsawTransfer extends AbstractJigsawComponent implements OnDestroy, OnInit {
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
            // console.log(this.sourceRenderer)
            // console.log(this.sourceRenderer === TransferListSourceRenderer)
            if (this.sourceRenderer === TransferListSourceRenderer) {
                if (value instanceof LocalPageableArray || value instanceof PageableArray) {
                    this._data = value;
                    this._$viewData = this.data;
                } else if (value instanceof ArrayCollection) {
                    const data = new LocalPageableArray<listOption>();
                    data.pagingInfo.pageSize = Infinity;
                    const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
                        // 在新建data准备好再赋值给组件data，防止出现闪动的情况
                        removeUpdateSubscriber.unsubscribe();
                        this._data = data;
                        this._$viewData = this._data;
                    });
                    data.fromArray(value);
                } else {
                    console.warn("输入的数据结构与渲染器不匹配")
                }
            }

            if (this.sourceRenderer === TransferTreeSourceRenderer) {
                // console.log(111)
                if (value instanceof SimpleTreeData) {
                    this._data = value;
                    this._$viewData = this.data;
                } else {
                    console.warn("输入的数据结构与渲染器不匹配")
                }
            }

            if (this.sourceRenderer === TransferTableSourceRenderer) {
                // this._data = value;
                // this._$viewData = value;
                console.log(value);
                if (value instanceof LocalPageableTableData || value instanceof PageableTableData) {
                    this._data = value;
                    this._$viewData = this.data;
                } else if (value instanceof TableData) {
                    const data = new LocalPageableTableData();
                    data.pagingInfo.pageSize = Infinity;
                    const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
                        // 在新建data准备好再赋值给组件data，防止出现闪动的情况
                        removeUpdateSubscriber.unsubscribe();
                        this._data = data;
                        this._$viewData = this._data;
                    });
                    data.fromObject({ data: value.data, field: value.field, header: value.header });
                } else {
                    console.warn("输入的数据结构与渲染器不匹配")
                }
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

    ngOnInit(): void {
        let sourceComponentFactory;
        let targetComponentFactory;

        setTimeout(() => {
            sourceComponentFactory = this.componentFactoryResolver.resolveComponentFactory(this.sourceRenderer);
            targetComponentFactory = this.componentFactoryResolver.resolveComponentFactory(this.targetRenderer);
            // if (this.data instanceof ArrayCollection) {
            //     sourceComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TransferListSourceRenderer);
            //     targetComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TransferListTargetRenderer);
            // } else if (this.data instanceof SimpleTreeData) {
            //     sourceComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TransferTreeSourceRenderer);
            //     targetComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TransferTreeTargetRenderer);
            // } else if (this.data instanceof TableData) {
            //     sourceComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TransferTableSourceRenderer);
            //     targetComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TransferTableTargetRenderer);
            //     // this.selectedItems = new TableData([], this.data.field, this.data.header);
            // }


            this._changeDetectorRef.detectChanges();

            const sourceComponentRef = this.sourceRendererHost.createComponent(sourceComponentFactory);
            const targetComponentRef = this.targetRendererHost.createComponent(targetComponentFactory);
            this.sourceComponent = sourceComponentRef.instance;
            this.targetComponent = targetComponentRef.instance;

            this.sourceComponent.labelField = CommonUtils.isDefined(this.labelField) ? this.labelField : this.sourceComponent.labelField;
            this.targetComponent.labelField = CommonUtils.isDefined(this.labelField) ? this.labelField : this.targetComponent.labelField;

            this.sourceComponent.subLabelField = CommonUtils.isDefined(this.subLabelField) ? this.subLabelField : this.sourceComponent.subLabelField;
            this.targetComponent.subLabelField = CommonUtils.isDefined(this.subLabelField) ? this.subLabelField : this.targetComponent.subLabelField;

            this.sourceComponent.trackItemBy = CommonUtils.isDefined(this.trackItemBy) ? this.trackItemBy : this.sourceComponent.trackItemBy;
            this.targetComponent.trackItemBy = CommonUtils.isDefined(this.trackItemBy) ? this.trackItemBy : this.targetComponent.trackItemBy;

            // if (this.sourceRenderer === TransferListSourceRenderer) {
            //     if(this.data instanceof LocalPageableArray || value instanceof PageableArray)
            // }

            this.targetComponent._$data = this.selectedItems;
            if (this.sourceRenderer === TransferListSourceRenderer) {
                this.data.pagingInfo.subscribe(() => {
                    this.sourceComponent._$data = new ArrayCollection(this.data)
                })
                this.sourceComponent.dataFilter(this.data, this.selectedItems)
            } else if (this.sourceRenderer === TransferTreeSourceRenderer) {
                // console.log(this.sourceComponent.dataFilter(this.data, this.selectedItems))
                this.sourceComponent._$data.fromObject(this.sourceComponent.dataFilter(this.data, this.selectedItems));
                this.sourceComponent.update();
            } else if (this.sourceRenderer === TransferTableSourceRenderer) {
                this.data.pagingInfo.subscribe(() => {
                    this._$viewData = new TableData();
                    this._$viewData.fromObject({ data: this.data.data, field: this.data.field, header: this.data.header })
                    this.sourceComponent._$data = this._$viewData;
                })
                this.sourceComponent.dataFilter(this.data, this.selectedItems)
            } else {
                this.sourceComponent._$data = this._$viewData;
            }

            this._$sourceCheckbox = this.sourceComponent._$setting.selectAll;
            this._$targetCheckbox = this.targetComponent._$setting.selectAll;
            // this.sourceComponent.selectedItems; = this.sourceComponent.selectedItems;
            // this.targetComponent.selectedItems = this.targetComponent.selectedItems;
            // this.targetComponent.data = this.data;


            // this.sourceComponent.transferSelectedItems = this.selectedItems;
            // this.targetComponent.transferSelectedItems = this.selectedItems;

            // this._$sourceSelectAllChecked = this.sourceComponent._$selectAllChecked;
            // this._$targetSelectAllChecked = this.targetComponent._$selectAllChecked;


            this.sourceSelectedItemsChangeSubscribe = this.sourceComponent.selectedItemsChange.subscribe(() => {
                this._checkSourceSelectAll();
            });
            this.targetSelectedItemsChangeSubscribe = this.targetComponent.selectedItemsChange.subscribe(() => {
                this._checkTargetSelectAll();
            });
        }, 1000);

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
                this.sourceComponent.additionalData.clearTouchedValues();
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
            this.data.pagingInfo.subscribe(() => {
                this.sourceComponent._$data = new ArrayCollection(this.data)
            })
            this.sourceComponent.dataFilter(this.data, this.selectedItems)
        } else if (this.sourceRenderer === TransferTreeSourceRenderer) {
            this.sourceComponent._$data.fromObject(this.sourceComponent.dataFilter(this.data, this.selectedItems));
            this.sourceComponent.update();
        } else if (this.sourceRenderer === TransferTableSourceRenderer) {
            this.data.pagingInfo.subscribe(() => {
                this._$viewData = new TableData();
                this._$viewData.fromObject({ data: this.data.data, field: this.data.field, header: this.data.header })
                this.sourceComponent._$data = this._$viewData;
                this.sourceComponent.additionalData.clearTouchedValues();
                this.sourceComponent.additionalData.refresh();
            })
            this.sourceComponent.dataFilter(this.data, this.selectedItems)
        }
        this.sourceComponent._$selectedItems.splice(0, this.sourceComponent._$selectedItems.length)
        this._checkSourceSelectAll();
        this._checkTargetSelectAll();
        // this.sourceComponent.dataFilter(this.data, this.selectedItems)
        // this.sourceComponent._$selectedItems = new ArrayCollection([]);
        // this.sourceComponent.transfer();
        // this.targetComponent.update();
        // this._changeDetectorRef.detectChanges();
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
        // this.selectedItems = this.selectedItems.filter((item) => {
        //     let retain = true;
        //     if (this.targetComponent._$selectedItems.some(selectedItem => CommonUtils.compareValue(item, selectedItem, this.trackItemBy))) {
        //         retain = false;
        //     }
        //     return retain;
        // })
        // this.targetComponent.transfer();
        // this.sourceComponent.update();
        // this._changeDetectorRef.detectChanges();
    }

    // /**
    //  * @internal
    //  */
    // public _$data: LocalPageableArray<GroupOptionValue> | PageableArray | any;

    // /**
    //  * @NoMarkForCheckRequired
    //  */
    // @Input()
    // public get data() {
    //     return this._$data;
    // }

    // public set data(value: any[] | ArrayCollection<GroupOptionValue> | LocalPageableArray<GroupOptionValue> | PageableArray) {
    //     if (!value || value == this.data) return;
    //     if ((value instanceof LocalPageableArray || value instanceof PageableArray) && value.pagingInfo) {
    //         this._$data = value;
    //         this._filterFunction = value instanceof LocalPageableArray ? transferFilterFunction : transferServerFilterFunction;
    //         this.runMicrotask(() => {
    //             // 等待输入属性初始化
    //             this._filterDataBySelectedItems();
    //         });
    //         if (value instanceof LocalPageableArray) {
    //             if (this._removePageableCallbackListener) {
    //                 this._removePageableCallbackListener();
    //             }
    //             this._removePageableCallbackListener = value.onAjaxComplete(() => {
    //                 this._filterDataBySelectedItems();
    //             })
    //         }
    //     } else if (value instanceof Array || value instanceof ArrayCollection) {
    //         this._$data = new LocalPageableArray();
    //         this._$data.pagingInfo.pageSize = Infinity;
    //         this._$data.fromArray(value);
    //         this._filterFunction = transferFilterFunction;
    //         this.runMicrotask(() => {
    //             // 等待输入属性初始化
    //             this._filterDataBySelectedItems();
    //         });
    //         if (value instanceof ArrayCollection) {
    //             if (this._removeArrayCallbackListener) {
    //                 this._removeArrayCallbackListener();
    //             }
    //             this._removeArrayCallbackListener = value.onAjaxSuccess(res => {
    //                 (<LocalPageableArray<GroupOptionValue>>this._$data).fromArray(res);
    //                 this._filterDataBySelectedItems();
    //             })
    //         }
    //     } else {
    //         console.error('data type error, data support Array, ArrayCollection, LocalPageableArray and PageableArray.')
    //     }
    // }

    // private _selectedItems: ArrayCollection<any> | any[] = [];

    // @RequireMarkForCheck()
    // @Input()
    // public get selectedItems() {
    //     return this._selectedItems;
    // }

    // public set selectedItems(value: ArrayCollection<any> | any[]) {
    //     if (!value || this._selectedItems == value) return;
    //     if (!(value instanceof Array) && !(value instanceof ArrayCollection)) {
    //         console.error('selectedItems type error, selectedItems support Array and ArrayCollection');
    //         return;
    //     }
    //     this._selectedItems = value;
    //     if (value instanceof ArrayCollection) {
    //         if (this._removeSelectedArrayCallbackListener) {
    //             this._removeSelectedArrayCallbackListener();
    //         }
    //         this._removeSelectedArrayCallbackListener = value.onAjaxComplete(this._filterDataBySelectedItems, this);
    //     }
    // }

    /**
     * 更新transfer的样式信息
     * @internal
     */
    public _$transferClass: {};

    private _removePageableCallbackListener: CallbackRemoval;
    private _removeArrayCallbackListener: CallbackRemoval;
    private _removeSelectedArrayCallbackListener: CallbackRemoval;
    private _filterFunction: (item: any) => boolean;



    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public searchable: boolean;

    // /**
    //  * @internal
    //  */
    // public sourceComponent.selectedItems;: ArrayCollection<GroupOptionValue> | GroupOptionValue[];
    // /**
    //  * @internal
    //  */
    // public targetComponent.selectedItems: ArrayCollection<GroupOptionValue> | GroupOptionValue[];

    // private _filterDataBySelectedItems() {
    //     if (this._$data.busy) {
    //         const removeAjaxCallback = this._$data.onAjaxComplete(() => {
    //             removeAjaxCallback();
    //             this._filterData();
    //         })
    //     } else {
    //         this._filterData();
    //     }
    // }

    // private _filterData() {
    //     this._$data.filter(this._filterFunction, {
    //         selectedItems: [].concat(...this.selectedItems),
    //         trackItemBy: this.trackItemBy
    //     });
    // }

    /**
     * @internal
     *
     * data和selectedItems不和list里数据双绑，list里面要做一些转换
     *
     * @param from
     *
     */
    // public _$transferTo(from: string) {
    //     if (this.disabled) return;
    //     if (from == 'target') {
    //         if (!this.sourceComponent.selectedItems; || !this.sourceComponent.selectedItems;.length) return;
    //         this.selectedItems = this.selectedItems ? this.selectedItems : [];
    //         this.selectedItems.push(...this.sourceComponent.selectedItems;);
    //         this.selectedItems = this.selectedItems.concat();
    //         if ((this.data instanceof LocalPageableArray || this.data instanceof PageableArray) && this.data.pagingInfo) {
    //             this._filterDataBySelectedItems();
    //         }
    //         this.sourceComponent.selectedItems; = [];
    //     }
    //     if (from == 'source') {
    //         if (!this.targetComponent.selectedItems || !this.targetComponent.selectedItems.length) return;
    //         this.selectedItems = this.selectedItems.filter(item =>
    //             !this.targetComponent.selectedItems.some(i => CommonUtils.compareWithKeyProperty(item, i, <string[]>this.trackItemBy)));
    //         if ((this.data instanceof LocalPageableArray || this.data instanceof PageableArray) && this.data.pagingInfo) {
    //             this._filterDataBySelectedItems();
    //         }
    //         this.targetComponent.selectedItems = [];
    //     }
    //     this.selectedItemsChange.emit(this.selectedItems);
    // }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removePageableCallbackListener) {
            this._removePageableCallbackListener();
            this._removePageableCallbackListener = null;
        }
        if (this._removeArrayCallbackListener) {
            this._removeArrayCallbackListener();
            this._removeArrayCallbackListener = null;
        }
        if (this._removeSelectedArrayCallbackListener) {
            this._removeSelectedArrayCallbackListener();
            this._removeSelectedArrayCallbackListener = null;
        }
    }
}










/* ***************************************************** */






/**
 * @internal
 */
@Component({
    selector: 'jigsaw-transfer-list, j-transfer-list',
    templateUrl: './transfer-list.html',
    host: {
        '[class.jigsaw-transfer-list-frame]': 'true'
    },
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTransferInternalList extends AbstractJigsawGroupLiteComponent implements OnDestroy {
    constructor(@Optional() private _transfer: JigsawTransfer, protected _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super(_changeDetectorRef, _injector);
        this._removeHostSubscribe = _transfer.selectedItemsChange.subscribe(() => {
            this._$searchKey = '';
        });
    }
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public isTarget: boolean;

    private _data: LocalPageableArray<GroupOptionValue> | PageableArray;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): LocalPageableArray<GroupOptionValue> | PageableArray {
        return this._data;
    }

    public set data(value: LocalPageableArray<GroupOptionValue> | PageableArray) {
        if (!value || this._data == value) return;
        if ((value instanceof LocalPageableArray || value instanceof PageableArray) && value.pagingInfo) {
            this._data = value;
            (<LocalPageableArray<any>>this._data).onRefresh(() => {
                if (this.selectedItems) {
                    this.selectedItems = this.selectedItems.concat();
                    this._$updateCurrentPageSelectedItems();
                }
                this._changeDetectorRef.markForCheck();
            });
            this._filterFunction = value instanceof LocalPageableArray ? transferFilterFunction : transferServerFilterFunction;
        } else if (value instanceof Array || value instanceof ArrayCollection) {
            this._filterFunction = transferFilterFunction;
            this._updateData(value);
            if (value instanceof ArrayCollection) {
                if (this._removeArrayCallbackListener) {
                    this._removeArrayCallbackListener();
                }
                this._removeArrayCallbackListener = value.onAjaxSuccess(this._updateData, this);
            }
        }
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public subLabelField: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public trackItemBy: string | string[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public searchable: boolean;

    private _removeHostSubscribe: Subscription;
    private _filterFunction: (item: any) => boolean;
    private _removeArrayCallbackListener: CallbackRemoval;

    /**
     * @internal
     */
    public _$searchKey: string;

    /**
     * @internal
     */
    public _$currentPageSelectedItems: any[] | ArrayCollection<any>;

    /**
     * @internal
     */
    public _$infinity = Infinity;

    /**
     * @internal
     */
    public get _$trackByFn() {
        return CommonUtils.toTrackByFunction(this.trackItemBy);
    };

    /**
     * 这边把transfer过来的数组转成分页数据，中间变量data主要用于消除数据闪动
     * @param value
     *
     */
    private _updateData(value: GroupOptionValue[] | ArrayCollection<GroupOptionValue>) {
        if (!(value instanceof Array) && !(value instanceof ArrayCollection)) return;
        const data = new LocalPageableArray();
        if (this.isTarget && this._transfer.data && (<LocalPageableArray<GroupOptionValue>>this._transfer.data).pagingInfo) {
            // target列同步用户给的data的pageSize
            data.pagingInfo.pageSize = (<LocalPageableArray<GroupOptionValue>>this._transfer.data).pagingInfo.pageSize;
        } else {
            data.pagingInfo.pageSize = Infinity;
        }
        data.fromArray(value);
        const removeDataOnRefresh = data.onRefresh(() => {
            removeDataOnRefresh();
            this._data = data;
            // 用于刷新分页
            this._data.onRefresh(() => {
                if (this.selectedItems) {
                    this.selectedItems = this.selectedItems.concat();
                    this._$updateCurrentPageSelectedItems();
                }
                this._changeDetectorRef.markForCheck();
            });
            this._data.refresh();
            this._changeDetectorRef.detectChanges();
        })
    }

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        let field: string | number = this.labelField;
        if (this._data instanceof PageableArray && this._data.length && typeof this._data[0] == 'object') {
            field = Object.keys(this._data[0]).findIndex(k => k === this.labelField);
        }
        if (this._data.busy) {
            const removeAjaxCallback = this._data.onAjaxComplete(() => {
                removeAjaxCallback();
                this._filterData(filterKey, field);
            })
        } else {
            this._filterData(filterKey, field);
        }
    }

    private _removeFilterSubscribe: Subscription;

    private _filterData(filterKey: string, field: string | number) {
        this._data.filter(this._filterFunction, {
            selectedItems: this.isTarget ? null : [].concat(...this._transfer.selectedItems),
            trackItemBy: this._transfer.trackItemBy,
            keyword: filterKey,
            fields: [field]
        });
        this._removeFilterSubscribe = this._data.pagingInfo.subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * @internal
     *
     * 这里有几个需要注意的地方：
     * - this.data.concat() 不仅为了浅拷贝数据，当this.data是分页数据的时候，还有一个目的是为了取出this.data的当前页数据
     * - 在过滤选中的条目是直接用了`item.disabled`，在item的类型是字符串时，也没问题，因为字符串的时候，`item.disabled`必然是false
     */
    public _$handleHeadSelect(checked) {
        this._$currentPageSelectedItems = checked ? this.data.concat().filter(item => !item.disabled) : [];
        this.selectedItems = this.selectedItems ? this.selectedItems : [];
        if (checked) {
            this.selectedItems.push(...this.data.concat().filter(item =>
                !item.disabled && !this.selectedItems.some(it => CommonUtils.compareWithKeyProperty(it, item, <string[]>this.trackItemBy))));
            this.selectedItems = this.selectedItems.concat();
        } else {
            this.selectedItems = this.selectedItems.filter(item =>
                !item.disabled && !(<any[]>this.data).some(it => CommonUtils.compareWithKeyProperty(it, item, <string[]>this.trackItemBy)))
        }
        this.selectedItemsChange.emit(this.selectedItems);
        this._changeDetectorRef.markForCheck();
    }

    /**
     * @internal
     */
    public _$updateCurrentPageSelectedItems() {
        this.runMicrotask(() => {
            this.selectedItems = this.selectedItems ? this.selectedItems : [];
            if (this.data && this.data.pagingInfo && this.data.pagingInfo.pageSize != Infinity) {
                this._$currentPageSelectedItems = this.selectedItems.filter(item => (<any[]>this.data).some(it =>
                    CommonUtils.compareWithKeyProperty(it, item, <string[]>this.trackItemBy)));
            } else {
                this._$currentPageSelectedItems = this.selectedItems;
            }
        });
    }

    /**
     * @internal
     */
    public _$updateSelectedItemsByCurrent() {
        this._$currentPageSelectedItems = this._$currentPageSelectedItems ? this._$currentPageSelectedItems : [];
        this.selectedItems = this.selectedItems ? this.selectedItems : [];
        this.selectedItems.push(...this._$currentPageSelectedItems.filter(item =>
            !this.selectedItems.some(it => CommonUtils.compareWithKeyProperty(item, it, <string[]>this.trackItemBy))));
        const currentUnselectedItems = this.data.concat().filter(item =>
            !this._$currentPageSelectedItems.some(it => CommonUtils.compareWithKeyProperty(item, it, <string[]>this.trackItemBy)));
        this.selectedItems = this.selectedItems.filter(item =>
            !currentUnselectedItems.some(it => CommonUtils.compareWithKeyProperty(item, it, <string[]>this.trackItemBy)));
        this.selectedItemsChange.emit(this.selectedItems);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeHostSubscribe) {
            this._removeHostSubscribe.unsubscribe();
            this._removeHostSubscribe = null;
        }
        if (this._removeArrayCallbackListener) {
            this._removeArrayCallbackListener();
            this._removeArrayCallbackListener = null;
        }
        if (this._removeFilterSubscribe) {
            this._removeFilterSubscribe.unsubscribe();
            this._removeFilterSubscribe = null;
        }
    }
}

@NgModule({
    imports: [JigsawListModule, JigsawCheckBoxModule, PerfectScrollbarModule, JigsawInputModule, JigsawPaginationModule, CommonModule, TranslateModule, JigsawTransferRendererModule, JigsawCommonModule, JigsawSearchInputModule],
    declarations: [JigsawTransfer, JigsawTransferInternalList],
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
