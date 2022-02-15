import { Component, ChangeDetectionStrategy, Injector, NgModule, Input, Output, EventEmitter, ChangeDetectorRef, forwardRef, ViewEncapsulation, ViewChild, AfterViewInit, Directive, NgZone, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ArrayCollection, LocalPageableArray, PageableArray } from '../../../common/core/data/array-collection';
import { JigsawListModule } from '../../../pc-components/list-and-tile/list';
import { JigsawCheckBoxModule } from '../../../pc-components/checkbox';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { JigsawPaginationModule } from '../../../pc-components/pagination/pagination';
import { JigsawSearchInputModule } from '../../../pc-components/input/search-input';
import { CommonUtils } from '../../../common/core/utils/common-utils';
import { CheckBoxStatus } from '../../../pc-components/checkbox/typings';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { InternalUtils } from '../../../common/core/utils/internal-utils';
import { TranslateHelper } from '../../../common/core/utils/translate-helper';
import { LoadingService } from '../../../common/service/loading.service';
import { RequireMarkForCheck } from '../../../common/decorator/mark-for-check';
import { JigsawTreeExtModule, JigsawTreeExt } from '../../../pc-components/tree/tree-ext';
import { AdditionalColumnDefine, AdditionalTableData } from '../../../pc-components/table/table-typings';
import { TableHeadCheckboxRenderer, TableCellCheckboxRenderer } from '../../../pc-components/table/table-renderer';
import { JigsawTableModule, JigsawTable } from '../../../pc-components/table/table';
import { filter } from 'rxjs/operators';
import { ChartIconCustomPieLegend } from 'jigsaw/pc-components/chart-icon/chart-icon-factory';
import { TableData, TableDataMatrix, TableMatrixRow } from '../../../common/core/data/table-data';
import { AbstractJigsawComponent } from '../../../common/common';


export type listOption = {
    disabled?: boolean;
    label?: string;
    subLabel?: string;
    tableData?: TableMatrixRow;
    [field: string]: string | boolean | TableMatrixRow;
}

export interface transferRenderer {
    data: any;
    transferSelectedItems: ArrayCollection<listOption> | any;
    toggleButton: EventEmitter<boolean>;
    transfer();
    update();
}

