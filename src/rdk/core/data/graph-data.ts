import {EchartTitle, EchartLegend, EchartTooltip, EchartOptions} from "./echart-types";
import {TableData} from "./table-data";
import {CommonUtils} from "../utils/common-utils";
import {reject} from "q";

type GraphMatrixRow = Array<string|number>;
export type GraphDataHeader = string[];
export type GraphDataField = string[];
export type GraphDataRowDescriptor = string[];
export type GraphDataMatrix = GraphMatrixRow[];

export abstract class AbstractGraphData extends TableData {
    protected abstract createChartOptions(): EchartOptions | Promise<EchartOptions>;

    public static isGraphData(data: any): boolean {
        if (!data) {
            return false;
        }
        if (!data.hasOwnProperty('data') || !(data.data instanceof Array)) {
            return false;
        }
        if (data.hasOwnProperty('header') && !(data.header instanceof Array)) {
            //header property is optional
            return false;
        }
        if (data.hasOwnProperty('rowDescriptor') && !(data.rowDescriptor instanceof Array)) {
            //rowDescriptor property is optional
            return false;
        }
        return true;
    }

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

    private _optionsPatch:EchartOptions;

    public get optionsPatch(): EchartOptions {
        return this._optionsPatch;
    }

    public set optionsPatch(value: EchartOptions) {
        this._optionsPatch = value;
        this.patchOptions(value);
    }

    public patchOptions(patchOpt: EchartOptions, suppressWarning:boolean = false): void {
        if (!this.echartOptions) {
            if (!suppressWarning) console.warn('the options is not ready!');
            return;
        }
        CommonUtils.extendObject(this.echartOptions, patchOpt);
    }

    protected echartOptions: EchartOptions;

    public get options(): EchartOptions | Promise<EchartOptions> {
        if (this.echartOptions) {
            return this.echartOptions;
        }

        const opt = this.createChartOptions();
        if (opt instanceof Promise) {
            opt.then(rawOptions => {
                this._setupOptions(rawOptions);
                return this.echartOptions;
            });
        } else {
            this._setupOptions(opt);
        }
        return opt;
    }

    private _setupOptions(opt:EchartOptions):void {
        this.echartOptions = opt;
        if (this._optionsPatch) {
            this.patchOptions(this._optionsPatch);
        }
    }

    public fromObject(data: any): AbstractGraphData {
        if (!AbstractGraphData.isGraphData(data)) {
            throw new Error('invalid graph data, need at least a "data" property which type is Array!');
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
        this.echartOptions = null;
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
        return {
            title: {
                text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
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
