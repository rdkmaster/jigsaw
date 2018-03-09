import {TemplateRef, Type} from "@angular/core";
import {
    BigTableData,
    LocalPageableTableData,
    PageableTableData, RawTableData,
    TableData
} from "../../core/data/table-data";
import {SortAs, SortOrder} from "../../core/data/component-data";
import {TableCellRendererBase} from "./table-renderer";
import {CommonUtils} from "../../core/utils/common-utils";

export type TableColumnTarget = number | string | (number | string)[];
export type ColumnDefineGenerator = (field: string, index: number) => ColumnDefine;
export type TableCellDataGenerator = (tableData: TableData,
                                      row: number,
                                      column: number,
                                      additionalData: AdditionalTableData) => any;

export class TableValueGenerators {
    public static rowIndexGenerator(tableData: TableData, row: number): any {
        let index = 1;

        if (tableData instanceof BigTableData) {
            index += (tableData.cache.startPage - 1) * tableData.pagingInfo.pageSize + tableData.viewport.verticalTo;
        } else if (tableData instanceof PageableTableData || tableData instanceof LocalPageableTableData) {
            index += (tableData.pagingInfo.currentPage - 1) * tableData.pagingInfo.pageSize;
        }

        index += row;
        return index;
    }

    public static originCellDataGenerator(tableData: TableData, row: number, column: number): any {
        return tableData && tableData.data && tableData.data[row] ? tableData.data[row][column] : '';
    }
}

export class ColumnDefine {
    target?: TableColumnTarget;
    visible?: boolean;
    width?: string | number;
    header?: TableHeader;
    cell?: TableCell;
    group?: boolean;
}

export class AdditionalColumnDefine {
    pos?: number;
    visible?: boolean;
    width?: string | number;
    header?: TableHeader;
    cell?: TableCell;
    group?: boolean;
}

export class TableDataChangeEvent {
    field: string | number;
    row: number | number[];
    column: number;
    cellData: string | number;
    oldCellData: string | number;
}

export type TableAsyncRenderer = () => TemplateRef<any>;

export type TableSyncRenderer = Type<TableCellRendererBase> | TemplateRef<any>;

export type TableRenderer = TableSyncRenderer | TableAsyncRenderer;

export class TableHeader {
    text?: string;
    renderer?: TableRenderer;
    clazz?: string;
    sortable?: boolean;
    sortAs?: SortAs;
    defaultSortOrder?: SortOrder;
}

export class TableCell {
    renderer?: TableRenderer;
    clazz?: string;
    editable?: boolean;
    editorRenderer?: TableRenderer;
    data?: any | TableCellDataGenerator;
    tooltip?: any;
}

export class TableHeadSetting {
    cellData: string | number;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz: string;
    sortable: boolean;
    sortAs: SortAs;
    defaultSortOrder: SortOrder;
    field: string;
}

export class TableCellSetting {
    cellData: any;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz: string;
    editable: boolean;
    editorRenderer: Type<TableCellRendererBase> | TemplateRef<any>;
    group: boolean;
    field: string;
    rowSpan: number;
    tooltip: any;
}

export class SortChangeEvent {
    sortAs: SortAs;
    order: SortOrder;
    field: string;
}

/**
 * @internal
 */
export function _getColumnIndex(data: TableData, additionalData: TableData, field: string): [number, TableData] {
    let index = data.field.indexOf(field);
    if (index != -1) {
        return [index, data];
    }
    index = additionalData ? additionalData.field.indexOf(field) : -1;
    if (index != -1) {
        return [index, additionalData];
    }
    return [-1, undefined];
}

export type TouchedValue = { key: string | string[], value: any, data: any[] };

export class AdditionalTableData extends TableData {
    public trackRowBy: string;
    public originData: RawTableData;

    private _touchedValues: { [field: string]: TouchedValue[] } = {};
    private _trackRowByFields: number[];
    private _splitter: string = '_%%_';

    private _fixTrackRowFields() {
        if (this._trackRowByFields) {
            return;
        }
        this._trackRowByFields = [];
        const fields = this.trackRowBy ? this.trackRowBy.split(/\s*,\s*/g) : this.originData.field;
        fields.forEach(field => {
            const col = this.originData.field.findIndex(f => f === field);
            if (col == -1) {
                return;
            }
            this._trackRowByFields.push(col);
        });
    }

    private _toFieldString(field: string | number): string {
        return typeof field === 'string' ? field : this.field[field];
    }

    /**
     * $deprecatedFrom = v1.1.4
     * $replacement = clearTouchedValues()
     *
     * @deprecated
     */
    public clearCachedValues(): void {
        console.warn("`clearCachedValues()` is deprecated from v1.1.4, use `clearTouchedValues()` instead");
        this.clearTouchedValues();
    }

    public clearTouchedValues(): void {
        this._touchedValues = {};
    }

