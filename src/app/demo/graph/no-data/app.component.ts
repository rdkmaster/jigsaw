/**
 * Created by 10177553 on 2017/3/28.
 */

import {Component} from '@angular/core';
import {AbstractGraphData} from "jigsaw/core/data/graph-data";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html'
})

export class GraphWithNoDataComponent extends DemoBase {
    data: AbstractGraphData;
}

