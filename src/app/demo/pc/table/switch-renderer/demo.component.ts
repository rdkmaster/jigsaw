import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";
import {TableCellSwitchRenderer} from "jigsaw/pc-components/table/table-renderer";

@Component({
    templateUrl: './demo.component.html'
})
export class TableSwitchRendererDemoComponent {
    tableData: TableData;
    changeMsg: string;
    columns: ColumnDefine[];

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        // 添加switch列数据
        this.tableData.dataReviser = data => {
            data = JSON.parse(JSON.stringify(data));
            data.field.splice(-1, 0, 'marriage');
            data.header.splice(-1, 0, '婚否');
            data.data.forEach(row => {
                row.splice(-1, 0, row[2] == "System Architect" ? 1 : 0);
            });
            return data;
        };
        this.tableData.fromAjax('mock-data/hr-list');
        this.createColumnDefines(false);
    }

    public createColumnDefines(readonly: boolean):void {
        this.columns = [
            {
                target: 'marriage',
                cell: {
                    renderer: TableCellSwitchRenderer,
                    rendererInitData: {readonly}
                }
            }
        ];
        this.tableData.refresh();
    }

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
}



