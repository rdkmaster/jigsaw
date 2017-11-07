import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './app.component.html'
})
export class TableSelectRowDemoComponent {
    tableData: TableData;
    selectedRow: number = 5;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    getSelectedRow(rowIndex: number) {
        console.log(`row number ${rowIndex + 1} was selected`)
    }
}

