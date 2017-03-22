
import {TableData} from "./table-data";


type GraphMatrixRow = Array<string|number>;
export type GraphDataHeader = string[];
export type GraphDataRowDescriptor = string[];
export type GraphDataMatrix = GraphMatrixRow[];

export abstract class AbstractGraphData extends TableData {
    protected abstract createChartOptions():any;

    constructor(public data: GraphDataMatrix = [],
                public header:GraphDataHeader = [],
                public rowDescriptor:GraphDataRowDescriptor = []) {
        super(data, [], header);
        this._makeFakeField();

        if (!rowDescriptor) {
            throw new Error('invalid rowDescriptor data!');
        }
    }

    protected chartOptions:any;

    public get options():any {
        if (!this.chartOptions) {
            this.chartOptions = this.createChartOptions();
        }
        return this.chartOptions;
    }

    public fromObject(data: any):AbstractGraphData {
        if (!data.hasOwnProperty('data') || !(data.data instanceof Array)) {
            throw new Error('need a "data" property which type is Array!');
        }
        this.clearData();

        TableData.arrayAppend(this.data, data.data);
        if (data.hasOwnProperty('header')) {
            TableData.arrayAppend(this.header, data.header);
            this._makeFakeField();
        }
        if (data.hasOwnProperty('rowDescriptor')) {
            TableData.arrayAppend(this.rowDescriptor, data.rowDescriptor);
        }
        this.refresh();

        return this;
    }

    private _makeFakeField():void {
        this.header.forEach(item => this.field.push(item));
    }

    protected clearData(): void {
        super.clearData();
        this.rowDescriptor.splice(0, this.rowDescriptor.length);
    }

}

export class AbstractPieGraphData extends AbstractGraphData {
    protected createChartOptions(): any {
        return undefined;
    }
}
