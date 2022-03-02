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
import {ArrayCollection, PageableArray} from '../../../common/core/data/array-collection';
import {CommonUtils} from '../../../common/core/utils/common-utils';
import {JigsawTreeExt} from '../../../pc-components/tree/tree-ext';
import {AdditionalColumnDefine, AdditionalTableData} from '../../../pc-components/table/table-typings';
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from '../../../pc-components/table/table-renderer';
import {JigsawTable} from '../../../pc-components/table/table';
import {TableData} from '../../../common/core/data/table-data';
import {SimpleTreeData} from '../../../common/core/data/tree-data';

export type ListOption = {
    disabled?: boolean;
    label?: string;
    subLabel?: string;
    additionalData?: any;
    [field: string]: string | boolean | number;
}

@Directive()
export abstract class AbstractTransferRendererBase {
    public filterFunction: (item: any) => boolean;
}

@Directive()
export class TransferListRendererBase extends AbstractTransferRendererBase {
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super();
    }

    private _data: any;

    /**
     * 渲染器数据
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get _$data(): ArrayCollection<ListOption> {
        return this._data;
    }

    public set _$data(value: ArrayCollection<ListOption>) {
        this._data = value;
        this.update();
        this._changeDetectorRef.markForCheck();
    }

    /**
     * 渲染器有效数据
     * @internal
     */
    public _$validData: any;

    /**
     * 渲染器当前已选数据
     * @internal
     */
    public _$currentSelectedItems: any;

    /**
     * 渲染器已选数据
     * @internal
     */
    public _$selectedItems: ArrayCollection<ListOption> = new ArrayCollection([]);

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
     * 设置数据的id字段
     *
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
        if (this._$currentSelectedItems && this._$currentSelectedItems.length === this._$validData.length) {
            if (this._$selectedItems.length === this._$currentSelectedItems.length) {
                this._$selectedItems = new ArrayCollection([]);
            } else {
                this._$selectedItems = new ArrayCollection(this._$selectedItems.filter(item => {
                    let retain = true;
                    if (this._$currentSelectedItems.some(selectedItem => CommonUtils.compareValue(item, selectedItem, this.trackItemBy))) {
                        retain = false;
                    }
                    return retain;
                }))
            }
        } else {
            if (this._$selectedItems.length === 0) {
                this._$selectedItems = new ArrayCollection(this._$validData);
            } else {
                const diff = this._$validData.filter(item => {
                    let retain = true;
                    if (this._$selectedItems.some(selectedItem => CommonUtils.compareValue(item, selectedItem, this.trackItemBy))) {
                        retain = false;
                    }
                    return retain;
                })
                this._$selectedItems = this._$selectedItems.concat(diff);
            }
        }
        this.update();
    }

    public update() {
        if (CommonUtils.isUndefined(this._$data)) {
            return;
        }

        this._$validData = this._$data.filter(item => !item.disabled);
        this._$currentSelectedItems = this._$data.filter(item => {
            let isExist = false;
            if (this._$selectedItems.some(selectedItem => CommonUtils.compareValue(item, selectedItem, this.trackItemBy))) {
                isExist = true;
            }
            return isExist;
        })
    }

    public reset() {
        this._$selectedItems.splice(0, this._$selectedItems.length);
        this.selectedItemsChange.emit();
    }
}

