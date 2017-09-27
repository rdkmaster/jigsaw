import {TemplateRef, Type} from "@angular/core";
import {LocalPageableTableData, PageableTableData, TableData} from "../../core/data/table-data";
import {SortAs, SortOrder} from "../../core/data/component-data";
import {TableCellRendererBase} from "./table-renderer";
import {CommonUtils} from "../../core/utils/common-utils";

export type TableColumnTargetFinder = (field: string, index: number) => boolean;
export type TableColumnTarget = number | string | (number | string)[] | TableColumnTargetFinder;
export type TableCellDataGenerator = (tableData: TableData, row: number, column: number) => any;

export function rowIndexGenerator(tableData: TableData, row: number): any {
    let index = 1;
    if (tableData instanceof PageableTableData || tableData instanceof LocalPageableTableData) {
        index += (tableData.pagingInfo.currentPage - 1) * tableData.pagingInfo.pageSize;
    }
    index += row;
    return index;
}

export class ColumnDefine {
    target: TableColumnTarget;
    visible?: boolean;
    width?: string;
    header?: TableHeader;
    cell?: TableCell;
    group?: boolean;
}

export class AdditionalColumnDefine {
    pos?: number;
    visible?: boolean;
    width?: string;
    header?: TableHeader;
    cell?: TableCell;
    group?: boolean;
}

export class TableDataChangeEvent {
    field: string | number;
    row: number | number[];
    column: number;
    cellData: string | number;
    oldCellData: string | number;
}

export class TableHeader {
    text?: string;
    renderer?: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz?: string;
    sortable?: boolean;
    sortAs?: SortAs;
    defaultSortOrder?: SortOrder;
}

export class TableCell {
    renderer?: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz?: string;
    editable?: boolean;
    editorRenderer?: Type<TableCellRendererBase>;
    data?: any | TableCellDataGenerator;
}

export class TableHeadSetting {
    cellData: string | number;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz: string;
    sortable: boolean;
    sortAs: SortAs;
    defaultSortOrder: SortOrder;
    field: string;
}

export class TableCellSetting {
    cellData: any;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz: string;
    editable: boolean;
    editorRenderer: Type<TableCellRendererBase> | TemplateRef<any>;
    group: boolean;
    field: string;
    rowSpan: number;
}

export class SortChangeEvent {
    sortAs: SortAs;
    order: SortOrder;
    field: string;
}

export class RemoveTdListener {
    removeTdListener: Function;
    row: number;
    column: number;
}

/**
 * @internal
 */
export function _getColumnIndex(data: TableData, additionalData: TableData, field: string): [number, TableData] {
    let index = data.field.indexOf(field);
    if (index != -1) {
        return [index, data];
    }
    index = additionalData ? additionalData.field.indexOf(field) : -1;
    if (index != -1) {
        return [index, additionalData];
    }
    return [-1, undefined];
}

export class AdditionalTableData extends TableData {
    public originData: TableData;
    public trackRowBy: string;

    private _splitString = '_%%_';
    private _splitRegExp = new RegExp(this._splitString, 'g');
    private _cachedValues: { [field: string]: { [key: string]: any } } = {};
    private _trackRowByFields: number[];

    private _fixTrackRowFields() {
        if (this._trackRowByFields) {
            return;
        }
        this._trackRowByFields = [];
        const fields = this.trackRowBy ? this.trackRowBy.split(/\s*,\s*/g) : this.originData.field;
        fields.forEach(field => {
            const col = this.originData.field.findIndex(f => f === field);
            if (col == -1) {
                return;
            }
            this._trackRowByFields.push(col);
        });
    }

    public clearCachedValues(): void {
        this._cachedValues = {};
    }

    private _getValueKey(field: string | number, row: number): string {
        let valueKey = '';
        if (!this.originData) {
            console.warn('set originData and trackRowBy property of table before caching a value');
            return valueKey;
        }
        this._fixTrackRowFields();

        field = typeof field === 'string' ? field : this.field[field];
        const excludedColumn = this.originData.field.findIndex(f => f === field);
        this._trackRowByFields.forEach(col => {
            if (col == excludedColumn || CommonUtils.isUndefined(this.originData.data[row])) {
                return;
            }
            //即使单元格的值是空字符串，但是 `valueKey` 的值仍然至少包含了 `this._splitString`，因此它的字面值不是false
            valueKey += this.originData.data[row][col] + this._splitString;
        });
        return valueKey;
    }

    public cacheValue(field: string | number, row: number, value: any): void {
        const valueKey = this._getValueKey(field, row);
        if (!valueKey) {
            return;
        }
        if (!this._cachedValues[field]) {
            this._cachedValues[field] = {};
        }
        this._cachedValues[field][valueKey] = value;
    }

    public getTouchedValue(field: string | number, row: number): any {
        const valueKey = this._getValueKey(field, row);
        if (!valueKey) {
            return;
        }
        if (!this._cachedValues[field]) {
            return;
        }
        return this._cachedValues[field][valueKey];
    }

    public getTouchedValues(field: string | number): { key: string | string[], value: any }[] {
        const values: any[] = [];
        const fieldString = typeof field === 'string' ? field : this.field[field];
        if (!fieldString) {
            return values;
        }

        const cached = this._cachedValues[fieldString];
        for (let p in cached) {
            const value = cached[p];
            const key = p.split(this._splitRegExp);
            //去掉前面特地留下来的最后一个无效值
            key.pop();
            values.push({value: value, key: key.length == 1 ? key[0] : key})
        }

        return values;
    }
}


