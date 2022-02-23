import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ArrayCollection, LocalPageableArray, TableData, TransferListSourceRenderer, TransferListTargetRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferListLocalPageableDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListTargetRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';

    constructor(_http: HttpClient) {
        this.data = new LocalPageableArray();
        this.data.http = _http;
        this.data.pagingInfo.pageSize = 15;
        this.data.pagingInfo.currentPage = undefined;
        this.data.pagingInfo.itemHeight = undefined;
        this.data.pagingInfo.autoPageSizing = false;
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = (td: TableData) => TableData.toArray(td);


        this.selectedData = new ArrayCollection([
            {
                enName: "andorra",
                shortName: "and",
                zhName: "安道尔"
            },
            {
                enName: 'belize',
                zhName: '伯里兹',
                shortName: 'blz'
            }]);
    }

    ngOnInit(){

    }

    data: LocalPageableArray<any>;
    selectedData: ArrayCollection<any>;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
