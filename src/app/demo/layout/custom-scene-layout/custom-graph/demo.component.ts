import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {AbstractGraphData} from "jigsaw/core/data/graph-data";
import {EchartOptions} from "jigsaw/core/data/echart-types";
import {JigsawGraph} from "jigsaw/component/graph/graph";
import {IEmittable} from "jigsaw/core/data/component-data";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'custom-graph',
    template: '<button (click)="handleClick()">click me</button><br><jigsaw-graph [data]="data" #graph></jigsaw-graph>',
    styles: [`
        :host {
            display: block;
            width: 100%;
        }
    `]
})
export class CustomGraphComponent implements OnInit, IEmittable {
    emitter: string = 'cipher123456';

    data: AbstractGraphData;

    @ViewChild("graph") graph: JigsawGraph;

    resize() {
        this.graph.resize();
    }

    patchOption = {
        title: {
            text: '补丁 - 堆叠区域图'
        }
    };

    private _emitter = new EventEmitter<any>();

    public emit(value?: any): void {
        this._emitter.emit(value);
    }

    public subscribe(callback?: (value:any) => void): Subscription {
        return this._emitter.subscribe(callback);
    }

    public unsubscribe() {
        this._emitter.unsubscribe();
    }

    handleClick() {
        this.emit((new Date()).toLocaleString());
    }

    ngOnInit() {
        let graphData = new GraphDataDemo();
        this.data = graphData;
        graphData.optionsPatch = this.patchOption;
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

