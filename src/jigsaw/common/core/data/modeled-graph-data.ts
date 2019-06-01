import {TableDataBase} from "./table-data";
import {
    EchartLegend,
    EchartOptions,
    EchartSeriesItem,
    EchartTitle,
    EchartToolbox,
    EchartTooltip,
    EchartXAxis,
    EchartYAxis
} from "./echart-types";
import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {aggregate, AggregateAlgorithm, distinct, flat, getColumn, group, Grouped} from "../utils/data-collection-utils";
import {CommonUtils} from "../utils/common-utils";
import {lightGraphTheme, darkGraphTheme} from "../theming/echarts-theme";

export abstract class AbstractModeledGraphTemplate {
    public abstract getInstance(): EchartOptions;

    public themes? = [
        {name: '默认浅色系', theme: lightGraphTheme},
        {name: '默认深色系', theme: darkGraphTheme}
    ];
    public title?: EchartTitle;
    public tooltip?: EchartTooltip;
    public toolbox?: EchartToolbox;
    public legend?: EchartLegend;
}

export abstract class AbstractModeledGraphData extends TableDataBase {
    protected abstract createChartOptions(): EchartOptions;

    /**
     * 图形的数据，二维数组。
     */
    public data: GraphDataMatrix;
    /**
     * 图形的列字段描述。
     */
    public header: GraphDataHeader;
    /**
     * 图形的列字段。
     */
    public field: GraphDataField;
    /**
     * 一个适合输入给 echarts 的参数，由本类的子类自动构建出来
     */
    public options: EchartOptions;
    /**
     * 图形个关键配置项的模板
     */
    public template: AbstractModeledGraphTemplate;

    protected constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, field, header);
        this.data = data;
        this.field = field;
        this.header = header;
    }

    public getIndex(field: string): number {
        if (CommonUtils.isUndefined(field)) {
            return -1;
        }
        let idx = this.field.indexOf(field);
        return idx == -1 ? this.header.indexOf(field) : idx;
    }

    protected getRealDimensions(dimField: string, dimensions: Dimension[], usingAllDimensions: boolean): Dimension[] {
        const dims = [];
        const dimIndex = this.getIndex(dimField);
        if (dimIndex == -1) {
            return dims;
        }
        if (usingAllDimensions) {
            const series = distinct(getColumn(this.data, dimIndex));
            if (series) {
                dims.push(...series.map(s => {
                    const d = dimensions.find(d => d.name === s);
                    return d ? d : new Dimension(s);
                }));
            }
        } else {
            dims.push(...dimensions);
        }
        return dims;
    }

    protected pruneData(records: (string | number)[][], dimIndex: number, dimensions: Dimension[], indicators: Indicator[]): string[][] {
        const aggregateBy = indicators.map(kpi => ({index: kpi.index, algorithm: kpi.aggregateBy}));
        const dimGroups = group(records, dimIndex);
        const pruned: string[][] = [];
        dimensions.forEach(dim => {
            const dimRecords = dimGroups[dim.name];
            if (dimRecords) {
                pruned.push(dimRecords.length > 1 ? aggregate(dimRecords, aggregateBy) : dimRecords[0]);
            } else {
                const row = [];
                row[dimIndex] = dim.name;
                indicators.forEach(i => row[i.index] = i.defaultValue);
                pruned.push(row);
            }
        });
        return pruned;
    }
}

export class Dimension {
    public name?: string;
    public yAxisIndex?: 0 | 1 = 0;
    public stack?: string;
    public shade?: 'bar' | 'line' | 'area' = 'bar';
    public barWidth?: any;

    constructor(name?: string) {
        this.name = name;
    }
}

export class Indicator {
    public name?: string;
    public field?: string;
    public index?: number = -1;
    public yAxisIndex?: 0 | 1 = 0;
    public stack?: string = undefined;
    public shade?: 'bar' | 'line' | 'area' = 'bar';
    public defaultValue?: number = 0;
    public aggregateBy?: AggregateAlgorithm = 'sum';
    public barWidth?: any;

    constructor(field?: string) {
        this.field = field;
    }
}

// ------------------------------------------------------------------------------------------------
// 直角系图相关数据对象

