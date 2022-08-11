import { Component } from "@angular/core";
import { LocalPageableTableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class PaginationNoDataDemoComponent {
    data: LocalPageableTableData;
    delayData: LocalPageableTableData;


    constructor() {
        this.data = new LocalPageableTableData();
        this.data.fromObject({
            header: ['header0', 'header1', 'header2', 'header3'],
            field: ['field0', 'field1', 'field2', 'field3'],
            data: []
        });
    }

    updateDelayData() {
        this.delayData = new LocalPageableTableData();
        this.delayData.fromObject({
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此Demo展示了Pagination组件在空数据/数据延迟设置时的表现';
    description: string = '';
}
