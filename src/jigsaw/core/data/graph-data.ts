import {EchartTitle, EchartLegend, EchartTooltip, EchartOptions} from "./echart-types";
import {TableDataBase} from "./table-data";
import {CommonUtils} from "../utils/common-utils";

export type GraphMatrixRow = (string | number)[];
export type GraphDataHeader = string[];
export type GraphDataField = string[];
export type GraphDataRowDescriptor = string[];
export type GraphDataMatrix = GraphMatrixRow[];

export abstract class AbstractGraphStyle {
    protected abstract createChartOptions(): EchartOptions;
}

/**
 * 这是所有的图形数据的基类，正如类名所提示的，这个类是抽象的。
 *
 * Jigsaw的图形是基于[echarts 3.x](http://echarts.baidu.com/index.html)实现的，因此在使用这个类来描述一个图之前，
 * 请确保你已经具备了echarts的相关知识了。其中最主要的是需要熟悉[echarts的配置项](http://echarts.baidu.com/option.html#title)。
 *
 * 图形数据是Jigsaw数据体系中的一个分支，关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
 */
export abstract class AbstractGraphData extends TableDataBase {
    protected abstract createChartOptions(): EchartOptions;

    /**
     * 从数据的特征上判断当前对象是否是一个图形数据
     *
     * @param data
     * @returns {boolean}
     */
    public static isGraphData(data: any): boolean {
        if (!data) {
            return false;
        }
        if (!data.hasOwnProperty('data') || !(data.data instanceof Array)) {
            return false;
        }
        if (data.hasOwnProperty('header') && !(data.header instanceof Array)) {
            //header property is optional
            return false;
        }
        if (data.hasOwnProperty('rowDescriptor') && !(data.rowDescriptor instanceof Array)) {
            //rowDescriptor property is optional
            return false;
        }
        return true;
    }

    constructor(/**
                 * 图形的数据，二维数组。
                 *
                 * @type {Array}
                 */
                public data: GraphDataMatrix = [],
                public header: GraphDataHeader = [],
                public rowDescriptor: GraphDataRowDescriptor = [],
                public field: GraphDataField = []) {
        super(data, field, header);
        this._makeFields();
    }

    private _optionsPatch: EchartOptions;

    public get optionsPatch(): EchartOptions {
        return this._optionsPatch;
    }

    public set optionsPatch(value: EchartOptions) {
        this._optionsPatch = value;
        this.patchOptions(value);
    }

    public patchOptions(patchOpt: EchartOptions, suppressWarning: boolean = false): void {
        if (!this.echartOptions) {
            if (!suppressWarning) console.warn('the options is not ready!');
            return;
        }
        CommonUtils.extendObject(this.echartOptions, patchOpt);
    }

    public echartOptions: EchartOptions;

    public get options(): EchartOptions {
        if (this.echartOptions) {
            return this.echartOptions;
        }

        const opt = this.createChartOptions();
        this._setupOptions(opt);
        return opt;
    }

    private _setupOptions(opt: EchartOptions): void {
        this.echartOptions = opt;
        if (this._optionsPatch) {
            this.patchOptions(this._optionsPatch);
        }
    }

    public ajaxSuccessHandler(data): void {
        super.ajaxSuccessHandler(data);
        this.fromObject(data);
    }

    public ajaxErrorHandler(error): void {
        super.ajaxErrorHandler(error);
        this.clear();
        this.refresh();
    }

    public fromObject(data: any): AbstractGraphData {
        if (!AbstractGraphData.isGraphData(data)) {
            throw new Error('invalid graph data, need at least a "data" property which type is Array!');
        }
        this.clear();

        TableDataBase.arrayAppend(this.data, data.data);
        if (data.hasOwnProperty('header')) {
            TableDataBase.arrayAppend(this.header, data.header);
        }
        if (data.hasOwnProperty('field')) {
            TableDataBase.arrayAppend(this.field, data.field);
        }
        if (data.hasOwnProperty('rowDescriptor')) {
            TableDataBase.arrayAppend(this.rowDescriptor, data.rowDescriptor);
        }
        this._makeFields();
        this.refresh();

        return this;
    }

    private _makeFields(): void {
        if ((!this.field || this.field.length == 0) && this.header) {
            this.header.forEach(item => this.field.push(item));
        }
    }

