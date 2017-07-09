/**
 * Created by 10177553 on 2017/3/28.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractGraphData} from "jigsaw/core/data/graph-data";
import {EchartOptions} from "jigsaw/core/data/echart-types";
import {JigsawGraph} from "jigsaw/component/graph/graph";
import {JigsawInput} from "jigsaw/component/input/input";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";

@Component({
    template: `
        autoResize:
        <jigsaw-switch [(checked)]="autoResize" (change)="resizeGraph()"></jigsaw-switch>
        width:
        <jigsaw-input [value]="graphWidth" #widthInput></jigsaw-input>
        height:
        <jigsaw-input [value]="graphHeight" #heightInput></jigsaw-input><br><br>
        <jigsaw-graph #graph [data]="data" [width]="graphWidth" [height]="graphHeight"
                   [autoResize]="autoResize"></jigsaw-graph>
    `
})

export class GraphResizeComponent implements OnInit {
    data: AbstractGraphData;
    autoResize: boolean = true;
    graphWidth: string = '100%';
    graphHeight: string = '300';

    @ViewChild("graph") graph: JigsawGraph;

    @ViewChild("widthInput") widthInput: JigsawInput;

    @ViewChild("heightInput") heightInput: JigsawInput;

    resizeGraph() {
        this.graph.resize();
    }

    ngOnInit() {
        this.data = new GraphDataDemo();
        Observable.combineLatest(this.widthInput.valueChange,this.heightInput.valueChange).debounceTime(500)
            .subscribe(
            () => {
                this.graphWidth = <string>this.widthInput.value;
                this.graphHeight =<string>this.heightInput.value;
            }
        )
    }

}

export class GraphDataDemo extends AbstractGraphData {
    protected createChartOptions(): EchartOptions {
        return {
            title: {
                text: '堆叠区域图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
    }
}

