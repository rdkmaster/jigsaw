import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'custom-table',
    template: '<jigsaw-table [data]="tableData" ></jigsaw-table>',
    styles: [`
        :host {
            display: block;
            width: 100%;
        }
    `]
})
export class CustomTableComponent {
    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}