    public clear(): void {
        super.clear();
        this.rowDescriptor.splice(0, this.rowDescriptor.length);
        this.echartOptions = null;
    }

    protected isDataValid(data, ...checkProperty): boolean {
        if (!checkProperty) {
            checkProperty = [];
        }
        checkProperty.push("data");

        for (let i = 0; i < checkProperty.length; i++) {
            let prop = data[checkProperty[i]];
            if (!prop || !(prop instanceof Array) || prop.length == 0) {
                return false;
            }
        }
        return true;
    }
}

/**
 * 这是一个通用的图形数据，提供给它一个`EchartOptions`，它就可以渲染出对应的图了。
 *
 * Jigsaw有计划对常用的图形做封装，包括使用接口和样式，尽情期待。
 *
 * 图形数据是Jigsaw数据体系中的一个分支，关于Jigsaw数据体系详细介绍，请参考`IComponentData`的说明
 */
export class GraphData extends AbstractGraphData {
    constructor(options?: EchartOptions) {
        super();
        if (options) {
            this.echartOptions = options;
        }
    }

    protected createChartOptions(): EchartOptions {
        return this.echartOptions;
    }
}

export abstract class AbstractNormalGraphData extends AbstractGraphData {
    public title: EchartTitle;
    public legend: EchartLegend;
    public tooltip: EchartTooltip;

    protected _getLastData(): any[] {
        return this.data.map(row => row[row.length - 1]);
    }
}

/**
 * @internal
 */
export class OutlineMapData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

/**
 * 饼图
 */
export class PieGraphData extends AbstractNormalGraphData {
    private _data: GraphDataMatrix;

    public get data(): any {
        return this._data;
    }

    public set data(value: any) {
        if (CommonUtils.isUndefined(value)) return;
        if (value instanceof Array) {
            if (value[0] instanceof Array) {
                this._data = value;
            } else {
                this._data = [value];
            }
        } else {
            this._data = [[value]]
        }
    }

    protected _calcSeriesData() {
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
        if (!this.data || !this.data.length) return;

        const opt: EchartOptions = this.optionsTemplate;
        opt.legend.data = this.header;
        opt.title = this.title;
        if (this.tooltip) {
            opt.tooltip = this.tooltip;
        }
        opt.series[0].data = this._calcSeriesData();
        return opt;
    }
}

export class PieGraphDataByRow extends PieGraphData {
    protected _calcSeriesData() {
        return this.data.map(row => {
            return {value: row[0], name: row[1]}
        });
    }

    protected createChartOptions(): EchartOptions {
        if (!this.data || !this.data.length) return;

        const opt: EchartOptions = this.optionsTemplate;
        opt.title = this.title;
        opt.legend.data = this._getLastData();
        if (this.tooltip) {
            opt.tooltip = this.tooltip;
        }
        opt.series[0].data = this._calcSeriesData();

        return opt;
    }
}

/**
 * 环形对比图
 */
export class DoughnutGraphData extends AbstractGraphData {
    public title: string;

    public series: { name: string, value: string | number }[];

    private _calcSeries() {
        if (!(this.data instanceof Array) || !this.data.length) return;
        this.series = this.data.map((row: any) => ({value: row[0], name: row[1]}));
    }

    protected createChartOptions(): any {
        this._calcSeries();

        const labelFormatter = {
            normal: {
                label: {
                    formatter: function (params) {
                        return params.name + '\n' + params.value + '%'
                    },
                    textStyle: {
                        baseline: 'top',
                        color: '#000',
                        fontFamily: '微软雅黑'
                    }
                }
            },
        };
        return {
            title: {
                text: this.title,
                x: 'center',
                y: 'center',
                itemGap: 20,
                textStyle: {
                    color: '#000',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                    fontWeight: 'normal'
                }
            },
            series: [
                {

                    type: 'pie',
                    radius: ['45', '57'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    itemStyle: labelFormatter,
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
                    data: this.series
                }
            ]
        };
    }
}

/**
 * 环形比例图
 */
export class DoughnutRateGraphData extends AbstractGraphData {
    private _data: GraphDataMatrix;

    public get data(): any {
        return this._data;
    }

    public set data(value: any) {
        if (CommonUtils.isUndefined(value)) return;
        if (value instanceof Array) {
            if (value[0] instanceof Array) {
                this._data = value;
            } else {
                this._data = [value];
            }
        } else {
            this._data = [[value]]
        }
    }