@Directive()
export class TransferListRendererBase extends AbstractJigsawComponent implements transferRenderer {
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector,
        protected _zone?: NgZone) {
        super();
    }

    /**
     * 渲染器视图数据
     * @internal
     */
    @RequireMarkForCheck()
    public _$viewData;

    protected _data: ArrayCollection<listOption>;

    /**
     * Transfer组件数据
     */
    @Input()
    public get data(): ArrayCollection<listOption> | any {
        return this._data;
    }

    public set data(value: ArrayCollection<listOption> | any) {
        this._data = value;
    }

    protected _transferSelectedItems: ArrayCollection<listOption>;

    /**
     * Transfer组件selectedItems
     *
     */
    @Input()
    public get transferSelectedItems(): ArrayCollection<listOption> {
        return this._transferSelectedItems;
    }

    public set transferSelectedItems(value: ArrayCollection<listOption>) {
        this._transferSelectedItems = value;
    }

    /**
     * 渲染器已选数据
     * @internal
     */
    public _$selectedItems: ArrayCollection<listOption> = new ArrayCollection([]);

    /**
     * 设置数据的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = "label";

    /**
     * 设置数据的副显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public subLabelField: string = "subLabel";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public trackItemBy: string | string[];

    /**
     * @internal
     */
    public get _$trackByFn() {
        return CommonUtils.toTrackByFunction(this.trackItemBy);
    };

    @Output()
    public toggleButton = new EventEmitter<boolean>();

    /**
     * 全选
     *
     * @internal
     */
    public _$selectAllChecked = CheckBoxStatus.unchecked;

    /**
     * @internal
     */
    protected _checkSelectAll() {
        console.log("checkSelectAll")
        this._changeDetectorRef.detectChanges();
        if (!this._$selectedItems || this._$selectedItems.length === 0) {
            this._$selectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this._$selectedItems.length === this._$viewData.length) {
            this._$selectAllChecked = CheckBoxStatus.checked;
        } else {
            this._$selectAllChecked = CheckBoxStatus.indeterminate;
        }
    }

    /**
     * @internal
     */
    public _$selectAll() {
        console.log("selectAll")
        if (this._$selectedItems && this._$selectedItems.length === this._$viewData.length) {
            this._$selectedItems = new ArrayCollection([]);
        } else {
            this._$selectedItems = new ArrayCollection(this._$viewData);
        }
        this.toggleButton.emit(this._$selectedItems.length > 0);
    }

    /**
     * 为了消除统计的闪动，需要先把搜索字段临时存放在bak里面
     */
    protected _searchKey: string;
    protected _searchKeyBak: string;

    /**
     * @internal
     */
    public _$infinity = Infinity;

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        // 为了消除统计的闪动，需要先把搜索字段临时存放在bak里面
        this._searchKeyBak = filterKey;
        this._filterData(filterKey);
        this._changeDetectorRef.detectChanges();
    }

    private _filterData(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        // (<LocalPageableArray<any> | PageableArray>this._$viewData).filter(filterKey, [this.labelField]);

        (<LocalPageableArray<any> | PageableArray>this._$viewData).filter((item) => {
            let isExist = true;
            this.transferSelectedItems.forEach((selectedItem) => {
                if (selectedItem[this.labelField] === item[this.labelField]) {
                    isExist = false;
                }
            })

            if (isExist) {
                isExist = item[this.labelField].includes(filterKey)
            }

            return isExist;
        })

        // this.runAfterMicrotasks(() => this.transferSelectedItems.forEach(selectedItem => {
        //     this._$viewData.forEach((item, i) => {
        //         if (selectedItem[this.labelField] === item[this.labelField]) {
        //             this._$viewData.splice(i, 1);
        //             return
        //         }
        //     })
        // }));

        // this.runAfterMicrotasks(() => {
        //     this.transferSelectedItems.forEach(selectedItem => {
        //         this._$viewData.forEach((item, i) => {
        //             if (selectedItem[this.labelField] === item[this.labelField]) {
        //                 this._$viewData.splice(i, 1);
        //                 return
        //             }
        //         })
        //     })
        // });

        // setTimeout(() => {
        //     this.transferSelectedItems.forEach(selectedItem => {
        //         this._$viewData.forEach((item, i) => {
        //             if (selectedItem[this.labelField] === item[this.labelField]) {
        //                 this._$viewData.splice(i, 1);
        //                 return
        //             }
        //         })
        //     })
        // }, 0);

        console.log(this._$viewData)
        this._changeDetectorRef.markForCheck();
    }

    /**
     * @internal
     */
    public _$updateSelectedItems() {
        this.toggleButton.emit(this._$selectedItems.length > 0);
        this._checkSelectAll();
    }

    public transfer() { };

    public update() { };
}

@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListSourceRenderer extends TransferListRendererBase {
    @Input()
    public get data(): ArrayCollection<listOption> | any {
        return this._data;
    }

    public set data(value: ArrayCollection<listOption> | any) {
        this._data = value;
        if (value instanceof LocalPageableArray || value instanceof PageableArray) {
            this._data = value;
            this._$viewData = this.data;
        } else {
            const data = new LocalPageableArray<listOption>();
            data.pagingInfo.pageSize = Infinity;
            const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
                // 在新建data准备好再赋值给组件data，防止出现闪动的情况
                removeUpdateSubscriber.unsubscribe();
                this._data = data;
                this.update();
            });
            data.fromArray(value);
        }
    }

    public transfer() {
        console.log("listSource:transfer");
        console.log(this._$selectedItems)

        this._$selectedItems.forEach(selectedItem => {
            this._$viewData.forEach((item, i) => {
                if (selectedItem[this.labelField] === item[this.labelField]) {
                    this._$viewData.splice(i, 1);
                    return
                }
            })
        })
        console.log(this._$viewData)
        this.transferSelectedItems.push(...this._$selectedItems);
        this._$selectedItems = new ArrayCollection([]);
        this._changeDetectorRef.markForCheck();
        this.toggleButton.emit(this._$selectedItems.length > 0);
        this._checkSelectAll();
    };

    public update() {
        console.log("listSource:update");
        console.log(this.transferSelectedItems)
        if (!this.transferSelectedItems) {
            this._$viewData = this.data;
        } else {
            this._$viewData = this.data.filter((item) => {
                let isExist = true;
                this.transferSelectedItems.forEach((selectedItem) => {
                    if (selectedItem[this.labelField] === item[this.labelField]) {
                        isExist = false;
                    }
                })
                return isExist;
            })
        }
        this.toggleButton.emit(this._$selectedItems.length > 0);
    }
}

