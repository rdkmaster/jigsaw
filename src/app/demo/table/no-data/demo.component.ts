import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './demo.component.html'
})
export class TableNoDataDemoComponent {
    tableData: TableData;

    constructor() {
        this.tableData = new TableData(
            /*[
                [
                    "Tiger Nixon1",
                    "System Architect",
                    "$320,00",
                    "a normal content",
                    "2011/04/25",
                    "Edinburgh",
                    "542",
                    "a normal content",
                    "a normal content"
                ],
                [
                    "Garrett Winflters1",
                    "Accountant",
                    "$170,7",
                    "a normal content",
                    "2011/07/25",
                    "Tokyo",
                    "8422",
                    "a normal content",
                    "a normal content"
                ],
            ],*/
            [],
            ["name", "position", "salary", "title1", "enroll-date", "office", "extn", "title2", "title3"],
            ["姓名", "职位", "薪资", "很长很长很长很长很长很长很长的用于测试的标题", "入职日期", "部门", "其他", "很长很长很长很长很长很长很长的用于测试的标题", "很长很长很长很长很长很长很长的用于测试的标题"]);
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