    protected createChartOptions(): any {
        if (!(this.data instanceof Array) || !this.data.length || !(this.data[0] instanceof Array)) return;

        //不同区域得分颜色
        const color = Number(this.data[0][0]) >= 95 ? '#98e2a6' : (Number(this.data[0][0]) >= 90 && Number(this.data[0][0]) < 95) ? '#9ad0e2' : (Number(this.data[0][0]) >= 80 && Number(this.data[0][0]) < 90) ? '#f7e685' : (Number(this.data[0][0]) >= 70 && Number(this.data[0][0]) < 80) ? '#f6c88a' : Number(this.data[0][0]) < 70 ? '#ff8e74' : '#dedede';

        const labelTop = {
            normal: {
                color: color,
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
                }
            },
            emphasis: {
                color: color
            }
        };

        //中间显示
        const labelFormatter = {
            normal: {
                label: {
                    formatter: function (params) {
                        return 100 - params.value + '%'
                    },
                    textStyle: {
                        baseline: 'bottom',
                        color: '#333',
                        fontFamily: 'Arial'
                    }
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };

        const labelBottom = {
            normal: {
                color: '#DEDEDE',
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: 24
                    }
                },
                labelLine: {
                    show: false
                }

            },
            emphasis: {
                color: '#DEDEDE'
            }
        };

        //饼图的点击label
        const placeHolderStyle = {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };

        return {
            series: [
                {
                    type: 'pie',
                    radius: ['31', '34'],
                    itemStyle: labelFormatter,
                    minAngle: 0,
                    data: [
                        {
                            name: '',
                            value: this.data[0][0],
                            itemStyle: labelTop
                        },
                        {
                            name: '',
                            value: 100 - Number(this.data[0][0]),
                            itemStyle: labelBottom
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
                        itemStyle: placeHolderStyle
                    }]
                }
            ]
        };
    }
}

/**
 * 环形得分图
 */
export class DoughnutScoreGraphData extends AbstractGraphData {
    private _data: GraphDataMatrix;

    public get data(): any {
        return this._data;
    }

    public set data(value: any) {
        if (CommonUtils.isUndefined(value)) return;
        if (value instanceof Array) {
            if (value[0] instanceof Array) {
                this._data = value;
            } else {
                this._data = [value];
            }
        } else {
            this._data = [[value]]
        }
    }

    protected createChartOptions(): any {
        if (!(this.data instanceof Array) || !this.data.length || !(this.data[0] instanceof Array)) return;

        // innerColor 内圆颜色
        // outerColor 外环颜色
        const innerColor = Number(this.data[0][0]) >= 95 ? 'rgb(152,226,166)' : (Number(this.data[0][0]) >= 90 && Number(this.data[0][0]) < 95) ? 'rgb(154,208,226)' : (Number(this.data[0][0]) >= 80 && Number(this.data[0][0]) < 90) ? 'rgb(247,230,133)' : (Number(this.data[0][0]) >= 70 && Number(this.data[0][0]) < 80) ? 'rgb(246,200,138)' : (Number(this.data[0][0]) < 70) ? 'rgb(255,142,116)' : '#dedede';
        const outerColor = Number(this.data[0][0]) >= 95 ? 'rgba(152,226,166,.2)' : (Number(this.data[0][0]) >= 90 && Number(this.data[0][0]) < 95) ? 'rgba(154,208,226,.2)' : (Number(this.data[0][0]) >= 80 && Number(this.data[0][0]) < 90) ? 'rgba(247,230,133,.2)' : (Number(this.data[0][0]) >= 70 && Number(this.data[0][0]) < 80) ? 'rgba(246,200,138,.2)' : (Number(this.data[0][0]) < 70) ? 'rgba(255,142,116,.2)' : '#dedede';
        const labelTop = {
            normal: {
                color: outerColor,
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
                    }
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: outerColor
            }
        };

