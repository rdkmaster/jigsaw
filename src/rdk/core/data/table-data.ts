import {AbstractGeneralCollection} from "./general-collection";
import {
    IFilterable, IPageable, ISortable, PagingInfo, DataFilterInfo, DataSortInfo, SortAs,
    SortOrder
} from "./component-data";

type TableMatrixRow = Array<string|number>;
export type TableDataHeader = string[];
export type TableDataField = string[];
export type TableDataMatrix = TableMatrixRow[];

export class TableDataBase extends AbstractGeneralCollection {
    public static isTableData(data: any): boolean {
        return data && data.hasOwnProperty('data') && data.data instanceof Array &&
            data.hasOwnProperty('header') && data.header instanceof Array &&
            data.hasOwnProperty('field') && data.field instanceof Array;
    }

    constructor(public data?: TableDataMatrix,
                public field?: TableDataField,
                public header?: TableDataHeader) {
        super();
        if (!data) {
            this.data = [];
        }
        if (!field) {
            this.field = [];
        }
        if (!header) {
            this.header = [];
        }
    }

    protected isDataValid(data): boolean {
        return TableDataBase.isTableData(data);
    }

    protected ajaxSuccessHandler(data): void {
        if (this.isDataValid(data)) {
            this.fromObject(data);
        } else {
            console.log('invalid raw TableData received from server...');
            this.clearData();
            this.refresh();
        }
        this.componentDataHelper.invokeAjaxSuccessCallback(data);
    }

    public fromObject(data: any): TableDataBase {
        if (!this.isDataValid(data)) {
            throw new Error('invalid raw TableData object!');
        }

        this.clearData();

        TableDataBase.arrayAppend(this.data, data.data);
        TableDataBase.arrayAppend(this.field, data.field);
        TableDataBase.arrayAppend(this.header, data.header);
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
        console.log('destroying TableDataBase....');
    }
}

export class TableData extends TableDataBase implements ISortable {
    public sortInfo: DataSortInfo;

    public sort(as: SortAs, order: SortOrder, field: string | number): void;
    public sort(sort: DataSortInfo): void;
    public sort(as, order?: SortOrder, field?: string | number): void {
        field = typeof field === 'string' ? this.field.indexOf(field) : field;
        this.sortInfo = as instanceof DataSortInfo ? as : new DataSortInfo(as, order, field);
        const orderFlag = this.sortInfo.order == SortOrder.asc ? 1 : -1;
        if (this.sortInfo.as == SortAs.number) {
            this.data.sort((a, b) => orderFlag * (Number(a[field]) - Number(b[field])));
        } else {
            this.data.sort((a, b) => orderFlag * String(a[field]).localeCompare(String(b[field])));
        }
    }
}

export class ServerSidePagingTableData extends TableData implements IPageable, IFilterable {
    public filterInfo: DataFilterInfo;
    public pagingInfo: PagingInfo;

    public filter(term: string, fields?: string[] | number[]): void;
    public filter(term: DataFilterInfo): void;
    public filter(term, fields?: string[] | number[]): void {
    }

    public changePage(currentPage: number, pageSize?: number): void {
    }
}
