import {Component} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {GaugeGraphData} from "jigsaw/public_api";
import {AjaxInterceptor} from "../../../../libs/app.interceptor";
import {GraphTextService} from "../demo.service";

@Component({
    selector: 'graph-gauge',
    templateUrl: './demo.component.html'
})
export class GraphGaugeDemoComponent {
    constructor(public http: HttpClient, public text: GraphTextService) {
        this.gaugeData = new GaugeGraphData();
        this.gaugeData.rowDescriptor = ['完成率'];
        this.gaugeData.data = 35;
    }

    gaugeData: GaugeGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用仪表盘';
    description: string = require('!!raw-loader!./readme.md').default;
}

