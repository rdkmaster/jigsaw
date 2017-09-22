import {TemplateRef, Type} from "@angular/core";
import {LocalPageableTableData, PageableTableData, TableData} from "../../core/data/table-data";
import {SortAs, SortOrder} from "../../core/data/component-data";
import {TableCellRendererBase} from "./table-renderer";

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
    private _trackRowByFields: string[];
    private _cachedValues: {[key: string]: any} = {};

    private _trackRowBy: string;

    public get trackRowBy(): string {
        return this._trackRowBy;
    }

    public set trackRowBy(value: string) {
        this._trackRowBy = value;
        if (value) {
            this._trackRowByFields = value.split(/\s*,\s*/g);
        }
    }

    public clearCachedValues():void {
        this._cachedValues = {};
    }

    private _getValueKey(row:number):string {
        let valueKey = '';
        if (!this.originData) {
            console.warn('set originData and trackRowBy property of table before caching a value');
            return valueKey;
        }
        if (!this._trackRowByFields) {
            this._trackRowByFields = this.originData.field;
        }
        this._trackRowByFields.forEach(field => {
            const col = this.originData.field.findIndex(f => f == field);
            if (col != -1) {
                valueKey += this.originData.data[row][col] + '$$';
            }
        });
        return valueKey;
    }

    // private _fixRow(row:number):number {
    //     return rowIndexGenerator(this.originData, row) - 1;
    // }

    public cacheValue(row:number, value:any):void {
        const valueKey = this._getValueKey(row);
        if (!valueKey) {
            console.warn(`invalid value key by row[${row}]`);
            return;
        }
        this._cachedValues[valueKey] = value;
    }

    public getCachedValue(row:number):any {
        const valueKey = this._getValueKey(row);
        if (!valueKey) {
            console.warn(`invalid value key by row[${row}]`);
            return;
        }
        return this._cachedValues[valueKey];
    }
}


