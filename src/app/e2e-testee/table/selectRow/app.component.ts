import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {Http} from "@angular/http";

@Component({
    templateUrl: './app.component.html'
})
export class TableSelectRowDemoComponent {
    tableData: TableData;
    selectedRow: number = 5;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    getSelectedRow(rowIndex: number) {
        console.log(`row number ${rowIndex + 1} was selected`)
    }
}

