import {
    NgModule, Component, Input, forwardRef, Output, EventEmitter, ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractJigsawComponent} from "../common";
import {ArrayCollection} from "../../core/data/array-collection";
import {JigsawComboSelectModule} from "../combo-select/index";
import {JigsawListLite, JigsawListLiteModule} from "../list-and-tile/list-lite";
import {CommonUtils} from "../../core/utils/common-utils";

/**
 * 选择控件
 * - 支持单选和多选，自动给出单选的对象和多选的数组
 * - 支持静态数据，异步数据和数据回填
 * - 支持控件不可用
 * - 支持文本溢出显示省略号，鼠标移入有提示信息
 * - 支持设置显示多少option，并自动产生滚动条
 * - 支持Array、ArrayCollection、LocalPageableArray、PageableArray的检索
 * - 支持设置下拉触发的方式
 *
 */
@Component({
    selector: 'jigsaw-select, j-select',
    templateUrl: 'select.html',
    host: {
        '[class.jigsaw-select-host]': 'true',
        '[class.jigsaw-select-single-select]': '!multipleSelect',
        '[style.min-width]': 'multipleSelect ? minWidth : "none"',
        '[style.max-width]': 'multipleSelect ? maxWidth : "none"',
        '[style.width]': '!multipleSelect ? width : "none"'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelect), multi: true},
    ]
})
export class JigsawSelect extends AbstractJigsawComponent implements ControlValueAccessor {

    protected _width: string = '120px';

    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
        this.callLater(() => {
            if(this.multipleSelect) {
                this.minWidth = CommonUtils.getCssValue(value);
                this.maxWidth = CommonUtils.getCssValue(value);
            }
        })
    }

    private _minWidth: string = '120px';

    /**
     * 用于多选时设置最小宽度
     * @returns {string}
     */
    @Input()
    public get minWidth(): string {
        return this._minWidth;
    }

    public set minWidth(value: string) {
        this._minWidth = CommonUtils.getCssValue(value);
    }

    private _maxWidth: string = '100%';

    /**
     * 用于多选时设置最大宽度
     * @returns {string}
     */
    @Input()
    public get maxWidth(): string {
        return this._maxWidth;
    }

    public set maxWidth(value: string) {
        this._maxWidth = CommonUtils.getCssValue(value);
    }

    /**
     * 设置对象的标识
     */
    @Input() public trackItemBy: string | string[];

    /**
     * 设置数据的显示字段
     * @type {string}
     */
    @Input() public labelField: string = 'label';

    /**
     * placeholder文本
     */
    @Input() public placeholder: string;

    /**
     * 不可用属性
     * $demo = select/disabled
     */
    @Input() public disabled: boolean;

    @Input() public optionWidth: string;

    @Input() public optionHeight: string;

    /**
     * 显示的option个数，超出的会显示滚动条
     * $demo = select/option-count
     */
    @Input() public optionCount: number;

    /**
     * 多选开关
     * $demo = select/multiple
     */
    @Input() public multipleSelect: boolean;

    /**
     * 搜索开关
     * $demo = select/searchable
     */
    @Input() public searchable: boolean;

    /**
     * 选择结果框的清除按钮的显示与隐藏
     */
    @Input() public clearable: boolean;

    /**
     * 打开下拉的触发方式
     * @type {string}
     *
     * $demo = select/trigger
     */
    @Input() public openTrigger: 'click' | 'mouseenter' = 'mouseenter';

    /**
     * 关闭下拉的触发方式
     * @type {string}
     *
     * $demo = select/trigger
     */
    @Input() public closeTrigger: 'click' | 'mouseleave' = 'mouseleave';

    private _data: ArrayCollection<object>;

    /**
     * 提供选择的数据集合
     * @returns {ArrayCollection<Object> | Object[]}
     */
    @Input()
    public get data(): ArrayCollection<object> | object[] {
        return this._data;
    }

    public set data(value: ArrayCollection<object> | object[]) {
        this._data = value instanceof ArrayCollection ? value : new ArrayCollection(value);
    }

    private _value: any;

    /**
     * 选择的结果，单选时单个的item对象，多选时是item对象的数组
     * @returns {any}
     *
     * $demo = select/basic
     * $demo = select/multiple
     * $demo = select/async
     */
    @Input()
    public get value(): any {
        return this._value;
    }

    public set value(newValue: any) {
        if (newValue && this._value != newValue) {
            this._propagateChange(newValue);
        }
        this.writeValue(newValue);
    }

    /**
     * 选择结果发生变化时，向外面发送事件
     * @type {EventEmitter<any>}
     *
     * $demo = select/basic
     */
    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(JigsawListLite) private _listCmp: JigsawListLite;

    /**
     * @internal
     */
    public _$selectedItems: ArrayCollection<any> | any[];

    public _$handleSelectChange(selectedItems: any[]) {
        if (!selectedItems) return;
        this._value = this.multipleSelect ? selectedItems : selectedItems[0];
        this._propagateChange(this.value);
        this.valueChange.emit(this.value);
    }

    public _$onComboOpenChange(optionState: boolean) {
        if (optionState || !this.searchable) return;
        // combo关闭时，重置数据
        this._listCmp._$handleSearching();
    }

    private _propagateChange: any = () => {
    };

    public writeValue(value: any): void {
        if (!value || this._value == value) {
            return;
        }
        this._value = value;
        this._$selectedItems = this.multipleSelect ? value : [value];
        if (this.initialized) {
            this.valueChange.emit(this.value);
        }
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}

@NgModule({
    imports: [JigsawComboSelectModule, JigsawListLiteModule],
    declarations: [JigsawSelect],
    exports: [JigsawSelect]
})
export class JigsawSelectModule {
}
