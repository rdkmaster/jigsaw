import {EchartTitle, EchartLegend, EchartTooltip, EchartOptions} from "./echart-types";
import {TableData} from "./table-data";

type GraphMatrixRow = Array<string|number>;
export type GraphDataHeader = string[];
export type GraphDataField = string[];
export type GraphDataRowDescriptor = string[];
export type GraphDataMatrix = GraphMatrixRow[];

export abstract class AbstractGraphData extends TableData {
    protected abstract createChartOptions(): any;

    public optionsPatch: EchartOptions;

    constructor(public data?: GraphDataMatrix,
                public header?: GraphDataHeader,
                public rowDescriptor?: GraphDataRowDescriptor,
                public field?: GraphDataField) {
        super(data, field, header);
        this._makeFields();
        if (!rowDescriptor) {
            this.rowDescriptor = [];
        }
    }

    protected echartOptions: EchartOptions;

    public get options(): EchartOptions {
        if (!this.echartOptions) {
            this.echartOptions = this.createChartOptions();
            if (this.optionsPatch) {
                this.extendOption();
            }
        }

        return this.echartOptions;
    }

    public fromObject(data: any): AbstractGraphData {
        if (!data.hasOwnProperty('data') || !(data.data instanceof Array)) {
            throw new Error('need a "data" property which type is Array!');
        }
        this.clearData();

        TableData.arrayAppend(this.data, data.data);
        if (data.hasOwnProperty('header')) {
            TableData.arrayAppend(this.header, data.header);
        }
        if (data.hasOwnProperty('field')) {
            TableData.arrayAppend(this.field, data.field);
        }
        if (data.hasOwnProperty('rowDescriptor')) {
            TableData.arrayAppend(this.rowDescriptor, data.rowDescriptor);
        }
        this._makeFields();
        this.refresh();

        return this;
    }

    private _makeFields(): void {
        if ((!this.field|| this.field.length == 0) && this.header) {
            this.header.forEach(item => this.field.push(item));
        }
    }

    protected clearData(): void {
        super.clearData();
        this.rowDescriptor.splice(0, this.rowDescriptor.length);
    }

    public patchOptions(patchOpt: Object): void {
        if(!patchOpt) return;

        this.optionsPatch = patchOpt;
    }

    /**
     * 扩展 echarts 默认的option的配置.
     * @param sourceOption 传递进来新的option选项
     */
    public extendOption() {
        this.extendObject(this.echartOptions, this.optionsPatch);
    }

    /**
     * 主要负责两个对象的合并
     * 将sourceObject 中的属性添加到targetObject 中.
     * @param targetObject 要合并的源对象
     * @param sourceObject 合并的对象信息
     */
    protected extendObject(targetObject, sourceObject) {
        // 目标对象为空，则直接将对象复制给obj
        if (!targetObject) {
            targetObject = sourceObject;
        }

        for (let i in sourceObject) {
            if (typeof sourceObject[i] !== "object") {
                targetObject[i] = sourceObject[i];
            } else {
                // 如果原数据为数组, 已经是属性的值，直接覆盖;
                if (sourceObject[i] instanceof Array) {
                    targetObject[i] = sourceObject[i];
                } else {
                    this.extendObject(targetObject[i], sourceObject[i]);
                }
            }
        }
    }
}

export abstract class AbstractNormalGraphData extends AbstractGraphData {
    public title: EchartTitle;
    public legend: EchartLegend;
    public tooltip: EchartTooltip;
}

export class OutlineMapData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}


export class PieGraphData extends AbstractNormalGraphData {
    // todo 2 以后抽取到公共的echarts文件中.
    private _title: string;
    private _legendData: Array<string>;
    private _seriesName: string;
    private _seriesData: Array<Object>;

    // 数据结构:
    constructor(seriesData: Array<Object>, title?: string, legendData?: Array<string>, seriesName?: string) {
        super();
        this._title = title;
        this._legendData = legendData;
        this._seriesName = seriesName;
        this._seriesData = seriesData;
    }

    protected createChartOptions(): any {
        return {
            title: {
                text: this._title,
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: this._legendData
            },
            series: [
                {
                    name: this._seriesName,
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: this._seriesData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }
}

export class DonutGraphData extends PieGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class LineBarGraphData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class GaugeGraphData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class ScatterGraphData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class RadarGraphData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class HeatGraphData extends AbstractNormalGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}
