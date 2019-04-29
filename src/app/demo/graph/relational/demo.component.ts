import {Component} from '@angular/core';
import {RelationalGraphData} from "jigsaw/common/core/data/graph-data";
import {AjaxInterceptor} from "../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class RelationalGraphComponent {
    constructor(public http: HttpClient) {
        this.relationalData = new RelationalGraphData();
        this.relationalData.title = '笛卡尔坐标系上的 Graph';
        this.relationalData.data = [
            [872, 1190, 2192, 1513, 662, 4344, 6429],
            ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            [
                {source:0,target:1},
                {source:1,target:2},
                {source:2,target:3},
                {source:3,target:4},
                {source:4,target:5},
                {source:5,target:6}
            ]
        ];

        this.relationalFromAjax = new RelationalGraphData();
        this.relationalFromAjax.http = http;
        this.relationalFromAjax.title = '笛卡尔坐标系上的 Graph';
        this.relationalFromAjax.fromAjax('/graph-data/relational-data');
    }

    relationalData: RelationalGraphData;
    relationalFromAjax: RelationalGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用K线图';
    description: string = require('!!raw-loader!./readme.md');
}


/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/graph-data/relational-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return  {
        "data": [
            [872, 1190, 2192, 1513, 662, 4344, 6429],
            ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            [
                {source:0,target:1},
                {source:1,target:2},
                {source:2,target:3},
                {source:3,target:4},
                {source:4,target:5},
                {source:5,target:6}
            ]
        ]
    }
}

/* 模拟请求代码 end */
