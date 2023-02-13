import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Directive,
    EventEmitter,
    Injector,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {ArrayCollection, PageableArray, LocalPageableArray} from '../../../common/core/data/array-collection';
import {CommonUtils} from '../../../common/core/utils/common-utils';
import {JigsawTreeExt} from '../../../pc-components/tree/tree-ext';
import {AdditionalColumnDefine, AdditionalTableData} from '../../../pc-components/table/table-typings';
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from '../../../pc-components/table/table-renderer';
import {JigsawTable} from '../../../pc-components/table/table';
import {TableData, LocalPageableTableData, PageableTableData} from '../../../common/core/data/table-data';
import {SimpleTreeData, SimpleNode} from '../../../common/core/data/tree-data';
import {JigsawTransfer} from "../transfer";
import {TableDataMatrix, TableMatrixRow} from "../../../common/core/data/unified-paging/paging";

export type ListOption = {
    disabled?: boolean;
    label?: string;
    subLabel?: string;
    additionalData?: any;
    [field: string]: string | boolean | number;
}

export type RendererSetting = {
    selectAll: boolean
}

@Directive()
export abstract class AbstractTransferRendererBase {
    /**
     * @internal
     */
    public abstract reset();
    /**
     * @internal
     */
    public abstract update();
    /**
     * @internal
     */
    public abstract selectAll();
    /**
     * @internal
     */
    public abstract dataFilter(...args): void;
    /**
     * @internal
     */
    public abstract searchFilter(...args): void

    /**
     * @internal
     */
    public data: any;
    /**
     * @internal
     */
    public filterFunction: (item: any) => boolean;
    /**
     * @internal
     */
    public transferHost: JigsawTransfer;
    /**
     * @internal
     */
    public labelField: string;
    /**
     * @internal
     */
    public subLabelField: string;
    /**
     * @internal
     */
    public trackItemBy: string;
    /**
     * @internal
     */
    public setting: RendererSetting;
    /**
     * @internal
     */
    public selectedItemsChange: EventEmitter<void>;
    /**
     * @internal
     */
    public additionalData: any;
    /**
     * @internal
     */
    public validData: any[];
    /**
     * @internal
     */
    public currentSelectedItems: any[];
    /**
     * @internal
     */
    public selectedItems: ArrayCollection<ListOption>;
    /**
     * @internal
     */
    public theme: string;

    /**
     * @internal
     */
    public _$getItemLabel(item: any): string {
        const label = item?.[this.labelField];
        return String(CommonUtils.isDefined(label) ? label : item);
    }

    /**
     * @internal
     */
    public _$getItemSubLabel(item: any): string {
        const label = item?.[this.subLabelField];
        return String(CommonUtils.isDefined(label) ? label : '');
    }
}

@Directive()
export abstract class TransferListRendererBase extends AbstractTransferRendererBase {
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super();
    }

    private _data: ArrayCollection<ListOption>;

    /**
     * 渲染器数据
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<ListOption> {
        return this._data;
    }

    public set data(value: ArrayCollection<ListOption>) {
        this._data = value;
        this.update();
        this._changeDetectorRef.markForCheck();
    }

    /**
     * 渲染器有效数据
     * @internal
     */
    public validData: ListOption[];

    /**
     * 渲染器当前已选数据
     * @internal
     */
    public currentSelectedItems: ListOption[];

    /**
     * 渲染器已选数据
     * @internal
     */
    public selectedItems: ArrayCollection<ListOption> = new ArrayCollection([]);

    @Output()
    public selectedItemsChange = new EventEmitter();

    /**
     * 渲染器配置
     * @internal
     */
    public setting: RendererSetting = {selectAll: true};

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
     * 设置数据的id字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public trackItemBy: string = 'label';

    /**
     * @internal
     */
    public _$updateSelectedItems(): void {
        this.selectedItemsChange.emit();
    }

    public selectAll(): void {
        if (this.currentSelectedItems && this.currentSelectedItems.length === this.validData.length) {
            if (this.selectedItems.length === this.currentSelectedItems.length) {
                this.selectedItems = new ArrayCollection([]);
            } else {
                this.selectedItems = new ArrayCollection(this.selectedItems.filter(item => {
                    return !this.currentSelectedItems.some(selectedItem => CommonUtils.compareValue(item, selectedItem, this.trackItemBy));
                }))
            }
        } else {
            if (this.selectedItems.length === 0) {
                this.selectedItems = new ArrayCollection(this.validData);
            } else {
                const diff = this.validData.filter(item => {
                    return !this.selectedItems.some(selectedItem => CommonUtils.compareValue(item, selectedItem, this.trackItemBy));
                });
                this.selectedItems = this.selectedItems.concat(diff);
            }
        }
        this.update();
    }

    public update(): void {
        if (CommonUtils.isUndefined(this.data)) {
            return;
        }

        this.validData = this.data.filter(item => !item.disabled);
        this.currentSelectedItems = this.data.filter(item => {
            return this.selectedItems.some(selectedItem => CommonUtils.compareValue(item, selectedItem, this.trackItemBy));
        });
    }

    public reset(): void {
        this.selectedItems.splice(0, this.selectedItems.length);
        this.selectedItemsChange.emit();
    }
}

