import {Component, ElementRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ScatterGraphData} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'graph-scatter',
    templateUrl: './demo.component.html'
})
export class GraphScatterDemoComponent extends AsyncDescription {
    public demoPath = "demo/graph/scatter";

    public scatterData: ScatterGraphData;

    public handleClick($event) {
        console.log($event);
    }

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
        this.scatterData = new ScatterGraphData();
        this.scatterData.title = '散点图';
        this.scatterData.data = [
            [10.0, 8.04], [8.0, 6.95], [13.0, 7.58], [9.0, 8.81], [11.0, 8.33], [14.0, 9.96], [6.0, 7.24], [4.0, 4.26], [12.0, 10.84], [7.0, 4.82], [5.0, 5.68]
        ];
    }
}