@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListTargetRenderer extends TransferListRendererBase {
    /**
     * Transfer组件数据
     */
    @Input()
    public get data(): ArrayCollection<listOption> | any {
        return this._data;
    }

    public set data(value: ArrayCollection<listOption> | any) {
        this._data = value;
    }

    /**
     * Transfer组件selectedItems
     *
     */
    @Input()
    public get transferSelectedItems(): ArrayCollection<listOption> {
        return this._transferSelectedItems;
    }

    public set transferSelectedItems(value: ArrayCollection<listOption>) {
        this._transferSelectedItems = value;
        this._$viewData = value;
    }

    public transfer() {
        this._$selectedItems.forEach(selectedItem => {
            this.transferSelectedItems.forEach((item, i) => {
                if (selectedItem[this.labelField] === item[this.labelField]) {
                    this.transferSelectedItems.splice(i, 1);
                    return;
                }
            })
        })
        this._$selectedItems = new ArrayCollection([]);
        this.toggleButton.emit(this._$selectedItems.length > 0);
        this._checkSelectAll();
    };

    public update() { }
}

@Directive()
export class TransferTreeRendererBase extends AbstractJigsawComponent implements transferRenderer, AfterViewInit, OnInit {
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super();
    }
    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    /**
     * 视图数据
     * @internal
     */
    @RequireMarkForCheck()
    public _$viewData: ArrayCollection<listOption> | any;

    private _data: ArrayCollection<listOption> | any;

    /**
     * Transfer组件数据
     */
    @Input()
    public get data(): ArrayCollection<listOption> | any {
        return this._data;
    }

    public set data(value: ArrayCollection<listOption> | any) {
        this._data = value;
        this._$viewData = value;
    }

    private _transferSelectedItems: ArrayCollection<listOption>;

    /**
     * Transfer组件selectedItems
     *
     */
    @Input()
    public get transferSelectedItems(): ArrayCollection<listOption> {
        return this._transferSelectedItems;
    }

    public set transferSelectedItems(value: ArrayCollection<listOption>) {
        this._transferSelectedItems = value;
    }

    public _$selectedItems: ArrayCollection<listOption>;

    /**
     * 视图数据
     * @internal
     */
    @RequireMarkForCheck()
    public _$validItems;

    @Output()
    public toggleButton = new EventEmitter<boolean>();

    /**
     * 全选
     *
     * @internal
     */
    public _$selectAllChecked = CheckBoxStatus.unchecked;

    /**
     * @internal
     */
    private _checkSelectAll() {
        this._changeDetectorRef.markForCheck();
        if (!this._$selectedItems || this._$selectedItems.length === 0) {
            this._$selectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this._$selectedItems.length === this._$validItems.length) {
            this._$selectAllChecked = CheckBoxStatus.checked;
        } else {
            this._$selectAllChecked = CheckBoxStatus.indeterminate;
        }
    }

    /**
     * @internal
     */
    public _$selectAll() {
        if (this._$selectedItems && this._$selectedItems.length === this._$validItems.length) {
            this.treeExt.checkAllNodes(false);
            this._$selectedItems = new ArrayCollection([]);
            this._$selectAllChecked = CheckBoxStatus.unchecked;
        } else {
            this.treeExt.checkAllNodes(true);
            this._$selectedItems = new ArrayCollection(this._$viewData);
            this._$selectAllChecked = CheckBoxStatus.checked;
        }
        this.onCheck();
        this._changeDetectorRef.markForCheck();
    }

    /**
     * @internal
     */
    protected _updateValidItems() {
        const childNodes = this.treeExt.getNodesByParam("isParent", false);
        this._$validItems = childNodes.filter(node => {
            return !node['isHidden'];
        })
        this._checkSelectAll();
    }

    /**
     * @internal
     */
    public _$handleSearching($event) {
        this.treeExt.fuzzySearch($event)
        this.transferSelectedItems.forEach(node => {
            this.treeExt.hideNode(node)
        })
        this._updateValidItems();
    }

    /**
     * @internal
     */
    public _$updateSelectedItems() {
        this.toggleButton.emit(this._$selectedItems.length > 0);
        this._checkSelectAll();
    }

    public transfer() { };

    public onCheck() {
        const allCheckedNodes = this.treeExt.getCheckedNodes(true);
        const checkedNodes = allCheckedNodes.filter(node => {
            return !node.isParent && !node.isHidden;
        })
        this._$selectedItems = new ArrayCollection(checkedNodes);
        this._checkSelectAll();
        this.toggleButton.emit(this._$selectedItems.length > 0);
    }

    public update() {
        const nodes = this.treeExt.getNodesByParam("isHidden", true);
        nodes.forEach(node => {
            if (!this.transferSelectedItems.some(selectedItem => {
                return selectedItem['label'] === node['label'] && selectedItem['parentTId'] === node['parentTId']
            })) {
                this.treeExt.showNode(node);
            }
        });
        this._updateValidItems();
    }

    ngOnInit() {
        this.runMicrotask(() => {
            this._updateValidItems();
        })
    }

    ngAfterViewInit() {
        this.treeExt.setEditable(false);
    }
}

