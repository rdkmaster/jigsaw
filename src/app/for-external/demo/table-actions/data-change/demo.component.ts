import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, ColumnDefine, DefaultCellRenderer } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-data-change',
    templateUrl: './demo.component.html'
})
export class TableDataChangeDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-actions/data-change";

    public tableData: TableData;
    columns: ColumnDefine[] = [
        {
            target: 'name',
            width: '15%',
            cell: {
                renderer: DefaultCellRenderer,
            }
        },
    ];

    public dataChange() {
        this.tableData = new TableData(this.tableData.data.slice(0, 3), this.tableData.field, this.tableData.header);
        console.log(this.tableData.data)
    }

    public columnsChange() {
        this.columns[0].width = '30%';
        this.tableData.refresh();
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
