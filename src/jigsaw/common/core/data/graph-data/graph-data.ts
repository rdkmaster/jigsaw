import {EchartLegend, EchartOptions, EchartTitle, EchartTooltip} from "../echart-types";
import {TableDataBase} from "../table-data";
import {CommonUtils} from "../../utils/common-utils";

export type GraphMatrixRow = (string | number)[];
export type GraphDataHeader = string[];
export type GraphDataField = string[];
export type GraphDataRowDescriptor = string[];
export type GraphDataMatrix = GraphMatrixRow[];

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
     *
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
    public template: EchartOptions;

    public get options(): EchartOptions {
        if (this.echartOptions) {
            return CommonUtils.extendObject(this.echartOptions, this.template || {});
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
        if (AbstractGraphData.isGraphData(data)) {
            this._fromObject(data);
        } else {
            console.log('invalid raw GraphData received from server...');
            this.clear();
            this.refresh();
            this.invokeChangeCallback();
        }
        this._busy = false;
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    public ajaxErrorHandler(error): void {
        super.ajaxErrorHandler(error);
        this.clear();
        this.refresh();
        this.invokeChangeCallback();
    }

    public fromObject(data: any): AbstractGraphData {
        return this._fromObject(data);
    }

    /**
     * @internal
     */
    public _fromObject(data: any): AbstractGraphData {
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
        this.invokeChangeCallback();

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
 * 这是一个通用的图形数据，提供给它一个`EchartsOptions`，它就可以渲染出对应的图了。
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

    /**
     * 用于通过type属性快速构建出对应的图形类型实例
     *
     * @param rawTableData
     *
     */
    // public static of(rawTableData: any): AbstractGraphData {
    //     if (!super.isGraphData(rawTableData) || !rawTableData.type) {
    //         return null;
    //     }
    //     let GraphDataType: Type<AbstractGraphData>;
    //     switch (rawTableData.type) {
    //         case 'OutlineMapData':
    //             GraphDataType = OutlineMapData;
    //             break;
    //         case 'PieGraphData':
    //             GraphDataType = PieGraphData;
    //             break;
    //         case 'PieGraphDataByRow':
    //             GraphDataType = PieGraphDataByRow;
    //             break;
    //         case 'DoughnutGraphData':
    //             GraphDataType = DoughnutGraphData;
    //             break;
    //         case 'DoughnutRateGraphData':
    //             GraphDataType = DoughnutRateGraphData;
    //             break;
    //         case 'DoughnutScoreGraphData':
    //             GraphDataType = DoughnutScoreGraphData;
    //             break;
    //         case 'LineGraphData':
    //             GraphDataType = LineGraphData;
    //             break;
    //         case 'LineGraphDataByRow':
    //             GraphDataType = LineGraphDataByRow;
    //             break;
    //         case 'LineBarGraphData':
    //             GraphDataType = LineBarGraphData;
    //             break;
    //         case 'BarGraphData':
    //             GraphDataType = BarGraphData;
    //             break;
    //         case 'BarGraphDataByRow':
    //             GraphDataType = BarGraphDataByRow;
    //             break;
    //         case 'StripGraphData':
    //             GraphDataType = StripGraphData;
    //             break;
    //         case 'StripSequenceGraphData':
    //             GraphDataType = StripSequenceGraphData;
    //             break;
    //         case 'StripColorGraphData':
    //             GraphDataType = StripColorGraphData;
    //             break;
    //         case 'StackedAreaGraphData':
    //             GraphDataType = StackedAreaGraphData;
    //             break;
    //         case 'GaugeGraphData':
    //             GraphDataType = GaugeGraphData;
    //             break;
    //         case 'ScatterGraphData':
    //             GraphDataType = ScatterGraphData;
    //             break;
    //         case 'RadarGraphData':
    //             GraphDataType = RadarGraphData;
    //             break;
    //         case 'KLineGraphData':
    //             GraphDataType = KLineGraphData;
    //             break;
    //         case 'BoxPlotGraphData':
    //             GraphDataType = BoxPlotGraphData;
    //             break;
    //         case 'HeatGraphData':
    //             GraphDataType = HeatGraphData;
    //             break;
    //         case 'RelationalGraphData':
    //             GraphDataType = RelationalGraphData;
    //             break;
    //         case 'FunnelPlotGraphData':
    //             GraphDataType = FunnelPlotGraphData;
    //             break;
    //     }
    //     return GraphDataType ? this._createGraphData(GraphDataType, rawTableData) : null;
    // }

    // private static _createGraphData<T extends AbstractGraphData>(ClassName: Type<T>, rawData): T {
    //     const gd = new ClassName();
    //     if (rawData.hasOwnProperty('header')) {
    //         gd.header = rawData.header;
    //     }
    //     if (rawData.hasOwnProperty('data')) {
    //         gd.data = rawData.data;
    //     }
    //     if (rawData.hasOwnProperty('rowDescriptor')) {
    //         gd.rowDescriptor = rawData.rowDescriptor;
    //     }
    //     return gd;
    // }
}

export abstract class AbstractNormalGraphData extends AbstractGraphData {
    public title: EchartTitle | string;
    public legend: EchartLegend;
    public tooltip: EchartTooltip;

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

    protected _extendOption(option: EchartOptions) {
        if (typeof this.title == 'string') {
            option.title.text = this.title;
        } else if (this.title) {
            option.title = this.title;
        }

        if (this.tooltip) {
            option.tooltip = this.tooltip;
        }
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
 * 仪表盘
 */
export class GaugeGraphData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        if (!this.data || !this.data.length) return;

        return {
            tooltip: {
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
                    detail: {formatter: '{value}%'},
                    data: this.data.map(row => ({value: row[0], name: this.rowDescriptor[0]}))
                }
            ]
        }
    }
}

/**
 * 散点图
 */
export class ScatterGraphData extends AbstractNormalGraphData {
    protected optionsTemplate: EchartOptions = {
        title: {
            text: ''
        },
        xAxis: {},
        yAxis: {},
        series: [{
            symbolSize: 20,
            data: [],
            type: 'scatter'
        }]
    };

    protected createChartOptions(): EchartOptions {
        if (!this.data || !this.data.length) return;
        const opt = {...this.optionsTemplate};
        this._extendOption(opt);
        opt.series[0].data = this.data;
        return opt;
    }
}

/**
 * 雷达图
 */
export class RadarGraphData extends AbstractNormalGraphData {
    protected createSeries() {
        return this.data.slice(0, this.data.length - 1).map((row, i) => {
            return {
                value: row,
                name: this.rowDescriptor[i]
            }
        })
    }

    private _calcRadar() {
        return this.header.map((h, i) => {
            return {name: h, max: this.data[this.data.length - 1][i]}
        })
    }

    protected optionsTemplate: EchartOptions = {
        title: {
            left: 'left',
            text: ''
        },
        tooltip: {},
        legend: {
            left: 'center',
            data: []
        },
        radar: {
            // shape: 'circle',
            indicator: []
        },
        series: [{
            type: 'radar',
            data: []
        }]
    };

    protected createChartOptions(): any {
        if (!this.data || !this.data.length) return;
        const opt = {...this.optionsTemplate};
        this._extendOption(opt);
        opt.legend.data = this.rowDescriptor;
        opt.radar.indicator = this._calcRadar();
        opt.series[0].data = this.createSeries();
        return opt;
    }
}
