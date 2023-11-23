import {ChangeDetectionStrategy, Component, Injector, Input, NgModule, ChangeDetectorRef, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";
import {JigsawHeaderModule} from "../header/header";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {FormlyFieldConfig} from '@ngx-formly/core';
import {CommonUtils} from "../../common/core/utils/common-utils";
import {JigsawTooltipModule} from "../../common/directive/tooltip/tooltip";
import {FloatPosition} from "../../common/directive/float/float";

interface StyleCombos {
    [property: string]: string | number;
}

/**
 * 控制组件标题的尺寸
 */
type SectionTitleStyle = {
    /**
     * 控制标题的级别，可选值为1、2、3
     */
    level: 1 | 2 | 3,

    /**
     * 控制组件标题下方的下边距
     */
    marginBottom: string,

    /**
     * 控制多个 form-display 组件之间的上下间距
     */
    marginTop: string
}

/**
 * 单元格配置，用于定义单元格的属性和样式
 */
type TableCellConfig = string | {
    /**
     * 单元格的值
     */
    value: string,

    /**
     * 控制单元格横跨的列数
     */
    colSpan?: number,

    /**
     * 控制单元格横跨的行数
     */
    rowSpan?: number,

    /**
     * 单元格的自定义样式
     */
    style?: StyleCombos,

    /**
     * 指定是否应用表头样式
     */
    isHeader?: boolean;

    /**
     * 指定单元格是否为必填项
     */
    isRequired?: boolean,
}

type TableRowConfig = TableCellConfig[];

/**
 * 表数据的配置
 */
export type TableDataConfig = {
    /**
     * 表的标题内容
     * 优先级data.style > tdStyle > trStyle
     */
    title: string,

    /**
     * 表的数据行配置，参考 `TableRowConfig` 类型
     */
    data: TableRowConfig[]
}

export type TooltipConfig = {
    /**
     * 控制组件单元格是否开启悬浮提示
     * */
    enableTooltip: boolean,

    /**
     * 控制悬浮提示位置
     * */
    position?: FloatPosition,

    /**
     * 控制悬浮提示是否仅在文字过长时显示
     * */
    overflowOnly?: boolean
}

export type FormDisplayStyleOptions = {
    /**
     * 表标题的样式，可选类型为 SectionTitleStyle
     */
    titleStyle?: SectionTitleStyle,

    /**
     * 表格行的统一样式，优先级最低
     */
    trStyle?: StyleCombos,

    /**
     * 表格单元格的统一样式，优先级次之
     */
    tdStyle?: StyleCombos,

    /**
     *  设置表格每列宽度，提供数组少于列数，剩余列数设为auto
     *  如何没设置columnWidths，每列平均分配宽度
     * */
    columnWidths?: number[],

    /**
     *  悬浮提示配置项
     * */
    tooltipConfig?: TooltipConfig,
}

export type StepFieldsConfig = {
    label: string;
    agentId?: string;
    panelHeight?: string;
    fields: FormlyFieldConfig[];
};

@WingsTheme('form-display.scss')
@Component({
    selector: 'jigsaw-form-display',
    templateUrl: './form-display.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-form-display-host]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawFormDisplayComponent extends AbstractJigsawComponent implements OnInit {
    constructor(private _changeDetectorRef: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
    }

    private _data: TableDataConfig[];

    @RequireMarkForCheck()
    @Input()
    public get data() {
        return this._data
    }

    public set data(data: TableDataConfig | TableDataConfig[]) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        this._data = data;
        const form = data[0] || {};
        if (form.hasOwnProperty('fields') || form.hasOwnProperty('templateOptions') || form.hasOwnProperty('fieldGroup')) {
            this._data = this._transformForms(<StepFieldsConfig[] | FormlyFieldConfig[]>data);
        }
        this._$tablesColumnLengths = this._data.map(data => this._$getColumnLength(data.data));
    }

    public update(data: TableDataConfig | TableDataConfig[]) {
        this.data = data;
        this._changeDetectorRef.detectChanges();
    }

    private _styleOptions: FormDisplayStyleOptions[];

    /**
     * 设置组件样式
     */
    @RequireMarkForCheck()
    @Input()
    public get styleOptions() {
        return this._styleOptions;
    }

    public set styleOptions(value: FormDisplayStyleOptions | FormDisplayStyleOptions[]) {
        const dataLength = this._data.length || 1;
        if (CommonUtils.isUndefined(value)) {
            value = Array(dataLength).fill({
                titleStyle: {},
                trStyle:{},
                tdStyle: {},
                columnWidths: [],
                tooltipConfig: {}
            })
        }
        if (!Array.isArray(value)) {
            value = Array(dataLength).fill(value);
        }
        this._styleOptions = value;
        this._$tablesColumns = this._styleOptions.map(option => option.columnWidths || []);
        this._$toolTipConfig = this._styleOptions.map(option => {
            const config: TooltipConfig = {
                enableTooltip: false,
                position: 'top',
                overflowOnly: true
            }
            config.enableTooltip = !!option.tooltipConfig?.enableTooltip;
            config.position = option.tooltipConfig?.position || 'top';
            config.overflowOnly = !!option.tooltipConfig?.overflowOnly;
            return config
        })
    }

    /**
     * 用于储存数据中每一个表的每一列的列宽
     * @internal
     */
    public _$tablesColumns: number[][] = [[0, 0]];

    /**
     * 用于储存数据中每一个表的列数
     * @internal
     */
    public _$tablesColumnLengths: undefined[][];

    /**
     * 用于储存数据中每一个表的tooltip配置
     * @internal
     */
    public _$toolTipConfig: TooltipConfig[];

    /**
     * @internal
     */
    public _$isString(cell: TableCellConfig): boolean {
        return typeof cell === 'string';
    }

    /**
     * @internal
     */
    public _$getColumnLength(data: TableRowConfig[]): undefined[] {
        let maxLength = 0;
        for (const row of data) {
            if (Array.isArray(row)) {
                maxLength = Math.max(maxLength, row.length);
            }
        }
        return [].constructor(maxLength);
    }

    private _transformForms(data: StepFieldsConfig[] | FormlyFieldConfig[]): TableDataConfig[] {
        const formDisplayData: TableDataConfig[] = [];
        if (!Array.isArray(data)) {
            return formDisplayData;
        }
        // 如果第一个数据没有fields，则说明是单一的表单
        if (this._isStepFieldsConfig(data[0])) {
            data.forEach(form => {
                formDisplayData.push(this._transformOneStep(form.fields, form.label))
            })
        } else {
            formDisplayData.push(this._transformOneStep(<FormlyFieldConfig[]>data));
        }
        return formDisplayData;
    }

    private _isStepFieldsConfig(config: FormlyFieldConfig | StepFieldsConfig): boolean {
        return (config as StepFieldsConfig).fields !== undefined;
    }

    private _transformOneStep(data: FormlyFieldConfig[], title: string = ''): TableDataConfig {
        const tableData: TableDataConfig = {title: title, data: []};
        data.forEach(form => {
            tableData.data = tableData.data.concat(this._distinguishData(form));
        });
        return tableData;
    }

    private _distinguishData(form: FormlyFieldConfig | FormlyFieldConfig[]): TableRowConfig[] {
        let tableData: TableRowConfig[] = [];
        if (!Array.isArray(form)) {
            form = [form];
        }
        form.forEach(f => {
            tableData = tableData.concat(this._transformRow(f));
        })
        return tableData;
    }

    private _transformRow(row: FormlyFieldConfig): TableRowConfig[] {
        const tableData: TableRowConfig[] = [];
        let newRow: TableRowConfig = [];
        if (!row.fieldGroup) {
            tableData.push(this._transformCell(row));
        } else {
            row.fieldGroup.forEach((field: FormlyFieldConfig) => {
                newRow = newRow.concat(this._transformCell(field));
            })
            tableData.push(newRow);
        }
        return tableData;
    }

    private _transformCell(field: FormlyFieldConfig): TableCellConfig[] {
        if (!field.templateOptions) {
            return ['', ''];
        }
        const header: TableCellConfig = {value: field.templateOptions.label || "", isRequired: field.templateOptions.required};
        const common: TableCellConfig = {value: field.templateOptions.title || field.templateOptions.value || ""};
        if (field.type == "checkbox" || field.type == 'switch') {
            common.value = `${!!field.templateOptions.checked}`
        }
        if (field.type == "date-time-select") {
            common.value = field.templateOptions.date;
        }
        if (field.type == "range-date-time-select") {
            const date = field.templateOptions.date;
            if (date) {
                common.value = `${date.beginDate}, ${date.endDate}`
            }
        }
        if (field.type == "tile-lite") {
            const selectedItems = field.templateOptions.selectedItems;
            if (selectedItems?.[0]) {
                common.value = `${selectedItems[0]}`
            }
        }
        if (field.type == "list-lite") {
            const selectedItems = field.templateOptions.selectedItems;
            if (selectedItems?.[0]) {
                common.value = `${selectedItems[0].label}`
            }
        }
        return [header, common];
    }
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule, JigsawHeaderModule, JigsawTooltipModule],
    declarations: [JigsawFormDisplayComponent],
    exports: [JigsawFormDisplayComponent]
})
export class JigsawFormDisplayModule {
}
