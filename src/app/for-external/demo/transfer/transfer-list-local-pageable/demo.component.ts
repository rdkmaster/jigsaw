import { HttpClient } from "@angular/common/http";
import {Component, ElementRef} from "@angular/core";
import { ArrayCollection, LocalPageableArray, TableData, TransferListSourceRenderer, TransferListDestRenderer } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'transfer-list-local-pageable-transfer',
    templateUrl: './demo.component.html'
})
export class TransferListLocalPageableDemoComponent extends AsyncDescription {
    public demoPath = "demo/transfer/transfer-list-local-pageable";

    public data: LocalPageableArray<any>;
    public selectedData: ArrayCollection<any>;
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';

    public selectedItemsChange($event) {
        console.log($event)
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data = new LocalPageableArray();
        this.data.http = http;
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
}
