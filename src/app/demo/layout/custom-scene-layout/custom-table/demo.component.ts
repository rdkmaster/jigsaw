import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'custom-table',
    template: '{{message}}<br><jigsaw-table [data]="tableData" ></jigsaw-table>',
    styles: [`
        :host {
            display: block;
            width: 100%;
        }
    `]
})
export class CustomTableComponent {
    subscriber: string = 'cipher123456';
    message: string = '';

    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}