export abstract class ModeledRectangularTemplate extends AbstractModeledGraphTemplate {
    xAxis?: EchartXAxis;
    yAxis1?: EchartYAxis;
    yAxis2?: EchartYAxis;
    seriesItem?: EchartSeriesItem;
}

export class BasicModeledRectangularTemplate extends ModeledRectangularTemplate {
    getInstance(): EchartOptions {
        return {
            title: CommonUtils.extendObjects<EchartTooltip>({}, this.title),
            tooltip: CommonUtils.extendObjects<EchartTooltip>({}, this.tooltip),
            legend: CommonUtils.extendObjects<EchartLegend>({}, this.legend),
        };
    }

    title = {
        x: 'center',
        textStyle: {},
        subtextStyle: {}
    };

    tooltip = {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    };

    toolbox = {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    };

    legend = {
        data: null
    };

    xAxis = {
        type: 'category',
        axisPointer: {
            type: 'shadow'
        }
    };

    yAxis1 = {
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        }
    };

    yAxis2 = {
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        }
    };

    seriesItem = {
        type: 'bar', data: null
    };
}

export class ModeledRectangularGraphData extends AbstractModeledGraphData {
    public template: ModeledRectangularTemplate = new BasicModeledRectangularTemplate();

    public xAxis: { field?: string, style?: EchartXAxis } = {};
    public yAxis1: EchartYAxis = {position: 'left'};
    public yAxis2: EchartYAxis = {position: 'right'};
    public dimensionField: string;
    public dimensions: Dimension[] = [];
    public usingAllDimensions: boolean = true;
    public indicators: Indicator[] = [];

    constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, header, field);
    }

    private _options: EchartOptions;

    get options(): EchartOptions {
        if (!this._options) {
            this._options = this.createChartOptions();
        }
        return this._options;
    }

    protected createChartOptions(): EchartOptions {
        if (!this.dimensionField || !this.xAxis || !this.xAxis.field) {
            return undefined;
        }
        if (!this.indicators || this.indicators.length == 0) {
            return undefined;
        }
        if (!this.usingAllDimensions && (!this.dimensions || this.dimensions.length == 0)) {
            return undefined;
        }

        this.indicators.forEach(kpi => kpi.index = this.getIndex(kpi.field));
        const dimensions = this.getRealDimensions(this.dimensionField, this.dimensions, this.usingAllDimensions);
        return dimensions.length > 1 ? this.createMultiDimensionOptions(dimensions) :
            this.createMultiKPIOptions(dimensions[0]);
    }

    /**
     * 单指标多维度
     */
    protected createMultiDimensionOptions(dimensions: Dimension[]): EchartOptions {
        if (dimensions.length == 0) {
            return undefined;
        }
        const xAxisIndex = this.getIndex(this.xAxis.field);
        if (xAxisIndex == -1) {
            return undefined;
        }
        const xAxisItems = distinct(getColumn(this.data, xAxisIndex));
        if (!xAxisItems || xAxisItems.length == 0) {
            return undefined
        }

        const options: EchartOptions = this.template.getInstance();
        options.xAxis = [
            CommonUtils.extendObjects<EchartXAxis>({}, this.template.xAxis, this.xAxis.style)
        ];
        options.yAxis = [
            CommonUtils.extendObjects<EchartYAxis>({}, this.template.yAxis1, this.yAxis1),
            CommonUtils.extendObjects<EchartYAxis>({}, this.template.yAxis2, this.yAxis2)
        ];
        if (options.legend) {
            options.legend.data = dimensions.map(d => d.name);
        }
        options.xAxis[0].data = xAxisItems;

        const dimIndex = this.getIndex(this.dimensionField);
        const pruned = this.pruneAllData(xAxisIndex, dimIndex, dimensions);
        const groupedByDim = group(flat(pruned), dimIndex);
        options.series = groupedByDim._$groupItems
            .map(dimName => ({data: getColumn(groupedByDim[dimName], this.indicators[0].index), name: dimName}))
            .map(seriesData => {
                CommonUtils.extendObjects<EchartSeriesItem>(seriesData, this.template.seriesItem);
                const dim = this.dimensions.find(dim => dim.name == seriesData.name);
                if (dim) {
                    if (dim.shade == 'area') {
                        // 面积图
                        seriesData['type'] = 'line';
                        seriesData['areaStyle'] = {};
                    } else {
                        seriesData['type'] = dim.shade;
                    }
                    seriesData['yAxisIndex'] = dim.yAxisIndex;
                    seriesData['stack'] = dim.stack;
                    seriesData['barWidth'] = dim.barWidth;
                }
                return seriesData;
            });

        return options;
    }

    /**
     * 确保给定的数据中，每一个给定的维度，都有且只有一个记录，缺少的记录用默认值补齐，多出的记录删除， 重复的记录用聚集算法聚集，
     * 并且要保证每组中的维度顺序一致。
     *
     * @param xAxisIndex
     * @param dimIndex
     * @param dimensions
     */
    protected pruneAllData(xAxisIndex: number, dimIndex: number, dimensions: Dimension[]): Grouped {
        const aggregateBy = this.indicators.map(kpi => ({index: kpi.index, algorithm: kpi.aggregateBy}));
        const groups = group(this.data, xAxisIndex);
        for (let xAxisItem in groups) {
            const records: string[][] = groups[xAxisItem];
            if (records === groups._$groupItems) {
                continue;
            }
            const pruned = this.pruneData(records, dimIndex, dimensions, this.indicators);
            pruned.forEach(row => row[xAxisIndex] = xAxisItem);
            groups[xAxisItem] = pruned;
        }
        return groups;
    }

    protected createMultiKPIOptions(dim: Dimension): EchartOptions {
        if (!dim) {
            return undefined;
        }
        const xAxisIndex = this.getIndex(this.xAxis.field);
        if (xAxisIndex == -1) {
            return undefined;
        }
        const dimIndex = this.getIndex(this.dimensionField);
        if (dimIndex == -1) {
            return undefined;
        }
        const xAxisGroups = group(this.data, xAxisIndex);
        const pruned: string[][] = [];
        for (let xAxisItem in xAxisGroups) {
            const records: string[][] = xAxisGroups[xAxisItem];
            if (records === xAxisGroups._$groupItems) {
                continue;
            }
            const prunedRecords = records.filter(r => r[dimIndex] == dim.name);
            if (prunedRecords.length == 1) {
                pruned.push(prunedRecords[0]);
            } else if (prunedRecords.length > 1) {
                const by = this.indicators.map(kpi => ({index: kpi.index, algorithm: kpi.aggregateBy}));
                pruned.push(aggregate(prunedRecords, by));
            } else {
                const row = [];
                row[xAxisIndex] = xAxisItem;
                row[dimIndex] = dim.name;
                this.indicators.forEach(i => row[i.index] = i.defaultValue);
                pruned.push(row);
            }
        }

        const options: EchartOptions = this.template.getInstance();
        options.xAxis = [
            CommonUtils.extendObjects<EchartXAxis>({}, this.template.xAxis, this.xAxis.style)
        ];
        options.yAxis = [
            CommonUtils.extendObjects<EchartYAxis>({}, this.template.yAxis1, this.yAxis1),
            CommonUtils.extendObjects<EchartYAxis>({}, this.template.yAxis2, this.yAxis2)
        ];

        if (options.legend) {
            options.legend.data = this.indicators.map(kpi => this.header[kpi.index]);
        }
        options.xAxis[0].data = xAxisGroups._$groupItems;
        options.series = this.indicators
            .map(kpi => ({name: this.header[kpi.index], field: this.field[kpi.index], data: getColumn(pruned, kpi.index)}))
            .map(seriesData => {
                // 先取模板中的配置
                CommonUtils.extendObjects<EchartSeriesItem>(seriesData, this.template.seriesItem);
                // 再取用户配置
                const indicator = this.indicators.find(indicator => indicator.field == seriesData.field);
                if (indicator) {
                    if (indicator.shade == 'area') {
                        // 面积图
                        seriesData['type'] = 'line';
                        seriesData['areaStyle'] = {};
                    } else {
                        seriesData['type'] = indicator.shade;
                    }
                    seriesData['yAxisIndex'] = indicator.yAxisIndex;
                    seriesData['stack'] = indicator.stack;
                    seriesData['barWidth'] = indicator.barWidth;
                }
                return seriesData;
            });

        return options;
    }

    public refresh(): void {
        this._options = undefined;
        super.refresh();
    }
}

