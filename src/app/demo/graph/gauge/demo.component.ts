import {Component} from '@angular/core';
import {GaugeGraphData} from "jigsaw/core/data/graph-data";
import {AjaxInterceptor} from "../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class GaugeGraphComponent {
    constructor(public http: HttpClient) {
        this.gaugeData = new GaugeGraphData();
        this.gaugeData.data = [35, '完成率'];

        this.gaugeFromAjax = new GaugeGraphData();
        this.gaugeFromAjax.http = http;
        this.gaugeFromAjax.fromAjax('/gauge-data');
    }

    gaugeData: GaugeGraphData;
    gaugeFromAjax: GaugeGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用仪表盘';
    description: string = require('!!raw-loader!./readme.md');
}


/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/gauge-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return  {
        "data": [
            [35, '完成率']
        ]
    }
}

/* 模拟请求代码 end */
