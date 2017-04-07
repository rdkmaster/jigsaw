/**
 * Created by 10177553 on 2017/3/28.
 */
import { Component, OnInit } from '@angular/core';
import {LineBarGraphData} from "../../../../../core/data/graph-data";

@Component({
    template: `
        <div class="demo-box">
            <rdk-graph #pie class="graph-content"
                       [data]="data"
                       [(width)]="graphWidth"
                       [(height)]="graphHeight">
            </rdk-graph>
        </div>
        
    `,
    styles:[
        `
            .demo-box{
                margin: 20px 20px;
            }
            .graph-content{
                margin: 20px 200px;
            }
            
        `
    ]
})
export class LineBarGraphDemoComponent implements OnInit {
    data: LineBarGraphData;
    graphWidth ;
    graphHeight;
    ngOnInit() {
        this.graphWidth = "600";
        this.graphHeight = "250";
        let seriesData =  [
            {
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
                name:'平均温度',
                type:'line',
                yAxisIndex: 1,
                data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ];
        let xAxisData=[
            {
                type: 'category',
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ];
        let yAxisData= [
            {
                type: 'value',
                name: '水量',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ];
        let title = "line-bar-graph";
        this.data = new LineBarGraphData(seriesData,title, xAxisData,yAxisData);
        let extendOption = {
            // legend: {
            //     left: 'left',
            // },
            title: {
                top: '-4px',
            },
            tooltip: {
                axisPointer: {
                    crossStyle: {
                        color: '#108ee9',
                        width: 2
                    }
                }
            }
        };

        // // 打补丁分方式修改
         this.data.patchOptions(extendOption);
    }
}
