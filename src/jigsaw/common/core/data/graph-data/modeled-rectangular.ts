import {EchartOptions, EchartSeriesItem, EchartXAxis, EchartYAxis} from "../echart-types";
import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {CommonUtils} from "../../utils/common-utils";
import {aggregate, distinct, flat, group, Grouped} from "../../utils/data-collection-utils";
import {getColumn} from "../unified-paging/paging";
import {AbstractModeledGraphData, CustomModeledGraphTemplate, Dimension, DimKpiBase, GraphType, Indicator} from "./modeled";

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
        if (options.yAxis instanceof Array) {
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
        if (dimOrKpi.yAxisIndex == 1 && !(options.yAxis instanceof Array)) {
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
        if (!xAxisGroups) {
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
                if (filteredWithDim) {
                    row[dimIndex] = dims[0].name;
                }
                this.indicators.forEach(i => row[i.index] = i.defaultValue);
                pruned.push(row);
            }
        }

        const options: EchartOptions = this.template.getInstance();
        options.xAxis = CommonUtils.extendObjects<EchartXAxis>(options.xAxis, this.xAxis.style, {data: xAxisGroups._$groupItems});
        if (options.yAxis instanceof Array) {
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
            .map((seriesData, index) => {
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
                delete this.series[index].name
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
