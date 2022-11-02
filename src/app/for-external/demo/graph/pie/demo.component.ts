import {Component, ElementRef} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PieGraphData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'graph-pie',
    templateUrl: './demo.component.html'
})
export class GraphPieDemoComponent extends AsyncDescription {
    public demoPath = "demo/graph/pie";

    public pieGraphData: PieGraphData;

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
        this.pieGraphData = new PieGraphData();
        this.pieGraphData.header = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
        this.pieGraphData.data = [120, 220, 150, 320, 820];
    }
}
