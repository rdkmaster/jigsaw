import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {EchartOptions, EchartSeriesItem, EchartTitle} from "../echart-types";
import {CommonUtils} from "../../utils/common-utils";
import {aggregate} from "../../utils/data-collection-utils";
import {AbstractModeledGraphData, CustomModeledGraphTemplate, Dimension, GraphType, Indicator, SeriesBase} from "./modeled";

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
    public slope?: number;
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

    protected aggregateData(records: (string | number)[][], indicators: Indicator[]): string[][] {
        const aggregateBy = indicators.map(kpi => ({index: kpi.index, algorithm: kpi.aggregateBy}));
        return [aggregate(<any>records, aggregateBy)];
    }

    public refresh(): void {
        this._options = undefined;
        super.refresh();
    }
}
