/**
 * Created by 10177553 on 2017/3/28.
 */
import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LineBarGraphData} from "jigsaw/core/data/graph-data";

@Component({
    templateUrl: './demo.component.html'
})
export class AjaxLineGraphComponent {
    public data: LineBarGraphData;

    public graphWidth;
    public graphHeight;

    constructor(http: HttpClient) {
        this.graphWidth = "600";
        this.graphHeight = "250";

        this.data = new LineBarGraphData();
        this.data.http = http;
        this.data.fromAjax('mock-data/marketing');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
