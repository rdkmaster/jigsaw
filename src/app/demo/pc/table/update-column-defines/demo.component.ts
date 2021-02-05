import {Component} from "@angular/core";
import {ColumnDefine, TableData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableUpdateColumnDefinesDemoComponent {
    tableData: TableData;

    constructor() {
        this.tableData = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "System Architect",
                    "$320,00",
                    "2011/04/25",
                    "Edinburgh",
                    "542"
                ],
                [
                    "Garrett Winflters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }

    columnDefines: ColumnDefine[];

    changeColumnDefine() {
        this.columnDefines = [{
            target: 0,
            header: {
                renderer: 'html',
                data: (data, col) => `${data.header[col]}
                    <select id="unitSelect">
                        <option value="￥">￥</option>
                        <option value="$">$</option>
                    </select>`
            }
        }];
        setTimeout(() => {
            this.tableData.refresh();
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
