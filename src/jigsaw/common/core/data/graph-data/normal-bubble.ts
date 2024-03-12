import {EchartOptions} from "../echart-types";
import {AbstractNormalGraphData} from "./graph-data";

export type ColorStop = {
    offset: number,
    color: string
}
export type GradientColor = {
    type: string,
    x: number,
    y: number,
    r: number,
    colorStops: ColorStop[],
    global: boolean
}
export type BubbleItemStyle = {
    borderWidth?: number,
    borderType?: string,
    borderColor?: string,
    shadowBlur?: number,
    shadowColor?: string,
    shadowOffsetX?: number,
    shadowOffsetY?: number,
    color?: string | GradientColor
}
export type BubbleLabelConfig = {
    color: string,
    fontSize: number,
    fontWeight: string,
    fontStyle: string,
    formatter?: string,
    position?: string,
    show: boolean
}
export type BubbleSeries = {
    label: string,
    value: number,
    itemStyle: BubbleItemStyle,
    labelConfig: BubbleLabelConfig,
    x: number,
    y: number
}
export type EmphasisConfig = {
    itemStyle: BubbleItemStyle,
    label?: BubbleLabelConfig
}

/**
 * 气泡图
 * */
export class BubbleChartGraphData extends AbstractNormalGraphData {
    // 气泡图形大小最小值
    public minSymbolSize: number = 130;

    // 最大气泡大小
    public symbolSize: number = 150;

    public layout: string = 'force';

    public emphasisConfig: EmphasisConfig;

    protected createChartOptions(): EchartOptions {
        if (!this.data || !this.data.length) {
            return;
        }
        let maxValue = 1;
        const valueList = this.data[0].map(item => item.value);
        maxValue = Math.max(maxValue, ...valueList);
        const minValue = Math.min(maxValue, ...valueList);

        const sizeScale = (this.symbolSize - this.minSymbolSize) / (maxValue - minValue);
        const sizeOffset = this.minSymbolSize - sizeScale * minValue;

        // 斥力 为了防止重叠，斥力最好大于 symbolSize
        const repulsion = this.symbolSize * 3;

        // 获取要渲染的数据
        const data = this.data[0].map((item) => {
            // 根据与最大值的比例和最大气泡大小，算出每个元素的大小
            let size: number;
            if (maxValue == minValue) {
                size = this.symbolSize;
            } else {
                size = Math.max(sizeScale * item.value + sizeOffset, this.minSymbolSize);
            }
            const itemData = {
                name: item.label,
                value: item.value,
                label: item.labelConfig || {},
                symbolSize: size,
                itemStyle: item.itemStyle || {},
                emphasis: item.emphasisConfig || this.emphasisConfig
            };
            if (!item.x && !item.y) {
                return itemData;
            }
            this.layout = "none";
            return {...itemData, x: item.x, y: item.y};
        });

        const emphasisConfig = this.emphasisConfig || {};

        return {
            xAxis: {
                show: false,
            },
            yAxis: {
                show: false,
            },
            series: [
                {
                    data,
                    type: "graph", // 关系图
                    layout: this.layout,
                    draggable: true,     // 启用节点拖拽
                    force: {
                        // 值越大则斥力越大 每个元素间隔越大
                        repulsion,
                        // 是否开启布局动画
                        layoutAnimation: true,
                        // 元素之间的引力，越大引力越强默认是1
                        gravity: 0.1,
                        // 即布局动画执行的时间。数值越大，动画执行的时间越长
                        coolDown: 10
                    },
                    // 高亮状态的图形样式
                    emphasis: emphasisConfig,
                    // 设置 label
                    label: {
                        show: true,
                        position: "inside",
                        formatter: [`{title|{b}}`, `{num|{c}}`].join("\n"),
                        rich: {
                            title: {
                                align: "center",
                                fontSize: 13,
                                lineHeight: 18,
                                color: "#FFF",
                            },
                            num: {
                                align: "center",
                                fontSize: "15",
                                lineHeight: 21,
                                fontWeight: 500,
                                color: "#FFF",
                            },
                        }
                    },
                    itemStyle: {
                        borderWidth: 1,
                        color: "green",
                    },
                },
            ],
        };
    }
}