/**
 * @internal
 */
@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListSourceRenderer extends TransferListRendererBase {
    public dataFilter(data: LocalPageableArray<any> | PageableArray, selectedItems: ArrayCollection<ListOption>): void {
        if (!data || !this.filterFunction) {
            return;
        }

        const _filterData = (data: LocalPageableArray<any> | PageableArray, selectedItems: ArrayCollection<ListOption>,
                             filterFunction: (item: any) => boolean) => {
            data.filter(filterFunction, {
                selectedItems: [].concat(...selectedItems),
                trackItemBy: this.trackItemBy
            });
        }
        if (data.busy) {
            const removeAjaxCallback = data.onAjaxComplete(() => {
                removeAjaxCallback();
                _filterData(data, selectedItems, this.filterFunction);
            });
        } else {
            _filterData(data, selectedItems, this.filterFunction);
        }
    }

    public searchFilter(data: LocalPageableArray<any> | PageableArray, selectedItems: ArrayCollection<ListOption>, filterKey: string) {
        const _filterData = (filterKey: string, field: string | number) => {
            data.filter(this.filterFunction, {
                selectedItems: selectedItems ? [].concat(...selectedItems) : null,
                trackItemBy: this.trackItemBy,
                keyword: filterKey,
                fields: [field]
            });
        }
        filterKey = filterKey ? filterKey.trim() : '';
        let field: string | number = this.labelField;
        if (data instanceof PageableArray && data.length && typeof data[0] == 'object') {
            field = Object.keys(data[0]).findIndex(k => k === this.labelField);
        }
        if (data.busy) {
            const removeAjaxCallback = data.onAjaxComplete(() => {
                removeAjaxCallback();
                _filterData(filterKey, field);
            });
        } else {
            _filterData(filterKey, field);
        }
    }
}

/**
 * @internal
 */
@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListDestRenderer extends TransferListRendererBase {
    public searchFilter(selectedItems: ArrayCollection<ListOption>, filterKey: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        this.data = new ArrayCollection(selectedItems.filter(
            item => {
                let value: string = '';
                if (typeof item === 'string') {
                    value = item;
                } else if (this.labelField) {
                    value = !item || item[this.labelField] === undefined || item[this.labelField] === null ? '' : item[this.labelField].toString();
                }
                return value.toLowerCase().includes(filterKey.toLowerCase())
            }));
    }

    public dataFilter(...args): void {
    }
}

