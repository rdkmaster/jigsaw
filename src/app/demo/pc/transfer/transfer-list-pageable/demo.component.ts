import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ArrayCollection, TableData, TransferListSourceRenderer, TransferListTargetRenderer, PageableArray } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferListPageableDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListTargetRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';

    constructor(_http: HttpClient) {
        this.data = new PageableArray(_http, 'mock-data/countries');
        this.data.fromAjax();

        this.selectedData = new ArrayCollection();
        this.selectedData.http = _http;
        this.selectedData.fromAjax('mock-data/countries');
        this.selectedData.dataReviser = (td: TableData) => TableData.toArray(td).slice(10, 15);
    }

    data: PageableArray;
    selectedData: ArrayCollection<any>;

    selectedItemsChange($event){
        console.log($event)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
