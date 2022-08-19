import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ArrayCollection, LocalPageableArray, TableData, TransferListSourceRenderer, TransferListDestRenderer } from "jigsaw/public_api";
import {TransferTextService} from "../doc.service";

@Component({
    selector: 'transfer-list-local-pageable-transfer',
    templateUrl: './demo.component.html'
})
export class TransferListLocalPageableDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';

    public dataArray = [
        {
            "enName": "andorra",
            "zhName": "安道尔",
            "shortName": "and"
        },
        {
            "enName": "angola",
            "zhName": "安哥拉",
            "shortName": "ago"
        },
        {
            "enName": "antartica",
            "zhName": "南极",
            "shortName": "ata"
        },
        {
            "enName": "armenia",
            "zhName": "亚美尼亚",
            "shortName": "arm"
        },
        {
            "enName": "aruba",
            "zhName": "阿魯巴",
            "shortName": "abw"
        },
        {
            "enName": "austria",
            "zhName": "奥地利",
            "shortName": "aut"
        },
        {
            "enName": "bahamas",
            "zhName": "巴哈马",
            "shortName": "bhs"
        },
        {
            "enName": "bangladesh",
            "zhName": "孟加拉国",
            "shortName": "bgd"
        },
        {
            "enName": "barbados",
            "zhName": "巴巴多斯",
            "shortName": "brb"
        },
        {
            "enName": "belarus",
            "zhName": "白俄罗斯",
            "shortName": "blr"
        },
        {
            "enName": "belize",
            "zhName": "伯里兹",
            "shortName": "blz"
        },
        {
            "enName": "benin",
            "zhName": "贝宁",
            "shortName": "ben"
        }
    ];

    constructor(public _http: HttpClient, public doc: TransferTextService) {
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

    ngOnInit() {

    }

    changeDataFromArray() {
        this.data.fromArray(this.dataArray);
    }

    resetInputData() {
        this.data = new LocalPageableArray();
        this.data.http = this._http;
        this.data.pagingInfo.pageSize = 15;
        this.data.pagingInfo.currentPage = undefined;
        this.data.pagingInfo.itemHeight = undefined;
        this.data.pagingInfo.autoPageSizing = false;
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = (td: TableData) => TableData.toArray(td);
    }

    resetSelectedData() {
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

    selectedItemsChange($event) {
        console.log($event)
    }

    data: LocalPageableArray<any>;
    selectedData: ArrayCollection<any>;
}
