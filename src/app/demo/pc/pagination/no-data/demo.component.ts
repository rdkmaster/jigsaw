import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalPageableTableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class PaginationNoDataDemoComponent {
    data: LocalPageableTableData;
    delayData: LocalPageableTableData;


    constructor(http: HttpClient) {
        this.data = new LocalPageableTableData();
        this.data.http = http;
        this.data.fromAjax('mock-data/no-data-for-paging');

        setTimeout(() => {
            this.delayData = new LocalPageableTableData();
            this.delayData.http = http;
            this.delayData.fromAjax('mock-data/no-data-for-paging');
        }, 2000);
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
    summary: string = '此Demo展示了Pagination组件在空数据/数据延迟设置时的表现';
    description: string = '';
}
