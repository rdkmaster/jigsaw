/**
 * Created by 10177553 on 2017/3/28.
 */
import {Component, OnInit} from '@angular/core';
import {LineBarGraphData} from "../../../../../../core/data/graph-data";
import {Http} from "@angular/http";

@Component({
    template: `
        <div class="demo-box">
            <rdk-graph #pie
                       [data]="data"
                       [(width)]="graphWidth"
                       [(height)]="graphHeight">
            </rdk-graph>
        </div>
    `,
    styles: [`.demo-box {
        margin: 20px 300px;
    }`]
})
export class LineBarGraphArrayDemoComponent implements OnInit {
    data: LineBarGraphData;

    graphWidth;
    graphHeight;
    public _http: Http;

    constructor(http: Http) {
        this._http = http;
        this.data = new LineBarGraphData(this._http);

        this.graphWidth = "600";
        this.graphHeight = "250";

        let extendOption = {
            tooltip: {
                trigger: 'axis',
            },
            title: {
                text: '掉话排行',
                textAlign: 'left',
                top: 20,
                textStyle: {
                    fontSize: 14,
                    fontFamily: '微软雅黑, Arial, Verdana, sans-serif',
                    fontWeight: 'normal',
                    color: '#008fd4'
                },
            },
            grid: {
                left: 45,
                right: 45,
                top: 60,
                show: true,
                borderWidth: 1
            },
            legend: {
                top: 20,
                right: 43,
                inactiveColor: "#bbb",
                textStyle: {
                    color: '#333',
                    fontSize: 12,
                    fontFamily: '微软雅黑, Arial, Verdana, sans-serif',
                    fontWeight: 'normal'
                },
                itemWidth: 20,//设置icon长高
                itemHeight: 10
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    position: 'bottom',
                    axisLabel: {
                        interval: 4,//类轴网格设置
                        textStyle: {
                            fontSize: 10,
                            fontFamily: '微软雅黑, Arial, Verdana, sans-serif',
                            fontWeight: 'normal',
                            color: '#666'
                        }
                    },
                    axisLine: {//轴线设置
                        show: true,
                        lineStyle: {
                            color: '#cccccc',
                        }
                    },
                    splitLine: {//网格相关设置
                        show: true,
                        interval: 0,
                        lineStyle: {
                            color: "#e5e5e5"
                        }

                    }
                },

            ],
            /*双数字轴和数据对应那个数字轴设置*/
            /*
             * 数字轴的位置设置：yAxis.position设置为"right"，表示在右侧;
             * 数据显示相对应的数字轴：yAxisIndex：1，表示对应第2个数字轴;
             * */
            yAxis: [
                {
                    // name: '掉话次数',
                    nameTextStyle: {
                        color: '#54acd5',
                        fontSize: 10,
                        fontFamily: '微软雅黑, Arial, Verdana, sans-serif',
                        fontWeight: 'normal',
                    },
                    axisLabel: {
                        //show:true,
                        textStyle: {
                            fontSize: 10,
                            fontFamily: '微软雅黑, Arial, Verdana, sans-serif',
                            fontWeight: 'normal',
                            color: '#54acd5',
                        },
                        formatter: function (params) {
                            return params.toFixed(1) == 0 ? "" : params.toFixed(1)
                        }
                    },
                    max: 6,
                    splitLine: {show: false},// 是否现示网格
                    type: 'value',
                    // splitNumber:4,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#54acd5'
                        }
                    }
                },
                {
                    // name: '掉话率(%)',
                    type: 'value',
                    // max:1.2,
                    splitLine: {show: false},
                    position: 'right',
                    axisLabel: {//标签名样式
                        textStyle: {
                            fontSize: 10,
                            fontFamily: '微软雅黑, Arial, Verdana, sans-serif',
                            fontWeight: 'normal',
                            color: '#f99660'
                        },
                        formatter: function (params) {
                            return params.toFixed(1) == 0 ? "" : params.toFixed(1)
                        }
                    },
                    nameTextStyle: {
                        color: '#f99660',
                        fontStyle: '10px'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#f99660',
                        }
                    },
                }
            ],
            series: [
                {

                    legendHoverLink: false,
                    itemStyle: {
                        normal: {
                            label: {show: false, position: 'top'},
                            barBorderColor: '#54acd5',
                            color: '#54acd5',
                            barBorderRadius: 0
                        }
                    },
                    barCategoryGap: '15%',//控制条形柱间的间距
                    type: 'bar'
                },
                {
                    symbolSize: [5, 5],
                    itemStyle: {
                        normal: {
                            color: '#f99660',
                        }
                    },
                    yAxisIndex: 1,
                    smooth: false,
                    hoverAnimation: false,
                    type: 'line'
                }
            ]
        };

        let objectData = {
            "rowDescriptor": ["掉话次数"],
            "header": [["2016.04.24", "2016.04.25", "2016.04.26", "2016.05.27", "2016.04.28", "2016.04.29", "2016.04.30", "2016.05.01", "2016.05.02", "2016.05.03", "2016.05.04", "2016.05.05", "2016.05.06", "2016.05.07"
                , "2016.05.08", "2016.05.09", "2016.05.10", "2016.05.11", "2016.05.12", "2016.05.13", "2016.05.14", "2016.05.15", "2016.05.16", "2016.05.17", "2016.05.18", "2016.05.19",
                "2016.05.20", "2016.05.21", "2016.05.22", "2016.05.23", "2016.05.24"]],
            "data": [
                [2, 2, 1, 3, 2, 3, 1, 2, 3, 1, 3, 3, 3, 1, 2, 1, 3, 2, 3, 1, 3, 2, 3, 1, 2, 1, 3, 3, 3, 1, 2],
                [0.6, 0.5, 0.8, 0.6, 0.5, 0.8, 0.8, 0.7, 0.6, 0.3, 0.8, 0.9, 0.3, 0.7, 0.6, 0.5, 0.3, 0.9, 0.7, 0.6, 0.5, 0.8, 0.5, 0.6, 0.5, 0.6, 0.8, 0.9, 0.6, 0.8, 0.6]
            ]
        };
        // // 打补丁分方式修改
        this.data.patchOptions(extendOption);
        this.data.fromObject(objectData);
    }

    ngOnInit() {
    }
}
