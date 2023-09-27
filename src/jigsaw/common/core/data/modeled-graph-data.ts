import { Type } from "@angular/core";
import {TableDataBase} from "./table-data";
import {
    EchartLegend,
    EchartOptions,
    EchartSeriesItem,
    EchartTitle,
    EchartXAxis,
    EchartYAxis
} from "./echart-types";
import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {aggregate, AggregateAlgorithm, distinct, flat, group, Grouped} from "../utils/data-collection-utils";
import {CommonUtils} from "../utils/common-utils";
import {getColumn} from "./unified-paging/paging";

export type GraphType = 'rectangular' | 'pie' | 'gauge' | 'radar' | 'scatter' | 'map';

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
    public template: CustomModeledGraphTemplate;

    public type: GraphType;

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

    protected getRealDimensions(dimField: string, dimensions: Dimension[], usingAllDimensions: boolean, DimType: Type<Dimension> = Dimension): Dimension[] {
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
                    return d ? d : new DimType(s);
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

export class CustomModeledGraphTemplate {
    public option: EchartOptions;
    public optionPatch?: EchartOptions;
    public seriesItem?: EchartSeriesItem;

    public getInstance():EchartOptions {
        return CommonUtils.extendObjects<EchartOptions>({}, this.option)
    }
}

class DimKpiBase {
    public name?: string;
    public stack?: string;
    public color?: string;
    public shade?: 'bar' | 'line' | 'area' = 'bar';
    public barWidth?: any;
    public yAxisIndex?: 0 | 1 = 0;
    public more?: any;

    public static extend(seriesItem: EchartSeriesItem, dimKpi: DimKpiBase) {
        const dimKpiBak = <DimKpiBase>CommonUtils.deepCopy(dimKpi);
        if (dimKpiBak.shade == 'area') {
            // 面积图
            seriesItem['type'] = 'line';
            seriesItem['areaStyle'] = {};
        } else {
            seriesItem['type'] = dimKpiBak.shade;
        }
        delete dimKpiBak.shade;
        this._deleteOtherProp(dimKpiBak);
        Object.assign(seriesItem, dimKpiBak);
    }

    protected static _deleteOtherProp<T extends DimKpiBase>(dimKpi: T) {
    }
}

export class Dimension extends DimKpiBase{
    constructor(name?: string) {
        super();
        this.name = name;
    }
}

export class Indicator extends DimKpiBase {
    public field?: string;
    public index?: number = -1;
    public defaultValue?: number = 0;
    public aggregateBy?: AggregateAlgorithm = 'sum';

    constructor(field?: string) {
        super();
        this.field = field;
    }

    protected static _deleteOtherProp(dimKpi: Indicator) {
        delete dimKpi.field;
        delete dimKpi.index;
        delete dimKpi.defaultValue;
        delete dimKpi.aggregateBy;
    }
}

export class SeriesBase {
    public dimensionField: string;
    public dimensions: Dimension[] = [];
    public usingAllDimensions: boolean = true;
    public indicators: Indicator[] = [];
    public name?: string;
    public more?: any;
    public data?: any;

    constructor(name?: string) {
        this.name = name;
    }

    public static extend(seriesItem: EchartSeriesItem, seriesData: SeriesBase, index: number) {
        const seriesDataBak = <SeriesBase>CommonUtils.deepCopy(seriesData);
        delete seriesDataBak.dimensionField;
        delete seriesDataBak.dimensions;
        delete seriesDataBak.usingAllDimensions;
        delete seriesDataBak.indicators;
        delete seriesDataBak.more;
        delete seriesDataBak.data;
        Object.assign(seriesItem, seriesDataBak);
        seriesItem.name = seriesItem.name ? seriesItem.name : 'series' + index;
    }
}

export type RectangularSeriesType = 'bar' | 'line' | 'area';
// ------------------------------------------------------------------------------------------------
// 直角系图相关数据对象
export class ModeledRectangularGraphData extends AbstractModeledGraphData {
    public type: GraphType = 'rectangular';
    public defaultSeriesType: RectangularSeriesType = 'bar';
    public template: CustomModeledGraphTemplate = new CustomModeledGraphTemplate();

    public xAxis: { field?: string, style?: EchartXAxis } = {};
    public yAxis1: EchartYAxis = {position: 'left'};
    public yAxis2: EchartYAxis = {position: 'right'};
    public dimensionField: string;
    public dimensions: Dimension[] = [];
    public usingAllDimensions: boolean = true;
    public indicators: Indicator[] = [];
    public series: DimKpiBase[];
    public legendSource: 'dim' | 'kpi';

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
        if (!this.xAxis || !this.xAxis.field) {
            return undefined;
        }
        if (!this.indicators || this.indicators.length == 0) {
            return undefined;
        }

        if (this.legendSource == 'dim') {
            // 维度值作为图例却没有配置维度就返回
            if (!this.dimensionField) {
                return undefined;
            }
            if (!this.usingAllDimensions && (!this.dimensions || this.dimensions.length == 0)) {
                return undefined;
            }
        }

        this.indicators.forEach(kpi => kpi.index = this.getIndex(kpi.field));
        const dimensions = this.getRealDimensions(this.dimensionField, this.dimensions, this.usingAllDimensions);
        let options = this.legendSource == 'dim' ? this.createMultiDimensionOptions(dimensions) :
            this.createMultiKPIOptions(dimensions);
        CommonUtils.extendObject(options, this.template.optionPatch);
        return options;
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
        options.xAxis = CommonUtils.extendObjects<EchartXAxis>(options.xAxis, this.xAxis.style, {data: xAxisItems});
        if(options.yAxis instanceof Array) {
            options.yAxis = [
                CommonUtils.extendObjects<EchartYAxis>(options.yAxis[0], this.yAxis1),
                CommonUtils.extendObjects<EchartYAxis>(options.yAxis[1], this.yAxis2)
            ];
        } else {
            options.yAxis = CommonUtils.extendObjects<EchartYAxis>(options.yAxis, this.yAxis1);
        }

        if (options.legend) {
            options.legend.data = dimensions.map(d => d.name);
        }

        const dimIndex = this.getIndex(this.dimensionField);
        const pruned = this.pruneAllData(xAxisIndex, dimIndex, dimensions);
        const groupedByDim = group(flat(pruned), dimIndex);
        options.series = groupedByDim._$groupItems
            .map(dimName => ({data: getColumn(groupedByDim[dimName], this.indicators[0].index), name: dimName}))
            .map((seriesData: EchartSeriesItem, index) => {
                CommonUtils.extendObjects<EchartSeriesItem>(seriesData, this.template.seriesItem);
                const dim = this.dimensions.find(dim => dim.name == seriesData.name);
                if (dim) {
                    Dimension.extend(seriesData, dim);
                    this._processSeriesData(index, seriesData, dim, options);
                    this._autoRange(seriesData, options);
                } else {
                    // 数据自带的维度值
                    this._setSeriesType(seriesData);
                }
                return seriesData;
            });

        return options;
    }

    private _setSeriesType(seriesData: EchartSeriesItem) {
        if (this.defaultSeriesType == 'area') {
            seriesData.type = 'line';
            seriesData.areaStyle = {};
            return;
        }
        seriesData.type = this.defaultSeriesType;
    }

    private _correctDoubleYAxis(dimOrKpi: Dimension | Indicator, options: EchartOptions) {
        if(dimOrKpi.yAxisIndex == 1 && !(options.yAxis instanceof Array)) {
            options.yAxis = [
                options.yAxis,
                CommonUtils.extendObjects<EchartYAxis>({}, this.yAxis2 ? this.yAxis2 : {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                })
            ]
        }
    }

    private _autoRange(seriesData: EchartSeriesItem, options: EchartOptions) {
        const yAxisItem = options.yAxis instanceof Array ? options.yAxis[seriesData.yAxisIndex || 0] : options.yAxis;
        if (!yAxisItem || !yAxisItem.autoRange) {
            return;
        }
        ModeledRectangularGraphData.autoRange(seriesData.data, yAxisItem);
    }

    /**
     * 自动计算y坐标轴的最大最小值，并按照差值的10%来放大范围，这样可以避免在指标值差异很小时时，图形看起来像是一个直线的问题
     * @param data
     * @param yAxisItem
     */
    public static autoRange(data: number[], yAxisItem: EchartYAxis): void {
        // 避免js直接加减后浮点数变成一长串的问题
        function _getRangeNum(num: number, delta: number): number {
            const pointLength = String(num).split('.')[1]?.length || 1;
            return Number((num + delta).toFixed(pointLength));
        }

        function _isNumber(num: any): boolean {
            return CommonUtils.isDefined(num) && num !== '' && !isNaN(num)
        }

        if (!data || isNaN(data[0]) || !yAxisItem) {
            // 允许出现''或null的数据
            return;
        }
        let min = Math.min(...data), max = Math.max(...data);
        if (min == max) {
            return;
        }
        const range = (max - min) * 0.1;
        min = _getRangeNum(min, -range);
        max = _getRangeNum(max, range);
        if (_isNumber(yAxisItem.min)) {
            min = Math.min(min, yAxisItem.min);
        }
        if (_isNumber(yAxisItem.max)) {
            max = Math.max(max, yAxisItem.max);
        }
        Object.assign(yAxisItem, {min, max});
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

    protected createMultiKPIOptions(dims: Dimension[]): EchartOptions {
        const xAxisIndex = this.getIndex(this.xAxis.field);
        if (xAxisIndex == -1) {
            return undefined;
        }
        const dimIndex = this.getIndex(this.dimensionField);
        const xAxisGroups = group(this.data, xAxisIndex);
        if(!xAxisGroups) {
            return undefined;
        }
        const pruned: string[][] = [];
        for (let xAxisItem in xAxisGroups) {
            const records: string[][] = xAxisGroups[xAxisItem];
            if (records === xAxisGroups._$groupItems) {
                continue;
            }
            let filteredWithDim = dimIndex != xAxisIndex && dimIndex != -1 && dims && dims.length;
            const prunedRecords = filteredWithDim ? records.filter(r => !!dims.find(dim => dim.name == r[dimIndex])) : records;
            if (prunedRecords.length == 1) {
                pruned.push(prunedRecords[0]);
            } else if (prunedRecords.length > 1) {
                const by = this.indicators.map(kpi => ({index: kpi.index, algorithm: kpi.aggregateBy}));
                pruned.push(aggregate(prunedRecords, by));
            } else {
                const row = [];
                row[xAxisIndex] = xAxisItem;
                if(filteredWithDim) {
                    row[dimIndex] = dims[0].name;
                }
                this.indicators.forEach(i => row[i.index] = i.defaultValue);
                pruned.push(row);
            }
        }

        const options: EchartOptions = this.template.getInstance();
        options.xAxis = CommonUtils.extendObjects<EchartXAxis>(options.xAxis, this.xAxis.style, {data: xAxisGroups._$groupItems});
        if(options.yAxis instanceof Array) {
            options.yAxis = [
                CommonUtils.extendObjects<EchartYAxis>(options.yAxis[0], this.yAxis1),
                CommonUtils.extendObjects<EchartYAxis>(options.yAxis[1], this.yAxis2)
            ];
        } else {
            options.yAxis = CommonUtils.extendObjects<EchartYAxis>(options.yAxis, this.yAxis1);
        }

        if (options.legend) {
            options.legend.data = this.indicators.map(kpi => this.header[kpi.index]);
        }
        options.series = this.indicators
            .map(kpi => ({name: this.header[kpi.index], field: this.field[kpi.index], data: getColumn(pruned, kpi.index)}))
            .map((seriesData,index) => {
                // 先取模板中的配置
                CommonUtils.extendObjects<EchartSeriesItem>(seriesData, this.template.seriesItem);
                // 再取用户配置
                const indicator = this.indicators.find(indicator => indicator.field == seriesData.field);
                if (indicator) {
                    Indicator.extend(seriesData, indicator);
                    this._processSeriesData(index, seriesData, indicator, options);
                }
                return seriesData;
            });
        return options;
    }

    private _processSeriesData(index: number, seriesData: EchartSeriesItem, kpiOrDim: Indicator | Dimension, options: EchartOptions) {
        if (this.series && this.series.length > 0) {
            if (this.series[index]) {
                Indicator.extend(seriesData, this.series[index]);
            } else {
                this.series[index] = JSON.parse(JSON.stringify(this.series[0]));
                Indicator.extend(seriesData, this.series[index]);
                this._setSeriesType(seriesData);
            }
        }
        // 指标或维度里面设置了双坐标，而模板是单坐标的，需要转为双坐标，不然会报错
        this._correctDoubleYAxis(kpiOrDim, options);
    }

    public refresh(): void {
        this._options = undefined;
        super.refresh();
    }
}

// ------------------------------------------------------------------------------------------------
// 饼图相关数据对象

export class PieSeries extends SeriesBase {
    public radius: number[];
    public center: number[];
    public roseType?: boolean | 'radius' | 'area';
    public label?: any;
}

export class ModeledPieGraphData extends AbstractModeledGraphData {
    constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, header, field);
    }

    public type: GraphType = 'pie';
    public template: CustomModeledGraphTemplate = new CustomModeledGraphTemplate();
    public series: PieSeries[];
    private _options: EchartOptions;
    public legendSource: 'dim' | 'kpi';

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

                const seriesItem = CommonUtils.extendObjects<EchartSeriesItem>({type: 'pie'}, this.template.seriesItem);
                const legendSource = this.legendSource ? this.legendSource : dimensions.length > 1 ? 'dim' : 'kpi';
                if (dimensions.length == 0) {
                    console.warn('No valid dimension found, this graph will not be rendered!');
                } else if (legendSource == 'dim') {
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

                SeriesBase.extend(seriesItem, seriesData, idx);
                seriesItem.radius = seriesData.radius ? seriesItem.radius.map(r => r + '%') : seriesData.radius;
                seriesItem.center = seriesItem.center ? seriesItem.center.map(r => r + '%') : seriesItem.center;
                return seriesItem;
            });
        CommonUtils.extendObject(options, this.template.optionPatch);
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

