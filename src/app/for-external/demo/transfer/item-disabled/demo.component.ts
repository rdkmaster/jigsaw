import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, TableData, TransferListSourceRenderer, TransferListDestRenderer} from "jigsaw/public_api";
import {TransferTextService} from "../doc.service";

@Component({
    selector: 'transfer-item-disabled',
    templateUrl: './demo.component.html'
})
export class TransferItemDisabledDemoComponent {
    constructor(private _http: HttpClient, public doc: TransferTextService) {
        this.data = new ArrayCollection();
        this.data.http = _http;
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = (td: TableData) => {
            return TableData.toArray(td).map(item => {
                item.disabled = Math.random() > 0.8;
                return item;
            })
        }
    }

    data: ArrayCollection<any>;

    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';
}
