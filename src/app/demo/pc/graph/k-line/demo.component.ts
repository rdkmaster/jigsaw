import {Component} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {KLineGraphData} from "jigsaw/public_api";
import {AjaxInterceptor} from "../../../../app.interceptor";

@Component({
    templateUrl: './demo.component.html'
})
export class KLineGraphComponent {
    constructor(public http: HttpClient) {
        this.kLineData = new KLineGraphData();
        this.kLineData.rowDescriptor = ["语音感知", "数据感知", "业务体验", "网页浏览", "即时通讯", "社交媒体", "视频", "下载", "其他", "网络接入"];
        this.kLineData.header = ["2016.04.24", "2016.04.25", "2016.04.26", "2016.05.27", "2016.04.28", "2016.04.29", "2016.04.30", "2016.05.01", "2016.05.02", "2016.05.03", "2016.05.04", "2016.05.05", "2016.05.06", "2016.05.07"
            , "2016.05.08", "2016.05.09", "2016.05.10", "2016.05.11", "2016.05.12", "2016.05.13", "2016.05.14", "2016.05.15", "2016.05.16", "2016.05.17", "2016.05.18", "2016.05.19",
            "2016.05.20", "2016.05.21", "2016.05.22", "2016.05.23", "2016.05.24"];
        this.kLineData.data = [
            [20, 32, 10, 13, 9, 30, 10, 20, 32, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 58],
            [20, 12, 11, 24, 20, 30, 30, 20, 32, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 24],
            [10, 32, 21, 14, 90, 30, 40, 20, 32, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 85],
            [10, 32, 21, 14, 90, 30, 40, 20, 32, 10, 13, 9, 30, 80, 32, 10, 13, 66, 5, 10, 13, 9, 30, 50, 32, 10, 13, 9, 30, 10, 85],
            [80, 92, 50, 60, 90, 30, 30, 20, 32, 10, 13, 9, 30, 10, 92, 9, 34, 10, 30, 32, 13, 9, 30, 10, 92, 80, 34, 10, 30, 32, 74],
            [80, 92, 91, 41, 10, 10, 20, 20, 92, 50, 34, 10, 30, 32, 92, 8, 34, 10, 30, 32, 13, 9, 30, 10, 92, 62, 34, 10, 30, 32, 48],
            [20, 92, 35, 34, 10, 30, 32, 20, 92, 33, 34, 10, 30, 32, 92, 8, 34, 10, 30, 32, 13, 9, 30, 10, 92, 42, 34, 10, 30, 32, 87],
            [80, 62, 91, 50, 90, 30, 30, 20, 92, 38, 34, 10, 30, 32, 92, 6, 34, 10, 30, 32, 13, 9, 30, 10, 92, 58, 34, 10, 30, 32, 58],
            [80, 32, 44, 93, 20, 50, 20, 20, 92, 24, 34, 10, 30, 32, 92, 25, 34, 10, 30, 32, 13, 9, 30, 10, 92, 24, 34, 10, 30, 32, 12],
            [80, 32, 29, 34, 50, 10, 20, 20, 92, 42, 34, 10, 30, 32, 92, 29, 34, 10, 30, 32, 13, 9, 30, 10, 92, 38, 34, 10, 30, 32, 97]
        ];

        this.kLineFromAjax = new KLineGraphData();
        this.kLineFromAjax.http = http;
        this.kLineFromAjax.fromAjax('/graph-data/k-line-data');
    }

    kLineData: KLineGraphData;
    kLineFromAjax: KLineGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用K线图';
    description: string = require('!!raw-loader!./readme.md').default;
}


/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/graph-data/k-line-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return {
        "rowDescriptor": ["语音感知", "数据感知", "业务体验", "网页浏览", "即时通讯", "社交媒体", "视频", "下载", "其他", "网络接入"],
        "header": ["2016.04.24", "2016.04.25", "2016.04.26", "2016.05.27", "2016.04.28", "2016.04.29", "2016.04.30", "2016.05.01", "2016.05.02", "2016.05.03", "2016.05.04", "2016.05.05", "2016.05.06", "2016.05.07"
            , "2016.05.08", "2016.05.09", "2016.05.10", "2016.05.11", "2016.05.12", "2016.05.13", "2016.05.14", "2016.05.15", "2016.05.16", "2016.05.17", "2016.05.18", "2016.05.19",
            "2016.05.20", "2016.05.21", "2016.05.22", "2016.05.23", "2016.05.24"],
        "data": [
            [20, 32, 10, 13, 9, 30, 10, 20, 32, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 58],
            [20, 12, 11, 24, 20, 30, 30, 20, 32, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 24],
            [10, 32, 21, 14, 90, 30, 40, 20, 32, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 13, 9, 30, 10, 32, 10, 13, 9, 30, 10, 85],
            [10, 32, 21, 14, 90, 30, 40, 20, 32, 10, 13, 9, 30, 80, 32, 10, 13, 66, 5, 10, 13, 9, 30, 50, 32, 10, 13, 9, 30, 10, 85],
            [80, 92, 50, 60, 90, 30, 30, 20, 32, 10, 13, 9, 30, 10, 92, 9, 34, 10, 30, 32, 13, 9, 30, 10, 92, 80, 34, 10, 30, 32, 74],
            [80, 92, 91, 41, 10, 10, 20, 20, 92, 50, 34, 10, 30, 32, 92, 8, 34, 10, 30, 32, 13, 9, 30, 10, 92, 62, 34, 10, 30, 32, 48],
            [20, 92, 35, 34, 10, 30, 32, 20, 92, 33, 34, 10, 30, 32, 92, 8, 34, 10, 30, 32, 13, 9, 30, 10, 92, 42, 34, 10, 30, 32, 87],
            [80, 62, 91, 50, 90, 30, 30, 20, 92, 38, 34, 10, 30, 32, 92, 6, 34, 10, 30, 32, 13, 9, 30, 10, 92, 58, 34, 10, 30, 32, 58],
            [80, 32, 44, 93, 20, 50, 20, 20, 92, 24, 34, 10, 30, 32, 92, 25, 34, 10, 30, 32, 13, 9, 30, 10, 92, 24, 34, 10, 30, 32, 12],
            [80, 32, 29, 34, 50, 10, 20, 20, 92, 42, 34, 10, 30, 32, 92, 29, 34, 10, 30, 32, 13, 9, 30, 10, 92, 38, 34, 10, 30, 32, 97]
        ]
    }
}

/* 模拟请求代码 end */
