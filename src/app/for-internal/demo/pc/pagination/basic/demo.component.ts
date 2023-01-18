import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class PaginationBasicDemoComponent {
    searchable: boolean = false;
    pageable: LocalPageableTableData;
    pageableForSimple: LocalPageableTableData;
    maxPageSize: number[] = [99];
    pageSizeOptions = null;
    showQuickJumper = true;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list-full');

        this.pageableForSimple = new LocalPageableTableData();
        this.pageableForSimple.http = http;
        // 小尺寸的分页通过data设置pageSize
        this.pageableForSimple.pagingInfo.pageSize = 20;
        this.pageableForSimple.fromAjax('mock-data/hr-list-full');
    }

    getPageSizeOptions(): number[] {
        const options = [];
        let max = (this.maxPageSize[0] + 1) / 10;
        while (max >= 100) {
            options.unshift(max);
            max /= 10;
        }
        options.unshift(5, 10, 20);
        return options;
    }

    getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    getPageSize(message: any) {
        console.log("page size is: " + message);
    }

    changeCurrentPage(number) {
        this.pageable.pagingInfo.currentPage = number;
        this.pageableForSimple.pagingInfo.currentPage = number;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