export class GaugeSeries extends SeriesBase {
    public dimensions: Dimension[] = [new Dimension('')];
    public usingAllDimensions: boolean = false;

    public center?: number[] = [50, 50];
    public radius?: number = 90;
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
    public itemStyle?: any;
    public title?: any;
    public autoAxisLineColor?: boolean;
}

export class ModeledGaugeGraphData extends AbstractModeledGraphData {
    constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, header, field);
    }

    public type: GraphType = 'gauge';
    public template: CustomModeledGraphTemplate = new CustomModeledGraphTemplate();
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

                const seriesItem = CommonUtils.extendObjects<EchartSeriesItem>({type: 'gauge'}, this.template.seriesItem, seriesData);

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
                    seriesItem.data = this.aggregateData(records, [indicator])
                        .map(row => ({name: indicator.name, value: row[1]}));
                } else {
                    // 多指标
                    const dim = dimensions[0].name;
                    const records = this.data.filter(row => row[dimIndex] == dim);
                    const pruned = this.aggregateData(records, seriesData.indicators)[0];
                    seriesItem.data = seriesData.indicators.map(i => ({name: i.name, value: pruned[i.index]}));
                }

                SeriesBase.extend(seriesItem, seriesData, idx);
                seriesItem.radius = seriesData.radius ? seriesData.radius + '%' : seriesData.radius;
                seriesItem.center = seriesData.center ? seriesData.center.map(r => r + '%') : seriesData.center;

                if (seriesItem.autoAxisLineColor && seriesItem.axisLine?.lineStyle?.color?.[0]?.length && seriesItem.data?.[0]) {
                    seriesItem.axisLine.lineStyle.color[0][0] = Number(seriesItem.data[0].value) / (Number(seriesItem.max) || 100);
                }

                return seriesItem;
            });
        CommonUtils.extendObject(options, this.template.optionPatch);
        return options;
    }

    protected aggregateData(records: (string|number)[][], indicators: Indicator[]): string[][] {
        const aggregateBy = indicators.map(kpi => ({index: kpi.index, algorithm: kpi.aggregateBy}));
        return [aggregate(<any>records, aggregateBy)];
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
    public static extend(indicatorItem: EchartSeriesItem, indicator: RadarIndicator) {
        const indicatorBak = <RadarIndicator>CommonUtils.deepCopy(indicator);
        indicatorItem.min = indicator.min ? indicator.min : 0;
        delete indicatorBak.min;
        delete indicatorBak.field;
        delete indicatorBak.defaultValue;
        delete indicatorBak.aggregateBy;
        Object.assign(indicatorItem, indicatorBak);
    }
}

