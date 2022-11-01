import {Component, ElementRef} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { KLineGraphData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

function random(min, max) {
    const range = max - min;
    const rand = Math.random();
    return (min + Math.round(rand * range));
}

@Component({
    selector: 'graph-k-line',
    templateUrl: './demo.component.html'
})
export class GraphKLineDemoComponent extends AsyncDescription {
    public demoPath = "demo/graph/k-line";

    public kLineData: KLineGraphData;

    public handleClick($event) {
        console.log($event);
    }

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
        this.kLineData = new KLineGraphData();
        this.kLineData.header = ["2016.04.24", "2016.04.25", "2016.04.26", "2016.05.27", "2016.04.28", "2016.04.29", "2016.04.30", "2016.05.01", "2016.05.02", "2016.05.03", "2016.05.04", "2016.05.05", "2016.05.06", "2016.05.07"
            , "2016.05.08", "2016.05.09", "2016.05.10", "2016.05.11", "2016.05.12", "2016.05.13", "2016.05.14", "2016.05.15", "2016.05.16", "2016.05.17", "2016.05.18", "2016.05.19",
            "2016.05.20", "2016.05.21", "2016.05.22", "2016.05.23", "2016.05.24"];
        this.kLineData.data = Array.from(new Array(31)).map(() => {
            return Array.from(new Array(24)).map(item => random(0, 100))
        });
    }
}

