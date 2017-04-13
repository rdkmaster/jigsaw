/**
 * Created by 10177553 on 2017/3/28.
 */
import { Component, OnInit } from '@angular/core';
import {PieGraphData} from "../../../../../core/data/graph-data";

@Component({
    template: `
        <rdk-graph #pie class="graph-content" 
                   [data]="data"
                   [(width)]="graphWidth"
                   [(height)]="graphHeight"
        ></rdk-graph>
    `
})
export class PieDemoComponent implements OnInit {
    data: PieGraphData;
    // 第二个饼图;
    graphWidth ;
    graphHeight;

    ngOnInit() {
        this.graphWidth = "600";
        this.graphHeight = "250";
        let seriesData = {"data":[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
        ]};
        let legendData = ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'];
        // 直接创建图表
        // this.data = new PieGraphData();

        let extendOption = {
            title : {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        // 打补丁分方式修改
        // this.data.patchOptions(extendOption);
        this.data.fromObject(seriesData);
    }
}
