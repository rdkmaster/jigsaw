import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, ColumnDefine, ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableColumnResizableDemoComponent {
    public tableData: TableData;

    public columnResizable: boolean = true;
    public selectedScale = [{label: "1.0", id: 2}];
    public scales = new ArrayCollection([
        {label: "0.8", id: 1},
        {label: "1.0", id: 2},
        {label: "1.5", id: 3}
    ]);
    public columnIndex: number = 1;
    public columnVisible(index: number) {
        this.columns[index].visible = !this.columns[index].visible;
        this.tableData.refresh();
    }

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    public columns: ColumnDefine[] = [
        {
            target: 'name',
            visible: true
        },
        {
            target: 'gender',
            visible: true
        },
        {
            target: 'position',
            visible: true
        },
        {
            target: 'salary',
            visible: true
        },
        {
            target: 'enroll-date',
            visible: true
        },
        {
            target: 'office',
            visible: true
        },
        {
            target: 'desc',
            visible: true
        },
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
