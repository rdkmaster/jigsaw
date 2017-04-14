import {EchartTitle, EchartLegend, EchartTooltip, EchartOptions} from "./echart-types";
import {TableDataBase} from "./table-data";
import {CommonUtils} from "../utils/common-utils";

type GraphMatrixRow = Array<string | number>;
export type GraphDataHeader = string[];
export type GraphDataField = string[];
export type GraphDataRowDescriptor = string[];
export type GraphDataMatrix = GraphMatrixRow[];

export abstract class AbstractGraphData extends TableDataBase {
    protected abstract createChartOptions(): EchartOptions;

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
    }

    private _optionsPatch: EchartOptions;

    public get optionsPatch(): EchartOptions {
        return this._optionsPatch;
    }

    public set optionsPatch(value: EchartOptions) {
        this._optionsPatch = value;
        this.patchOptions(value);
    }

    public patchOptions(patchOpt: EchartOptions, suppressWarning: boolean = false): void {
        if (!this.echartOptions) {
            if (!suppressWarning) console.warn('the options is not ready!');
            return;
        }
        CommonUtils.extendObject(this.echartOptions, patchOpt);
    }

    protected echartOptions: EchartOptions;

    public get options(): EchartOptions {
        if (this.echartOptions) {
            return this.echartOptions;
        }

        const opt = this.createChartOptions();
        this._setupOptions(opt);
        return opt;
    }

    private _setupOptions(opt: EchartOptions): void {
        this.echartOptions = opt;
        if (this._optionsPatch) {
            this.patchOptions(this._optionsPatch);
        }
    }

    public ajaxSuccessHandler(data): void {
        super.ajaxSuccessHandler(data);
        this.fromObject(data);
    }

    public ajaxErrorHandler(error): void {
        super.ajaxErrorHandler(error);
        this.clearData();
        this.refresh();
    }

    public fromObject(data: any): AbstractGraphData {
        if (!AbstractGraphData.isGraphData(data)) {
            throw new Error('invalid graph data, need at least a "data" property which type is Array!');
        }
        this.clearData();

        TableDataBase.arrayAppend(this.data, data.data);
        if (data.hasOwnProperty('header')) {
            TableDataBase.arrayAppend(this.header, data.header);
        }
        if (data.hasOwnProperty('field')) {
            TableDataBase.arrayAppend(this.field, data.field);
        }
        if (data.hasOwnProperty('rowDescriptor')) {
            TableDataBase.arrayAppend(this.rowDescriptor, data.rowDescriptor);
        }
        this._makeFields();
        this.refresh();

        return this;
    }

    private _makeFields(): void {
        if ((!this.field || this.field.length == 0) && this.header) {
            this.header.forEach(item => this.field.push(item));
        }
    }

    protected clearData(): void {
        super.clearData();
        this.rowDescriptor.splice(0, this.rowDescriptor.length);
        this.echartOptions = null;
    }

    protected isDataValid(data, ...checkProperty): boolean {
        if (!checkProperty) {
            checkProperty = [];
        }
        checkProperty.push("data");

        for (let i = 0; i < checkProperty.length; i++) {
            let prop = data[checkProperty[i]];
            if (!prop || !(prop instanceof Array) || prop.length == 0) {
                return false;
            }
        }
        return true;
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


export class PieGraphData extends AbstractGraphData {
    constructor(title: string | EchartTitle, series: any[], tooltip?: EchartTooltip) {
        super();
        this._title = <EchartTitle>(typeof title === 'string' ? {title: title} : title);
        this._series = series;
        this._tooltip = tooltip;
    }

    private _series: any[];

    public get series(): any[] {
        return this._series;
    }

    public set series(value: any[]) {
        this._series = value;
        this.refresh();
    }

    private _title: EchartTitle;

    public get title(): string | EchartTitle {
        return this._title;
    }

    public set title(value: string | EchartTitle) {
        this._title = <EchartTitle>(typeof value === 'string' ? {title: value} : value);
        this.refresh();
    }

    private _tooltip: EchartTooltip;

    public get tooltip(): EchartTooltip {
        return this._tooltip;
    }

    public set tooltip(value: EchartTooltip) {
        this._tooltip = value;
        this.refresh();
    }

    protected createChartOptions(): EchartOptions {
        const opt: EchartOptions = {
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series: [
                {
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
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
        opt.title = this._title;
        if (this._tooltip) {
            opt.tooltip = this._tooltip;
        }
        opt.series[0].data = this._series;
        this._series.forEach(item => {
            if (!item.hasOwnProperty('name')) {
                item.name = 'no-name-series';
            }
            opt.legend.data.push(item.name);
        });
        return opt;
    }
}

export class PieGraphDataByColumn extends AbstractNormalGraphData {
    private _column: number = 0;

    public get column(): number {
        return this._column;
    }

    public set column(value: number) {
        this._column = value;
        this.refresh();
    }

    protected optionsTemplate:EchartOptions = {
        tooltip: {
            trigger: 'item',
            formatter: "{a}<br>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: []
        },
        series: [
            {
                data: [],
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
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

    protected createChartOptions(): EchartOptions {
        if (!this.isDataValid(this, 'rowDescriptor', 'header')) {
            return undefined;
        }
        const opt: EchartOptions = this.optionsTemplate;
        opt.legend.data = this.rowDescriptor;
        opt.title = this.title;
        if (this.tooltip) {
            opt.tooltip = this.tooltip;
        }
        opt.series[0].name = this.header[this.column];
        this.data.forEach((row, index) => {
            const val = row[this.column];
            opt.series[0].data.push({value: val, name: this.rowDescriptor[index]});
        });
        return opt;
    }
}

export class PieGraphDataByRow extends PieGraphDataByColumn {
    private _row: number = 0;

    public get row(): number {
        return this._row;
    }

    public set row(value: number) {
        this._row = value;
        this.refresh();
    }

    protected createChartOptions(): EchartOptions {
        if (!this.isDataValid(this, 'rowDescriptor', 'header')) {
            return undefined;
        }
        const rowData = this.data[this.row];
        if (!rowData) {
            console.error('invalid data, row[%s] not found!', this.row);
            return undefined;
        }

        const opt: EchartOptions = this.optionsTemplate;
        opt.title = this.title;
        opt.legend.data = this.header;
        if (this.tooltip) {
            opt.tooltip = this.tooltip;
        }
        opt.series[0].name = this.rowDescriptor[this.row];

        rowData.forEach((val, index) => {
            opt.series[0].data.push({value: val, name: this.header[index]});
        });
        return opt;
    }
}

export class DonutGraphData extends PieGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}

export class LineBarGraphData extends AbstractNormalGraphData {
    protected getDataByColumn(index: number): any[] {
        const result: any[] = [];
        this.data.forEach(row => result.push(row[index]));
        return result;
    }

    protected createChartOptions(): EchartOptions {
        if (!this.isDataValid(this, 'header', 'rowDescriptor')) {
            return null;
        }

        const options: EchartOptions = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: this.header
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
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.rowDescriptor
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: []
        };
        this.data.forEach((row, index) => {
            options.series.push({name: this.header[index], type: 'line', data: this.getDataByColumn(index)});
        });
        options.title = this.title;
        return options;
    }
}

export class LineBarGraphDataByRow extends AbstractNormalGraphData {
    protected createChartOptions(): EchartOptions {
        if (!this.isDataValid(this, 'header', 'rowDescriptor')) {
            console.error('invalid data, "need these properties: "data"/"rowDescriptor"/"header"');
            return null;
        }
        const options: EchartOptions = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: this.rowDescriptor
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
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.header
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: []
        };
        this.data.forEach((row, index) => {
            options.series.push({name: this.rowDescriptor[index], type: 'line', data: row});
        });
        options.title = this.title;
        return options;
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
