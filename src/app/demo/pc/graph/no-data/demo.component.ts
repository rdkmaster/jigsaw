import {Component} from '@angular/core';
import {AbstractGraphData} from "jigsaw/common/core/data/graph-data";

@Component({
    templateUrl: './demo.component.html'
})

export class GraphWithNoDataComponent {
    data: AbstractGraphData;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