@Component({
    templateUrl: './transfer-tree.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTreeSourceRenderer extends TransferTreeRendererBase {
    public transfer() {
        console.log(this._$selectedItems)
        this._$selectedItems.forEach(node => {
            this.treeExt.checkNode(node, false, true)
            this.treeExt.hideNode(node)
            node['realLabel'] = node.label;
        })
        this.transferSelectedItems.push(...this._$selectedItems)
        this._$selectedItems = new ArrayCollection([]);
        this.toggleButton.emit(this._$selectedItems.length > 0);
        this._updateValidItems();
        this._changeDetectorRef.markForCheck();
    };
}


@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTreeTargetRenderer extends TransferListTargetRenderer {
    /**
     * 设置数据的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = "realLabel";
}
@Directive()
export class TransferTableRendererBase implements transferRenderer {
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }
    @ViewChild(JigsawTable)
    public table: JigsawTable;

    /**
     * 设置数据的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = "label";

    /**
     * 视图数据
     * @internal
     */
    @RequireMarkForCheck()
    public _$viewData: ArrayCollection<listOption> | any;

    protected _data: ArrayCollection<listOption> | any;

    /**
     * Transfer组件数据
     */
    @Input()
    public get data(): ArrayCollection<listOption> | any {
        return this._data;
    }

    public set data(value: ArrayCollection<listOption> | any) {
        this._data = value;

    }

    protected _transferSelectedItems: TableData;

    /**
     * Transfer组件selectedItems
     *
     */
    @Input()
    public get transferSelectedItems(): TableData {
        return this._transferSelectedItems;
    }

    public set transferSelectedItems(value: TableData) {
        if (!(value instanceof TableData)) {
            return
        }
        this._transferSelectedItems = value;
    }

    public _$selectedItems: ArrayCollection<listOption>;

    @Output()
    public toggleButton = new EventEmitter<boolean>();

    /**
     * 全选
     *
     * @internal
     */
    public _$selectAllChecked = CheckBoxStatus.unchecked;

    /**
     * @internal
     */
    private _checkSelectAll() {
        this._changeDetectorRef.markForCheck();
        if (!this._$selectedItems || this._$selectedItems.length === 0) {
            this._$selectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this._$selectedItems.length === this._$viewData.length) {
            this._$selectAllChecked = CheckBoxStatus.checked;
        } else {
            this._$selectAllChecked = CheckBoxStatus.indeterminate;
        }
    }

    /**
     * @internal
     */
    public _$selectAll() {
        if (this._$selectedItems && this._$selectedItems.length === this._$viewData.length) {
            this._$selectedItems = new ArrayCollection([]);
            this._$selectAllChecked = CheckBoxStatus.unchecked;
        } else {
            this._$selectedItems = new ArrayCollection(this._$viewData);
            this._$selectAllChecked = CheckBoxStatus.checked;
        }
        this._changeDetectorRef.markForCheck();
    }

    /**
     * @internal
     */
    public _$handleSearching($event) {
    }

    /**
     * @internal
     */
    public _$updateSelectedItems() {
        this.toggleButton.emit(this._$selectedItems.length > 0);
        this._checkSelectAll();
    }

    public transfer() { };

    public update() { };

    /**
     * @internal
     */
    public _$infinity = Infinity;

    private _headerDisabled = true;

    public selectedRows: string;

    public additionalData: AdditionalTableData;

    public additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        width: 20,
        header: {
            renderer: TableHeadCheckboxRenderer,
            // rendererInitData: (td, row, col) => {
            //     return {
            //         disabled: false
            //     }
            // }
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
            // data: (td, row, col) => {
            //     return false
            // },
            // rendererInitData: (td, row, col) => {
            //     return true
            // }
        }
    }];

    additionalDataChange(value) {
        this.selectedRows = this.getSelectedRows(value);
        this._$selectedItems = this.getAllSelectedRows(value);
        this.toggleButton.emit(this._$selectedItems.length > 0);
    }

    /**
     * 获取选中的行
     * @param additionalData
     */
    getSelectedRows(additionalData) {
        return additionalData.data.reduce((selectedRows, item, index) => {
            if (item[0]) {
                selectedRows.push(index);
            }
            return selectedRows;
        }, []).join(',');
    }

    /**
     * 获取所有选中的行
     * @param additionalData
    */
    getAllSelectedRows(additionalData) {
        return additionalData.getAllTouched(0).reduce((selectedRows, item) => {
            if (item.value) {
                selectedRows.push({ [this.labelField]: item.data[0], key: item.key });
            }
            return selectedRows;
        }, []);
    }
}

