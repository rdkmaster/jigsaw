import {Component} from '@angular/core';
import {FunnelPlotGraphData} from "jigsaw/core/data/graph-data";
import {AjaxInterceptor} from "../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class FunnelPlotGraphComponent {
    constructor(public http: HttpClient) {
        this.funnelPlotData = new FunnelPlotGraphData();
        this.funnelPlotData.title = '漏斗图';
        this.funnelPlotData.data = [
            [60, '访问'],
            [40, '咨询'],
            [20, '订单'],
            [80, '点击'],
            [100, '展现']
        ];

        this.funnelPlotFromAjax = new FunnelPlotGraphData();
        this.funnelPlotFromAjax.http = http;
        this.funnelPlotFromAjax.title = '漏斗图';
        this.funnelPlotFromAjax.fromAjax('/funnel-plot-data');
    }

    funnelPlotData: FunnelPlotGraphData;
    funnelPlotFromAjax: FunnelPlotGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用漏斗图';
    description: string = require('!!raw-loader!./readme.md');
}


/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/funnel-plot-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return {
        "data": [
            [60, '访问'],
            [40, '咨询'],
            [20, '订单'],
            [80, '点击'],
            [100, '展现']
        ]
    }
}

/* 模拟请求代码 end */
