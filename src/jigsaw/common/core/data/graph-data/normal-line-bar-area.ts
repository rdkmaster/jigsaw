import {EchartOptions} from "../echart-types";
import {AbstractGraphData, AbstractNormalGraphData} from "./graph-data";

declare const echarts: any;

/**
 * 折线图
 */
export class LineGraphData extends AbstractNormalGraphData {

    protected defaultType = 'line';

    protected createSeries() {
        return this.data.map((row, index) => {
            return {name: this.header[index], type: this.defaultType, data: this.data.map(row => row[index])}
        });
    }

    protected optionsTemplate: EchartOptions = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            left: 'center',
            data: []
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
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: []
    };

    protected createChartOptions(): EchartOptions {
        if (!this.data || !this.data.length) {
            return;
        }
        const opt: EchartOptions = {...this.optionsTemplate};
        this._extendOption(opt);
        opt.legend.data = this.header;
        opt.xAxis[0].data = this.rowDescriptor;
        opt.series = this.createSeries();
        return opt;
    }
}

/**
 * 加这个类是为了保持向下兼容
 * @internal
 */
export class LineBarGraphData extends LineGraphData {
}

export class LineGraphDataByRow extends LineGraphData {
    protected createSeries() {
        return this.data.map((row, index) => {
            return {name: this.rowDescriptor[index], type: this.defaultType, data: row}
        });
    }

    protected createChartOptions(): EchartOptions {
        if (!this.data || !this.data.length) {
            return;
        }
        const opt: EchartOptions = {...this.optionsTemplate};
        this._extendOption(opt);
        opt.legend.data = this.rowDescriptor;
        opt.xAxis[0].data = this.header;
        opt.series = this.createSeries();
        return opt;
    }
}

/**
 * 柱状图
 */
export class BarGraphData extends LineGraphData {
    protected defaultType = 'bar';
}

/**
 * 柱状图（按行）
 */
export class BarGraphDataByRow extends LineGraphDataByRow {
    protected defaultType = 'bar';
}

/**
 * 条形图
 */
export class StripGraphData extends AbstractNormalGraphData {

    protected getBrowserInfo() {
        //只做了谷歌和火狐的兼容性
        let agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf("firefox") > 0) {
            return -10;
        } else {
            return -15;
        }
    }

    protected getGridRight() {
        let gridRight = "" + this.data[0][0];
        return gridRight.length * 8
    }

    protected optionsTemplate: EchartOptions = {
        grid: {
            left: 100,
            top: 60
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {type: ''},
            formatter: function (params) {
                return params[1].name + '<br/>'
                    + params[1].seriesName + ' : ' + params[1].value
            }
        },
        xAxis: [
            {
                type: 'value',
                splitNumber: 4,
                splitLine: {show: false},
                position: 'bottom',
                max: "dataMax",
                axisLabel: {
                    textStyle: {
                        color: '#bbbbbb'
                    }
                },
                axisTick: {//坐标轴刻度相关设置
                    show: true,
                    inside: false,
                    color: '#ddd',
                    length: 3,//刻度长短设置
                    lineStyle: {
                        color: '#ddd',
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ddd',
                        width: 1
                    }
                }
            }
        ],
        yAxis: [
            {

                splitLine: {show: false},
                data: [],
                boundaryGap: [0.01, 0.01],
                axisLabel: {
                    textStyle: {
                        color: '#666'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ddd',
                        width: 1
                    }
                },
                axisTick: {//坐标轴刻度相关设置
                    show: true,
                    length: 3,//刻度长短设置
                    lineStyle: {
                        color: '#54acd5',
                    }
                }
            }
        ]
    };

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) {
            return;
        }
        const options = {...this.optionsTemplate};
        this._extendOption(options);
        options.grid.right = this.getGridRight();
        options.yAxis[0].data = this.header;
        options.series = [
            {
                type: 'bar',
                barGap: '-100%',
                silent: true,
                itemStyle: {
                    normal: {
                        barBorderColor: '#54acd5',
                        opacity: 0.2,
                        color: '#54acd5',
                        barBorderRadius: 5
                    }
                },
                barWidth: 10,
                data: this.data[0]
            },
            {
                animation: true,
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: ['100%', this.getBrowserInfo()],
                        textStyle: {
                            fontSize: 12,
                            color: "#54acd5"
                        }
                    }
                },
                barGap: '-100%',
                itemStyle: {
                    normal: {
                        barBorderColor: '#54acd5',
                        color: '#54acd5',
                        barBorderRadius: 5
                    }
                },
                barWidth: 10,
                tooltip: {
                    trigger: 'axis',
                },
                data: this.data[1]
            }
        ];
        return options;
    }
}

/**
 * 条形时序图
 */
