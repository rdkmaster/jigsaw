import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalPageableTableData } from "jigsaw/public_api";
import { PaginationTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'pagination-simple',
    templateUrl: './demo.component.html'
})
export class PaginationSimpleDemoComponent {
    public selectedSize = { label: "中", size: "medium" };
    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" }
    ]);
    public pageableForSimple: LocalPageableTableData;
    public pageSizeOptions = [5, 10, 12];

    public getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    public getPageSize(message: any) {
        console.log("page size is: " + message);
    }

    constructor(http: HttpClient, public doc: PaginationTextService) {
        this.pageableForSimple = new LocalPageableTableData();
        this.pageableForSimple.http = http;
        // 小尺寸的分页通过data设置pageSize
        this.pageableForSimple.pagingInfo.pageSize = 20;
        this.pageableForSimple.fromAjax('mock-data/hr-list-full');
    }
}
