/**
 * Created by 10177553 on 2017/3/28.
 */
import {Component} from '@angular/core';
import {LineBarGraphData, LineBarGraphDataByRow} from "../../../../../../core/data/graph-data";
import {Http} from "@angular/http";

@Component({
    template: `
        <rdk-graph [data]="data"
                   [(width)]="graphWidth"
                   [(height)]="graphHeight">
        </rdk-graph>
    `
})
export class AjaxLineGraphComponent {
    data: LineBarGraphData;

    public graphWidth;
    public graphHeight;

    constructor(http: Http) {
        this.graphWidth = "600";
        this.graphHeight = "250";

        this.data = new LineBarGraphData();
        this.data.http = http;
        this.data.fromAjax('mock-data/graph/marketing.json');
    }
}
