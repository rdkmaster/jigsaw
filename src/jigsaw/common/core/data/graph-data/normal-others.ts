import {EchartOptions} from "../echart-types";
import {AbstractGraphData, AbstractNormalGraphData} from "./graph-data";

/**
 * K线图
 */
export class KLineGraphData extends AbstractNormalGraphData {
    protected createSeries(): any[] {
        return [{
            name: 'k data',
            type: 'k',
            showAllSymbol: true,
            animation: true,
            smooth: false,
            symbolSize: [5, 5],
            hoverAnimation: false,
            data: this.data
        }];
    }

    public sampleColors = ["#54acd5", "#f99660", "#a4bf6a", "#ec6d6d", "#f7b913", "#8ac9b6", "#bea5c8", "#01c5c2", "#a17660"];
    public vmaxColors = ['#41addc', '#bea5c8', '#85c56c', '#f99660', '#ffc20e', '#ec6d6d', '#8ac9b6', '#585eaa', '#b22c46', '#96582a'];

    protected optionsTemplate = {
        color: this.vmaxColors,
        tooltip: {
            trigger: 'axis',
            position: function (point) {// 固定在顶部
                return [point[0] + 10, point[1]];
            }
        },
        grid: {
            left: 45,
            right: 45,
            top: 60
        },
        calculable: true,
        /*当某天无数据不补零，同时不连线的效果实现*/
        /*
        *以x轴为类目轴为例:如下
        *坐标轴 刻度标签 设显示间隔:xAxis.axisLabel.interval根据具体情况设置标签显示间隔;
        *坐标轴 刻度 的显示间隔:xAxis.axisTick.interval设置全部显示为0;
        *标志图形全部显示:series.showAllSymbol设置为true,
        * */
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLabel: {//标签设置
                    interval: 4
                },
                splitLine: {//设置网格
                    interval: 0
                },
                scale: true,
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitNumber: 10,//不是类轴才会生效，设置网格多少
                axisLabel: {//标签设置
                    interval: 4
                }
            }
        ],
        series: []
    };

    protected createChartOptions(): EchartOptions {
        if (!this.data || !this.data.length) {
            return;
        }
        const opt = {...this.optionsTemplate};
        this._extendOption(opt);
        opt.xAxis[0].data = this.header;
        opt.series = this.createSeries();
        return opt;
    }
}

/**
 * 箱线图
 */
export class BoxPlotGraphData extends AbstractGraphData {
    public title: string;

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) {
            return;
        }

        return {
            title: [
                {
                    text: this.title,
                    left: 'center',
                },
                {
                    text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                    borderColor: '#999',
                    borderWidth: 1,
                    textStyle: {
                        fontSize: 14
                    },
                    left: '10%',
                    top: '90%'
                }
            ],
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: this.data.map((row, i) => i),
                boundaryGap: true,
                nameGap: 30,
                splitArea: {
                    show: false
                },
                axisLabel: {
                    formatter: 'expr {value}'
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                name: 'km/s minus 299,000',
                splitArea: {
                    show: true
                }
            },
            series: [
                {
                    name: 'boxplot',
                    type: 'boxplot',
                    data: this.data,
                    tooltip: {
                        formatter: function (param) {
                            return [
                                'Experiment ' + param.name + ': ',
                                'upper: ' + param.data[5],
                                'Q3: ' + param.data[4],
                                'median: ' + param.data[3],
                                'Q1: ' + param.data[2],
                                'lower: ' + param.data[1]
                            ].join('<br/>')
                        }
                    }
                },
                /*{
                    name: 'outlier',
                    type: 'scatter',
                    data: data.outliers
                }*/
            ]
        };
    }
}

/**
 * 热力图
 */
export class HeatGraphData extends AbstractNormalGraphData {

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) {
            return;
        }
        return {
            tooltip: {
                position: 'top'
            },
            animation: false,
            grid: {
                height: '50%',
                y: '10%'
            },
            xAxis: {
                type: 'category',
                data: this.data[this.data.length - 2],
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                type: 'category',
                data: this.data[this.data.length - 1],
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: 0,
                max: 10,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%'
            },
            series: [{
                name: 'Punch Card',
                type: 'heatmap',
                data: this.data.slice(0, this.data.length - 2),
                label: {
                    normal: {
                        show: true
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
    }
}

/**
 * 关系图
 */
export class RelationalGraphData extends AbstractGraphData {
    public data: any[];

    public title: string;

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) {
            return;
        }
        return {
            title: {
                text: this.title
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.data[this.data.length - 2]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    coordinateSystem: 'cartesian2d',
                    symbolSize: 40,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    data: this.data[0],
                    links: this.data[this.data.length - 1],
                    lineStyle: {
                        normal: {
                            color: '#2f4554'
                        }
                    }
                }
            ]
        };
    }
}
