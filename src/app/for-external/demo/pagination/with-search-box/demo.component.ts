import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalPageableTableData } from "jigsaw/public_api";
import { PaginationTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'pagination-with-search-box',
    templateUrl: './demo.component.html'
})
export class PaginationWithSearchBoxDemoComponent {
    public selectedSize = { label: "中", size: "medium" };
    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" }
    ]);
    public pageable: LocalPageableTableData;
    public pageSizeOptions = [5, 10, 12];
    public showQuickJumper = true;

    public getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    public getPageSize(message: any) {
        console.log("page size is: " + message);
    }

    constructor(http: HttpClient, public doc: PaginationTextService) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list-full');
    }
}
