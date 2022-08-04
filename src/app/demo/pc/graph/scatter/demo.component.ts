import {Component} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {ScatterGraphData} from "jigsaw/public_api";
import {AjaxInterceptor} from "../../../../app.interceptor";
import {GraphTextService} from "../demo.service";

@Component({
    selector: 'graph-scatter',
    templateUrl: './demo.component.html'
})
export class GraphScatterDemoComponent {
    constructor(public http: HttpClient, public text: GraphTextService) {
        this.scatterData = new ScatterGraphData();
        this.scatterData.title = '散点图';
        this.scatterData.data = [
            [10.0, 8.04], [8.0, 6.95], [13.0, 7.58], [9.0, 8.81], [11.0, 8.33], [14.0, 9.96], [6.0, 7.24], [4.0, 4.26], [12.0, 10.84], [7.0, 4.82], [5.0, 5.68]
        ];

    }

    scatterData: ScatterGraphData;

    handleClick($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
