import {Component} from "@angular/core";
import {LocalPageableTableData} from "jigsaw/core/data/table-data";
import {HttpClient} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class PaginationBasicDemoComponent {

    pageable: LocalPageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');
    }

    getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    getPageSize(message: any) {
        console.log("page size is: " + message);
    }

    changeCurrentPage(number) {
        this.pageable.pagingInfo.currentPage = number;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawPagination'
    ];
}

