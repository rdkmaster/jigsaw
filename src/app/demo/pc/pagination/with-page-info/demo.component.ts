import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData, PageableTableData, PagingInfo} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class WithPagingInfoDemoComponent {
    actions = 0;
    pageable: LocalPageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');

        this.pageable.pagingInfo.totalRecord = 200;
        this.pageable.pagingInfo.subscribe(() => {
            this.actions++;
        })
    }




    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
