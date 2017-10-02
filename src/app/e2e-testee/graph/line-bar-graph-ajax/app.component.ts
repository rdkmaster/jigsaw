/**
 * Created by 10177553 on 2017/3/28.
 */
import {Component, Renderer2, ViewContainerRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LineBarGraphData} from "jigsaw/core/data/graph-data";

@Component({
    template: `
        <jigsaw-graph id="test-graph" [data]="data"
                   [(width)]="graphWidth"
                   [(height)]="graphHeight">
        </jigsaw-graph>
    `
})
export class AjaxLineGraphComponent {
    data: LineBarGraphData;

    public graphWidth;
    public graphHeight;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        this.graphWidth = "600";
        this.graphHeight = "250";

        this.data = new LineBarGraphData();
        this.data.http = http;
        this.data.fromAjax('mock-data/graph/marketing.json');
    }
}
