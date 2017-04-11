import {Http, RequestOptionsArgs} from "@angular/http";
import {EchartTitle, EchartLegend, EchartTooltip, EchartOptions} from "./echart-types";
import {TableData} from "./table-data";
import {ComponentDataHelper} from "./component-data";
import {Subject} from "rxjs";
import 'rxjs/add/operator/map';

type GraphMatrixRow = Array<string | number>;
export type GraphDataHeader = string[];
export type GraphDataField = string[];
export type GraphDataRowDescriptor = string[];
export type GraphDataMatrix = GraphMatrixRow[];

export class GraphData extends TableData {
    constructor(public data?: GraphDataMatrix,
                public header?: GraphDataHeader,
                public rowDescriptor?: GraphDataRowDescriptor,
                public field?: GraphDataField) {
        super(data, field, header);
        if (!data) {
            this.data = [];
        }
        if (!field) {
            this.field = [];
        }
        if (!header) {
            this.header = [];
        }
        if (!rowDescriptor) {
            this.rowDescriptor = [];
        }
        this._makeFields();
        this.refresh();
    }

    //图共有属性
    public _seriesData: object[] = [];
    public _hasRightData: boolean = true;

    public static isGraphData(data: any): boolean {
        return data && data.hasOwnProperty('data') && data.data instanceof Array &&
            data.hasOwnProperty('header') && data.header instanceof Array &&
            data.hasOwnProperty('rowDescriptor') && data.rowDescriptor instanceof Array;
    }

    public optionsPatch: EchartOptions;

    protected createChartOptions(): any {
        return undefined;
    }

    protected echartOptions: EchartOptions;

    public get options(): EchartOptions {
        if (!this.echartOptions) {
            this.echartOptions = this.createChartOptions();
        }
        return this.extendEchartsOption(this.echartOptions, this.optionsPatch);
    }

    public fromObject(data: any): GraphData {
        if (!data.hasOwnProperty('data') || !(data.data instanceof Array)) {
            this._hasRightData = false;
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

    public fromAjax(options?: RequestOptionsArgs | string): void {
        const op = ComponentDataHelper.castToRequestOptionsArgs(options);
        this.busy = true;

        this.http.request(op.url, op)
            .map(res => this.reviseData(res))
            .map(data => {
                const graphData: GraphData = new GraphData();

                if (GraphData.isGraphData(data)) {
                    graphData.fromObject(data);
                } else {
                    console.error('invalid data format, need a TableData object.');
                    this._hasRightData = false;
                }
                return graphData;
            })
            .subscribe(
                graphData => this.ajaxSuccessHandler(graphData),
                error => this.ajaxErrorHandler(error),
                () => this.ajaxCompleteHandler()
            );
    }

    protected ajaxSuccessHandler(graphData: any): void {
        graphData.rowDescriptor.forEach(data => {
            data && this.rowDescriptor.push(data);
        });
        this.header = graphData.header;
        this.data = graphData.data;
        this.refresh();
        console.log('get data from  server success!!');
    }

    private _makeFields(): void {
        if ((!this.field || this.field.length == 0) && this.header) {
            this.header.forEach(item => this.field.push(item));
        }
    }

    protected clearData(): void {
        super.clearData();
        this.rowDescriptor.splice(0, this.rowDescriptor.length);
    }

    public patchOptions(patchOpt: Object): void {
        if (!patchOpt) return;
        this.optionsPatch = patchOpt;
    }

    public isObject(obj) {
        return obj !== null && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
    }

    protected extendEchartsOption(targetObject, sourceObj) {
        if (!sourceObj) return targetObject;
        if (!targetObject) return sourceObj;
        for (var param in sourceObj) {
            var dst = targetObject[param];
            var src = sourceObj[param];
            if (dst === src) {
                continue;
            }
            if (this.isObject(src)) {
                dst = dst || {};
                targetObject[param] = this.extendEchartsOption(dst, src);
            } else if (dst != null && src instanceof Array) {
                targetObject[param] = this.extendEchartsOption(dst, src);
            } else {
                targetObject[param] = src;
            }
        }
        return targetObject;
    }
}

export class OutlineMapData extends GraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}


export class PieGraphData extends GraphData {

    constructor(http?: Http) {
        super();
        this.http = http;
    }

    protected createChartOptions(): any {
        if (this.busy)  return;
        let series = [];
        for (let i = 0; i < this.data.length; i++) {
            series.push(this.data[i]);
        }

        return {
            "legend": {
                data: this.rowDescriptor
            },
            "series": [{
                data: series
            }]
        };
    }

}

export class DonutGraphData extends PieGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class LineBarGraphData extends GraphData {

    constructor(http?: Http) {
        super();
        this.http = http;
    }

    protected createChartOptions(): any {
        if (this.busy)  return;
        let series = [];
        for (let i = 0; i < this.data.length; i++) {
            series.push({"data": this.data[i], "name": (this.rowDescriptor[i] || "")});
        }

        let xAxisData = [];
        this.header.forEach(data => {
            xAxisData.push({"data": data});
        });

        return {
            "xAxis": xAxisData,
            "legend": {
                data: this.rowDescriptor
            },
            "series": series
        };
    }
}

export class GaugeGraphData extends GraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class ScatterGraphData extends GraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class RadarGraphData extends GraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class HeatGraphData extends GraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}
