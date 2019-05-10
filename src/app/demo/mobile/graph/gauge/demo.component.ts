import {Component} from '@angular/core';
import {GaugeGraphData} from "jigsaw/common/core/data/graph-data";
import {AjaxInterceptor} from "../../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class GaugeGraphComponent {
    constructor(public http: HttpClient) {
        this.gaugeData = new GaugeGraphData();
        this.gaugeData.rowDescriptor = ['完成率'];
        this.gaugeData.data = 35;

        this.gaugeFromAjax = new GaugeGraphData();
        this.gaugeFromAjax.http = http;
        this.gaugeFromAjax.fromAjax('/graph-data/gauge-data');
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
AjaxInterceptor.registerProcessor('/graph-data/gauge-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return  {
        "rowDescriptor": ['完成率'],
        "data": [
            [35]
        ]
    }
}

/* 模拟请求代码 end */
