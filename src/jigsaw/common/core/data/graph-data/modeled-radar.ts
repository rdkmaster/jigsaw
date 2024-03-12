import {EchartOptions, EchartSeriesItem} from "../echart-types";
import {CommonUtils} from "../../utils/common-utils";
import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {AbstractModeledGraphData, CustomModeledGraphTemplate, Dimension, GraphType, Indicator} from "./modeled";

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
