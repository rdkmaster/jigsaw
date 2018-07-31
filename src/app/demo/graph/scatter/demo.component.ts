import {Component} from '@angular/core';
import {ScatterGraphData} from "jigsaw/core/data/graph-data";
import {AjaxInterceptor} from "../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class ScatterGraphComponent {
    constructor(public http: HttpClient) {
        this.scatterData = new ScatterGraphData();
        this.scatterData.title = 'Anscombe\'s quartet';
        this.scatterData.data = allData;

        this.scatterFromAjax = new ScatterGraphData();
        this.scatterFromAjax.http = http;
        this.scatterFromAjax.title = 'Anscombe\'s quartet';
        this.scatterFromAjax.fromAjax('/scatter-data');
    }

    scatterData: ScatterGraphData;
    scatterFromAjax: ScatterGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}


/* 模拟请求代码 start */
AjaxInterceptor.registerProcessor('/scatter-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return {
        "data": allData
    }
}

const allData = [
    [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68]
    ],
    [
        [10.0, 9.14],
        [8.0, 8.14],
        [13.0, 8.74],
        [9.0, 8.77],
        [11.0, 9.26],
        [14.0, 8.10],
        [6.0, 6.13],
        [4.0, 3.10],
        [12.0, 9.13],
        [7.0, 7.26],
        [5.0, 4.74]
    ],
    [
        [10.0, 7.46],
        [8.0, 6.77],
        [13.0, 12.74],
        [9.0, 7.11],
        [11.0, 7.81],
        [14.0, 8.84],
        [6.0, 6.08],
        [4.0, 5.39],
        [12.0, 8.15],
        [7.0, 6.42],
        [5.0, 5.73]
    ],
    [
        [8.0, 6.58],
        [8.0, 5.76],
        [8.0, 7.71],
        [8.0, 8.84],
        [8.0, 8.47],
        [8.0, 7.04],
        [8.0, 5.25],
        [19.0, 12.50],
        [8.0, 5.56],
        [8.0, 7.91],
        [8.0, 6.89]
    ]
];

/* 模拟请求代码 end */
