import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ModeledFunnelGraphData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class FunnelGraphComponent {
    constructor(public http: HttpClient) {
        this.funnelPlotData = new ModeledFunnelGraphData();
        this.funnelPlotData.data = [[60], [40], [20], [80], [100]];
        this.funnelPlotData.header = ['访问', '咨询', '订单', '点击', '展现'];
        this.funnelPlotData.template.option = {
            legend: {
                data: ['展现', '点击', '访问', '咨询', '订单']
            },
            title: {
                text: '漏斗图',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
        }
        this.funnelPlotData.template.seriesItem = {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: [
                { value: 60, name: '访问' },
                { value: 40, name: '咨询' },
                { value: 20, name: '订单' },
                { value: 80, name: '点击' },
                { value: 100, name: '展现' }
            ]
        }
    }

    public funnelPlotData: ModeledFunnelGraphData;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何使用漏斗图';
    description: string = '';
}
