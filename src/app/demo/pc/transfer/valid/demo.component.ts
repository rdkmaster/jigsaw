import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ArrayCollection, LocalPageableArray, TableData, TransferListSourceRenderer, TransferListDestRenderer } from "jigsaw/public_api";
import {TransferTextService} from "../text.service";

@Component({
    selector: 'valid-transfer',
    templateUrl: './demo.component.html'
})
export class TransferArrayValidDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';

    constructor(_http: HttpClient, public text: TransferTextService) {
        this.data = new LocalPageableArray();
        this.data.http = _http;
        this.data.pagingInfo.pageSize = 15;
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = (td: TableData) => TableData.toArray(td);

        this.selectedData = new ArrayCollection([]);
    }

    data: LocalPageableArray<any>;
    selectedData: ArrayCollection<any>;
}
