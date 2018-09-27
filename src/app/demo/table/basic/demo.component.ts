import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './demo.component.html'
})
export class TableBasicDemoComponent {
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
                    "542",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5"
                ],
                [
                    "Garrett Winflters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5"
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5"
                ],
                [
                    "Garrett Winslters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5"
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5",
                    "111wwww2rfrrrrtt5yy5"
                ]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn", "test1", "test2", "test3", "test4", "test5"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他", "测试测试测试测试1", "测试测试测试测试2", "测试测试测试测试3", "测试测试测试测试4", "测试测试测试测试5"]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTable',
        'TableData'
    ];
}

