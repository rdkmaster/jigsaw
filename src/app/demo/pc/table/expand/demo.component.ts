import { Component } from "@angular/core";
import { TableData, ColumnDefine } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableExpandDemoComponent {
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
                    "Test",
                    "Test",
                    "Test",
                    "Test",
                    "Test",
                    "Test"
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }

    columns: ColumnDefine[] = [
        {
            target: "salary",
            width: "20%",
            group: true,
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
