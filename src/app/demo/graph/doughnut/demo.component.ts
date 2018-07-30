import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractGraphData, DoughnutGraphData, DoughnutRateGraphData, DoughnutScoreGraphData} from "jigsaw/core/data/graph-data";
import {EchartOptions} from "jigsaw/core/data/echart-types";
import {JigsawGraph} from "jigsaw/component/graph/graph";
import {AjaxInterceptor} from "../../../app.interceptor";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Component({
    templateUrl: './demo.component.html'
})
export class DoughnutGraphComponent {
    constructor(public http: HttpClient) {
        this.doughnut = new DoughnutGraphData();
        this.doughnut.data = [
            [22, "终端"],
            [35, "无线网"],
            [15, "互联网"],
            [28, "核心网"]
        ];
        this.doughnut.title = '问题定界分布';

        this.doughnutFromAjax = new DoughnutGraphData();
        this.doughnutFromAjax.http = http;
        this.doughnutFromAjax.title = '问题定界分布';
        this.doughnutFromAjax.fromAjax('/doughnut-data');

        this.doughnutRate = new DoughnutRateGraphData();
        this.doughnutRate.data = 55;

        this.doughnutRateFromAjax = new DoughnutRateGraphData();
        this.doughnutRateFromAjax.http = http;
        this.doughnutRateFromAjax.fromAjax({url:'/doughnut-data', params: {source: '无线网'}});

        this.doughnutScore = new DoughnutScoreGraphData();
        this.doughnutScore.data = [78, "IELTS得分"];

        this.doughnutScoreFromAjax = new DoughnutScoreGraphData();
        this.doughnutScoreFromAjax.http = http;
        this.doughnutScoreFromAjax.fromAjax({url:'/doughnut-data', params: {score: 'TOEFL'}});
    }

    doughnut: DoughnutGraphData;
    doughnutFromAjax: DoughnutGraphData;

    doughnutRate: DoughnutRateGraphData;
    doughnutRateFromAjax: DoughnutRateGraphData;

    doughnutScore: DoughnutScoreGraphData;
    doughnutScoreFromAjax: DoughnutScoreGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用环形图';
    description: string = require('!!raw-loader!./readme.md');
}


/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/doughnut-data', dealAreaRequest);
function dealAreaRequest(req: HttpRequest<any>) {
    if(req.params.get('source') == '无线网') {
        return {
            "header": ["次数", "来源"],
            "field": ["field1", "field2"],
            "data": [
                [15, "无线网"]
            ]
        };
    }
    if(req.params.get('score') == 'TOEFL') {
        return {
            "header": ["得分", "科目"],
            "field": ["field1", "field2"],
            "data": [
                [60, "TOEFL得分"]
            ]
        };
    }
    return {
        "header": ["次数", "来源"],
        "field": ["field1", "field2"],
        "data": [
            [52, "终端"],
            [15, "无线网"],
            [15, "互联网"],
            [18, "核心网"]
        ]
    };
}
/* 模拟请求代码 start */
