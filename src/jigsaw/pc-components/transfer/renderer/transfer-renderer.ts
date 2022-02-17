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
    addtionalData?: any;
    [field: string]: string | boolean;
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

    // /**
    //  * 宿主transfer实例
    //  */
    // public hostInstance: any;

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
    public trackItemBy: string | string[] = 'label';

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
                } else {
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

    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    private _data: any;

    /* 渲染器数据 */
    @Input()
    public get _$data(): ArrayCollection<listOption> {
        return this._data;
    }

    public set _$data(value: ArrayCollection<listOption>) {
        this._data = value;
        this._$validData = new ArrayCollection(this._getLeafNodes([value]));
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
            if (!nodes[i].nodes || nodes[i].nodes.length === 0) {
                result.push(nodes[i]);
            } else {
                result = this._getLeafNodes(nodes[i].nodes, result);
            }
        }
        return result;
    }
}

@Component({
    templateUrl: './transfer-tree.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTreeSourceRenderer extends TransferTreeRendererBase {

}


@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTreeTargetRenderer extends TransferListTargetRenderer {
}
@Directive()
export class TransferTableRendererBase {
    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
    }

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
     * @internal
     */
    public _$updateSelectedItems(value) {
        this.selectedRows = this._getSelectedRows(value);
        this._$selectedItems = this._getAllSelectedRows(value);
        console.log(this._$selectedItems)
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
        return additionalData.getAllTouched(0).reduce((selectedRows, item) => {
            if (item.value) {
                selectedRows.push({ [this.labelField]: item.data[0], key: item.key });
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
}
@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableTargetRenderer extends TransferTableRendererBase {
    protected _data: any;

    /* 渲染器数据 */
    @Input()
    public get _$data(): any {
        return this._data;
    }

    public set _$data(value: any) {

        console.log("target", value);
        this._$validData = [1, 2, 3]
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
