import {Component, ElementRef} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FunnelPlotGraphData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'graph-funnel-plot',
    templateUrl: './demo.component.html'
})
export class GraphFunnelPlotDemoComponent extends AsyncDescription {
    public demoPath = "demo/graph/funnel-plot";

    public funnelPlotData: FunnelPlotGraphData;

    public handleClick($event) {
        console.log($event);
    }

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
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
}
