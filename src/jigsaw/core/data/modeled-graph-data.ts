import {TableDataBase} from "./table-data";
import {
    EchartLegend,
    EchartOptions, EchartSeriesItem,
    EchartTitle,
    EchartToolbox,
    EchartTooltip,
    EchartXAxis,
    EchartYAxis
} from "./echart-types";
import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {AggregateAlgorithm, Grouped, aggregate, distinct, flat, getColumn, group} from "../utils/data-collection-utils";
import {CommonUtils} from "../utils/common-utils";
import {Type} from "@angular/core";

export class ModeledGraphTemplate {
    tooltip?: EchartTooltip;
    toolbox?: EchartToolbox;
    legend?: EchartLegend;
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
    public template: Type<ModeledGraphTemplate>;

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
}

export class Dimension {
    public name?: string;
    public yAxisIndex?: 0 | 1 = 0;
    public stack?: string;
    public shade?: 'bar' | 'line' | 'area' = 'bar';

    constructor(name?: string) {
        this.name = name;
    }
}

export class Indicator {
    public field?: string;
    public index?:number = -1;
    public yAxisIndex?: 0 | 1 = 0;
    public stack?: string = undefined;
    public shade?: 'bar' | 'line' | 'area' = 'bar';
    public defaultValue?: number = 0;
    public aggregateBy?: AggregateAlgorithm = 'sum';

    constructor(field?: string) {
        this.field = field;
    }
}

export class ModeledRectangularTemplate extends ModeledGraphTemplate {
    xAxis?: EchartXAxis;
    yAxis1?: EchartYAxis;
    yAxis2?: EchartYAxis;
    seriesItem?: EchartSeriesItem;
}

export class BasicModeledRectangularTemplate extends ModeledRectangularTemplate {
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
        type:'bar', data: null
    };
}

export class ModeledRectangularGraphData extends AbstractModeledGraphData {
    public template: Type<ModeledRectangularTemplate> = BasicModeledRectangularTemplate;

    public seriesField: string;
    public xAxis: {field?: string, style?: EchartXAxis} = {};
    public yAxis1: EchartYAxis;
    public yAxis2: EchartYAxis;
    public dimensions: Dimension[] = [];
    public usingAllDimensions: boolean = true;
    public indicators: Indicator[] = [];
    public legend: EchartLegend;
    public title: EchartTitle;

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
        if (!this.seriesField || !this.xAxis || !this.xAxis.field) {
            return undefined;
        }
        if (!this.indicators || this.indicators.length == 0) {
            return undefined;
        }
        if (!this.usingAllDimensions && (!this.dimensions || this.dimensions.length == 0)) {
            return undefined;
        }

