import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ArrayCollection, LocalPageableArray, TableData, TransferListSourceRenderer, TransferListDestRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferListLocalPageableDemoComponent {
    constructor(public _http: HttpClient) {
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

    public data: LocalPageableArray<any>;
    public selectedData: ArrayCollection<any>;

    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';

    public hasDefault = localStorage.getItem('JigsawDemoCookie_hasDefault') == 'true';

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

    public changeDataFromArray() {
        this.data.fromArray(this.dataArray);
    }

    public resetInputData() {
        this.data = new LocalPageableArray();
        this.data.http = this._http;
        this.data.pagingInfo.pageSize = 15;
        this.data.pagingInfo.currentPage = undefined;
        this.data.pagingInfo.itemHeight = undefined;
        this.data.pagingInfo.autoPageSizing = false;
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = (td: TableData) => TableData.toArray(td);
    }

    public resetSelectedData() {
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

    public selectedItemsChange($event) {
        console.log($event)
    }



    public updateHasDefault() {
        localStorage.setItem('JigsawDemoCookie_hasDefault', String(this.hasDefault));
        setTimeout(() => location.reload(), 300);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个Demo模拟的是采用浏览器内部分页的情形';
    description: string = '';
}