export class RadarDimension extends Dimension {
    public area: boolean; // 是否填充

    public static extend(seriesItem: EchartSeriesItem, dimension: RadarDimension) {
        const dimensionBak = <RadarDimension>CommonUtils.deepCopy(dimension);
        seriesItem.areaStyle = dimension.area ? {} : null;
        delete dimensionBak.area;
        Object.assign(seriesItem, dimensionBak);
    }
}

export class ModeledRadarGraphData extends AbstractModeledGraphData {
    public type: GraphType = 'radar';
    public template: CustomModeledGraphTemplate = new CustomModeledGraphTemplate();

    public dimensionField: string;
    public usingAllDimensions: boolean = true;
    public dimensions: RadarDimension[] = [];
    public indicators: RadarIndicator[] = [];
    public isDefaultFillBackground: boolean;

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
        let indicator = this.indicators.map((indicator: RadarIndicator) => {
            const indicatorItem = {}
            RadarIndicator.extend(indicatorItem, indicator);
            return indicatorItem;
        });
        options.radar = CommonUtils.extendObject(options.radar, {indicator: indicator});

        let series = CommonUtils.extendObjects<EchartSeriesItem>({type: 'radar'}, this.template.seriesItem);
        series.data = dimensions.map((dimension: RadarDimension) => {
            const fromData = this.dimensions.every(dim => dim.name != dimension.name);
            // 数据里过来的维度值自动加上默认填充背景
            dimension.area = fromData ? this.isDefaultFillBackground : dimension.area;
            const records = this.data.filter(row => row[dimIndex] == dimension.name);
            const pruned = this.pruneData(records, dimIndex, [dimension], this.indicators)[0];
            const seriesItem = {
                value: this.indicators.map(i => pruned[i.index])
            }
            RadarDimension.extend(seriesItem, dimension);
            return seriesItem;
        });
        options.series = [series];
        CommonUtils.extendObject(options, this.template.optionPatch);
        return options;
    }

    public refresh(): void {
        this._options = undefined;
        super.refresh();
    }
}


