import { Component } from "@angular/core";
import { TableData } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TableAutoFillUpDemoComponent {
    tableData: TableData;

    _$noData() {
        this.tableData.fromObject({
            data: [],
            field: ["name", "position", "salary"],
            header: ["姓名", "职位", "薪资"]
        });
    }

    _$updateData() {
        const _data = [];
        for (let i = 1; i < Math.floor(Math.random() * 7) + 2; i++) {
            _data.push(["Tiger Nixon" + i, "System Architect", "$320,00"]);
            _data.push(["Garrett Winflters" + i, "Accountant", "$170,7"]);
        }

        this.tableData.fromObject({
            data: _data,
            field: ["name", "position", "salary"],
            header: ["姓名", "职位", "薪资"]
        });
    }

    constructor() {
        this.tableData = new TableData(
            [
                ["Tiger Nixon1", "System Architect", "$320,00"],
                ["Garrett Winflters1", "Accountant", "$170,7"],
                ["Tiger Nixon2", "System Arcfhitect", "$320,8000"],
                ["Garrett Winslters2", "Accountant", "$170,7"],
                ["Tiger Nixon3", "System Arcfhitect", "$320,8000"],
                ["Garrett Winflters3", "Accountant", "$170,7"]
            ],
            ["name", "position", "salary"],
            ["姓名", "职位", "薪资"]
        );
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
