import {EchartOptions} from "../echart-types";
import {CommonUtils} from "../../utils/common-utils";
import {JigsawThemeService} from "../../theming/theme";
import {AbstractNormalGraphData} from "./graph-data";

/**
 * 饼图
 */
export class PieGraphData extends AbstractNormalGraphData {
    protected createSeries() {
        return this.data[0].map((v, i) => {
            return {value: v, name: this.header[i]}
        });
    }

    protected optionsTemplate: EchartOptions = {
        tooltip: {
            trigger: 'item',
            formatter: "{a}<br>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: []
        },
        series: [
            {
                data: [],
                type: 'pie',
                radius: '55%',
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

    protected createChartOptions(): EchartOptions {
        if (!this.data || !this.data.length) {
            return;
        }
        const opt: EchartOptions = {...this.optionsTemplate};
        this._extendOption(opt);
        opt.legend.data = this.header;
        opt.series[0].data = this.createSeries();
        return opt;
    }
}

export class PieGraphDataByRow extends PieGraphData {
    protected createSeries() {
        return this.data.map((row, i) => {
            return {value: row[0], name: this.rowDescriptor[i]}
        });
    }

    protected createChartOptions(): EchartOptions {
        if (!this.data || !this.data.length) {
            return;
        }
        const opt: EchartOptions = {...this.optionsTemplate};
        this._extendOption(opt);
        opt.legend.data = this.rowDescriptor;
        opt.series[0].data = this.createSeries();
        return opt;
    }
}

/**
 * 环形对比图
 */
export class DoughnutGraphData extends AbstractNormalGraphData {
    private _calcSeries(): any[] {
        return this.data.map((row: any, i) => ({value: row[0], name: this.rowDescriptor[i]}));
    }

    protected optionsTemplate: EchartOptions = {
        title: {
            text: '',
            x: 'center',
            y: 'center',
            itemGap: 20,
            textStyle: {
                fontSize: 12,
            }
        },
        series: [
            {

                type: 'pie',
                radius: ['45', '57'],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                itemStyle: {},
                label: {
                    normal: {
                        show: true,
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: []
            }
        ]
    };

    protected createChartOptions(): any {
        if (!(this.data instanceof Array) || !this.data.length) {
            return;
        }
        const labelFormatter = {
            normal: {
                label: {
                    formatter: function (params) {
                        return params.name + '\n' + params.value + '%'
                    },
                    textStyle: {
                        baseline: 'top'
                    }
                }
            },
        };
        const opt = {...this.optionsTemplate};
        this._extendOption(opt);
        opt.series[0].itemStyle = labelFormatter;
        opt.series[0].data = this._calcSeries();
        return opt;
    }
}

/**
 * 环形比例图
 */
export class DoughnutRateGraphData extends AbstractNormalGraphData {
    protected optionsTemplate: EchartOptions = {
        series: [
            {
                type: 'pie',
                radius: ['31', '34'],
                itemStyle: {},
                minAngle: 0,
                data: [
                    {
                        name: '',
                        value: null,
                        itemStyle: {}
                    },
                    {
                        name: '',
                        value: null,
                        itemStyle: {}
                    }
                ]
            },
            //点击
            {
                name: '点击环',
                clickable: true,
                type: 'pie',
                hoverAnimation: false,
                radius: ['0', '31'],
                minAngle: 0,
                data: [{
                    name: "",
                    value: 100,
                    itemStyle: {}
                }]
            }
        ]
    };

    protected createChartOptions(): any {
        if (!(this.data instanceof Array) || !this.data.length || !(this.data[0] instanceof Array)) {
            return;
        }

        //不同区域得分颜色
        const color = Number(this.data[0][0]) >= 95 ? '#98e2a6' : (Number(this.data[0][0]) >= 90 && Number(this.data[0][0]) < 95) ? '#9ad0e2' : (Number(this.data[0][0]) >= 80 && Number(this.data[0][0]) < 90) ? '#f7e685' : (Number(this.data[0][0]) >= 70 && Number(this.data[0][0]) < 80) ? '#f6c88a' : Number(this.data[0][0]) < 70 ? '#ff8e74' : '#dedede';

        const labelTop = {
            itemStyle: {
                color: color
            },
            label: {
                show: true,
                position: 'top',
                formatter: '{b}',
                textStyle: {
                    baseline: 'top',
                    fontFamily: '微软雅黑',
                    fontSize: 14
                }
            },
            labelLine: {
                show: false
            },
            emphasis: {
                color: color
            },
            value: this.data[0][0]
        };

        //中间显示
        const labelFormatter = {
            label: {
                formatter: function (params) {
                    return 100 - params.value + '%'
                },
                textStyle: {
                    baseline: 'bottom',
                    color: JigsawThemeService.majorStyle == 'dark' ? '#fff' : '#333',
                    fontFamily: 'Arial'
                }
            },
            labelLine: {
                show: false
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };

        const labelBottom = {
            itemStyle: {
                color: '#DEDEDE',
            },
            label: {
                show: true,
                position: 'center',
                textStyle: {
                    fontSize: 24
                }
            },
            labelLine: {
                show: false
            },
            emphasis: {
                color: '#DEDEDE'
            },
            value: 100 - Number(this.data[0][0])
        };

        //饼图的点击label
        const placeHolderStyle = {
            itemStyle: {
                color: 'rgba(0,0,0,0)'
            },
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };

        const opt = {...this.optionsTemplate};
        this._extendOption(opt);
        CommonUtils.extendObject(opt.series, [{...labelFormatter, data: [labelTop, labelBottom]}, placeHolderStyle]);
        return opt;
    }
}

/**
 * 环形得分图
 */
export class DoughnutScoreGraphData extends AbstractNormalGraphData {
    protected optionsTemplate: EchartOptions = {
        series: [
            {
                type: 'pie',
                radius: ['45', '50'],
                itemStyle: {},
                minAngle: 0,
                data: [
                    {
                        name: null,
                        value: 100,
                        itemStyle: {}
                    },
                    {
                        name: null,
                        value: 0,
                        itemStyle: {}
                    }
                ]
            },
            //点击
            {
                name: '点击环',
                clickable: false,
                type: 'pie',
                hoverAnimation: false,
                radius: ['0', '45'],
                minAngle: 0,
                data: [{
                    name: "",
                    value: 100,
                    itemStyle: {}
                }]
            }
        ]
    };

    protected createChartOptions(): any {
        if (!(this.data instanceof Array) || !this.data.length || !(this.data[0] instanceof Array)) {
            return;
        }

        // innerColor 内圆颜色
        // outerColor 外环颜色
        const innerColor = Number(this.data[0][0]) >= 95 ? 'rgb(152,226,166)' : (Number(this.data[0][0]) >= 90 && Number(this.data[0][0]) < 95) ? 'rgb(154,208,226)' : (Number(this.data[0][0]) >= 80 && Number(this.data[0][0]) < 90) ? 'rgb(247,230,133)' : (Number(this.data[0][0]) >= 70 && Number(this.data[0][0]) < 80) ? 'rgb(246,200,138)' : (Number(this.data[0][0]) < 70) ? 'rgb(255,142,116)' : '#dedede';
        const outerColor = Number(this.data[0][0]) >= 95 ? 'rgba(152,226,166,.2)' : (Number(this.data[0][0]) >= 90 && Number(this.data[0][0]) < 95) ? 'rgba(154,208,226,.2)' : (Number(this.data[0][0]) >= 80 && Number(this.data[0][0]) < 90) ? 'rgba(247,230,133,.2)' : (Number(this.data[0][0]) >= 70 && Number(this.data[0][0]) < 80) ? 'rgba(246,200,138,.2)' : (Number(this.data[0][0]) < 70) ? 'rgba(255,142,116,.2)' : '#dedede';
        const labelTop = {
            name: Number(this.data[0][0]) == 0 ? '0' : Number(this.data[0][0]),
            itemStyle: {
                color: outerColor,
            },
            label: {
                show: true,
                position: 'center',
                formatter: '{b}',
                textStyle: {
                    baseline: 'top',
                    fontFamily: 'arial',
                    fontSize: 30,
                    color: '#fff',
                    fontWeight: 'bold'
                },
                padding: [0, 0, 20, 0]
            },
            labelLine: {
                show: false
            },
            emphasis: {
                color: outerColor
            }
        };

        //中间显示
        const labelFormatter = {
            label: {
                position: 'center',
                textStyle: {
                    baseline: 'bottom',
                    color: '#333',
                    fontFamily: 'Arial'
                }
            },
            labelLine: {
                show: false
            },
            emphasis: {
                color: outerColor
            }
        };

        const labelBottom = {
            name: this.rowDescriptor[0],
            label: {
                show: true,
                position: 'center',
                textStyle: {
                    fontSize: 14,
                    color: '#fff',
                    fontFamily: '微软雅黑'
                },
                padding: [40, 0, 0, 0]
            },
            labelLine: {
                show: false
            }
        };

        //饼图的点击label
        const placeHolderStyle = {
            name: this.rowDescriptor[0],
            itemStyle: {
                color: innerColor
            },
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            emphasis: {
                color: innerColor,
                labelLine: {
                    show: false
                }
            }
        };

        const opt = {...this.optionsTemplate};
        this._extendOption(opt);
        CommonUtils.extendObject(opt.series, [
            {
                ...labelFormatter,
                data: [labelTop, labelBottom]
            },
            placeHolderStyle
        ]);
        return opt;
    }
}
