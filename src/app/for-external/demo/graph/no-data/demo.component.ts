import {Component} from '@angular/core';
import {AbstractGraphData} from "jigsaw/public_api";
import {GraphTextService} from "../demo.service";

@Component({
    selector: 'graph-no-data',
    templateUrl: './demo.component.html'
})

export class GraphWithNoDataDemoComponent {
    data: AbstractGraphData;
    constructor(public doc: GraphTextService) {
    }
}
