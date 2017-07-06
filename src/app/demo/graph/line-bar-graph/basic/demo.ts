/**
 * Created by 10177553 on 2017/3/28.
 */

import {Component} from "@angular/core";
import {LineBarGraphData, LineBarGraphDataByRow} from "jigsaw/core/data/graph-data";

@Component({
    template: `
        <p>数据的一列为一个系列情形，请使用 LineBarGraphData 作为数据。这个和一般的数据库表的结构非常契合，推荐优先使用。</p>
        <jigsaw-graph [data]="dataByCol"></jigsaw-graph>
        <br>
        <p>数据的一行为一个系列情形，请使用 LineBarGraphDataByRow 作为数据。</p>
        <jigsaw-graph [data]="dataByRow"></jigsaw-graph>
    `
})

export class BasicLineGraphComponent {
    dataByRow: LineBarGraphDataByRow;
    dataByCol: LineBarGraphData;

    constructor() {
        this.dataByRow = new LineBarGraphDataByRow();
        this.dataByRow.data = [
            [120, 132, 101, 134, 90, 230, 210],
            [220, 182, 191, 234, 290, 330, 310],
            [150, 232, 201, 154, 190, 330, 410],
            [320, 332, 301, 334, 390, 330, 320],
            [820, 932, 901, 934, 1290, 1330, 1320]
        ];
        this.dataByRow.header = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        this.dataByRow.rowDescriptor = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];

        this.dataByCol = new LineBarGraphData();
        this.dataByCol.data = [
            [120, 220, 150, 320, 820],
            [132, 182, 232, 332, 932],
            [101, 191, 201, 301, 901],
            [134, 234, 154, 334, 934],
            [90, 290, 190, 390, 1290],
            [230, 330, 330, 330, 1330],
            [210, 310, 410, 320, 1320]
        ];
        this.dataByCol.rowDescriptor = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        this.dataByCol.header = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
    }
}

