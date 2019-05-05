import {Component} from '@angular/core';
import {DoughnutGraphData, DoughnutRateGraphData, DoughnutScoreGraphData} from "jigsaw/common/core/data/graph-data";
import {AjaxInterceptor} from "../../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class DoughnutGraphComponent {
    constructor(public http: HttpClient) {
        this.doughnut = new DoughnutGraphData();
        this.doughnut.rowDescriptor = ["终端", "无线网", "互联网", "核心网"];
        this.doughnut.data = [
            [22],
            [35],
            [15],
            [28]
        ];
        this.doughnut.title = '问题定界分布';

        this.doughnutFromAjax = new DoughnutGraphData();
        this.doughnutFromAjax.http = http;
        this.doughnutFromAjax.title = '问题定界分布';
        this.doughnutFromAjax.fromAjax('/graph-data/doughnut-data');

        this.doughnutRate = new DoughnutRateGraphData();
        this.doughnutRate.data = 85;

        this.doughnutRateFromAjax = new DoughnutRateGraphData();
        this.doughnutRateFromAjax.http = http;
        this.doughnutRateFromAjax.fromAjax({url: '/graph-data/doughnut-data', params: {source: '无线网'}});

        this.doughnutScore = new DoughnutScoreGraphData();
        this.doughnutScore.rowDescriptor = ["IELTS得分"];
        this.doughnutScore.data = [78];

        this.doughnutScoreFromAjax = new DoughnutScoreGraphData();
        this.doughnutScoreFromAjax.http = http;
        this.doughnutScoreFromAjax.fromAjax({url: '/graph-data/doughnut-data', params: {score: 'TOEFL'}});
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
AjaxInterceptor.registerProcessor('/graph-data/doughnut-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    if (req.params.get('source') == '无线网') {
        return {
            "rowDescriptor": ["无线网"],
            "header": ["次数"],
            "field": ["field1"],
            "data": [
                [55]
            ]
        };
    }
    if (req.params.get('score') == 'TOEFL') {
        return {
            "rowDescriptor": ["TOEFL得分"],
            "header": ["得分"],
            "field": ["field1"],
            "data": [
                [60]
            ]
        };
    }
    return {
        "rowDescriptor": ["终端", "无线网", "互联网", "核心网"],
        "header": ["次数"],
        "field": ["field1"],
        "data": [
            [52],
            [15],
            [15],
            [18]
        ]
    };
}

/* 模拟请求代码 end */
