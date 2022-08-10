import {debounceTime} from "rxjs/operators";
import {Component, OnInit, ViewChild} from '@angular/core';
import {combineLatest} from "rxjs";
import {AbstractGraphData, EchartOptions, JigsawMobileGraph, JigsawMobileInput} from "jigsaw/mobile_public_api";

@Component({
    templateUrl: './demo.component.html'
})

export class GraphResizeComponent implements OnInit {
    data: AbstractGraphData;
    graphWidth: string = '100%';
    graphHeight: string = '300';

    @ViewChild("graph") graph: JigsawMobileGraph;

    @ViewChild("widthInput") widthInput: JigsawMobileInput;

    @ViewChild("heightInput") heightInput: JigsawMobileInput;

    resizeGraph() {
        this.graph.resize();
    }

    ngOnInit() {
        this.data = new GraphDataDemo();
        combineLatest(this.widthInput.valueChange, this.heightInput.valueChange).pipe(debounceTime(500))
            .subscribe(
                () => {
                    this.graphWidth = <string>this.widthInput.value;
                    this.graphHeight = <string>this.heightInput.value;
                }
            )
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
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
