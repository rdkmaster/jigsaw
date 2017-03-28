/**
 * Created by 10177553 on 2017/3/28.
 */
import { Component, OnInit } from '@angular/core';
import {PieGraphData} from "../../../../../core/data/graph-data";

@Component({
    template: `
        <rdk-graph #pie class="graph-content" [data]="data"></rdk-graph>
    `
})
export class PieDemoComponent implements OnInit {
    data: PieGraphData;
    // 第二个饼图;

    ngOnInit() {
        let seriesData = [
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
        ];
        let legendData = ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'];
        // 直接创建图表
        this.data = new PieGraphData(seriesData,"测试饼图", legendData, '测试系列');


        let extendOption = {
            legend: {
                left: 'left',
            }
        };
        // 打补丁分方式修改
        this.data.patchOptions(extendOption);
    }
}
