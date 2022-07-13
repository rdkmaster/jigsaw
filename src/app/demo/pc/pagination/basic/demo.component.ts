import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData} from "jigsaw/public_api";
import {PaginationTextService} from "../text.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'basic-pagination',
    templateUrl: './demo.component.html'
})
export class PaginationBasicDemoComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    searchable: boolean = false;
    pageable: LocalPageableTableData;
    pageableForSimple: LocalPageableTableData;
    pageSizeOptions = null;
    showQuickJumper = true;

    constructor(http: HttpClient, public text: PaginationTextService) {
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
}
