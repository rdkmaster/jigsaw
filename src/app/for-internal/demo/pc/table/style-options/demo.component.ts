import { Component, ViewChild } from "@angular/core";
import { JigsawTable, TableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class TableSetStyleDemoComponent {
    tableData: TableData;

    @ViewChild('table')
    public table: JigsawTable;

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
                    "Garrett Winters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winslters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Wintsers2",
                    "Accountant",
                    "$170,50",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }

    public styleOptions = {
        table: {
            background: 'cyan',
            backgroundImage: 'url("app/for-internal/demo/pc/navigation-bar/basic/assets/logo-dark.png")',
            border: '5px solid red',
            shadow: '0px 1px 2px hsla(0, 0%, 0%, 0.12)'
        },
        header: {
            height: '40px'
        },
        body: {},
        other: {}
    }

    public updateStyleOptions() {
        this.table.updateStyleOptions();
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