@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableSourceRenderer extends TransferTableRendererBase {
    @Input()
    public get data(): ArrayCollection<listOption> | any {
        return this._data;
    }

    public set data(value: ArrayCollection<listOption> | any) {
        this._data = value;
        this._$viewData = value;
    }

    public transfer() {
        this._$selectedItems.forEach(item => {
            this.transferSelectedItems.data.push(<TableMatrixRow>item.key);
        })
        for (var i = this.selectedRows.length - 1; i >= 0; i--) {
            this._$viewData.data.splice(this.selectedRows.length[i], 1)
        }
        this._$selectedItems.length = 0;
        this.additionalData.clearTouchedValues();
        this.additionalData.refresh();
        this.table.update();
    };

    public update() {
        console.log(this._$viewData)
    }
}
@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableTargetRenderer extends TransferTableRendererBase {


    @Input()
    public get transferSelectedItems(): TableData {
        return this._transferSelectedItems;
    }

    public set transferSelectedItems(value: TableData) {
        if (!(value instanceof TableData)) {
            return
        }
        this._transferSelectedItems = value;
        this._$viewData = this.transferSelectedItems;
    }

    public transfer() {
        for (var i = this.selectedRows.length - 1; i >= 0; i--) {
            this._$viewData.data.splice(this.selectedRows.length[i], 1)
        }
        this.additionalData.clearTouchedValues();
        this.additionalData.refresh();
        this.table.update();
    }

    public update() {
        this.table.update();
        this._changeDetectorRef.detectChanges();
    }
}

@NgModule({
    declarations: [TransferListSourceRenderer, TransferListTargetRenderer, TransferTreeSourceRenderer, TransferTreeTargetRenderer, TransferTableSourceRenderer, TransferTableTargetRenderer],
    imports: [CommonModule, JigsawListModule, JigsawCheckBoxModule, PerfectScrollbarModule, JigsawPaginationModule, JigsawSearchInputModule, TranslateModule, JigsawTreeExtModule, JigsawTableModule],
    providers: [TranslateService, LoadingService]
})
export class JigsawTransferRendererModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'transfer-renderer', {
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
