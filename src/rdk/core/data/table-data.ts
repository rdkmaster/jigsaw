import {AbstractGeneralCollection} from "./general-collection";

type TableMatrixRow = Array<string|number>;
export type TableDataHeader = string[];
export type TableDataField = string[];
export type TableDataMatrix = TableMatrixRow[];

export class TableData extends AbstractGeneralCollection {
    public static isTableData(data: any): boolean {
        return data && data.hasOwnProperty('data') && data.data instanceof Array &&
            data.hasOwnProperty('header') && data.header instanceof Array &&
            data.hasOwnProperty('field') && data.field instanceof Array;
    }

    constructor(public data: TableDataMatrix = [],
                public field: TableDataField = [],
                public header: TableDataHeader = []) {
        super();
        if (!header) {
            throw new Error('invalid header data!');
        }
        if (!field) {
            throw new Error('invalid field data!');
        }
        if (!data) {
            throw new Error('invalid matrix data!');
        }
    }

    protected ajaxSuccessHandler(data): void {
        if (TableData.isTableData(data)) {
            this.fromObject(data);
        } else {
            console.log('invalid raw TableData received from server...');
            this.clearData();
            this.refresh();
        }
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    public fromObject(data: any): TableData {
        if (!TableData.isTableData(data)) {
            throw new Error('invalid raw TableData object!');
        }

        this.clearData();

        TableData.arrayAppend(this.data, data.data);
        TableData.arrayAppend(this.field, data.field);
        TableData.arrayAppend(this.header, data.header);
        this.refresh();

        return this;
    }

    protected static arrayAppend(dest: any[], source: any): void {
        if (!source) {
            return;
        }
        if (source instanceof Array) {
            source.forEach(item => {
                dest.push(item);
            });
        } else {
            dest.push(source);

        }
    }

    public toArray(): any[] {
        const result: any[] = [];
        if (!this.data || !this.field) {
            return result;
        }

        this.data.forEach(row => {
            let item = {};
            this.field.forEach((field, index) => {
                item[field] = row[index];
            });
            result.push(item);
        });
        return result;
    }

    protected clearData(): void {
        this.data.splice(0, this.data.length);
        this.header.splice(0, this.header.length);
        this.field.splice(0, this.field.length);
    }

    public destroy(): void {
        super.destroy();
        this.clearData();
        console.log('destroying TableData....');
    }
}
