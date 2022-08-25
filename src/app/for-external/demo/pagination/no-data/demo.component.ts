import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { LocalPageableTableData, ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'pagination-no-data',
    templateUrl: './demo.component.html'
})
export class PaginationNoDataDemoComponent extends AsyncDescription {
    public demoPath = "demo/pagination/no-data";

    public paginationData: LocalPageableTableData;

    public getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    public getPageSize(message: any) {
        console.log("page size is: " + message);
    }

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" }
    ]);
    public selectedSize = { label: "中", size: "medium" };
    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.paginationData = new LocalPageableTableData();
        this.paginationData.fromObject({
            header: ['header0', 'header1', 'header2', 'header3'],
            field: ['field0', 'field1', 'field2', 'field3'],
            data: []
        });
    }
}
