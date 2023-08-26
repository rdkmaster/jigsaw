import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DataSortInfo, LocalPageableTableData, PageableTableData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class WithPagingInfoDemoComponent {
    pageable: LocalPageableTableData;
    pageable1: PageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');
        this.pageable.pagingInfo.totalRecord = 200;

        this.pageable1 = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: {aa: 11, bb: 22}, method: 'post'
        });
        this.pageable1.pagingInfo.pageSize = 5;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
