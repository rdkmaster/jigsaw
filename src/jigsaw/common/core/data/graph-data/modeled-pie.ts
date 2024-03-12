import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {EchartLegend, EchartOptions, EchartSeriesItem} from "../echart-types";
import {CommonUtils} from "../../utils/common-utils";
import {AbstractModeledGraphData, CustomModeledGraphTemplate, Dimension, GraphType, Indicator, SeriesBase} from "./modeled";

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
