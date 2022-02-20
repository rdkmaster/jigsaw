import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { TableData, TransferTableSourceRenderer, TransferListTargetRenderer, ArrayCollection, listOption, TransferTableTargetRenderer, LocalPageableTableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'

})
export class TransferTableLocalPageableDemoComponent {

    constructor(http: HttpClient) {
        this.data = new LocalPageableTableData();
        this.data.http = http;
        this.data.pagingInfo.pageSize = 10;
        this.data.fromAjax('mock-data/hr-list-full');

        this.selectedData = new ArrayCollection([]);
    }

    data: LocalPageableTableData;
    public sourceRenderer = TransferTableSourceRenderer;
    public targetRenderer = TransferListTargetRenderer;

    selectedData: ArrayCollection<listOption>;

    labelField = 'name';
    trackItemBy = 'name';

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
