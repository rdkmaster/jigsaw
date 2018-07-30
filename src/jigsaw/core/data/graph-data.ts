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
}

/**
 * @internal
 */
export class OutlineMapData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class PieGraphData extends AbstractGraphData {
    constructor(title: string | EchartTitle, series: any[], tooltip?: EchartTooltip) {
        super();
        this._title = <EchartTitle>(typeof title === 'string' ? {title: title} : title);
        this._series = series;
        this._tooltip = tooltip;
    }

    private _series: any[];

    public get series(): any[] {
        return this._series;
    }

    public set series(value: any[]) {
        this._series = value;
        this.refresh();
    }

    private _title: EchartTitle;

    public get title(): string | EchartTitle {
        return this._title;
    }

    public set title(value: string | EchartTitle) {
        this._title = <EchartTitle>(typeof value === 'string' ? {title: value} : value);
        this.refresh();
    }

    private _tooltip: EchartTooltip;

    public get tooltip(): EchartTooltip {
        return this._tooltip;
    }

    public set tooltip(value: EchartTooltip) {
        this._tooltip = value;
        this.refresh();
    }

    protected createChartOptions(): EchartOptions {
        const opt: EchartOptions = {
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series: [
                {
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
        opt.title = this._title;
        if (this._tooltip) {
            opt.tooltip = this._tooltip;
        }
        opt.series[0].data = this._series;
        this._series.forEach(item => {
            if (!item.hasOwnProperty('name')) {
                item.name = 'no-name-series';
            }
            opt.legend.data.push(item.name);
        });
        return opt;
    }
}

export class PieGraphDataByColumn extends AbstractNormalGraphData {
    private _column: number = 0;

    public get column(): number {
        return this._column;
    }

    public set column(value: number) {
        this._column = value;
        this.refresh();
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
        if (!this.isDataValid(this, 'rowDescriptor', 'header')) {
            return undefined;
        }
        const opt: EchartOptions = this.optionsTemplate;
        opt.legend.data = this.rowDescriptor;
        opt.title = this.title;
        if (this.tooltip) {
            opt.tooltip = this.tooltip;
        }
        opt.series[0].name = this.header[this.column];
        this.data.forEach((row, index) => {
            const val = row[this.column];
            opt.series[0].data.push({value: val, name: this.rowDescriptor[index]});
        });
        return opt;
    }
}

export class PieGraphDataByRow extends PieGraphDataByColumn {
    private _row: number = 0;

    public get row(): number {
        return this._row;
    }

    public set row(value: number) {
        this._row = value;
        this.refresh();
    }

    protected createChartOptions(): EchartOptions {
        if (!this.isDataValid(this, 'rowDescriptor', 'header')) {
            return undefined;
        }
        const rowData = this.data[this.row];
        if (!rowData) {
            console.error('invalid data, row[%s] not found!', this.row);
            return undefined;
        }

        const opt: EchartOptions = this.optionsTemplate;
        opt.title = this.title;
        opt.legend.data = this.header;
        if (this.tooltip) {
            opt.tooltip = this.tooltip;
        }
        opt.series[0].name = this.rowDescriptor[this.row];

        rowData.forEach((val, index) => {
            opt.series[0].data.push({value: val, name: this.header[index]});
        });
        return opt;
    }
}

/**
 * 环形对比图
 */
export class DoughnutGraphData extends AbstractGraphData {
    public title: string;

    public series: {name: string, value: string | number}[];

    private _calcSeries() {
        if(!(this.data instanceof Array) || !this.data.length) return;
        this.series = this.data.map((row:any) => ({value: row[0], name: row[1]}));
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
        if(CommonUtils.isUndefined(value)) return;
        if(value instanceof Array) {
            if(value[0] instanceof Array) {
                this._data = value;
            }else {
                this._data = [value];
            }
        }else {
            this._data = [[value]]
        }
    }

    protected createChartOptions(): any {
        if(!(this.data instanceof Array) || !this.data.length || !(this.data[0]  instanceof Array)) return;

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
        if(CommonUtils.isUndefined(value)) return;
        if(value instanceof Array) {
            if(value[0] instanceof Array) {
                this._data = value;
            }else {
                this._data = [value];
            }
        }else {
            this._data = [[value]]
        }
    }

    protected createChartOptions(): any {
        if(!(this.data instanceof Array) || !this.data.length || !(this.data[0]  instanceof Array)) return;

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

export class LineBarGraphData extends AbstractNormalGraphData {
    protected getDataByColumn(index: number): any[] {
        const result: any[] = [];
        this.data.forEach(row => result.push(row[index]));
        return result;
    }

    protected createChartOptions(): EchartOptions {
        if (!this.isDataValid(this, 'header', 'rowDescriptor')) {
            return null;
        }

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
                    data: this.rowDescriptor
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: []
        };
        this.data.forEach((row, index) => {
            options.series.push({name: this.header[index], type: 'line', data: this.getDataByColumn(index)});
        });
        options.title = this.title;
        return options;
    }
}

export class LineBarGraphDataByRow extends AbstractNormalGraphData {
    protected createChartOptions(): EchartOptions {
        if (!this.isDataValid(this, 'header', 'rowDescriptor')) {
            console.error('invalid data, "need these properties: "data"/"rowDescriptor"/"header"');
            return null;
        }
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
                data: this.rowDescriptor
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
            series: []
        };
        this.data.forEach((row, index) => {
            options.series.push({name: this.rowDescriptor[index], type: 'line', data: row});
        });
        options.title = this.title;
        return options;
    }
}

/**
 * @internal
 */
export class GaugeGraphData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

/**
 * @internal
 */
export class ScatterGraphData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

/**
 * @internal
 */
export class RadarGraphData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

/**
 * @internal
 */
export class HeatGraphData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}
