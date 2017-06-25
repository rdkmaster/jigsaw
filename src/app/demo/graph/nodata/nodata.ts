/**
 * Created by 10177553 on 2017/3/28.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractGraphData} from "../../../../rdk/core/data/graph-data";
import {EchartOptions} from "rdk/core/data/echart-types";
import {RdkGraph} from "../../../../rdk/component/graph/graph";

@Component({
    template: `<h2>没有数据测试~</h2>
                <rdk-graph width="100%"></rdk-graph>`
})

export class GraphWithNoDataComponent implements OnInit {
    data: AbstractGraphData;

    @ViewChild("graph") graph: RdkGraph;

    ngOnInit() { }
}

