import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ArrayCollection, TableData, TransferListSourceRenderer, TransferListDestRenderer } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'transfer-item-disabled',
    templateUrl: './demo.component.html'
})
export class TransferItemDisabledDemoComponent extends AsyncDescription {
    public demoPath = "demo/transfer/item-disabled";

    public data: ArrayCollection<any>;

    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data = new ArrayCollection();
        this.data.http = http;
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = (td: TableData) => {
            return TableData.toArray(td).map(item => {
                item.disabled = Math.random() > 0.8;
                return item;
            })
        }
    }
}
