import {Input} from "@angular/core";
import {TableData} from "../../core/data/table-data";


export class TableCellRenderer {
    @Input() tableData: TableData;
    @Input() cellData: any;
    @Input() row: number;
    @Input() column: number;
}
