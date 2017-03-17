import {AbstractGeneralCollection} from "./general-collection";

export type TableHeader = Array<string>;
export type TableField = Array<string>;
export type TableMatrixRow = Array<string|number>;
export type TableMatrix = Array< TableMatrixRow >

export class TableData extends AbstractGeneralCollection {
  constructor(public data: TableMatrix = [],
              public field: TableField = [],
              public header: TableHeader = []) {
    super();
    if (!header) {
      throw new Error('invalid header data!');
    }
    if (!field) {
      throw new Error('invalid field data!');
    }
    if (!data) {
      throw new Error('invalid data data!');
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

    TableData._arrayAppend(this.data, data.data);
    TableData._arrayAppend(this.field, data.field);
    TableData._arrayAppend(this.header, data.header);
    this.refresh();

    return this;
  }

  private static _arrayAppend(dest:Array<any>, source:any):void {
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

  public toArray(): Array<any> {
    const result: Array<any> = [];
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
    console.log('destroying TableData....');
  }

  public static isTableData(data: any): boolean {
    return data && data.hasOwnProperty('data') && data.data instanceof Array &&
      data.hasOwnProperty('header') && data.header instanceof Array &&
      data.hasOwnProperty('field') && data.field instanceof Array;
  }
}
