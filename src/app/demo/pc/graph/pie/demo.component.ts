import {Component} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {PieGraphData, PieGraphDataByRow} from "jigsaw/public_api";
import {AjaxInterceptor} from "../../../../app.interceptor";
import {GraphTextService} from "../demo.service";

@Component({
    selector: 'graph-pie',
    templateUrl: './demo.component.html'
})
export class GraphPieDemoComponent {
    public pieGraphData: PieGraphData;

    constructor(public http: HttpClient, public text: GraphTextService) {
        this.pieGraphData = new PieGraphData();
        this.pieGraphData.header = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
        this.pieGraphData.data = [120, 220, 150, 320, 820];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用饼图';
    description: string = require('!!raw-loader!./readme.md').default;
}
