import { TemplateRef, Type, EventEmitter } from "@angular/core";
import {
    BigTableData,
    LocalPageableTableData,
    PageableTableData, RawTableData,
    TableData
} from "../../common/core/data/table-data";
import { SortAs, SortOrder } from "../../common/core/data/component-data";
import { CommonUtils } from "../../common/core/utils/common-utils";
import { TableCellRendererBase } from "./table-renderer";

export type TableColumnTarget = number | string | (number | string)[];
export type ColumnDefineGenerator = (field: string, index: number) => ColumnDefine;
export type TableCellDataGenerator = (tableData: TableData,
    row: number,
    column: number,
    additionalData: AdditionalTableData) => any;
export type TableHeaderDataGenerator = (tableData: TableData,
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
    maxWidth?: number;
}

export class AdditionalColumnDefine {
    pos?: number;
    visible?: boolean;
    width?: string | number;
    header?: TableHeader;
    cell?: TableCell;
    group?: boolean;
    maxWidth?: number;
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

export type TableRenderer = TableSyncRenderer | TableAsyncRenderer | string;

export class TableHeader {
    text?: string; // 此属性专门用于additionalColumnDefine的header设置显示表头
    renderer?: TableRenderer;
    rendererInitData?: any;
    clazz?: string;
    sortable?: boolean;
    sortAs?: SortAs;
    defaultSortOrder?: SortOrder;
    filterable?: boolean;
    filterHistoryStorageSize?: number;
    data?: any | TableHeaderDataGenerator; // 用于设置自定义表头
    innerHtmlContext?: any;
    alignment?: 'default' | 'left' | 'center' | 'right';
    noPadding?: boolean;
}

export class TableCell {
    renderer?: TableRenderer;
    rendererInitData?: any;
    clazz?: string;
    editable?: boolean;
    alwaysShowEditor?: boolean;
    editorRenderer?: TableRenderer;
    editorRendererInitData?: any;
    data?: any | TableCellDataGenerator;
    tooltip?: any;
    innerHtmlContext?: any;
    alignment?: 'default' | 'left' | 'center' | 'right';
    noPadding?: boolean;
}

export class TableHeadSetting {
    cellData: string | number;
    width: string | number;
    maxWidth: number;
    visible: boolean;
    renderer: Type<TableCellRendererBase> | TemplateRef<any>;
    rendererInitData?: any;
    clazz: string;
    sortable: boolean;
    sortAs: SortAs;
    filterable: boolean;
    filterHistoryStorageSize: number;
    defaultSortOrder: SortOrder;
    field: string;
    innerHtmlContext: any;
    alignment: 'default' | 'left' | 'center' | 'right';
    noPadding: boolean;
}

export class TableCellSetting {
    cellData: any;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRendererBase> | TemplateRef<any>;
    rendererInitData: any;
    clazz: string;
    editable: boolean;
    alwaysShowEditor: boolean;
    editorRenderer: Type<TableCellRendererBase> | TemplateRef<any>;
    editorRendererInitData: any;
    group: boolean;
    field: string;
    rowSpan: number;
    tooltip: any;
    innerHtmlContext: any;
    alignment: 'default' | 'left' | 'center' | 'right';
    noPadding: boolean;
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

/**
 * 用户在界面上，通过渲染器“摸”了表格的附加列之后，表格会将用户当时“摸过”列的相关信息，
 * 以此类型保存在内存中备用。这些数据是渲染器在判定哪些列被“摸过”时的关键数据，
 * 应用也可以通过`AdditionalTableData`的各个api更新这些数据。
 *
 * $since = v1.1.4
 */
export class TouchedValue {
    key: any | any[];
    value: any;
    data: any[];
}
export class AdditionalTableData extends TableData {

    public change = new EventEmitter();

    /**
     * 这个属性的值与`JigsawTable.trackRowBy`的值是相等的，关于这个属性的作用，
     * 请访问[这个链接](/#/components/table-column-defines?demo=table-column-defines-update-additional-column-defines)。
     */
    public trackRowBy: string;
    public originData: RawTableData;

    private _touchedValues: { [field: string]: TouchedValue[] } = {};
    private _trackRowByFields: number[];

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

