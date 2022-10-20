import {Component, ElementRef} from "@angular/core";
import { ArrayCollection, TransferListSourceRenderer, TransferListDestRenderer } from "jigsaw/public_api";
import { HttpClient } from '@angular/common/http';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'transfer-list-transfer',
    templateUrl: './demo.component.html'
})
export class TransferListDemoComponent extends AsyncDescription {
    public demoPath = "demo/transfer/transfer-list";

    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;
    public data: ArrayCollection<any>;
    public selectedItems: ArrayCollection<any>;
    public labelField = 'name';
    public subLabelField = 'remark'
    public trackItemBy = 'id';

    public allData = [
        {
            "id": 1,
            "name": "北京市",
            "remark": "直辖市"
        },
        {
            "id": 2,
            "name": "天津市",
            "remark": "直辖市"
        },
        {
            "id": 3,
            "name": "河北省",
            "remark": "省份"
        },
        {
            "id": 4,
            "name": "山西省",
            "remark": "省份"
        },
        {
            "id": 5,
            "name": "内蒙古",
            "remark": ""
        },
        {
            "id": 6,
            "name": "辽宁省",
            "remark": "省份"
        },
        {
            "id": 7,
            "name": "吉林省",
            "remark": "省份"
        },
        {
            "id": 8,
            "name": "黑龙江省",
            "remark": "省份"
        },
        {
            "id": 9,
            "name": "上海市",
            "remark": "直辖市"
        },
        {
            "id": 10,
            "name": "江苏省",
            "remark": "省份"
        },
        {
            "id": 11,
            "name": "浙江省",
            "remark": "省份"
        },
        {
            "id": 12,
            "name": "安徽省",
            "remark": "省份"
        },
        {
            "id": 13,
            "name": "福建省",
            "remark": "省份"
        },
        {
            "id": 14,
            "name": "江西省",
            "remark": "省份"
        },
        {
            "id": 15,
            "name": "山东省",
            "remark": "省份"
        },
        {
            "id": 16,
            "name": "河南省",
            "remark": "省份"
        },
        {
            "id": 17,
            "name": "湖北省",
            "remark": "省份"
        },
        {
            "id": 18,
            "name": "湖南省",
            "remark": "省份"
        },
        {
            "id": 19,
            "name": "广东省",
            "remark": "省份"
        },
        {
            "id": 20,
            "name": "海南省",
            "remark": "省份"
        }
    ];

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data = new ArrayCollection(this.allData);
        this.selectedItems = new ArrayCollection([this.allData[0], this.allData[1], this.allData[2]]);
    }
}
