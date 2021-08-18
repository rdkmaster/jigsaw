import { Component } from "@angular/core";
import { TableData } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class TableAutoFillUpDemoComponent {
    tableData: TableData;

    _$noData() {
        this.tableData.fromObject({
            data: [],
            field: ["name", "position", "salary", "enroll-date", "office", "extn"],
            header: ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]
        });
    }

    _$updateData() {
        const _data = [];
        for (let i = 1; i < Math.floor(Math.random() * 7) + 2; i++) {
            _data.push(["Tiger Nixon" + i, "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"]);
            _data.push(["Garrett Winflters" + i, "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"]);
        }

        this.tableData.fromObject({
            data: _data,
            field: ["name", "position", "salary", "enroll-date", "office", "extn"],
            header: ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]
        });
    }

    constructor() {
        this.tableData = new TableData(
            [
                ["Tiger Nixon1", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winflters1", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon2", "System Arcfhitect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                ["Garrett Winslters2", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon3", "System Arcfhitect", "$320,8000", "2011/04/25", "Edinburgh", "5421"],
                ["Garrett Winflters3", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]
        );
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
