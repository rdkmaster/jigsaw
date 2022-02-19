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
import { filter, map } from 'rxjs/operators';
import { ChartIconCustomPieLegend } from 'jigsaw/pc-components/chart-icon/chart-icon-factory';
import { TableData, TableDataMatrix, TableMatrixRow } from '../../../common/core/data/table-data';
import { AbstractJigsawComponent } from '../../../common/common';
import { SimpleTreeData } from 'jigsaw/common/core/data/tree-data';

export type listOption = {
    disabled?: boolean;
    label?: string;
    subLabel?: string;
    addtionalData?: any;
    [field: string]: string | boolean | number;
}

export type transferRendererSetting = {
    selectAll: boolean;
}

export interface transferRenderer {
    // data: any;
    // transferSelectedItems: ArrayCollection<listOption> | any;
    // toggleButton: EventEmitter<boolean>;
    // transfer();
    // update();
    _$data: any;
    _$selectedItems: any;
    _$setting: transferRendererSetting;
    selectedItemsChange: EventEmitter<boolean>;

}

@Directive()
export class TransferListRendererBase {
    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    /**
     * 宿主transfer实例
     */
    public hostInstance: any;

    private _data: any;

    /* 渲染器数据 */
    @Input()
    public get _$data(): ArrayCollection<listOption> {
        return this._data;
    }

    public set _$data(value: ArrayCollection<listOption>) {
        this._data = value;
        this.update();
    }

    /**
     * 渲染器有效数据
     * @internal
     */
    public _$validData: any;

    /**
     * 渲染器已选数据
     * @internal
     */
    public _$selectedItems: ArrayCollection<listOption> = new ArrayCollection([]);

    @Output()
    public selectedItemsChange = new EventEmitter();

    /**
     * 渲染器配置
     * @internal
     */
    public _$setting = { selectAll: true };

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
    public trackItemBy: string = 'label';

    /**
     * @internal
     */
    public get _$trackByFn() {
        return CommonUtils.toTrackByFunction(this.trackItemBy);
    };

    /**
     * @internal
     */
    public _$updateSelectedItems() {
        this.selectedItemsChange.emit();
    }

    public selectAll() {
        if (this._$selectedItems && this._$selectedItems.length === this._$validData.length) {
            this._$selectedItems = new ArrayCollection([]);
        } else {
            this._$selectedItems = new ArrayCollection(this._$validData);
        }
    }

    public update() {
        this._$validData = this._$data.filter(item => !item.disabled);
    }
}

@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListSourceRenderer extends TransferListRendererBase {
    public dataFilter(data, selectedItems) {
        if (!selectedItems || selectedItems.length === 0) {
            data.filter((item) => { return true })
        } else {
            data.filter((item) => {
                let retain = true;
                if (selectedItems.some(selectedItem => CommonUtils.compareValue(item, selectedItem, this.trackItemBy))) {
                    retain = false;
                }
                return retain;
            })
        }
    }

    public searchFilter(data, selectedItems, filterKey) {
        if (!selectedItems || selectedItems.length === 0) {
            data.filter((item) => { return item[this.labelField].includes(filterKey) })
        } else {
            data.filter((item) => {
                let retain = true;
                if (selectedItems.some(selectedItem => CommonUtils.compareValue(item, selectedItem, this.trackItemBy))) {
                    retain = false;
                }
                if (retain) {
                    retain = item[this.labelField].includes(filterKey)
                }

                return retain;
            })
        }
    }
}

@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListTargetRenderer extends TransferListRendererBase {


    public searchFilter(selectedItems, filterKey) {
        console.log(selectedItems)
        filterKey = filterKey ? filterKey.trim() : '';
        const data = selectedItems.filter(item => {
            return item[this.labelField].includes(filterKey);
        })
        this._$data = data;
    }
}

@Directive()
export class TransferTreeRendererBase implements transferRenderer {
    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    /**
     * 宿主transfer实例
     */
    public hostInstance: any;

    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    private _data: any = new SimpleTreeData();

    /* 渲染器数据 */
    @Input()
    public get _$data(): SimpleTreeData {
        return this._data;
    }

    public set _$data(value: SimpleTreeData) {
        this._data = value;
    }

    /**
     * 渲染器有效数据
     * @internal
     */
    public _$validData: any;

    /**
     * 渲染器已选数据
     * @internal
     */
    public _$selectedItems: ArrayCollection<listOption> = new ArrayCollection([]);

    @Output()
    public selectedItemsChange = new EventEmitter();

    /**
     * 渲染器配置
     * @internal
     */
    public _$setting = { selectAll: false };

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
    public trackItemBy: string = 'id';

    /**
     * @internal
     */
    public _$updateSelectedItems() {
        const allCheckedNodes = this.treeExt.getCheckedNodes(true);
        const checkedNodes = allCheckedNodes.filter(node => {
            return !node.isParent && !node.isHidden;
        })
        // console.log(checkedNodes)
        // console.log(checkedNodes[0].getPath())
        this._$selectedItems = new ArrayCollection(checkedNodes);
        this.selectedItemsChange.emit();
    }

    private _getLeafNodes(nodes, result = []) {
        for (var i = 0, length = nodes.length; i < length; i++) {
            if (!nodes[i].nodes) {
                result.push(nodes[i]);
            } else {
                result = this._getLeafNodes(nodes[i].nodes, result);
            }
        }
        return result;
    }

    public update() {
        this._$validData = new ArrayCollection(this._getLeafNodes([this._$data]));
    }

    private _filterSelectedItem(nodes, key) {
        for (var i = 0, length = nodes.length; i < length; i++) {
            if (!nodes[i].nodes) {
                if (nodes[i][this.trackItemBy] === key) {
                    nodes.splice(i, 1)
                    return;
                }
            } else {
                this._filterSelectedItem(nodes[i].nodes, key);
            }
        }
    }

