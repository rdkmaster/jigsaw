import { Component } from "@angular/core";
import {ArrayCollection, TransferListSourceRenderer, TransferListDestRenderer, LocalPageableArray, TableData} from "jigsaw/public_api";
import {TransferTextService} from "../doc.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'transfer-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferBasicDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;
    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';

    data: ArrayCollection<any>;
    selectedItems: ArrayCollection<any>;
    data1: LocalPageableArray<any>;
    selectedData: ArrayCollection<any>;



    constructor(public doc: TransferTextService, _http: HttpClient) {
        this.data = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
        this.selectedItems = new ArrayCollection(["上海", "南京"]);
        this.data1 = new LocalPageableArray();
        this.data1.http = _http;
        this.data1.pagingInfo.pageSize = 15;
        this.data1.fromAjax('mock-data/countries');
        this.data1.dataReviser = (td: TableData) => TableData.toArray(td);

        this.selectedData = new ArrayCollection([]);
    }

}
