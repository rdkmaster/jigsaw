// ------------------------------------------------------------------------------------------------
// 散点图相关数据对象
import {EchartLegend, EchartOptions, EchartSeriesItem, EchartXAxis, EchartYAxis} from "../echart-types";
import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {CommonUtils} from "../../utils/common-utils";
import {AbstractModeledGraphData, CustomModeledGraphTemplate, Dimension, DimKpiBase, GraphType, Indicator} from "./modeled";

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
    public xAxisKpiField: { name: string, field: string };
    public yAxisKpiField: { name: string, field: string };
    public dimensionField: string;
    public dimensions: ScatterDimension[] = [];
    public usingAllDimensions: boolean = true;
    public useDefaultBubble: boolean;
    public useDefaultSingleColor: boolean;
    public series: DimKpiBase[];

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

        if (xAxisKpiIndex == -1 || yAxisKpiIndex == -1) {
            return undefined;
        }

        const options = this.template.getInstance();

        if (options.legend) {
            options.legend.data = [];
        }

        options.xAxis = CommonUtils.extendObject(options.xAxis, this.xAxis);
        options.yAxis = CommonUtils.extendObject(options.yAxis, this.yAxis);

        const dimensions = <ScatterDimension[]>this.getRealDimensions(this.dimensionField, this.dimensions, this.usingAllDimensions, ScatterDimension);
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
                .map(row => [row[xAxisKpiIndex], row[yAxisKpiIndex]]);
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