// ------------------------------------------------------------------------------------------------
// 散点图相关数据对象
export class ScatterDimension extends Dimension {
    public itemStyle?: any = {};
    public symbol?: string = "";
    public static extend(seriesItem: EchartSeriesItem, dimension: ScatterDimension) {
        const dimensionBak = <ScatterDimension>CommonUtils.deepCopy(dimension);
        delete dimensionBak.name;
        Object.assign(seriesItem, dimensionBak);
    }
}

export const availableScatterSymbols: ('circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin')[] =
    ['circle', 'roundRect', 'triangle', 'diamond', 'pin', 'rect'];

export class ModeledScatterGraphData extends AbstractModeledGraphData {
    public type: GraphType = 'scatter';
    public template: CustomModeledGraphTemplate = new CustomModeledGraphTemplate();

    public xAxis: EchartXAxis = {};
    public yAxis: EchartYAxis = {};
    public xAxisKpiField: {name: string, field: string};
    public yAxisKpiField: {name: string, field: string};
    public dimensionField: string;
    public dimensions: ScatterDimension[] = [];
    public usingAllDimensions: boolean = true;
    public useDefaultBubble: boolean;
    public useDefaultSingleColor: boolean;
    public series: any;

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

        options.xAxis = CommonUtils.extendObject(options.xAxis, this.xAxis);
        options.yAxis = CommonUtils.extendObject(options.yAxis, this.yAxis);

