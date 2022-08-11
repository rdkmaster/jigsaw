import {Component} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {KLineGraphData} from "jigsaw/public_api";
import {AjaxInterceptor} from "../../../../../libs/app.interceptor";

function random(min,max) {
    const range = max - min;
    const rand = Math.random();
    return(min + Math.round(rand * range));
}

@Component({
    templateUrl: './demo.component.html'
})
export class KLineGraphComponent {
    constructor(public http: HttpClient) {
        this.kLineData = new KLineGraphData();
        this.kLineData.header = ["2016.04.24", "2016.04.25", "2016.04.26", "2016.05.27", "2016.04.28", "2016.04.29", "2016.04.30", "2016.05.01", "2016.05.02", "2016.05.03", "2016.05.04", "2016.05.05", "2016.05.06", "2016.05.07"
            , "2016.05.08", "2016.05.09", "2016.05.10", "2016.05.11", "2016.05.12", "2016.05.13", "2016.05.14", "2016.05.15", "2016.05.16", "2016.05.17", "2016.05.18", "2016.05.19",
            "2016.05.20", "2016.05.21", "2016.05.22", "2016.05.23", "2016.05.24"];
        this.kLineData.data = Array.from(new Array(31)).map(() => {
            return Array.from(new Array(24)).map(item => random(0, 100))
        });

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
    const data = Array.from(new Array(31)).map(() => {
        return Array.from(new Array(24)).map(item => random(0, 100))
    });
    return {
        "header": ["2016.04.24", "2016.04.25", "2016.04.26", "2016.05.27", "2016.04.28", "2016.04.29", "2016.04.30", "2016.05.01", "2016.05.02", "2016.05.03", "2016.05.04", "2016.05.05", "2016.05.06", "2016.05.07"
            , "2016.05.08", "2016.05.09", "2016.05.10", "2016.05.11", "2016.05.12", "2016.05.13", "2016.05.14", "2016.05.15", "2016.05.16", "2016.05.17", "2016.05.18", "2016.05.19",
            "2016.05.20", "2016.05.21", "2016.05.22", "2016.05.23", "2016.05.24"],
        "data": data
    }
}

/* 模拟请求代码 end */
