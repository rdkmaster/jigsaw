/**
 * Created by 10177553 on 2017/3/28.
 */

import {Component} from "@angular/core";
import {LineBarGraphData} from "../../../../../../core/data/graph-data";

@Component({
    templateUrl:"basic-line-graph.html"
})

export class BasicLineGraphComponent {
    data: LineBarGraphData;
    constructor() {
        this.data = new LineBarGraphData();
        this.data.data = [
            [120, 132, 101, 134, 90, 230, 210],
            [220, 182, 191, 234, 290, 330, 310],
            [150, 232, 201, 154, 190, 330, 410],
            [320, 332, 301, 334, 390, 330, 320],
            [820, 932, 901, 934, 1290, 1330, 1320]
        ];
        this.data.header = ['周一','周二','周三','周四','周五','周六','周日'];
        this.data.rowDescriptor = ['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'];
    }
}

