import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalPageableTableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class PaginationNoDataDemoComponent {
    data: LocalPageableTableData;

    constructor(http: HttpClient) {
        this.data = new LocalPageableTableData();
        this.data.http = http;
        this.data.fromAjax('mock-data/no-data-for-paging');
    }

    getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    getPageSize(message: any) {
        console.log("page size is: " + message);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
