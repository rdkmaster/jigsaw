/**
 * Created by 10177553 on 2017/3/28.
 */

import {Component} from '@angular/core';
import {AbstractGraphData} from "jigsaw/core/data/graph-data";

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
    tags: string[] = [
        'JigsawGraph',
    ];
}

