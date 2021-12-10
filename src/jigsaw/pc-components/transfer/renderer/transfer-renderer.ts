import { Component, ChangeDetectionStrategy, Injector, NgModule, Input, Output, EventEmitter, ChangeDetectorRef, forwardRef, ViewEncapsulation, ViewChild } from "@angular/core";
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
import { JigsawTableModule } from 'jigsaw/pc-components/table/table';
import { filter } from 'rxjs/operators';


export type listOption = {
    disabled?: boolean;
    label?: string;
    subLabel?: string;
    [field: string]: string | boolean;
}

export interface transferRenderer {
    type: "source" | "target";
    data: any;
    transferSelectedItems: ArrayCollection<listOption>;
    toggleButton: EventEmitter<boolean>;
    transfer();
}
@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListRenderer implements transferRenderer {
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    /**
     * 用来区分渲染器在穿梭框里的类型（数据源\目标）
     * @NoMarkForCheckRequired
     */
    @Input()
    public type: "source" | "target";

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
        if (this.type === "source") {
            if (this._$viewData instanceof LocalPageableArray || this._$viewData instanceof PageableArray) {
                this._data = value;
            } else {
                const data = new LocalPageableArray<listOption>();
                data.pagingInfo.pageSize = Infinity;
                const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
                    // 在新建data准备好再赋值给组件data，防止出现闪动的情况
                    removeUpdateSubscriber.unsubscribe();
                    this._$viewData = data;
                });
                data.fromArray(value);
            }
        }
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
        if (this.type === "target") {
            this._$viewData = value;
        }
    }

    public _$selectedItems: ArrayCollection<listOption>;

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
        this.toggleButton.emit(this._$selectedItems.length > 0);
        this._changeDetectorRef.markForCheck();
    }

    /**
     * 为了消除统计的闪动，需要先把搜索字段临时存放在bak里面
     */
    protected _searchKey: string;
    protected _searchKeyBak: string;
    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        // 为了消除统计的闪动，需要先把搜索字段临时存放在bak里面
        this._searchKeyBak = filterKey;
        this._filterData(filterKey);
    }

    private _filterData(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        (<LocalPageableArray<any> | PageableArray>this._$viewData).filter(filterKey, [this.labelField]);
    }

    /**
     * @internal
     */
    public _$updateSelectedItems() {
        this.toggleButton.emit(this._$selectedItems.length > 0);
        this._checkSelectAll();
    }

    public transfer() {
        if (this.type === "source") {
            this.transferSelectedItems.push(...this._$selectedItems)
        }
        if (this.type === "target") {
            this._$selectedItems.forEach(selectedItem => {
                this.transferSelectedItems.forEach((item, i) => {
                    if (selectedItem[this.labelField] === item[this.labelField]) {
                        this.transferSelectedItems.splice(i, 1);
                        return;
                    }
                })
            })
            this._$selectedItems = new ArrayCollection([]);
            console.log(this._$selectedItems)
            console.log(this.transferSelectedItems)
        }
    };

    /**
     * @internal
     */
    public _$infinity = Infinity;
}

@Component({
    templateUrl: './transfer-tree.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTreeRenderer implements transferRenderer {
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }
    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    /**
     * 用来区分渲染器在穿梭框里的类型（数据源\目标）
     * @NoMarkForCheckRequired
     */
    @Input()
    public type: "source" | "target";

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
        if (this.type === "source") {
            this._$viewData = value;
        }
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
        if (this.type === "target") {
            this._$viewData = value;
        }
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
        this.treeExt.fuzzySearch($event)
    }

    /**
     * @internal
     */
    public _$updateSelectedItems() {
        this.toggleButton.emit(this._$selectedItems.length > 0);
        this._checkSelectAll();
    }

    public transfer() {
        if (this.type === "source") {
            this.transferSelectedItems.push(...this._$selectedItems)
        }
        // if (this.type === "target") {
        //     this.transferSelectedItems.push(...this.selectedItems)
        // }
    };

    /**
     * @internal
     */
    public _$infinity = Infinity;
}

@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableRenderer implements transferRenderer {
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    /**
     * 用来区分渲染器在穿梭框里的类型（数据源\目标）
     * @NoMarkForCheckRequired
     */
    @Input()
    public type: "source" | "target";

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
        if (this.type === "source") {
            this._$viewData = value;
        }
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
        if (this.type === "target") {
            this._$viewData = value;
        }
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

    public transfer() {
        if (this.type === "source") {
            this.transferSelectedItems.push(...this._$selectedItems)
        }
        // if (this.type === "target") {
        //     this.transferSelectedItems.push(...this.selectedItems)
        // }
    };

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
            rendererInitData: (td, row, col) => {
                return {
                    disabled: false
                }
            }
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
            data: (td, row, col) => {
                return td.data[row][2] == 'Developer'
            },
            rendererInitData: (td, row, col) => {
                return true
            }
        }
    }];

    additionalDataChange(value) {
        console.log(value);
        this.selectedRows = this.getSelectedRows(this.additionalData);
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
}

@NgModule({
    declarations: [TransferListRenderer, TransferTreeRenderer, TransferTableRenderer],
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