        this.indicators.forEach(kpi => kpi.index = this.getIndex(kpi.field));
        const dimensions = this.getRealDimensions();
        return dimensions.length > 1 ? this.createMultiDimensionOptions(dimensions) :
            this.createMultiKPIOptions(dimensions[0]);
    }

    protected getRealDimensions(): Dimension[] {
        const dimensions = [];
        const serialIndex = this.getIndex(this.seriesField);
        if (serialIndex == -1) {
            return dimensions;
        }
        if (this.usingAllDimensions) {
            const series = distinct(getColumn(this.data, serialIndex));
            if (series) {
                dimensions.push(...series.map(s => {
                    const d = this.dimensions.find(d => d.name === s);
                    return d ? d : new Dimension(s);
                }));
            }
        } else {
            dimensions.push(...this.dimensions);
        }
        return dimensions;
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

        const template = new this.template();
        const options: EchartOptions = {
            tooltip: CommonUtils.extendObjects<EchartTooltip>({}, template.tooltip),
            toolbox: CommonUtils.extendObjects<EchartToolbox>({}, template.toolbox),
            legend: CommonUtils.extendObjects<EchartLegend>({data: null}, template.legend),
            xAxis: [
                CommonUtils.extendObjects<EchartXAxis>({}, template.xAxis, this.xAxis.style)
            ],
            yAxis: [
                CommonUtils.extendObjects<EchartYAxis>({}, template.yAxis1, this.yAxis1),
                CommonUtils.extendObjects<EchartYAxis>({}, template.yAxis2, this.yAxis2)
            ]
        };
        options.legend.data = dimensions.map(d => d.name);
        options.xAxis[0].data = xAxisItems;

        const serialIndex = this.getIndex(this.seriesField);
        const pruned = this.pruneData(xAxisIndex, serialIndex, dimensions);
        const groupedByDim = group(flat(pruned), serialIndex);
        options.series = groupedByDim._$groupItems
            .map(dimName => ({data: getColumn(groupedByDim[dimName], this.indicators[0].index), name: dimName}))
            .map(seriesData => CommonUtils.extendObjects<EchartToolbox>(seriesData, template.seriesItem));

        return options;
    }

    protected createMultiKPIOptions(dim: Dimension): EchartOptions {
        if (!dim) {
            return undefined;
        }
        const xAxisIndex = this.getIndex(this.xAxis.field);
        if (xAxisIndex == -1) {
            return undefined;
        }
        const serialIndex = this.getIndex(this.seriesField);
        if (serialIndex == -1) {
            return undefined;
        }
        const xAxisGroups = group(this.data, xAxisIndex);
        const pruned: string[][] = [];
        for (let xAxisItem in xAxisGroups) {
            const records: string[][] = xAxisGroups[xAxisItem];
            if (records === xAxisGroups._$groupItems) {
                continue;
            }
            const prunedRecords = records.filter(r => r[serialIndex] == dim.name);
            if (prunedRecords.length == 1) {
                pruned.push(prunedRecords[0]);
            } else if (prunedRecords.length > 1) {
                const by = this.indicators.map(kpi => ({index: kpi.index, algorithm: kpi.aggregateBy}));
                pruned.push(aggregate(prunedRecords, by));
            } else {
                const row = [];
                row[xAxisIndex] = xAxisItem;
                row[serialIndex] = dim.name;
                this.indicators.forEach(i => row[i.index] = i.defaultValue);
                pruned.push(row);
            }
        }

        const template = new this.template();
        const options: EchartOptions = {
            tooltip: CommonUtils.extendObjects<EchartTooltip>({}, template.tooltip),
            toolbox: CommonUtils.extendObjects<EchartToolbox>({}, template.toolbox),
            legend: CommonUtils.extendObjects<EchartLegend>({data: null}, template.legend),
            xAxis: [
                CommonUtils.extendObjects<EchartXAxis>({}, template.xAxis, this.xAxis.style)
            ],
            yAxis: [
                CommonUtils.extendObjects<EchartYAxis>({}, template.yAxis1, this.yAxis1),
                CommonUtils.extendObjects<EchartYAxis>({}, template.yAxis2, this.yAxis2)
            ]
        };

        options.legend.data = this.indicators.map(kpi => this.header[kpi.index]);
        options.xAxis[0].data = xAxisGroups._$groupItems;
        options.series = this.indicators
            .map(kpi => ({name: this.header[kpi.index], data: getColumn(pruned, kpi.index)}))
            .map(seriesData => CommonUtils.extendObjects<EchartToolbox>(seriesData, template.seriesItem));

        return options;
    }

    /**
     * 确保给定的数据中，每一个给定的维度，都有且只有一个记录，缺少的记录用默认值补齐，多出的记录删除， 重复的记录用聚集算法聚集，
     * 并且要保证每组中的维度顺序一致。
     *
     * @param xAxisIndex
     * @param serialIndex
     * @param dimensions
     */
    protected pruneData(xAxisIndex: number, serialIndex: number, dimensions: Dimension[]): Grouped {
        const aggregateBy = this.indicators.map(kpi => ({index: kpi.index, algorithm: kpi.aggregateBy}));
        const groups = group(this.data, xAxisIndex);
        for (let xAxisItem in groups) {
            const records: string[][] = groups[xAxisItem];
            if (records === groups._$groupItems) {
                continue;
            }

            const dimGroups = group(records, serialIndex);
            const pruned: string[][] = [];
            dimensions.forEach(dim => {
                const dimRecords = dimGroups[dim.name];
                if (dimRecords) {
                    pruned.push(dimRecords.length > 1 ? aggregate(dimRecords, aggregateBy) : dimRecords[0]);
                } else {
                    const row = [];
                    row[xAxisIndex] = xAxisItem;
                    row[serialIndex] = dim.name;
                    this.indicators.forEach(i => row[i.index] = i.defaultValue);
                    pruned.push(row);
                }
            });
            groups[xAxisItem] = pruned;
        }
        return groups;
    }
}
