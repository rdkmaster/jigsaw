import { Component } from '@angular/core';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { DoughnutGraphData, DoughnutRateGraphData, DoughnutScoreGraphData } from "jigsaw/public_api";
import { AjaxInterceptor } from "../../../../libs/app.interceptor";
import { GraphTextService } from "../demo.service";

@Component({
    selector: 'graph-doughnut',
    templateUrl: './demo.component.html'
})
export class GraphDoughnutDemoComponent {
    constructor(public http: HttpClient, public doc: GraphTextService) {
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

    doughnut: DoughnutGraphData;

    doughnutRate: DoughnutRateGraphData;

    doughnutScore: DoughnutScoreGraphData;

    handleClick($event) {
        console.log($event);
    }
}

