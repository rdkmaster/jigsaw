import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'pagination-fold',
    templateUrl: './demo.component.html'
})
export class PaginationFoldDemoComponent extends AsyncDescription {
    public demoPath = "demo/pagination/fold";
    public selectedSize = { size: "medium" };

    public pageable: LocalPageableTableData;
    public pageSizeOptions = [5, 10, 12];

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
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list-full');
    }
}