    /**
     * 清空所有数据
     *
     * $since = v1.1.4
     */
    public clearTouchedValues(): void {
        this._touchedValues = {};
    }

    public reset() {
        this.data.splice(0, this.data.length);
        this.clearTouchedValues();
    }

    private _getKeysByRow(field: string, row: number): any[] {
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
     *
     * @param field
     * @param row
     * @param value
     */
    public cacheValue(field: string | number, row: number, value: any): void {
        console.warn("`cacheValue()` is deprecated from v1.1.4, use `touchValueByRow()` instead");
        this.touchValueByRow(field, row, value);
    }

    /**
     * 更新用户“摸过”的单元格的值。
     *
     * $since = v1.1.4
     *
     * @param field 需要更新的列名或者列索引
     * @param row 当前页行索引，只支持更新表格的当前页数据，如果需要更新其他页的数据，请使用`touchValue()`方法
     * @param value 将此变量替代缓存里的数据，如果缓存里不存在对应的数据，则会新建一个对应的数据
     */
    public touchValueByRow(field: string | number, row: number, value: any): void {
        const fieldString = this._toFieldString(field);
        const keys = this._getKeysByRow(fieldString, row);
        this.touchValue(field, keys, value, this.originData.data[row]);
    }

    /**
     * 更新用户“摸过”的单元格的值。如果需要更新的是当前页，则通过`touchValueByRow()`方法更新会更方便些。
     *
     * $since = v1.1.4
     *
     * @param field 需要更新的列名或者列索引
     * @param key 通过此值来确定更新缓存中的哪一行或者哪些行的数据，
     * 一般需要配合[`trackRowBy`属性](/#/components/table-renderer?demo=table-renderer-checkbox-column)一起使用。
     * @param value 将此变量替代缓存里的数据，如果缓存里不存在对应的数据，则会新建一个对应的数据
     * @param data 可选，表格内置渲染器会自动将该行对应的数据存放在这个属性上，
     * 方便应用在需要时使用该行的其他数据。
     */
    public touchValue(field: string | number, key: any | any[], value: any, data?: any[]): void {
        const fieldString = this._toFieldString(field);
        if (!fieldString || CommonUtils.isUndefined(key)) {
            return;
        }

        if (!this._touchedValues[fieldString]) {
            this._touchedValues[fieldString] = [];
        }
        const touchedValues = this._touchedValues[fieldString];

        const touchedValue = touchedValues.find(item => this._isKeyEquals(item.key, key));
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

    /**
     * 获取用户“摸过”的单元格的数据
     * - 如果需要获取缓存的详细信息，请使用`getTouchedInfoByRow()`
     * - 如果需要获取其他页的信息，请使用`getTouchedValue()`或者`getTouchedInfo()`
     *
     * $since = v1.1.4
     *
     * @param field 需要获取的列名或者列索引
     * @param row 当前页行索引，支持获取表格的当前页数据，如果需要获取其他页的数据，请使用`getTouchedValue()`方法
     * @return 用户“摸过”之后改单元格的新值。
     */
    public getTouchedValueByRow(field: string | number, row: number): any {
        const v = this.getTouchedInfoByRow(field, row);
        return v ? v.value : undefined;
    }

    /**
     * 获取用户“摸过”的单元格的详细信息，可以直接更新得到的值，调用`JigsawTable.update()`方法可以刷新界面。
     *
     * 只能返回当前页的数据，如果需要获取其他页的数据，请使用`getTouchedInfo()`。
     *
     * $since = v1.1.4
     *
     * @param field 需要获取的列名或者列索引
     * @param row 当前页行索引，支持获取表格的当前页数据，如果需要获取其他页的数据，请使用`getTouchedValue()`方法
     * @return 用户“摸过”之后该单元格对应缓存数据对象。
     */
    public getTouchedInfoByRow(field: string | number, row: number): TouchedValue {
        const fieldString = this._toFieldString(field);
        const keys = this._getKeysByRow(fieldString, row);
        return this.getTouchedInfo(field, keys);
    }

    /**
     * 获取用户“摸过”的单元格的值，可获取任意页的缓存数据。
     *
     * $since = v1.1.4
     *
     * @param field 需要获取的列名或者列索引
     * @param key
     *
     */
    public getTouchedValue(field: string | number, key: any | any[]): any;
    /**
     * @deprecated
     *
     * @param field
     * @param row 按行索引取值的重载**已经被废弃**，请使用`getTouchedValueByRow()`替代。
     *
     */
    public getTouchedValue(field: string | number, row: number): any;
    /**
     * @internal
     */
    public getTouchedValue(field: string | number, key: number | any | any[]): any {
        let v;
        if (typeof key === 'number') {
            console.warn("`getTouchedValue()` is deprecated from v1.1.4, use `getTouchedValueByRow()` instead");
            v = this.getTouchedValueByRow(field, key);
        } else {
            v = this.getTouchedInfo(field, key);
        }
        return v ? v.value : undefined;
    }

    /**
     * 获取用户“摸过”的单元格的详细信息，可以直接更新得到的值，调用`JigsawTable.update()`方法可以刷新界面。
     *
     * 通过此方法可获取任意页的缓存数据。
     *
     * $since = v1.1.4
     *
     * @param field 需要获取的列名或者列索引
     * @param key 通过此值来确定更新缓存中的哪一行或者哪些行的数据，
     * 一般需要配合[`trackRowBy`属性](/#/components/table-renderer?demo=table-renderer-checkbox-column)一起使用。
     *
     */
    public getTouchedInfo(field: string | number, key: any | any[]): TouchedValue {
        const fieldString = this._toFieldString(field);
        if (!fieldString || CommonUtils.isUndefined(key)) {
            return;
        }
        if (!this._touchedValues[fieldString]) {
            return;
        }

        const touchedValues = this._touchedValues[fieldString];
        return touchedValues.find(item => this._isKeyEquals(item.key, key));
    }

    /**
     * 当表格单元格的值是对象而非简单类型的时候，对key的比较需要采用严格模式
     *
     * $since = v1.1.4
     *
     * @param key1
     * @param key2
     *
     *
     */
    private _isKeyEquals(key1: any, key2: any): boolean {
        if (key1 instanceof Array && key2 instanceof Array) {
            if (key1.length != key2.length || key1.length == 0) {
                return false;
            }
            // 注意，对数组的元素的比较，不再区分类型，一律采用值比较
            return !key1.some((item, index) => (this._getObjectValue(item) !== this._getObjectValue(key2[index])));
        } else {
            return this._getObjectValue(key1) === this._getObjectValue(key2);
        }
    }

    private _getObjectValue(obj: any): any {
        if (typeof obj !== 'object') {
            return obj;
        }
        if (obj && obj.hasOwnProperty('toString')) {
            return obj.toString();
        }
        if (obj && obj.hasOwnProperty('valueOf')) {
            return obj.valueOf();
        }
        return obj;
    }

    /**
     * $deprecatedFrom = v1.1.4
     * $replacement = getAllTouched()
     *
     * @deprecated
     *
     * @param field
     *
     */
    public getTouchedValues(field: string | number): TouchedValue[] {
        console.warn("`getTouchedValues()` is deprecated from v1.1.4, use `getAllTouched()` instead");
        return this.getAllTouched(field);
    }

    /**
     * 获取用户在表格上“摸过”的所有行的详细信息，对这些信息做修改后调用`JigsawTable.update()`方法可以刷新界面
     *
     * $since = v1.1.4
     *
     * @param field 需要获取的列名或者列索引
     * @returns 返回所有行的详细信息
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

export type TableRowExpandOptions = { action?: 'toggle' | 'show' | 'hide', remainOpenAfterDataChanges?: boolean };

export type TableStyleOptions = {
    rowStyles?: TableRowStyle,
    headerStyles?: TableHeaderStyle,
    cellStyles?: TableCellStyle
}

export type TableRowStyle = {
    /**
     * 行高
     */
    height?: string,

    /**
     * 表格行间距
     */
    spacing?: string,

    /**
     * 行背景填充
     */
    backgroundFill?: string,

    /**
     * 奇数行背景填充
     */
    oddBackgroundFill?: string,

    /**
     * 偶数行背景填充
     */
    evenBackgroundFill?: string,

    /**
     * 行悬浮背景填充
     */
    hoverBackgroundFill?: string,

    /**
     * 行选中背景填充
     */
    selectedBackgroundFill?: string,

    /**
     * 行边框类型
     */
    borderType?: TableRowBorderType,

    /**
     * 行边框宽度
     */
    borderWidth?: string,

    /**
     * 行边框样式
     */
    borderStyle?: string,

    /**
     * 行边框颜色
     */
    borderColor?: string,

    /**
     * 行边框圆角
     */
    borderRadius?: string,

    /**
     * 行透明度
     */
    opacity?: string,

    /**
     * 行阴影
     */
    boxShadow?: string,
}

export type TableHeaderStyle = {
    /**
     * 表头高度
     */
    height?: string,

    /**
     * 表头背景填充
     */
    backgroundFill?: string,

    /**
     * 行边框类型
     */
    borderType?: TableRowBorderType,

    /**
     * 行边框宽度
     */
    borderWidth?: string,

    /**
     * 行边框样式
     */
    borderStyle?: string,

    /**
     * 行边框颜色
     */
    borderColor?: string,

    /**
     * 表头分割线颜色
     */
    dividerColor?: string,

    /**
     * 表头分割线类型
     */
    dividerType?: string,

    /**
     * 表头分割线样式
     */
    dividerStyle?: string,

    /**
     * 表头分割线宽度
     */
    dividerWidth?: string,

    /**
     * 表头文字对齐类型
     */
    textAlign?: TableTextAlign,

    /**
     * 表头文字粗细类型
     */
    textWeight?: TableTextWeight,

    /**
     * 表头文字样式类型
     */
    textStyle?: TableTextStyle,

    /**
     * 表头文字颜色
     */
    textColor?: string,

    /**
     * 表头文字大小
     */
    textSize?: string,
}

export type TableCellStyle = {
    /**
     * 表格文字对齐类型
     */
    textAlign?: TableTextAlign,

    /**
     * 表格文字粗细类型
     */
    textWeight?: TableTextWeight,

    /**
     * 表格文字样式类型
     */
    textStyle?: TableTextStyle,

    /**
     * 表格文字颜色
     */
    textColor?: string,

    /**
     * 表格文字大小
     */
    textSize?: string,
}

/**
 * 表示表格行边框类型的字符串字面值类型。
 * - 'none' 表示无线框。
 * - 'all' 表示所有线框。
 * - 'outer' 表示外侧线框。
 * - 'topBottom' 表示上下框线。
 */
export type TableRowBorderType = 'none' | 'all' | 'outer' | 'topBottom';

/**
 * 表示表头分割线类型的字符串字面值类型。
 * - 'none' 表示无覆盖线框。
 * - 'all' 表示所有覆盖线框。
 * - 'outer' 表示外侧线框。
 * - 'bottom' 表示底部分割线。
 */
export type TableDividerType = 'none' | 'all' | 'outer' | 'bottom';

/**
 * 表示表格文字粗细类型的字符串字面值类型。
 * - 'normal' 表示正常文字。
 * - 'bold' 表示加粗文字。
 */
export type TableTextWeight = 'normal' | 'bold';

/**
 * 表示表格文字样式类型的字符串字面值类型。
 * - 'normal' 表示正常文字。
 * - 'italic' 表示斜体文字。
 */
export type TableTextStyle = 'normal' | 'italic';

/**
 * 表示表格文字对齐类型的字符串字面值类型。
 * - 'default' 表示默认对齐方式。
 * - 'left' 表示左对齐。
 * - 'center' 表示居中对齐。
 * - 'right' 表示右对齐。
 */
export type TableTextAlign = 'default' | 'left' | 'center' | 'right';

/**
 * 表示表格边框的位置的字符串字面值类型。
 * - 'top' 表示上边框。
 * - 'bottom' 表示下边框。
 * - 'left' 表示左边框。
 * - 'right' 表示右边框。
 */
export type TableBorderPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * 表格单元格渲染器里的额外事件统一发出的事件类型。
 * - 'cellType' 表示渲染器名。
 * - 'event.name' 表示事件名。
 * - 'event.data' 表示$event。
 * - 'cellData' 表示当前单元格数据
 * - 'row' 表示当前单元格所在行
 * - 'field' 表示当前单元格所在列的field
 */
export type CellRendererEvent = {
    cellType: string,
    event: { name: string, data: any },
    cellData: any,
    row: number,
    field: string
}