@Directive()
export abstract class TransferTreeRendererBase extends AbstractTransferRendererBase implements AfterViewInit {
    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super();
    }

    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    private _data: SimpleTreeData = new SimpleTreeData();

    /**
     * 渲染器数据
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): SimpleTreeData {
        return this._data;
    }

    public set data(value: SimpleTreeData) {
        this._data = value;
    }

    /**
     * 渲染器有效数据
     * @internal
     */
    public validData: ListOption[];

    /**
     * 渲染器当前已选数据
     * @internal
     */
    public currentSelectedItems: ListOption[];

    /**
     * 渲染器已选数据
     * @internal
     */
    public selectedItems: ArrayCollection<ListOption> = new ArrayCollection([]);

    @Output()
    public selectedItemsChange = new EventEmitter();

    /**
     * 渲染器配置
     * @internal
     */
    public setting: RendererSetting = {selectAll: false};

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
    public _$updateSelectedItems(): void {
        const allCheckedNodes = this.treeExt.getCheckedNodes(true);
        const checkedNodes = allCheckedNodes.filter(node => !node.isParent && !node.isHidden);
        this.selectedItems.fromArray(checkedNodes);
        this.selectedItemsChange.emit();
    }

    private _getLeafNodes(nodes: Array<any>, result = []): Array<any> {
        for (let i = 0, length = nodes.length; i < length; i++) {
            if (!nodes[i].nodes) {
                result = this._getLeafNodes(nodes[i].nodes, result);
                continue;
            }
            if (CommonUtils.isUndefined(nodes[i].isTransferTreeParentNode)) {
                result.push(nodes[i]);
            }
        }
        return result;
    }

    public update(): void {
        this.validData = new ArrayCollection(this._getLeafNodes([this.data]));
        this.currentSelectedItems = this.selectedItems;
    }

    public reset(): void {
        this.selectedItems.splice(0, this.selectedItems.length);
        this.selectedItemsChange.emit();
    }

    /**
     * @internal
     */
    public _filterTree(tree: SimpleNode[], keyMap: Array<string>, arr: Array<any>, searchKey: string) {
        if (!tree || !tree.length) {
            return [];
        }
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].nodes) {
                let newNode = {...tree[i], nodes: [{isTransferTreeParentNode: '', isHidden: true}]};
                newNode['open'] = true;
                arr.push(newNode);
                this._filterTree(tree[i].nodes, keyMap, newNode.nodes, searchKey);
            } else {
                if (!keyMap.includes(tree[i][this.trackItemBy])) {
                    if (searchKey.length > 0 && tree[i][this.labelField].includes(searchKey) || searchKey.length == 0) {
                        arr.push({...tree[i]});
                    }
                }
            }
        }
        return arr;
    }

    public dataFilter(data: SimpleTreeData, selectedItems: ArrayCollection<ListOption>): Array<any> {
        const keyMap = selectedItems.map(item => item[this.trackItemBy]);
        const result = [];
        return this._filterTree(data.nodes, keyMap, result, '');
    }

    public searchFilter(data: SimpleTreeData, selectedItems: ArrayCollection<ListOption>, $event: string) {
        const keyMap = selectedItems.map(item => item[this.trackItemBy]);
        const result = [];
        const searchKey = $event.length > 0 ? $event.trim() : "";
        return this._filterTree(data.nodes, keyMap, result, searchKey);
    }

    ngAfterViewInit() {
        this.treeExt.setting.edit.enable = false;
    }
}

/**
 * @internal
 */
