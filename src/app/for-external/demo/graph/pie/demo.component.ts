import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PieGraphData } from "jigsaw/public_api";
import { GraphTextService } from "../demo.service";

@Component({
    selector: 'graph-pie',
    templateUrl: './demo.component.html'
})
export class GraphPieDemoComponent {
    public pieGraphData: PieGraphData;

    constructor(public http: HttpClient, public doc: GraphTextService) {
        this.pieGraphData = new PieGraphData();
        this.pieGraphData.header = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
        this.pieGraphData.data = [120, 220, 150, 320, 820];
    }
}