// ------------------------------------------------------------------------------------------------
// 饼图相关数据对象

export class PieSeries {
    public dimensionField: string;
    public dimensions: Dimension[] = [];
    public usingAllDimensions: boolean = true;
    public indicators: Indicator[] = [];
    public radius: number[];
    public center: number[];
    public name?: string;

    constructor(name?: string) {
        this.name = name;
    }
}

export abstract class ModeledPieTemplate extends AbstractModeledGraphTemplate {
    seriesItem?: EchartSeriesItem;
}

export class BasicModeledPieTemplate extends ModeledRectangularTemplate {
    getInstance(): EchartOptions {
        return {
            title: CommonUtils.extendObjects<EchartTitle>({}, this.title),
            tooltip: CommonUtils.extendObjects<EchartTooltip>({}, this.tooltip),
            legend: CommonUtils.extendObjects<EchartLegend>({}, this.legend),
        };
    }

    title = {
        x: 'center',
        textStyle: {},
        subtextStyle: {}
    };

    tooltip = {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    };

    legend = {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: null
    };

    seriesItem = {
        type: 'pie', data: null, name: '', radius: ['0%', '80%'],
        center: ['50%', '50%'],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    };
}

export class ModeledPieGraphData extends AbstractModeledGraphData {
    constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, header, field);
    }

    public template: ModeledPieTemplate = new BasicModeledPieTemplate();
    public series: PieSeries[];
    private _options: EchartOptions;

    get options(): EchartOptions {
        if (!this._options) {
            this._options = this.createChartOptions();
        }
        return this._options;
    }

    protected createChartOptions(): EchartOptions {
        if (!this.series) {
            return undefined;
        }
        const options = this.template.getInstance();
        if (options.legend) {
            options.legend.data = [];
        }
        options.series = this.series
            .filter(seriesData => {
                if (!seriesData.dimensionField) {
                    return false;
                }
                if (!seriesData.indicators || seriesData.indicators.length == 0) {
                    return false;
                }
                return seriesData.usingAllDimensions || (seriesData.dimensions && seriesData.dimensions.length > 0);
            })
            .map((seriesData, idx) => {
                const dimensions = this.getRealDimensions(seriesData.dimensionField, seriesData.dimensions, seriesData.usingAllDimensions);
                const dimIndex = this.getIndex(seriesData.dimensionField);
                seriesData.indicators.forEach(kpi => kpi.index = this.getIndex(kpi.field));
                seriesData.indicators.forEach(kpi => kpi.name = kpi.name ? kpi.name : this.header[kpi.index]);

                const seriesItem = CommonUtils.extendObjects<EchartSeriesItem>({}, this.template.seriesItem);
                if (dimensions.length > 1) {
                    // 多维度
                    this._mergeLegend(options.legend, dimensions);
                    let records;
                    if (seriesData.usingAllDimensions) {
                        records = this.data;
                    } else {
                        records = this.data.filter(row => dimensions.find(d => d.name == row[dimIndex]));
                    }
                    const kpiIndex = seriesData.indicators[0].index;
                    records = records.map(row => [row[dimIndex], row[kpiIndex]]);
                    const indicator: Indicator = CommonUtils.deepCopy(seriesData.indicators[0]);
                    indicator.index = 1;
                    seriesItem.data = this.pruneData(records, 0, dimensions, [indicator])
                        .map(row => ({name: row[0], value: row[1]}));
                } else {
                    // 多指标
                    this._mergeLegend(options.legend, seriesData.indicators);
                    const dim = dimensions[0].name;
                    const records = this.data.filter(row => row[dimIndex] == dim);
                    const pruned = this.pruneData(records, dimIndex, dimensions, seriesData.indicators)[0];
                    seriesItem.data = seriesData.indicators.map(i => ({name: i.name, value: pruned[i.index]}));
                }

                seriesItem.name = seriesData.name ? seriesData.name : 'series' + idx;
                seriesItem.radius = seriesData.radius.map(r => r + '%');
                seriesItem.center = seriesData.center.map(r => r + '%');
                return seriesItem;
            });

        return options;
    }

    private _mergeLegend(legendObject: EchartLegend, candidates: (Indicator | Dimension)[]): void {
        if (!legendObject) {
            return;
        }
        const names = candidates.map(can => can.name);
        legendObject.data.push(...names.filter(legend => legendObject.data.indexOf(legend) == -1));
    }

    public refresh(): void {
        this._options = undefined;
        super.refresh();
    }
}


