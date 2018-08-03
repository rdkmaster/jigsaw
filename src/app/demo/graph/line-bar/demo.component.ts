import {Component} from '@angular/core';
import {LineBarGraphData} from "jigsaw/core/data/graph-data";
import {AjaxInterceptor} from "../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class LineBarGraphComponent {
    constructor(public http: HttpClient) {
        this.lineBarData = new LineBarGraphData();
        this.lineBarData.title = '掉话排行';
        this.lineBarData.rowDescriptor = ["掉话次数","掉话率"];
        this.lineBarData.header = ["2016.04.24","2016.04.25","2016.04.26","2016.05.27","2016.04.28","2016.04.29","2016.04.30","2016.05.01","2016.05.02","2016.05.03","2016.05.04","2016.05.05","2016.05.06","2016.05.07"
            ,"2016.05.08","2016.05.09","2016.05.10","2016.05.11","2016.05.12","2016.05.13","2016.05.14","2016.05.15","2016.05.16","2016.05.17","2016.05.18","2016.05.19",
            "2016.05.20","2016.05.21","2016.05.22","2016.05.23","2016.05.24"];
        this.lineBarData.data = [
            [2, 2, 1, 3, 2, 3, 1,2, 3, 1, 3, 3, 3, 1, 2, 1, 3, 2, 3, 1, 3, 2, 3, 1, 2, 1, 3, 3, 3, 1,2],
            [0.6, 0.5, 0.8, 0.6, 0.5, 0.8, 0.8,0.7, 0.6, 0.3, 0.8, 0.9, 0.3, 0.7, 0.6, 0.5, 0.3, 0.9, 0.7, 0.6, 0.5, 0.8, 0.5, 0.6,0.5, 0.6, 0.8, 0.9, 0.6, 0.8,0.6]
        ];

        this.lineBarFromAjax = new LineBarGraphData();
        this.lineBarFromAjax.title = '掉话排行';
        this.lineBarFromAjax.http = http;
        this.lineBarFromAjax.fromAjax('/line-bar-data');
    }

    lineBarData: LineBarGraphData;
    lineBarFromAjax: LineBarGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用柱状折线图';
    description: string = require('!!raw-loader!./readme.md');
}


/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/line-bar-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return {
        "rowDescriptor": ["掉话次数","掉话率"],
        "header": ["2016.04.24","2016.04.25","2016.04.26","2016.05.27","2016.04.28","2016.04.29","2016.04.30","2016.05.01","2016.05.02","2016.05.03","2016.05.04","2016.05.05","2016.05.06","2016.05.07"
            ,"2016.05.08","2016.05.09","2016.05.10","2016.05.11","2016.05.12","2016.05.13","2016.05.14","2016.05.15","2016.05.16","2016.05.17","2016.05.18","2016.05.19",
            "2016.05.20","2016.05.21","2016.05.22","2016.05.23","2016.05.24"],
        "data": [
            [2, 2, 1, 3, 2, 3, 1,2, 3, 1, 3, 3, 3, 1, 2, 1, 3, 2, 3, 1, 3, 2, 3, 1, 2, 1, 3, 3, 3, 1,2],
            [0.6, 0.5, 0.8, 0.6, 0.5, 0.8, 0.8,0.7, 0.6, 0.3, 0.8, 0.9, 0.3, 0.7, 0.6, 0.5, 0.3, 0.9, 0.7, 0.6, 0.5, 0.8, 0.5, 0.6,0.5, 0.6, 0.8, 0.9, 0.6, 0.8,0.6]
        ]
    }
}

/* 模拟请求代码 end */