    private _getKeysByRow(field: string, row: number): string[] {
        const keys = [];
        if (!this.originData) {
            console.warn('set originData and trackRowBy property of table before caching a value');
            return keys;
        }
        this._fixTrackRowFields();

        const excludedColumn = this.originData.field.findIndex(f => f === field);
        this._trackRowByFields.forEach(col => {
            if (col == excludedColumn || CommonUtils.isUndefined(this.originData.data[row])) {
                return;
            }
            keys.push(this.originData.data[row][col]);
        });
        return keys;
    }

    /**
     * $deprecatedFrom = v1.1.4
     * $replacement = touchValueByRow()
     *
     * @deprecated
     */
    public cacheValue(field: string | number, row: number, value: any): void {
        console.warn("`cacheValue()` is deprecated from v1.1.4, use `touchValueByRow()` instead");
        this.touchValueByRow(field, row, value);
    }

    public touchValueByRow(field: string | number, row: number, value: any): void {
        const fieldString = this._toFieldString(field);
        const keys = this._getKeysByRow(fieldString, row);
        this.touchValue(field, keys, value, this.originData.data[row]);
    }

    public touchValue(field: string | number, key: string | string[], value: any, data?: any[]): void {
        const fieldString = this._toFieldString(field);
        if (!fieldString || CommonUtils.isUndefined(key)) {
            return;
        }

        if (!this._touchedValues[fieldString]) {
            this._touchedValues[fieldString] = [];
        }
        const touchedValues = this._touchedValues[fieldString];

        const touchedValue = touchedValues.find(item => {
            return this._toKeyString(item.key) === this._toKeyString(key);
        });
        if (touchedValue) {
            touchedValue.value = value;
            touchedValue.data = data ? data : touchedValue.data;
        } else {
            touchedValues.push({
                // 长度只有1的时候，使用字符串简化应用对这个值的使用，毕竟单一key的情况应该是绝大多数
                key: key,
                value: value,
                data: data
            });
        }
    }

    public getTouchedValueByRow(field: string | number, row: number): any {
        const v = this.getTouchedInfoByRow(field, row);
        return v ? v.value : undefined;
    }

    public getTouchedInfoByRow(field: string | number, row: number): TouchedValue {
        const fieldString = this._toFieldString(field);
        const keys = this._getKeysByRow(fieldString, row);
        return this.getTouchedInfo(field, keys);
    }

    /**
     * 获取用户在表格上操作过的所有行的值
     *
     * @param {string | number} field
     * @param {string | string[]} key
     * @returns {any}
     */
    public getTouchedValue(field: string | number, key: string | string[]): any;
    /**
     * $deprecatedFrom = v1.1.4
     * $replacement = getTouchedValueByRow()
     *
     * 获取用户在表格上操作过的所有行的值
     *
     * @deprecated
     *
     * @param {string | number} field
     * @param {number} key
     * @returns {any}
     */
    public getTouchedValue(field: string | number, key: number): any;
    /**
     * @internal
     */
    public getTouchedValue(field: string | number, key: number | string | string[]): any {
        let v;
        if (typeof key === 'number') {
            console.warn("`getTouchedValue()` is deprecated from v1.1.4, use `getTouchedValueByRow()` instead");
            v = this.getTouchedValueByRow(field, key);
        } else {
            v = this.getTouchedInfo(field, key);
        }
        return v ? v.value : undefined;
    }

    public getTouchedInfo(field: string | number, key: string | string[]): TouchedValue {
        const fieldString = this._toFieldString(field);
        if (!fieldString || CommonUtils.isUndefined(key)) {
            return;
        }
        if (!this._touchedValues[fieldString]) {
            return;
        }

        const touchedValues = this._touchedValues[fieldString];
        return touchedValues.find(item => {
            return this._toKeyString(item.key) === this._toKeyString(key);
        });
    }

    /**
     * 兼容object[]的toKeyString
     * @param {string | string[]} key
     * @param {string} splitter
     * @returns {string}
     * @private
     */
    private _toKeyString(key: string | string[]): string {
        return key instanceof Array ? key.reduce((arr, item) => {
            arr.push(item + '');
            return arr;
        }, []).join(this._splitter) : key + '';
    }

    /**
     * $deprecatedFrom = v1.1.4
     * $replacement = getAllTouched()
     *
     * 获取用户在表格上操作过的所有行的信息，对这些信息做修改后调用`table.update()`方法可以刷新界面
     *
     * @deprecated
     *
     * @param {string | number} field
     * @returns {TouchedValue[]}
     */
    public getTouchedValues(field: string | number): TouchedValue[] {
        console.warn("`getTouchedValues()` is deprecated from v1.1.4, use `getAllTouched()` instead");
        return this.getAllTouched(field);
    }

    /**
     * 获取用户在表格上操作过的所有行的信息，对这些信息做修改后调用`table.update()`方法可以刷新界面
     *
     * @param {string | number} field
     * @returns {TouchedValue[]}
     */
    public getAllTouched(field: string | number): TouchedValue[] {
        const fieldString = this._toFieldString(field);
        if (!fieldString) {
            return [];
        }
        if (!this._touchedValues[fieldString]) {
            this._touchedValues[fieldString] = [];
        }
        return this._touchedValues[fieldString];
    }
}


