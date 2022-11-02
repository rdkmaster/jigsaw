import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalPageableTableData, ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'pagination-simple',
    templateUrl: './demo.component.html'
})
export class PaginationSimpleDemoComponent extends AsyncDescription {
    public demoPath = "demo/pagination/simple";
    public selectedSize = { size: "medium" };

    public pageableForSimple: LocalPageableTableData;
    public pageSizeOptions = [5, 10, 12];

    public getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    public getPageSize(message: any) {
        console.log("page size is: " + message);
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.pageableForSimple = new LocalPageableTableData();
        this.pageableForSimple.http = http;
        // 小尺寸的分页通过data设置pageSize
        this.pageableForSimple.pagingInfo.pageSize = 20;
        this.pageableForSimple.fromAjax('mock-data/hr-list-full');
    }
}
