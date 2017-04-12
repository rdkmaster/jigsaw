import {Input, Type} from "@angular/core";
import {TableData} from "../../core/data/table-data";
import {SortAs, SortOrder} from "../../core/data/component-data";

export class TableCellRenderer {
    @Input() tableData: TableData;
    @Input() cellData: any;
    @Input() row: number;
    @Input() column: number;
}

export type ColumnSetting = {
    target: targetType,
    visible?: boolean,
    width?: string,
    header?: Header,
    cell?: Cell,
    group?: boolean
}

export type AdditionalColumnSetting = {
    pos: number,
    target?: string|number,
    visible?: boolean,
    width?: string,
    header?: Header,
    cell?: Cell,
    group?: boolean
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
