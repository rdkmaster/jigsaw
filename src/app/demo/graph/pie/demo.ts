/**
 * Created by 10177553 on 2017/3/28.
 */
import { Component } from '@angular/core';
import {PieGraphData, PieGraphDataByColumn, PieGraphDataByRow} from "jigsaw/core/data/graph-data";
import {Http} from "@angular/http";

@Component({
    template: `
        <h3>使用 PieGraphData 作为输入数据</h3>
        <p>对于数据不是直接来自于数据库的时候，推荐使用这个数据类型构建饼图，简单又直接。</p>
        <jigsaw-graph [data]="pieGraphData" [width]="400" [height]="300"></jigsaw-graph>

        <h3>使用 PieGraphDataByColumn 作为输入数据</h3>
        <p>对于数据直接来自于数据库，并且对某一列的数据做对比的时候，推荐使用这个数据类型构建饼图。提供给组件的数据至少需要这3个属性"data"/"rowDescriptor"/"header"，并且都是数组。</p>
        <jigsaw-graph [data]="pieGraphDataByCol" [width]="400" [height]="300"></jigsaw-graph>

        <h3>使用 PieGraphDataByRow 作为输入数据</h3>
        <p>对于数据直接来自于数据库，并且对某一行的数据做对比的时候，推荐使用这个数据类型构建饼图。提供给组件的数据至少需要这3个属性"data"/"rowDescriptor"/"header"，并且都是数组。</p>
        <jigsaw-graph [data]="pieGraphDataByRow" [width]="400" [height]="300"></jigsaw-graph>
    `
})
export class PieGraphDemoComponent {
    public pieGraphData: PieGraphData;
    public pieGraphDataByCol: PieGraphDataByColumn;
    public pieGraphDataByRow: PieGraphDataByRow;

    constructor(http:Http) {
        const s = [
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
        ];
        this.pieGraphData = new PieGraphData('某站点用户访问来源', s);

        this.pieGraphDataByCol = new PieGraphDataByColumn();
        this.pieGraphDataByCol.http = http;
        this.pieGraphDataByCol.fromAjax('mock-data/graph/marketing.json');

        this.pieGraphDataByRow = new PieGraphDataByRow();
        this.pieGraphDataByRow.http = http;
        this.pieGraphDataByRow.fromAjax('mock-data/graph/marketing.json');
    }
}
