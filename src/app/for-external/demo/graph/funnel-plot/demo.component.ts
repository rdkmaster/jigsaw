import {Component} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {FunnelPlotGraphData} from "jigsaw/public_api";
import {AjaxInterceptor} from "../../../../libs/app.interceptor";
import {GraphTextService} from "../demo.service";

@Component({
    selector: 'graph-funnel-plot',
    templateUrl: './demo.component.html'
})
export class GraphFunnelPlotDemoComponent {
    constructor(public http: HttpClient, public doc: GraphTextService) {
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
    }

    funnelPlotData: FunnelPlotGraphData;

    handleClick($event) {
        console.log($event);
    }
}