        //中间显示
        const labelFormatter = {
            normal: {
                label: {
                    // formatter: function(params) {
                    //     return 100 - params.value
                    // },
                    position: 'center',
                    textStyle: {
                        baseline: 'bottom',
                        color: '#333',
                        fontFamily: 'Arial'
                    }
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: outerColor
            }
        };

        const labelBottom = {
            normal: {
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: 14,
                        color: '#fff',
                        fontFamily: '微软雅黑'
                    }
                },
                labelLine: {
                    show: false
                }

            }
        };

        //饼图的点击label
        const placeHolderStyle = {
            normal: {
                color: innerColor,
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: innerColor,
                labelLine: {
                    show: false
                }
            }
        };

        return {
            series: [
                {
                    type: 'pie',
                    radius: ['45', '50'],
                    itemStyle: labelFormatter,
                    minAngle: 0,
                    data: [
                        {
                            name: Number(this.data[0][0]) == 0 ? '0' : Number(this.data[0][0]),
                            value: 100,
                            itemStyle: labelTop
                        },
                        {
                            name: this.data[0][1],
                            value: 0,
                            itemStyle: labelBottom
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
                        itemStyle: placeHolderStyle
                    }]
                }
            ]
        };
    }
}

/**
 * 折线图
 */
export class LineBarGraphData extends AbstractNormalGraphData {
    private _calcSeries() {
        return this.data.map((row, index) => {
            return {name: this.header[index], type: 'line', data: this.data.map(row => row[index])}
        });
    }

    protected createChartOptions(): EchartOptions {
        if (!this.data || !this.data.length) return;

        const options: EchartOptions = {
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
                data: this.header
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
                    data: this._getLastData()
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: this._calcSeries()
        };
        options.title = this.title;
        return options;
    }
}

export class LineBarGraphDataByRow extends AbstractNormalGraphData {
    private _calcSeries(legendData: string[]) {
        return this.data.map((row, index) => {
            return {name: legendData[index], type: 'line', data: row.slice(0, row.length - 1)}
        });
    }

    protected createChartOptions(): EchartOptions {
        const legendData = this._getLastData();

        if (!this.data || !this.data.length) return;
        const options: EchartOptions = {
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
                data: legendData
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
                    data: this.header
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: this._calcSeries(legendData)
        };
        options.title = this.title;
        return options;
    }
}

/**
 * 条形图
 */
export class StripGraphData extends AbstractGraphData {

    protected _getBrowserInfo() {
        //只做了谷歌和火狐的兼容性
        var agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf("firefox") > 0) {
            return -10;
        } else {
            return -15;
        }
    }

    protected _getGridRight() {
        var gridRight = "" + this.data[0][0];
        return gridRight.length * 8
    }

    optionTemplate: EchartOptions = {
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
                data: this.header,
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
        if (!this.data || !this.data.length) return;
        const options = {...this.optionTemplate};
        options.grid.right = this._getGridRight();
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
                        position: ['100%', this._getBrowserInfo()],
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
        if (!this.data || !this.data.length) return;
        const options = {...this.optionTemplate};
        options.grid.right = this._getGridRight();
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
                        position: ['100%', this._getBrowserInfo()],
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
export class StripColorGraphData extends AbstractGraphData {
    protected createChartOptions(): any {
        if (!this.data || !this.data.length) return;

        let allData = [];
        let len = this.data[0].length;
        if (this.data[0].length) {
            for (let i = 0; i < len; i++) {
                allData[i] = {};
                allData[i].value = this.data[0][i];
                allData[i].itemStyle = {
                    normal: {
                        color: this.data[0][i] > 95 ? "#98e2a6" : this.data[0][i] > 90 ? "#9ad0e2" : this.data[0][i] > 80 ?
                            "#f7e685" : this.data[0][i] > 70 ? "#f6c88a" : "#ff8e74"
                    }
                }
            }
        }
        return {
            title: {
                text: '各市得分排名',
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
                    data: this.header
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
                    data: allData

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
                    data: [100 - Number(this.data[0][0]), 100 - Number(this.data[0][1]), 100 - Number(this.data[0][2]), 100 - Number(this.data[0][3]), 100 - Number(this.data[0][4]), 100 - Number(this.data[0][5])]
                }

            ]
        };

    }
}

/**
 * 堆叠区域图
 */
export class StackAreaGraphData extends AbstractGraphData {
    protected createChartOptions(): any {
        if (!this.data || !this.data.length) return;

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

/**
 * 仪表盘
 */
export class GaugeGraphData extends AbstractNormalGraphData {
    private _data: GraphDataMatrix;

    public get data(): any {
        return this._data;
    }

    public set data(value: any) {
        if (CommonUtils.isUndefined(value)) return;
        if (value instanceof Array) {
            if (value[0] instanceof Array) {
                this._data = value;
            } else {
                this._data = [value];
            }
        } else {
            this._data = [[value]]
        }
    }

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) return;

        return {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: this.data.map(row => ({value: row[0], name: row[1]}))
                }
            ]
        }
    }
}

