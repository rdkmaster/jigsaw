import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'pagination-big-data',
    templateUrl: './demo.component.html'
})
export class PaginationBigDataDemoComponent extends AsyncDescription {
    public demoPath = "demo/pagination/big-data";
    public selectedSize = { size: "medium" };

    public searchable: boolean = false;
    public pageable: LocalPageableTableData;
    public pageableForSimple: LocalPageableTableData;
    public pageSizeOptions = [5, 10, 12];
    public showQuickJumper = true;

    public getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    public getPageSize(message: any) {
        console.log("page size is: " + message);
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
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
}
