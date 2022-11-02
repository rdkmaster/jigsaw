import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ArrayCollection, TransferListSourceRenderer, TransferListDestRenderer, LocalPageableArray, TableData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'transfer-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/transfer/basic";

    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;
    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';

    public data: ArrayCollection<any>;
    public selectedItems: ArrayCollection<any>;
    public data1: LocalPageableArray<any>;
    public selectedData: ArrayCollection<any>;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
        this.selectedItems = new ArrayCollection(["上海", "南京"]);
        this.data1 = new LocalPageableArray();
        this.data1.http = http;
        this.data1.pagingInfo.pageSize = 15;
        this.data1.fromAjax('mock-data/countries');
        this.data1.dataReviser = (td: TableData) => TableData.toArray(td);

        this.selectedData = new ArrayCollection([]);
    }

}