@Component({
    templateUrl: './transfer-tree.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTreeSourceRenderer extends TransferTreeRendererBase {
    public selectAll() {
    }
}

@Directive()
export abstract class TransferTableRendererBase extends AbstractTransferRendererBase {
    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super();
    }

    @ViewChild(JigsawTable)
    public table: JigsawTable;

    protected _data: TableData;

    /**
     * 渲染器数据
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): TableData {
        return this._data;
    }

    public set data(value: TableData) {
        this._data = value;
        this.validData = value.data;
    }

    /**
     * 渲染器有效数据
     * @internal
     */
    public validData: TableDataMatrix[];

    /**
     * 渲染器当前已选数据
     * @internal
     */
    public currentSelectedItems: TableMatrixRow[];

    /**
     * 渲染器已选数据
     * @internal
     */
    public selectedItems: ArrayCollection<ListOption> = new ArrayCollection([]);

    @Output()
    public selectedItemsChange = new EventEmitter();

    /**
     * 渲染器配置
     * @internal
     */
    public setting: RendererSetting = {selectAll: false};

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
    public _$updateSelectedItems(value: AdditionalTableData): void {
        this.selectedRows = this._getSelectedRows(value);
        this.selectedItems = new ArrayCollection(this.selectedRows);
        this.selectedItemsChange.emit();
    }

    public update(): void {
        const trackItemByFiledIndex = this.data.field.findIndex(item => item === this.trackItemBy);
        if (trackItemByFiledIndex === -1) {
            console.error("trackItemBy值在filed中未找到！");
            return;
        }
        this.currentSelectedItems = this.data.data.filter(item => {
            let isExist = false;
            if (this.selectedItems.some(selectedItem => CommonUtils.compareValue(item[trackItemByFiledIndex], selectedItem[this.trackItemBy]))) {
                isExist = true;
            }
            return isExist;
        })
    }

    public reset(): void {
        if (CommonUtils.isUndefined(this.additionalData)) {
            return;
        }
        this.additionalData.reset();
        this.additionalData.refresh();
        this.selectedItemsChange.emit();
    }

    /**
     * 获取选中的行
     * @param additionalData
     */
    private _getSelectedRows(additionalData: AdditionalTableData): ArrayCollection<ListOption> {
        const trackItemByFiledIndex = this.data.field.findIndex(item => {
            return item === this.trackItemBy
        });
        if (trackItemByFiledIndex === -1) {
            console.error("trackItemBy值在filed中未找到！")
            return;
        }

        const labelFieldFiledIndex = this.data.field.findIndex(item => {
            return item === this.labelField
        });
        if (labelFieldFiledIndex === -1) {
            console.error("labelField值在filed中未找到！")
            return;
        }

        let result = new ArrayCollection([]);

        return additionalData.getAllTouched(0)
            .filter(item => item.value)
            .reduce((selectedRows: ArrayCollection<ListOption>, item: any) => {
                selectedRows.push({
                    [this.labelField]: item.data[labelFieldFiledIndex],
                    [this.trackItemBy]: item.data[trackItemByFiledIndex]
                });
                return selectedRows;
            }, result);
    }

    public selectedRows: ArrayCollection<ListOption>;

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

/**
 * @internal
 */
@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableSourceRenderer extends TransferTableRendererBase {
    public dataFilter(data: LocalPageableTableData | PageableTableData, selectedItems: ArrayCollection<ListOption>): void {
        const _filterData = (data: LocalPageableTableData | PageableTableData, selectedItems: ArrayCollection<ListOption>, filterFunction: (item: any) => boolean) => {
            data.filter(filterFunction, {
                selectedItems: [].concat(...selectedItems),
                trackItemBy: this.trackItemBy,
                field: data.field,
                labelField: this.labelField
            });
        }

        if (!data || !this.filterFunction) {
            return;
        }

        if (data.busy) {
            const removeAjaxCallback = data.onAjaxComplete(() => {
                removeAjaxCallback();
                _filterData(data, selectedItems, this.filterFunction);
            })
        } else {
            _filterData(data, selectedItems, this.filterFunction);
        }
    }

    public searchFilter(data: LocalPageableTableData | PageableTableData, selectedItems: ArrayCollection<ListOption>, filterKey: string, isDest: boolean): void {
        if (isDest) {
            return;
        }
        const _filterData = (data: LocalPageableTableData | PageableTableData, selectedItems: ArrayCollection<ListOption>, filterFunction: (item: any) => boolean) => {
            data.filter(filterFunction, {
                selectedItems: [].concat(...selectedItems),
                trackItemBy: this.trackItemBy,
                field: data.field,
                labelField: this.labelField,
                keyword: filterKey
            });
        }

        if (!data || !this.filterFunction) {
            return;
        }

        if (data.busy) {
            const removeAjaxCallback = data.onAjaxComplete(() => {
                removeAjaxCallback();
                _filterData(data, selectedItems, this.filterFunction);
            })
        } else {
            _filterData(data, selectedItems, this.filterFunction);
        }
    }

    public selectAll() {
    }
}

/**
 * @internal
 */
@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableDestRenderer extends TransferTableRendererBase {
    public dataFilter(...args): void {
    }

    public searchFilter(...args): void {
    }

    public selectAll() {
    }
}

