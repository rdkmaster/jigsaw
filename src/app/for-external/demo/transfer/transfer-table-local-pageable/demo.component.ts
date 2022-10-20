import { HttpClient } from "@angular/common/http";
import {Component, ElementRef} from "@angular/core";
import { TransferTableSourceRenderer, TransferListDestRenderer, ArrayCollection, ListOption, LocalPageableTableData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'transfer-table-local-pageable-transfer',
    templateUrl: './demo.component.html'
})
export class TransferTableLocalPageableDemoComponent extends AsyncDescription {
    public demoPath = "demo/transfer/transfer-table-local-pageable";

    public data: LocalPageableTableData;
    public sourceRenderer = TransferTableSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public selectedData: ArrayCollection<ListOption>;

    public labelField = 'name';
    public trackItemBy = 'name';

    public selectedItemsChange($event) {
        console.log($event)
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data = new LocalPageableTableData();
        this.data.http = http;
        this.data.pagingInfo.pageSize = 10;
        this.data.fromAjax('mock-data/hr-list-full');

        this.selectedData = new ArrayCollection([]);
    }
}