/**
 * 散点图
 */
export class ScatterGraphData extends AbstractGraphData {
    public title: string;

    public data: any;

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) return;

        return {
            title: {
                text: this.title
            },
            xAxis: {},
            yAxis: {},
            series: [{
                symbolSize: 20,
                data: this.data,
                type: 'scatter'
            }]
        };
    }
}

/**
 * 雷达图
 */
export class RadarGraphData extends AbstractGraphData {

    public title: string;

    private _calcSeriesData() {
        return this.data.slice(0, this.data.length - 1).map(row => {
            return {
                value: row.slice(0, row.length - 1),
                name: row[row.length - 1]
            }
        })
    }

    private _calcLegendData() {
        return this.data.slice(0, this.data.length - 1).map(row => row[row.length - 1]);
    }

    private _calcRadar() {
        return this.header.slice(0, this.header.length - 1).map((h, i) => {
            return {name: h, max: this.data[this.data.length - 1][i]}
        })
    }

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) return;

        return {
            title: {
                left: 'left',
                text: this.title
            },
            tooltip: {},
            legend: {
                left: 'center',
                data: this._calcLegendData()
            },
            radar: {
                // shape: 'circle',
                indicator: this._calcRadar()
            },
            series: [{
                type: 'radar',
                data: this._calcSeriesData()
            }]
        };
    }
}

/**
 * K线图
 */
export class KLineGraphData extends AbstractGraphData {
    private _calcSeries(legendData: any[]) {
        return this.data.map((row, index) => {
            return {
                name: legendData[index],
                type: 'line',
                showAllSymbol: true,
                animation: true,
                smooth: false,
                symbolSize: [5, 5],
                hoverAnimation: false,
                data: row.slice(0, row.length - 1)
            }
        });
    }

    private _calcLegendData() {
        return this.data.map(row => row[row.length - 1]);
    }

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) return;

        const legendData = this._calcLegendData();

        const selectedLegend = legendData.reduce((s, legend, i) => {
            s[legend] = i < 3 ? true : false;
            return s;
        }, {});

        const sampleColors = ["#54acd5", "#f99660", "#a4bf6a", "#ec6d6d", "#f7b913", "#8ac9b6", "#bea5c8", "#01c5c2", "#a17660"];
        const vmaxColors = ['#41addc', '#bea5c8', '#85c56c', '#f99660', '#ffc20e', '#ec6d6d', '#8ac9b6', '#585eaa', '#b22c46', '#96582a'];
        const colors = vmaxColors;

        return {
            color: colors,
            tooltip: {
                trigger: 'axis',
                position: function (point) {// 固定在顶部
                    return [point[0] + 10, point[1]];
                }
            },
            legend: {
                left: 'center',
                data: legendData,
                itemWidth: 25,//设置icon长高
                itemHeight: 5,
                top: 20,
                inactiveColor: "#bbb",
                itemGap: 10,
                selected: selectedLegend
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
                    data: this.header.slice(0, this.header.length - 1)
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
            series: this._calcSeries(legendData)
        };
    }
}

/**
 * 箱线图
 */
export class BoxPlotGraphData extends AbstractGraphData {
    public title: string;

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) return;

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
        if (!this.data || !this.data.length) return;
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
        if (!this.data || !this.data.length) return;
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

/**
 * 漏斗图
 */
export class FunnelPlotGraphData extends AbstractGraphData {

    public title: string;

    private _calcLegendData() {
        return this.data.map(row => row[row.length - 1]).reverse();
    }

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) return;

        console.log(this._calcLegendData(), this.data.map(row => ({value: row[0], name: row[1]})));
        return {
            title: {
                text: this.title,
                left: 'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            legend: {
                left: 'center',
                data: this._calcLegendData()
            },
            calculable: true,
            series: [
                {
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
                        normal: {
                            show: true,
                            position: 'inside'
                        },
                        emphasis: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    },
                    data: this.data.map(row => ({value: row[0], name: row[1]}))
                }
            ]
        };
    }
}