    public _filterTree(tree, keyMap, arr, searchKey) {
        if (!tree.length) {
            return [];
        }
        for (var i = 0; i < tree.length; i++) {
            if (tree[i].nodes) {
                let newNode = { ...tree[i], nodes: [] };
                arr.push(newNode);
                this._filterTree(tree[i].nodes, keyMap, newNode.nodes, searchKey);
            } else {
                if (!keyMap.includes(tree[i][this.trackItemBy])) {
                    if (searchKey.length > 0 && tree[i][this.labelField].includes(searchKey) || !(searchKey.length > 0)) {
                        let newNode = { ...tree[i] };
                        arr.push(newNode);
                    }
                }
            }
        }
        return arr;
    }

    public dataFilter(data, selectedItems) {
        let keyMap = [];
        let result = [];
        selectedItems.forEach(item => {
            keyMap.push(item[this.trackItemBy])
        })

        return this._filterTree(data.nodes, keyMap, result, '');
    }

    public searchFilter(data, selectedItems, $event) {
        let keyMap = [];
        let result = [];
        let searchKey = $event.length > 0 ? $event.trim() : "";
        selectedItems.forEach(item => {
            keyMap.push(item[this.trackItemBy])
        })


        return this._filterTree(data.nodes, keyMap, result, searchKey);
    }
}

@Component({
    templateUrl: './transfer-tree.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTreeSourceRenderer extends TransferTreeRendererBase {

}
@Directive()
export class TransferTableRendererBase {
    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

    /**
     * 宿主transfer实例
     */
    public hostInstance: any;

    @ViewChild(JigsawTable)
    public table: JigsawTable;

    protected _data: any;

    /* 渲染器数据 */
    @Input()
    public get _$data(): TableData {
        return this._data;
    }

    public set _$data(value: TableData) {
        this._data = value;
        this._$validData = value.data;
    }

    /**
     * 渲染器有效数据
     * @internal
     */
    public _$validData: any;

    /**
     * 渲染器已选数据
     * @internal
     */
    public _$selectedItems: ArrayCollection<listOption> = new ArrayCollection([]);

    @Output()
    public selectedItemsChange = new EventEmitter();

    /**
     * 渲染器配置
     * @internal
     */
    public _$setting = { selectAll: false };

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
    public trackItemBy: string = 'id';

    /**
     * @internal
     */
    public _$updateSelectedItems(value) {
        this.selectedRows = this._getSelectedRows(value);
        this._$selectedItems = this._getAllSelectedRows(value);
        this.selectedItemsChange.emit();
        console.log(this._$selectedItems)
    }

    public update() {
        // this._$validData
        // this.additionalData.clearTouchedValues();
        // this.additionalData.refresh();
        // this.table.update();
    }

    /**
     * 获取选中的行
     * @param additionalData
     */
    private _getSelectedRows(additionalData) {
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
    private _getAllSelectedRows(additionalData) {
        const trackItemByfiledIndex = this._$data.field.findIndex(item => { return item === this.trackItemBy })
        const labelFieldfiledIndex = this._$data.field.findIndex(item => { return item === this.trackItemBy })

        if (trackItemByfiledIndex === -1) {
            console.warn("trackItemBy值在filed中未找到！")
            return;
        }

        if (labelFieldfiledIndex === -1) {
            console.warn("labelField值在filed中未找到！")
            return;
        }

        return additionalData.getAllTouched(0).reduce((selectedRows, item) => {
            if (item.value) {
                selectedRows.push({ [this.labelField]: item.data[labelFieldfiledIndex], [this.trackItemBy]: item.data[trackItemByfiledIndex] });
            }
            return selectedRows;
        }, []);
    }

    public selectedRows: string;

    public additionalData: AdditionalTableData;

    public additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        width: 20,
        header: {
            renderer: TableHeadCheckboxRenderer
        },
        cell: {
            renderer: TableCellCheckboxRenderer
        }
    }];
}
@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableSourceRenderer extends TransferTableRendererBase {
    private _filterTable(data, selectedItems, searchKey) {
        const trackItemByfiledIndex = data.field.findIndex(item => { return item === this.trackItemBy })
        const labelFieldfiledIndex = data.field.findIndex(item => { return item === this.trackItemBy })

        if (trackItemByfiledIndex === -1) {
            console.warn("trackItemBy值在filed中未找到！")
            return;
        }

        if (labelFieldfiledIndex === -1) {
            console.warn("labelField值在filed中未找到！")
            return;
        }

        if (!selectedItems || selectedItems.length === 0) {
            if (searchKey.length > 0) {
                data.filter((item) => { return item[labelFieldfiledIndex].includes(searchKey) })
            } else {

                data.filter((item) => { return true })
            }
        } else {
            data.filter((item) => {
                let retain = true;
                if (selectedItems.some(selectedItem => CommonUtils.compareValue(item[trackItemByfiledIndex], selectedItem[this.trackItemBy]))) {
                    retain = false;
                }
                if (retain) {
                    retain = item[labelFieldfiledIndex].includes(searchKey);
                }
                return retain;
            })
        }
    }

    public dataFilter(data, selectedItems) {
        this._filterTable(data, selectedItems, '')
    }

    public searchFilter(data, selectedItems, $event) {
        let searchKey = $event.length > 0 ? $event.trim() : "";
        this._filterTable(data, selectedItems, searchKey)
    }
}

@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableTargetRenderer extends TransferTableRendererBase {

}

@NgModule({
    declarations: [TransferListSourceRenderer, TransferListTargetRenderer, TransferTreeSourceRenderer, TransferTableSourceRenderer, TransferTableTargetRenderer],
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
