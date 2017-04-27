import {Input, Type, Output, EventEmitter} from "@angular/core";
import {TableData} from "../../core/data/table-data";
import {SortAs, SortOrder} from "../../core/data/component-data";

export class TableCellRenderer {
    protected dispatchRenderChange(value: string|number|TableHeadChangeEvent): void{
        this.cellDataChange.emit(value)
    }

    @Input() tableData: TableData;
    @Input() cellData: any;
    @Input() row: number;
    @Input() column: number;

    @Output() cellDataChange: EventEmitter<string|number|TableHeadChangeEvent> = new EventEmitter<string|number|TableHeadChangeEvent>();
}

export type ColumnDefine = {
    target: targetType,
    visible?: boolean,
    width?: string,
    header?: Header,
    cell?: Cell,
    group?: boolean
}

export type AdditionalColumnDefine = {
    pos?: number,
    target?: string|number,
    visible?: boolean,
    width?: string,
    header?: Header,
    cell?: Cell,
    group?: boolean
}

export type TableDataChangeEvent = {
    field: string|number,
    row: number|number[],
    column: number,
    rawColumn: number,
    cellData: string|number,
    oldCellData: string|number
}

export type TableHeadChangeEvent = {
    rows: number[],
    cellData: string|number,
    oldCellData: string|number
}

type targetType = number|string|number[]|string[]|targetFun;

type targetFun = (field: string, index: number) => boolean;

type Header = {
    renderer?: Type<TableCellRenderer>,
    class?: string,
    sortable?: boolean,
    sortAs?: SortAs,
    defaultSortOrder?: SortOrder
}

type Cell = {
    renderer?: Type<TableCellRenderer>,
    class?: string,
    editable?: boolean,
    editorRenderer?: Type<TableCellRenderer>
}
