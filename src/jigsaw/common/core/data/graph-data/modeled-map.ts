import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {EchartOptions, EchartSeriesItem} from "../echart-types";
import {CommonUtils} from "../../utils/common-utils";
import {JigsawThemeService} from "../../theming/theme";
import {AbstractModeledGraphData, CustomModeledGraphTemplate, GraphType, Indicator, SeriesBase} from "./modeled";

export class MapSeries extends SeriesBase {
    public mapType?: string = '';
    public label?: string;
    public itemStyle?: MapItemStyle;
    public animation?: string;
    public roam?: boolean;
}

export type MapVisualMap = {
    position?: string;
    type?: string;
    startText?: string;
    endText?: string;
    text?: string[];
    min?: number;
    max?: number;
    colorConfig?: string;
    color?: string[];
    textStyle?: MapVisualMapTextStyle;
    more?: any;
}
export type MapVisualMapTextStyle = {
    color?: string;
    fontStyle?: string;
    fontWeight?: string;
    fontSize?: number;
}
export type MapItemStyle = {
    areaColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderType?: string;
    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    opacity?: number;
}

export class ModeledMapGraphData extends AbstractModeledGraphData {
    constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, header, field);
    }

    public type: GraphType = 'map';
    public template: CustomModeledGraphTemplate = new CustomModeledGraphTemplate();
    public series: MapSeries[];
    public visualMap: MapVisualMap;
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
                if (!dimensions.length) {
                    return {};
                }

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
        if (options.visualMap?.colorConfig) {
            options.visualMap.color = JigsawThemeService.getGraphTheme().chartColorConfigs[options.visualMap.colorConfig];
        }
        CommonUtils.extendObject(options, this.template.optionPatch);
        return options;
    }

    public refresh(): void {
        this._options = undefined;
        super.refresh();
    }
}
