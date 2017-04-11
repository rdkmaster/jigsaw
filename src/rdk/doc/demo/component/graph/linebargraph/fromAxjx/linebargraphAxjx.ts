/**
 * Created by 10177553 on 2017/3/28.
 */
import {Component} from '@angular/core';
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
export class LineBarGraphAxjxDemoComponent {
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

        this.data.patchOptions(extendOption);
        this.data.fromAjax('mock-data/graph/linebargraph-data.json');
    }
}
