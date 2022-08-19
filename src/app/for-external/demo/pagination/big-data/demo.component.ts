import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData, ArrayCollection} from "jigsaw/public_api";
import {PaginationTextService} from "../doc.service";

@Component({
    selector: 'pagination-big-data',
    templateUrl: './demo.component.html'
})
export class PaginationBigDataDemoComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    searchable: boolean = false;
    pageable: LocalPageableTableData;
    pageableForSimple: LocalPageableTableData;
    pageSizeOptions = [5, 10, 12];
    showQuickJumper = true;

    constructor(http: HttpClient, public doc: PaginationTextService) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 2;
        this.pageable.fromAjax('mock-data/big-data-for-paging');

        this.pageableForSimple = new LocalPageableTableData();
        this.pageableForSimple.http = http;
        // 小尺寸的分页通过data设置pageSize
        this.pageableForSimple.pagingInfo.pageSize = 5;
        this.pageableForSimple.fromAjax('mock-data/big-data-for-paging');
    }

    getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    getPageSize(message: any) {
        console.log("page size is: " + message);
    }
}
