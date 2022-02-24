import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
    TransferTableSourceRenderer,
    TransferListTargetRenderer,
    ArrayCollection,
    listOption,
    PageableTableData
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']

})
export class TransferTablePageableDemoComponent {

    constructor(http: HttpClient) {
        this.data = new PageableTableData(http, 'mock-data/hr-list-full');
        this.data.http = http;
        this.data.pagingInfo.pageSize = 10;
        this.data.fromAjax();

        this.selectedData = new ArrayCollection([]);
    }

    data: PageableTableData;
    public sourceRenderer = TransferTableSourceRenderer;
    public targetRenderer = TransferListTargetRenderer;

    selectedData: ArrayCollection<listOption>;

    labelField = 'name';
    trackItemBy = 'name';

    selectedItemsChange($event) {
        console.log($event)
    }

    changeData() {
        this.data.fromAjax('mock-data/hr-list-short');
    }

    resetInputData() {
        this.data.fromAjax('mock-data/hr-list-full');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