        const dimensions = <ScatterDimension[]> this.getRealDimensions(this.dimensionField, this.dimensions, this.usingAllDimensions, ScatterDimension);
        const dimIndex = this.getIndex(this.dimensionField);
        this._mergeLegend(options.legend, dimensions);

        options.series = dimensions.map((dim, idx) => {
            const fromData = this.dimensions.every(d => d.name != dim.name);
            // 数据里过来的维度值自动加上默认散点样式
            if (fromData && this.useDefaultBubble) {
                dim.itemStyle = dim.itemStyle || {};
                Object.assign(dim.itemStyle, {opacity: 0.3, borderWidth: 2});
            }
            if (fromData && this.useDefaultSingleColor) {
                dim.symbol = dim.symbol || '';
                Object.assign(dim.itemStyle, {color: '#3B69FF'});
                // 获取下一个要使用的 symbol 类型
                const nextSymbolIndex = idx % availableScatterSymbols.length;
                // 更新 dim 对象中的 symbol 属性
                Object.assign(dim, {symbol: availableScatterSymbols[nextSymbolIndex]});
            }
            if (this.series && this.series.length > 0) {
                if (this.series[idx]) {
                    Object.assign(dim, this.series[idx]);
                } else {
                    this.series[idx] = JSON.parse(JSON.stringify(this.series[0]));
                    Object.assign(dim, this.series[idx]);
                    if (this.useDefaultBubble) {
                        dim.itemStyle = {opacity: 0.3, borderWidth: 2};
                    }
                    if (this.useDefaultSingleColor) {
                        dim.itemStyle = {color: '#3B69FF'};
                        const nextSymbolIndex = idx % availableScatterSymbols.length;
                        Object.assign(dim, {symbol: availableScatterSymbols[nextSymbolIndex]});
                    }
                }
            }
            const seriesItem = CommonUtils.extendObjects<EchartSeriesItem>({type: 'scatter'}, this.template.seriesItem);
            seriesItem.data = this.data.filter(row => row[dimIndex] == dim.name)
                .map(row => {
                return [
                    row[xAxisKpiIndex],
                    row[yAxisKpiIndex]
                ]
            });
            seriesItem.name = dim.name ? dim.name : 'series' + idx;
            ScatterDimension.extend(seriesItem, dim);
            return seriesItem;
        });
        CommonUtils.extendObject(options, this.template.optionPatch);
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
// 轮廓图相关数据对象
export class MapSeries extends SeriesBase {
    public mapType?: string = '';
    public label?: string;
    public itemStyle?: string;
    public animation?: string;
    public roam?: boolean;
}

export class ModeledMapGraphData extends AbstractModeledGraphData {
    constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, header, field);
    }

    public type: GraphType = 'map';
    public template: CustomModeledGraphTemplate = new CustomModeledGraphTemplate();
    public series: MapSeries[];
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

                const seriesItem = CommonUtils.extendObjects<EchartSeriesItem>({type: 'map'}, this.template.seriesItem);
                if(!dimensions.length) return {};

                // 多维度单指标
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

                SeriesBase.extend(seriesItem, seriesData, idx);
                return seriesItem;
            });
        CommonUtils.extendObject(options, this.template.optionPatch);
        return options;
    }

    public refresh(): void {
        this._options = undefined;
        super.refresh();
    }
}

