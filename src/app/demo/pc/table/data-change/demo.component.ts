import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine, DefaultCellRenderer} from "jigsaw/public_api";
import {TableTextService} from "../text.service";

@Component({
    selector: 'data-change-table',
    templateUrl: './demo.component.html'
})
export class TableDataChangeDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient, public text: TableTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[] = [
        {
            target: 'name',
            width: '15%',
            cell: {
                renderer: DefaultCellRenderer,
            }
        },
    ];

    dataChange() {
        this.tableData = new TableData(this.tableData.data.slice(0, 3), this.tableData.field, this.tableData.header);
        console.log(this.tableData.data)
    }

    columnsChange() {
        this.columns[0].width = '30%';
        this.tableData.refresh();
    }
}
