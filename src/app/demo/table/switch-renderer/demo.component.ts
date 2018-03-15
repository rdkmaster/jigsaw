import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";
import {TableCellSwitchRenderer} from "jigsaw/component/table/table-renderer";

@Component({
    templateUrl: './demo.component.html'
})
export class TableSwitchRendererDemoComponent {
    tableData: TableData;
    changeMsg: string;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
        // 添加switch列数据
        this.tableData.dataReviser = data => {
            data.field.splice(-1, 0, 'marriage');
            data.header.splice(-1, 0, '婚否');
            data.data.forEach(row => {
                row.splice(-1, 0, row[2] == "System Architect" ? 1 : 0);
            });
            return data;
        }
    }

    columns: ColumnDefine[] = [
        {
            target: 'marriage',
            cell: {
                renderer: TableCellSwitchRenderer
            }
        }
    ];

    onCellChange(value) {
        this.changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.column]);
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'TableCellSwitchRenderer'
    ];
}