// ------------------------------------------------------------------------------------------------
// 仪表盘相关数据对象

export class GaugeSeries {
    public dimensionField: string;
    public dimensions: Dimension[] = [new Dimension('')];
    public usingAllDimensions: boolean = false;
    public indicators: Indicator[] = [];
    public model?: any[];
    public more?: any;

    public name?: string;
    public center?: number[] = [50, 50];
    public radius?: number = 75;
    public startAngle?: number = 225;
    public endAngle?: number = -45;
    public min?: number = 0;
    public max?: number = 100;
    public detail?: any = {formatter: '{value}%'};

    public splitNumber?: number;
    public axisLine?: any;
    public axisTick?: any;
    public axisLabel?: any;
    public splitLine?: any;
    public pointer?: any;
    public title?: any;

    constructor(name?: string) {
        this.name = name;
    }
}

export class BasicModeledGaugeTemplate extends ModeledRectangularTemplate {
    getInstance(): EchartOptions {
        return {
            tooltip: CommonUtils.extendObjects<EchartTooltip>({}, this.tooltip),
            toolbox: CommonUtils.extendObjects<EchartTitle>({}, this.toolbox),
        };
    }

    tooltip = {
        formatter: "{a} <br/>{b} : {c}%"
    };

    toolbox = {
        show: false,
        feature: {
            restore: {show: true},
            saveAsImage: {show: true}
        }
    };

    seriesItem = {
        name: '',
        type: 'gauge',
        center: ['50%', '50%'],
        radius: '75%',
        startAngle: 225,
        endAngle: -45,
        min: 0,
        max: 100,
        detail: {formatter: '{value}%'},
        data: null
    };
}

export class ModeledGaugeGraphData extends AbstractModeledGraphData {
    constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, header, field);
    }

    public template: ModeledPieTemplate = new BasicModeledGaugeTemplate();
    public series: GaugeSeries[];
    public title: EchartTitle;
    private _options: EchartOptions;

    get options(): EchartOptions {
        if (!this._options) {
            this._options = this.createChartOptions();
        }
        return this._options;
    }

    protected createChartOptions(): EchartOptions {
        if (!this.series || !this.field.length || !this.header.length || !this.data.length) {
            return undefined;
        }
        const options = this.template.getInstance();
        options.series = this.series
            .filter(seriesData => {
                if (!seriesData.dimensionField) {
                    return false;
                }
                if (!seriesData.indicators || seriesData.indicators.length == 0) {
                    return false;
                }
                return seriesData.usingAllDimensions || (seriesData.dimensions && seriesData.dimensions.length > 0);
            })
            .map((seriesData, idx) => {
                const dimensions = this.getRealDimensions(seriesData.dimensionField, seriesData.dimensions, seriesData.usingAllDimensions);
                const dimIndex = this.getIndex(seriesData.dimensionField);
                seriesData.indicators.forEach(kpi => kpi.index = this.getIndex(kpi.field));
                seriesData.indicators.forEach(kpi => kpi.name = kpi.name ? kpi.name : this.header[kpi.index]);

                const seriesItem = CommonUtils.extendObjects<EchartSeriesItem>({}, this.template.seriesItem, seriesData);

                if (dimensions.length > 1) {
                    // 多维度
                    let records;
                    if (seriesData.usingAllDimensions) {
                        records = this.data;
                    } else {
                        records = this.data.filter(row => dimensions.find(d => d.name == row[dimIndex]));
                    }
                    const kpiIndex = seriesData.indicators[0].index;
                    records = records.map(row => [row[dimIndex], row[kpiIndex]]);
                    const indicator: Indicator = CommonUtils.deepCopy(seriesData.indicators[0]);
                    indicator.index = 1;
                    seriesItem.data = this.pruneData(records, 0, dimensions, [indicator])
                        .map(row => ({name: indicator.name, value: row[1]}));
                } else {
                    // 多指标
                    const dim = dimensions[0].name;
                    const records = this.data.filter(row => row[dimIndex] == dim);
                    const pruned = this.pruneData(records, dimIndex, dimensions, seriesData.indicators)[0];
                    seriesItem.data = seriesData.indicators.map(i => ({name: i.name, value: pruned[i.index]}));
                }

                seriesItem.name = seriesData.name ? seriesData.name : 'series' + idx;
                if (seriesData.radius) {
                    seriesItem.radius = seriesData.radius + '%';
                }
                if (seriesData.center) {
                    seriesItem.center = seriesData.center.map(r => r + '%');
                }

                let extendParam = ['startAngle', 'endAngle', 'min', 'max', 'splitNumber', 'axisLine', 'axisTick', 'axisLabel', 'splitLine', 'pointer', 'title', 'detail'];

                extendParam.forEach(param => {
                    if (CommonUtils.isDefined(seriesData[param])) {
                        seriesItem[param] = seriesData[param];
                    }
                });

                return seriesItem;
            });

        return options;
    }

    protected pruneData(records: (string|number)[][], dimIndex: number, dimensions: Dimension[], indicators: Indicator[]): string[][] {
        const aggregateBy = indicators.map(kpi => ({index: kpi.index, algorithm: kpi.aggregateBy}));
        const pruned: string[][] = [aggregate(<any>records, aggregateBy)];
        return pruned;
    }

    public refresh(): void {
        this._options = undefined;
        super.refresh();
    }
}

