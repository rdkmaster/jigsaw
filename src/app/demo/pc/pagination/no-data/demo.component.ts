import { Component } from "@angular/core";
import { LocalPageableTableData, ArrayCollection } from "jigsaw/public_api";
import {PaginationTextService} from "../doc.service";

@Component({
    selector: 'pagination-no-data',
    templateUrl: './demo.component.html'
})
export class PaginationNoDataDemoComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
    paginationData: LocalPageableTableData;

    constructor(public text: PaginationTextService) {
        this.paginationData = new LocalPageableTableData();
        this.paginationData.fromObject({
            header: ['header0', 'header1', 'header2', 'header3'],
            field: ['field0', 'field1', 'field2', 'field3'],
            data: []
        });
    }

    getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    getPageSize(message: any) {
        console.log("page size is: " + message);
    }
}
