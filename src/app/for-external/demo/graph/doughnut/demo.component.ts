import {Component, ElementRef} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DoughnutGraphData, DoughnutRateGraphData, DoughnutScoreGraphData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'graph-doughnut',
    templateUrl: './demo.component.html'
})
export class GraphDoughnutDemoComponent extends AsyncDescription {
    public demoPath = "demo/graph/doughnut";

    public doughnut: DoughnutGraphData;

    public doughnutRate: DoughnutRateGraphData;

    public doughnutScore: DoughnutScoreGraphData;

    public handleClick($event) {
        console.log($event);
    }

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
        this.doughnut = new DoughnutGraphData();
        this.doughnut.rowDescriptor = ["终端", "无线网", "互联网", "核心网"];
        this.doughnut.data = [
            [22],
            [35],
            [15],
            [28]
        ];
        this.doughnut.title = '问题定界分布';

        this.doughnutRate = new DoughnutRateGraphData();
        this.doughnutRate.data = 85;

        this.doughnutScore = new DoughnutScoreGraphData();
        this.doughnutScore.rowDescriptor = ["IELTS得分"];
        this.doughnutScore.data = [78];
    }
}

