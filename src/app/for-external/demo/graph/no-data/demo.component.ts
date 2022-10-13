import { Component } from '@angular/core';
import { AbstractGraphData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'graph-no-data',
    templateUrl: './demo.component.html'
})

export class GraphWithNoDataDemoComponent extends AsyncDescription {
    public demoPath = "demo/graph/no-data";

    public data: AbstractGraphData;
}
