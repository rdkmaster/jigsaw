import {Component} from '@angular/core';
import {ScatterGraphData} from "jigsaw/common/core/data/graph-data";
import {AjaxInterceptor} from "../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class ScatterGraphComponent {
    constructor(public http: HttpClient) {
        this.scatterData = new ScatterGraphData();
        this.scatterData.title = '散点图';
        this.scatterData.data = [
            [10.0, 8.04], [8.0, 6.95], [13.0, 7.58], [9.0, 8.81], [11.0, 8.33], [14.0, 9.96], [6.0, 7.24], [4.0, 4.26], [12.0, 10.84], [7.0, 4.82], [5.0, 5.68]
        ];

        this.scatterFromAjax = new ScatterGraphData();
        this.scatterFromAjax.http = http;
        this.scatterFromAjax.title = '散点图';
        this.scatterFromAjax.fromAjax('/graph-data/scatter-data');
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
AjaxInterceptor.registerProcessor('/graph-data/scatter-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return {
        "data": [
            [10.0, 8.04], [8.0, 6.95], [13.0, 7.58], [9.0, 8.81], [11.0, 8.33], [14.0, 9.96], [6.0, 7.24], [4.0, 4.26], [12.0, 10.84], [7.0, 4.82], [5.0, 5.68]
        ]
    }
}

/* 模拟请求代码 end */
