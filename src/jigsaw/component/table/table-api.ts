import {EventEmitter, Input, Output, TemplateRef, Type} from "@angular/core";
import {LocalPageableTableData, PageableTableData, TableData} from "../../core/data/table-data";
import {SortAs, SortOrder} from "../../core/data/component-data";

export type TableColumnTargetFinder = (field: string, index: number) => boolean;
export type TableColumnTarget = number|string|(number|string)[]|TableColumnTargetFinder;
export type TableCellDataGenerator = (tableData: TableData, row: number, column:number) => any;

export const tableRowIndexGenerator:TableCellDataGenerator = (tableData: TableData, row: number, column:number) => {
    let index = 1;
    if (tableData instanceof PageableTableData || tableData instanceof LocalPageableTableData) {
        index += (tableData.pagingInfo.currentPage - 1) * tableData.pagingInfo.pageSize - 1;
    }
    index += row;
    return index;
};

export class TableCellRenderer {
    public dispatchChangeEvent(value: any): void{
        this.cellDataChange.emit(value)
    }

    @Input() public tableData: TableData;
    @Input() public cellData: any;
    @Input() public row: number;
    @Input() public column: number;

    @Output() public cellDataChange = new EventEmitter<any>();
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

export class TableHeadChangeEvent {
    rows: number[];
    cellData: string|number;
    oldCellData: string|number;
}

export class TableHeader {
    text?: string;
    renderer?: Type<TableCellRenderer>|TemplateRef<any>;
    clazz?: string;
    sortable?: boolean;
    sortAs?: SortAs;
    defaultSortOrder?: SortOrder;
}

export class TableCell {
    renderer?: Type<TableCellRenderer>|TemplateRef<any>;
    clazz?: string;
    editable?: boolean;
    editorRenderer?: Type<TableCellRenderer>;
    data?: any | TableCellDataGenerator;
}

export class TableHeadSetting {
    cellData: string | number;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRenderer> | TemplateRef<any>;
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
    renderer: Type<TableCellRenderer> | TemplateRef<any>;
    clazz: string;
    editable: boolean;
    editorRenderer: Type<TableCellRenderer> | TemplateRef<any>;
    group: boolean;
    field: number;
    rowSpan: number;
}

export class SortChangeEvent {
    sortAs: SortAs;
    order: SortOrder;
    field: number;
}
export class RemoveTdListener {
    removeTdListener: Function;
    row: number;
    column: number;
}

export class TableRendererInfo {
    row: number;
    column: number;
    rawColumn: number;
    renderer: TableCellRenderer;
    editorRenderer: TableCellRenderer;
}
