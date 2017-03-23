import {TableData} from "./table-data";
import {EchartTitle, EchartLegend, EchartTooltip, EchartOptions} from "./echart-types";

type GraphMatrixRow = Array<string|number>;
export type GraphDataHeader = string[];
export type GraphDataField = string[];
export type GraphDataRowDescriptor = string[];
export type GraphDataMatrix = GraphMatrixRow[];

export abstract class AbstractGraphData extends TableData {
    protected abstract createChartOptions(): any;

    public optionsPatch:EchartOptions;

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
            this.patchOptions();
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
        if (this.field.length == 0) {
            this.header.forEach(item => this.field.push(item));
        }
    }

    protected clearData(): void {
        super.clearData();
        this.rowDescriptor.splice(0, this.rowDescriptor.length);
    }

    protected patchOptions():void {
        if (!this.optionsPatch) {
            return;
        }
        //TODO 实现打补丁功能
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
    protected createChartOptions(): any {
        return undefined;
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
