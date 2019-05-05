import {Component} from '@angular/core';
import {BoxPlotGraphData} from "jigsaw/common/core/data/graph-data";
import {AjaxInterceptor} from "../../../../app.interceptor";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class BoxPlotGraphComponent {
    constructor(public http: HttpClient) {
        this.boxPlotData = new BoxPlotGraphData();
        this.boxPlotData.title = 'Michelson-Morley Experiment';
        this.boxPlotData.data = [
            [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
            [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
            [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
            [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
            [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
        ];

        this.boxPlotFromAjax = new BoxPlotGraphData();
        this.boxPlotFromAjax.http = http;
        this.boxPlotFromAjax.title = 'Michelson-Morley Experiment';
        this.boxPlotFromAjax.fromAjax('/graph-data/box-plot-data');
    }

    boxPlotData: BoxPlotGraphData;
    boxPlotFromAjax: BoxPlotGraphData;

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
AjaxInterceptor.registerProcessor('/graph-data/box-plot-data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>) {
    return {
        "data": [
            [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
            [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
            [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
            [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
            [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
        ]
    }
}

/* 模拟请求代码 end */
