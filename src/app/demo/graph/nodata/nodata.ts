/**
 * Created by 10177553 on 2017/3/28.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractGraphData} from "jigsaw/core/data/graph-data";
import {JigsawGraph} from "jigsaw/component/graph/graph";

@Component({
    template: `<h2>没有数据测试~</h2>
                <jigsaw-graph width="100%"></jigsaw-graph>`
})

export class GraphWithNoDataComponent implements OnInit {
    data: AbstractGraphData;

    @ViewChild("graph") graph: JigsawGraph;

    ngOnInit() { }
}

