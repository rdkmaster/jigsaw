import {TableData} from "./table-data";

type GraphMatrixRow = Array<string|number>;
export type GraphDataHeader = string[];
export type GraphDataField = string[];
export type GraphDataRowDescriptor = string[];
export type GraphDataMatrix = GraphMatrixRow[];

export abstract class AbstractGraphData extends TableData {
    protected abstract createChartOptions(): any;

    constructor(public data: GraphDataMatrix = [],
                public header: GraphDataHeader = [],
                public rowDescriptor: GraphDataRowDescriptor = [],
                public field: GraphDataField) {
        super(data, field, header);
        this._makeFields();

        if (!rowDescriptor) {
            throw new Error('invalid rowDescriptor data!');
        }
    }

    protected chartOptions: any;

    public get options(): any {
        if (!this.chartOptions) {
            this.chartOptions = this.createChartOptions();
        }
        return this.chartOptions;
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

}

export class GraphTitle {
    //TODO: 补充完整
    constructor(public text: string,
                public subtext?: string,
                public left?: string,
                public right?: string,
                public top?: string,
                public bottom?: string,
                public show?: boolean) {
    }
}

export class GraphLegendItem {
    constructor(public name: string, icon?: string) {
    }
}

export class GraphLegend {
    //TODO: 补充完整
    constructor(public data: GraphLegendItem[],
                public left?: string,
                public right?: string,
                public top?: string,
                public bottom?: string,
                public show?: boolean) {
    }
}

export class GraphTooltip {
    //TODO: 补充完整
    constructor(public formatter?: string|Function,
                public show?: boolean) {
    }
}

export abstract class AbstractNormalGraphData extends AbstractGraphData {
    public title: GraphTitle;
    public legend: GraphLegend;
    public tooltip: GraphTooltip;
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