export class StripSequenceGraphData extends StripGraphData {
    protected createChartOptions(): any {
        if (!this.data || !this.data.length) {
            return;
        }
        const options = {...this.optionsTemplate};
        this._extendOption(options);
        options.grid.right = this.getGridRight();
        options.yAxis[0].type = 'category';
        options.yAxis[0].data = this.header;
        options.series = [
            {
                type: 'bar',
                barGap: '-100%',
                silent: true,
                itemStyle: {
                    normal: {
                        barBorderColor: '#54acd5',
                        opacity: 0.2,
                        color: '#54acd5',
                        barBorderRadius: 5
                    }
                },
                barWidth: 10,
                data: this.data[0]
            },
            {
                type: 'bar',
                stack: '总量',
                barGap: '-100%',
                silent: true,
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)',
                        barBorderRadius: 5,
                        textStyle: {
                            align: 'right'
                        }
                    }
                },
                barWidth: 10,
                data: this.data[1]
            },
            {
                type: 'bar',
                stack: '总量',
                barGap: '-100%',
                silent: true,
                animation: true,
                label: {
                    normal: {
                        show: true,
                        position: ['100%', this.getBrowserInfo()],
                        textStyle: {
                            color: "#54acd5"
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderColor: '#54acd5',
                        color: '#54acd5',
                        barBorderRadius: 5
                    }
                },
                barWidth: 10,
                data: this.data[2]
            }
        ];
        return options;
    }
}

/**
 * 条形色值图
 */
export class StripColorGraphData extends AbstractNormalGraphData {
    protected optionsTemplate: EchartOptions = {
        title: {
            text: '',
            left: "center",
            top: 20,
            textStyle: {
                color: '#434343',
                fontSize: 12
            }
        },
        calculable: true,
        grid: {
            left: 90,
            right: 60,
            top: 60
        },
        xAxis: [
            {
                type: 'value',
                splitNumber: 4,
                axisLine: {
                    show: false
                },
                splitLine: {//出网格线
                    show: false
                },
                axisLabel: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                splitLine: {
                    show: false
                },
                boundaryGap: true,
                type: 'category',
                scale: false,
                axisLabel: {
                    textStyle: {
                        color: '#434343'//刻度标签样式
                    }

                },
                axisLine: {
                    show: false
                },
                axisTick: {//坐标轴刻度相关设置
                    show: false
                },
                data: []
            }
        ],
        series: [
            {
                name: 'bar',
                type: 'bar',
                stack: "总量",
                silent: true,
                animation: false,//关闭动漫
                barWidth: '10px',
                data: []

            },
            {
                name: 'bar6',
                type: 'bar',
                stack: "总量",
                silent: true,
                animation: false,//关闭动漫
                label: {//图形数据显示位置
                    normal: {
                        show: true, position: ['100%', -5],
                        textStyle: {
                            color: "#585858"
                        },
                        formatter: function (params) {
                            return "  " + (100 - params.value)
                        }
                    },
                },
                itemStyle: {//图形边框设置，如边框大小，圆角，填充着色
                    normal: {
                        color: "#dedede"
                    }
                },
                barWidth: '10px',//条形宽度
                data: []
            }

        ]
    };

    protected createSeries(): any[][] {
        return [
            this.data[0].map(v => {
                return {
                    value: v,
                    itemStyle: {
                        normal: {
                            color: v > 95 ? "#98e2a6" : v > 90 ? "#9ad0e2" : v > 80 ? "#f7e685" : v > 70 ? "#f6c88a" : "#ff8e74"
                        }
                    }
                }
            }),
            this.data[0].map(v => 100 - v)
        ]
    }

    protected createChartOptions(): EchartOptions {
        if (!this.data || !this.data.length) {
            return;
        }
        const opt = {...this.optionsTemplate};
        this._extendOption(opt);
        opt.yAxis[0].data = this.header;
        [opt.series[0].data, opt.series[1].data] = this.createSeries();
        return opt;
    }
}

/**
 * 堆叠区域图
 */
export class StackedAreaGraphData extends AbstractGraphData {
    protected createChartOptions(): any {
        if (!this.data || !this.data.length) {
            return;
        }

        return {
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    alignWithLabel: true,
                    axisLabel: { // 类轴刻度间隔
                        interval: 4
                    },
                    axisTick: {  //坐标轴刻度相关设置
                        show: true,
                        inside: true,
                        interval: 0,
                        length: 5,//刻度长短设置
                        lineStyle: {
                            color: '#bbb',
                        }
                    },
                    splitLine: {//网格线相关设置
                        interval: 0,//类目轴为true且为这个为0时才会显示
                        lineStyle: {
                            color: "#eee"
                        }
                    },
                    data: this.header
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    max: 3,
                    axisTick: {
                        show: false,
                    },
                    axisLine: {//轴线设置
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    min: 0,
                    axisLabel: {
                        formatter: function (params) {
                            return params.toFixed(1) == "0.0" ? "" : params.toFixed(1) + "%"
                        }
                    }
                }
            ],
            series: [
                {
                    type: 'line',
                    connectNulls: true,
                    smooth: true,
                    symbolSize: [5, 5],
                    showAllSymbol: true,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0, color: '#ff7c24' // 0% 处的颜色
                                },
                                {
                                    offset: 1, color: '#fff' // 100% 处的颜色
                                }
                            ], false)
                        }
                    },
                    data: this.data[0],
                }
            ]
        };

    }
}