@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListSourceRenderer extends TransferListRendererBase {
    public dataFilter(data, selectedItems) {
        const _filterData = (data, selectedItems, filterFunction) => {
            data.filter(filterFunction, {
                selectedItems: [].concat(...selectedItems),
                trackItemBy: this.trackItemBy
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

    public searchFilter(data, selectedItems, filterKey) {
        const _filterData = (filterKey: string, field: string | number) => {
            data.filter(this.filterFunction, {
                selectedItems: selectedItems ? [].concat(...selectedItems) : null,
                trackItemBy: this.trackItemBy,
                keyword: filterKey,
                fields: [field]
            });
            /*this._removeFilterSubscribe = this._data.pagingInfo.subscribe(() => {
                this._cdr.markForCheck();
            });*/
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
            })
        } else {
            _filterData(filterKey, field);
        }
    }
}

@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListTargetRenderer extends TransferListRendererBase {
    public searchFilter(selectedItems, filterKey) {
        filterKey = filterKey ? filterKey.trim() : '';
        this._$data = selectedItems.filter(item => item[this.labelField].includes(filterKey));
    }
}

@Directive()
export class TransferTreeRendererBase extends AbstractTransferRendererBase implements AfterViewInit {
    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super();
    }

    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    private _data: any = new SimpleTreeData();

    /**
     * 渲染器数据
     *
     * @NoMarkForCheckRequired
     */
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
     * 渲染器当前已选数据
     * @internal
     */
    public _$currentSelectedItems: any;


    /**
     * 渲染器已选数据
     * @internal
     */
    public _$selectedItems: ArrayCollection<ListOption> = new ArrayCollection([]);

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
    public trackItemBy: string = 'label';

    /**
     * @internal
     */
    public _$updateSelectedItems() {
        const allCheckedNodes = this.treeExt.getCheckedNodes(true);
        const checkedNodes = allCheckedNodes.filter(node => {
            return !node.isParent && !node.isHidden;
        })
        this._$selectedItems.fromArray(checkedNodes);
        this.selectedItemsChange.emit();
    }

    private _getLeafNodes(nodes, result = []) {
        for (let i = 0, length = nodes.length; i < length; i++) {
            if (!nodes[i].nodes) {
                if (CommonUtils.isUndefined(nodes[i].isTransferTreeParentNode)) {
                    result.push(nodes[i]);
                }
            } else {
                result = this._getLeafNodes(nodes[i].nodes, result);
            }
        }
        return result;
    }

    public update() {
        this._$validData = new ArrayCollection(this._getLeafNodes([this._$data]));
        this._$currentSelectedItems = this._$selectedItems;
    }

    public reset() {
        this._$selectedItems.splice(0, this._$selectedItems.length);
        this.selectedItemsChange.emit();
    }

    /**
     * @internal
     */
    public _filterTree(tree, keyMap, arr, searchKey) {
        if (!tree || !tree.length) {
            return [];
        }
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].nodes) {
                let newNode = { ...tree[i], nodes: [{ isTransferTreeParentNode: '', isHidden: true }] };
                newNode['open'] = true;
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
        const keyMap = [];
        const result = [];
        selectedItems.forEach(item => {
            keyMap.push(item[this.trackItemBy])
        });
        return this._filterTree(data.nodes, keyMap, result, '');
    }

    public searchFilter(data, selectedItems, $event) {
        const keyMap = [];
        const result = [];
        const searchKey = $event.length > 0 ? $event.trim() : "";
        selectedItems.forEach(item => {
            keyMap.push(item[this.trackItemBy])
        });
        return this._filterTree(data.nodes, keyMap, result, searchKey);
    }

    ngAfterViewInit() {
        this.treeExt.setting.edit.enable = false;
    }
}

@Component({
    templateUrl: './transfer-tree.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTreeSourceRenderer extends TransferTreeRendererBase {

}
@Directive()
export class TransferTableRendererBase extends AbstractTransferRendererBase {
    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super();
    }

    @ViewChild(JigsawTable)
    public table: JigsawTable;

    protected _data: any;

    /**
     * 渲染器数据
     *
     * @NoMarkForCheckRequired
     */
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
     * 渲染器当前已选数据
     * @internal
     */
    public _$currentSelectedItems: any;

    /**
     * 渲染器已选数据
     * @internal
     */
    public _$selectedItems: ArrayCollection<ListOption> = new ArrayCollection([]);

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
    public trackItemBy: string = 'label';

    /**
     * @internal
     */
    public _$updateSelectedItems(value) {
        this.selectedRows = this._getSelectedRows(value);
        this._$selectedItems = this.selectedRows
        this.selectedItemsChange.emit();
    }

    public update() {
        const trackItemByFiledIndex = this._$data.field.findIndex(item => { return item === this.trackItemBy })
        if (trackItemByFiledIndex === -1) {
            console.error("trackItemBy值在filed中未找到！")
            return;
        }
        this._$currentSelectedItems = this._$data.data.filter(item => {
            let isExist = false;
            if (this._$selectedItems.some(selectedItem => CommonUtils.compareValue(item[trackItemByFiledIndex], selectedItem[this.trackItemBy]))) {
                isExist = true;
            }
            return isExist;
        })
    }

    public reset() {
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
    private _getSelectedRows(additionalData: AdditionalTableData) {
        const trackItemByFiledIndex = this._$data.field.findIndex(item => { return item === this.trackItemBy });
        if (trackItemByFiledIndex === -1) {
            console.error("trackItemBy值在filed中未找到！")
            return;
        }

        const labelFieldFiledIndex = this._$data.field.findIndex(item => { return item === this.labelField });
        if (labelFieldFiledIndex === -1) {
            console.error("labelField值在filed中未找到！")
            return;
        }

        return additionalData.getAllTouched(0).reduce((selectedRows, item) => {
            if (item.value) {
                selectedRows.push({ [this.labelField]: item.data[labelFieldFiledIndex], [this.trackItemBy]: item.data[trackItemByFiledIndex] });
            }
            return selectedRows;
        }, []);
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
@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableSourceRenderer extends TransferTableRendererBase {
    public dataFilter(data: any, selectedItems: any) {
        const _filterData = (data, selectedItems, filterFunction) => {
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

    public searchFilter(data: any, selectedItems: any, filterKey: any, isTarget: boolean): void {
        if (!isTarget) {
            const _filterData = (data, selectedItems, filterFunction) => {
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
    }
}

@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableTargetRenderer extends TransferTableRendererBase {
}

