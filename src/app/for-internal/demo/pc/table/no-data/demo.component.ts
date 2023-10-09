import {Component} from "@angular/core";
import {ColumnDefine, TableData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableNoDataDemoComponent {
    tableData: TableData;
    tableData2: TableData;
    columnDefines: ColumnDefine[];

    constructor() {
        this.tableData = new TableData(
            [],
            ["name", "position", "salary", "title1", "enroll-date", "office", "extn", "title2", "title3"],
            ["姓名", "职位", "薪资", "很长很长很长很长很长很长很长的用于测试的标题", "入职日期", "部门", "其他", "很长很长很长很长很长很长很长的用于测试的标题", "很长很长很长很长很长很长很长的用于测试的标题"]);

        const field = this._generateStringArray('FIELD', 6);
        const header = this._generateStringArray('HEADER', 6);
        this.columnDefines = [{target: field, width: 'byContent'}];
        this.tableData2 = new TableData([], field, header);
    }

    public moreColumns() {
        const field = this._generateStringArray('FIELD', 26);
        const header = this._generateStringArray('HEADER', 26);
        this.columnDefines = [{target: field, width: 'byContent'}];
        this.tableData2 = new TableData([], field, header);
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
