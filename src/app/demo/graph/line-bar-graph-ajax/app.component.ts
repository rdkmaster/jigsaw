/**
 * Created by 10177553 on 2017/3/28.
 */
import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LineBarGraphData} from "jigsaw/core/data/graph-data";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html'
})
export class AjaxLineGraphComponent extends DemoBase {
    public data: LineBarGraphData;

    public graphWidth;
    public graphHeight;

    constructor(http: HttpClient) {
        super();

        this.graphWidth = "600";
        this.graphHeight = "250";

        this.data = new LineBarGraphData();
        this.data.http = http;
        this.data.fromAjax('mock-data/marketing');
    }
}