// ------------------------------------------------------------------------------------------------
// 雷达图相关数据对象

export class RadarSeries {
    public name: string;
    public type: string = 'radar';
    public data: any[];
    public areaStyle: any;

    constructor(name?: string) {
        this.name = name;
    }
}

export class RadarItem {
    public indicator: RadarIndicator[] = [];
    public radius: any;
    public center: any[];
}

export class RadarIndicator extends Indicator {
    public max?: number;
    public min?: number;
    public color?: string;
}

export class RadarDimension extends Dimension {
    public area: boolean; // 是否填充
}

export abstract class ModeledRadarTemplate extends AbstractModeledGraphTemplate {
    radarItem?: RadarItem;
    seriesItem?: EchartSeriesItem;
}

export class BasicModeledRadarTemplate extends ModeledRadarTemplate {
    getInstance(): EchartOptions {
        return {
            title: CommonUtils.extendObjects<EchartTooltip>({}, this.title),
            tooltip: CommonUtils.extendObjects<EchartTooltip>({}, this.tooltip),
            legend: CommonUtils.extendObjects<EchartLegend>({}, this.legend),
            radar: CommonUtils.extendObjects<EchartLegend>({}, this.radarItem),
        };
    }

    title = {
        x: 'center',
        textStyle: {},
        subtextStyle: {}
    };

    tooltip = {};

    legend = {
        data: null
    };

    radarItem: RadarItem = {
        radius: '60%', //radius 在awade中给数组，不识别
        center: ['50%', '50%'],
        indicator: []
    };

    seriesItem: RadarSeries = {
        type: 'radar', data: null, name: '', areaStyle: null
    };
}

export class ModeledRadarGraphData extends AbstractModeledGraphData {
    public template: ModeledRadarTemplate = new BasicModeledRadarTemplate();

    public dimensionField: string;
    public usingAllDimensions: boolean = true;
    public dimensions: RadarDimension[] = [];
    public indicators: RadarIndicator[] = [];

    constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, header, field);
    }

    private _options: EchartOptions;

    get options(): EchartOptions {
        if (!this._options) {
            this._options = this.createChartOptions();
        }
        return this._options;
    }

    protected createChartOptions(): EchartOptions {
        if (!this.dimensionField) {
            return undefined;
        }
        if (!this.indicators || this.indicators.length == 0) {
            return undefined;
        }
        if (!this.usingAllDimensions && (!this.dimensions || this.dimensions.length == 0)) {
            return undefined;
        }
        const dimIndex = this.getIndex(this.dimensionField);
        if (dimIndex == -1) {
            return undefined;
        }

        const options = this.template.getInstance();

        this.indicators.forEach(kpi => kpi.index = this.getIndex(kpi.field));
        const dimensions = this.getRealDimensions(this.dimensionField, this.dimensions, this.usingAllDimensions);
        if (options.legend) {
            options.legend.data = dimensions.map(d => d.name);
        }
        let radarItem = this.template.radarItem;
        radarItem.indicator = this.indicators.map((indicator: RadarIndicator) => {
            return {
                name: indicator.name,
                max: indicator.max,
                min: indicator.min ? indicator.min : 0,
                color: indicator.color
            }
        });
        options.radar = radarItem;

        let series = this.template.seriesItem;
        series.data = dimensions.map((dimension: RadarDimension) => {
            const records = this.data.filter(row => row[dimIndex] == dimension.name);
            const pruned = this.pruneData(records, dimIndex, [dimension], this.indicators)[0];
            return {
                name: dimension.name,
                value: this.indicators.map(i => pruned[i.index]),
                areaStyle: dimension.area ? {} : null
            };
        });
        options.series = [series];

        return options;
    }

    public refresh(): void {
        this._options = undefined;
        super.refresh();
    }
}


// ------------------------------------------------------------------------------------------------
// 散点图相关数据对象
export abstract class ModeledScatterTemplate extends AbstractModeledGraphTemplate {
    xAxis?: EchartXAxis;
    yAxis?: EchartYAxis;
    seriesItem?: EchartSeriesItem;
}

export class BasicModeledScatterTemplate extends ModeledScatterTemplate {
    getInstance(): EchartOptions {
        return {
            title: CommonUtils.extendObjects<EchartTooltip>({}, this.title),
            tooltip: CommonUtils.extendObjects<EchartTooltip>({}, this.tooltip),
            legend: CommonUtils.extendObjects<EchartLegend>({}, this.legend),
        };
    }

    title = {
        x: 'center',
        textStyle: {},
        subtextStyle: {}
    };

    tooltip = {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    };

    toolbox = {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    };

    legend = {
        data: null
    };

    seriesItem = {
        type: 'scatter', data: null, symbolSize: 20
    };
}

export class ModeledScatterGraphData extends AbstractModeledGraphData {
    public template: ModeledRectangularTemplate = new BasicModeledScatterTemplate();

    public xAxis: EchartXAxis = {};
    public yAxis: EchartYAxis = {};
    public xAxisKpiField: {name: string, field: string};
    public yAxisKpiField: {name: string, field: string};
    public dimensionField: string;
    public dimensions: Dimension[] = [];
    public usingAllDimensions: boolean = true;

    constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, header, field);
    }

    private _options: EchartOptions;

    get options(): EchartOptions {
        if (!this._options) {
            this._options = this.createChartOptions();
        }
        return this._options;
    }

    protected createChartOptions(): EchartOptions {
        if (!this.xAxisKpiField || !this.yAxisKpiField) {
            return undefined;
        }

        let [xAxisKpiIndex, yAxisKpiIndex] = [this.getIndex(this.xAxisKpiField.field), this.getIndex(this.yAxisKpiField.field)];

        if(xAxisKpiIndex == -1 || yAxisKpiIndex == -1) {
            return undefined;
        }

        const options = this.template.getInstance();

        if (options.legend) {
            options.legend.data = [];
        }

        options.xAxis = this.xAxis;
        options.yAxis = this.yAxis;

        const dimensions = this.getRealDimensions(this.dimensionField, this.dimensions, this.usingAllDimensions);
        const dimIndex = this.getIndex(this.dimensionField);
        this._mergeLegend(options.legend, dimensions);

        options.series = dimensions.map((dim, idx) => {
            const seriesItem = CommonUtils.extendObjects<EchartSeriesItem>({}, this.template.seriesItem);
            seriesItem.data = this.data.filter(row => row[dimIndex] == dim.name)
                .map(row => {
                return [
                    row[xAxisKpiIndex],
                    row[yAxisKpiIndex]
                ]
            });
            seriesItem.name = dim.name ? dim.name : 'series' + idx;
            return seriesItem;
        });

        return options;
    }

    private _mergeLegend(legendObject: EchartLegend, candidates: (Indicator | Dimension)[]): void {
        if (!legendObject) {
            return;
        }
        const names = candidates.map(can => can.name);
        legendObject.data.push(...names.filter(legend => legendObject.data.indexOf(legend) == -1));
    }


    public refresh(): void {
        this._options = undefined;
        super.refresh();
    }
}
