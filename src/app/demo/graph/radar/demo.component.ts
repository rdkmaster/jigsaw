import {Component} from '@angular/core';
import {RadarGraphData} from "jigsaw/core/data/graph-data";
import {AjaxInterceptor} from "../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class RadarGraphComponent {
    constructor(public http: HttpClient) {
        this.radarData = new RadarGraphData();
        this.radarData.title = '基础雷达图';
        this.radarData.rowDescriptor = ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'];
        this.radarData.header = ["销售（sales）", "管理（Administration）", "信息技术（Information Techology）", "客服（Customer Support）", "研发（Development）", "市场（Marketing）"];
        this.radarData.data = [
            [4300, 10000, 28000, 35000, 50000, 19000],
            [5000, 14000, 28000, 31000, 42000, 21000],
            [6500, 16000, 30000, 38000, 52000, 25000]
        ];

        this.radarFromAjax = new RadarGraphData();
        this.radarFromAjax.http = http;
        this.radarFromAjax.title = '基础雷达图';
        this.radarFromAjax.fromAjax('/radar-data');
    }

    radarData: RadarGraphData;
    radarFromAjax: RadarGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用雷达图';
    description: string = require('!!raw-loader!./readme.md');
}


/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/radar-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return {
        "rowDescriptor": ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
        "header": ["销售（sales）", "管理（Administration）", "信息技术（Information Techology）", "客服（Customer Support）", "研发（Development）", "市场（Marketing）"],
        "data": [
            [4300, 10000, 28000, 35000, 50000, 19000],
            [5000, 14000, 28000, 31000, 42000, 21000],
            [6500, 16000, 30000, 38000, 52000, 25000]
        ]
    }
}


/* 模拟请求代码 end */
