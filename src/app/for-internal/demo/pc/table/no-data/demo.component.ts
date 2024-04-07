import { Component } from "@angular/core";
import { ColumnDefine, TableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableNoDataDemoComponent {
    tableData: TableData;
    tableData2: TableData;
    tableData3: TableData;
    tableData4: TableData;

    columnDefines: ColumnDefine[];

    public noDataImgSrc = "/app/for-internal/demo/pc/table/no-data/assets/default-light.png";

    public noDataDarkImgSrc = "/app/for-internal/demo/pc/table/no-data/assets/default-dark.png";

    constructor() {
        this.tableData = new TableData(
            [],
            ["name", "position", "salary", "title1", "enroll-date", "office", "extn", "title2", "title3"],
            ["姓名", "职位", "薪资", "很长很长很长很长很长很长很长的用于测试的标题", "入职日期", "部门", "其他", "很长很长很长很长很长很长很长的用于测试的标题", "很长很长很长很长很长很长很长的用于测试的标题"]);

        this.tableData2 = new TableData(
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

        this.tableData3 = new TableData(
            [],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);

        this.resetData();
    }

    public moreColumns(needData: boolean = false) {
        const field = this._generateStringArray('FIELD', 26);
        const header = this._generateStringArray('HEADER', 26);
        this.columnDefines = [{ target: field, width: 'byContent' }];
        if (needData) {
            const data = this._generateStringArray('CELL', 26);
            this.tableData4 = new TableData([data], field, header);
            return;
        }
        this.tableData4 = new TableData([], field, header);
        setTimeout(() => {
            // 需要更新columnDefine
            this.tableData4.refresh();
        })
    }

    public resetData() {
        const field = this._generateStringArray('FIELD', 6);
        const header = this._generateStringArray('HEADER', 6);
        this.columnDefines = [{ target: field, width: 'byContent' }];
        this.tableData4 = new TableData([], field, header);
        setTimeout(() => {
            // 需要更新columnDefine
            this.tableData4.refresh();
        })
    }

    private _generateStringArray(label: string, n: number): string[] {
        const result: string[] = [];
        for (let i = 0; i < n; i++) {
            result.push(`${label}${i}`);
        }
        return result;
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}




