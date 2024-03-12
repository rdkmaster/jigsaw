import {Type} from "@angular/core";
import {TableDataBase} from "../table-data";
import {EchartOptions, EchartSeriesItem} from "../echart-types";
import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {aggregate, AggregateAlgorithm, distinct, group} from "../../utils/data-collection-utils";
import {CommonUtils} from "../../utils/common-utils";
import {getColumn} from "../unified-paging/paging";

export type GraphType = 'rectangular' | 'pie' | 'gauge' | 'radar' | 'scatter' | 'map' | 'funnel' | 'graph';

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

export class DimKpiBase {
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
