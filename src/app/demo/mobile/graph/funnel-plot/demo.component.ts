import {Component} from '@angular/core';
import {FunnelPlotGraphData} from "jigsaw/common/core/data/graph-data";
import {AjaxInterceptor} from "../../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class FunnelPlotGraphComponent {
    constructor(public http: HttpClient) {
        this.funnelPlotData = new FunnelPlotGraphData();
        this.funnelPlotData.title = '漏斗图';
        this.funnelPlotData.rowDescriptor = ['访问', '咨询', '订单', '点击', '展现'];
        this.funnelPlotData.data = [
            [60],
            [40],
            [20],
            [80],
            [100]
        ];

        this.funnelPlotFromAjax = new FunnelPlotGraphData();
        this.funnelPlotFromAjax.http = http;
        this.funnelPlotFromAjax.title = '漏斗图';
        this.funnelPlotFromAjax.fromAjax('/graph-data/funnel-plot-data');
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
AjaxInterceptor.registerProcessor('/graph-data/funnel-plot-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return {
        "rowDescriptor": ['访问', '咨询', '订单', '点击', '展现'],
        "data": [
            [60],
            [40],
            [20],
            [80],
            [100]
        ]
    }
}

/* 模拟请求代码 end */
