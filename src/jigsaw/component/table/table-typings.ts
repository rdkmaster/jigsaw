import {TemplateRef, Type} from "@angular/core";
import {LocalPageableTableData, PageableTableData, TableData} from "../../core/data/table-data";
import {SortAs, SortOrder} from "../../core/data/component-data";
import {TableCellRendererBase} from "./table-renderer";

export type TableColumnTargetFinder = (field: string, index: number) => boolean;
export type TableColumnTarget = number|string|(number|string)[]|TableColumnTargetFinder;
export type TableCellDataGenerator = (tableData: TableData, row: number, column:number) => any;

export const tableRowIndexGenerator:TableCellDataGenerator = (tableData: TableData, row: number) => {
    let index = 1;
    if (tableData instanceof PageableTableData || tableData instanceof LocalPageableTableData) {
        index += (tableData.pagingInfo.currentPage - 1) * tableData.pagingInfo.pageSize - 1;
    }
    index += row;
    return index;
};

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
    field?: string;
    visible?: boolean;
    width?: string;
    header?: TableHeader;
    cell?: TableCell;
    group?: boolean;
}

export class TableDataChangeEvent {
    field: string|number;
    row: number|number[];
    column: number;
    rawColumn: number;
    cellData: string|number;
    oldCellData: string|number;
}

export class TableHeader {
    text?: string;
    renderer?: Type<TableCellRendererBase>|TemplateRef<any>;
    clazz?: string;
    sortable?: boolean;
    sortAs?: SortAs;
    defaultSortOrder?: SortOrder;
}

export class TableCell {
    renderer?: Type<TableCellRendererBase>|TemplateRef<any>;
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
    field: number;
}

export class TableCellSetting {
    cellData: string | number;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz: string;
    editable: boolean;
    editorRenderer: Type<TableCellRendererBase> | TemplateRef<any>;
    group: boolean;
    field: number;
    rowSpan: number;
}

export class SortChangeEvent {
    sortAs: SortAs;
    order: SortOrder;
    field: number;
}

