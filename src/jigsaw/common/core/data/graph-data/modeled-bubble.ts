import {GraphDataField, GraphDataHeader, GraphDataMatrix} from "./graph-data";
import {EchartOptions, EchartXAxis, EchartYAxis} from "../echart-types";
import {CommonUtils} from "../../utils/common-utils";
import {AbstractModeledGraphData, CustomModeledGraphTemplate, DimKpiBase, GraphType} from "./modeled";
import {EmphasisConfig} from "./normal-bubble";

export class ModeledBubbleGraphData extends AbstractModeledGraphData {
    constructor(data: GraphDataMatrix = [], header: GraphDataHeader = [], field: GraphDataField = []) {
        super(data, header, field);
    }

    // 此气泡图使用的是echarts的关系图，type类型为graph
    public type: GraphType = 'graph';
    public template: CustomModeledGraphTemplate = new CustomModeledGraphTemplate();

    public xAxis: EchartXAxis = {};
    public yAxis: EchartYAxis = {};
    public minSymbolSize: number;
    public maxSymbolSize: number;
    public layout: string = 'force';
    public series: DimKpiBase[];
    public emphasisConfig: EmphasisConfig;

    private _options: EchartOptions;

    get options(): EchartOptions {
        if (!this._options) {
            this._options = this.createChartOptions();
        }
        return this._options;
    }

    protected createChartOptions(): EchartOptions {
        if (!this.minSymbolSize || !this.maxSymbolSize) {
            return undefined;
        }
        const options = this.template.getInstance();
        options.xAxis = this.xAxis;
        options.yAxis = this.yAxis;
        const data = this._handleData();
        const emphasisConfig = this.emphasisConfig || {};

        // 斥力 为了防止重叠，斥力最好大于 maxSymbolSize
        const repulsion = this.maxSymbolSize * 3;
        options.series = [
            {
                data,
                type: this.type,
                layout: this.layout,
                draggable: true,
                force: {
                    repulsion,
                },
                emphasis: emphasisConfig
            }
        ]
        CommonUtils.extendObject(options, this.template.optionPatch);
        return options;
    }

    private _handleData() {
        if (!this.data || !this.data.length) {
            return;
        }
        let maxValue = 1;
        const valueList = this.data.map(item => item["value"]);
        maxValue = Math.max(maxValue, ...valueList);
        const minValue = Math.min(maxValue, ...valueList);

        const sizeScale = (this.maxSymbolSize - this.minSymbolSize) / (maxValue - minValue);
        const sizeOffset = this.minSymbolSize - sizeScale * minValue;

        // 获取要渲染的数据
        return this.data.map((item) => {
            // 根据与最大值的比例和最大气泡大小，算出每个元素的大小
            let size = Math.max(sizeScale * Number(item["value"]) + sizeOffset, this.minSymbolSize);

            const itemData = {
                name: item["label"],
                value: item["value"],
                label: item["labelConfig"] || {},
                symbolSize: size,
                itemStyle: item["itemStyle"] || {},
                emphasis: item["emphasisConfig"] || this.emphasisConfig
            };
            if (!item["x"] && !item["y"]) {
                return itemData;
            }
            this.layout = "none";
            return {...itemData, x: item["x"], y: item["y"]};
        });
    }
}
