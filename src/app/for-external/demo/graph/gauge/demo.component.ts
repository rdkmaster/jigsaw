import {Component, ElementRef} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GaugeGraphData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'graph-gauge',
    templateUrl: './demo.component.html'
})
export class GraphGaugeDemoComponent extends AsyncDescription {
    public demoPath = "demo/graph/gauge";

    public gaugeData: GaugeGraphData;

    public handleClick($event) {
        console.log($event);
    }

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
        this.gaugeData = new GaugeGraphData();
        this.gaugeData.rowDescriptor = ['完成率'];
        this.gaugeData.data = 35;
    }
}

