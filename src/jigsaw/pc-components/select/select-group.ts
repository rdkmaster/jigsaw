import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    NgZone,
    OnInit,
    Output,
    ViewChild,
    Injector
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AbstractJigsawComponent } from "../../common/common";
import { ArrayCollection } from "../../common/core/data/array-collection";
import { JigsawListLite } from "../list-and-tile/list-lite";
import { CommonUtils } from "../../common/core/utils/common-utils";
import { RequireMarkForCheck } from "../../common/decorator/mark-for-check";

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
    selector: "jigsaw-select-group, j-select-group",
    templateUrl: "select-group.html",
    host: {
        "[class.jigsaw-select-group-host]": "true",
        "[class.jigsaw-select-group-single]": "!multipleSelect",
        "[class.jigsaw-select-group-multiple]": "multipleSelect",
        "[class.jigsaw-select-group-show-overall]": "overall",
        "[style.min-width]": 'multipleSelect ? minWidth : "none"',
        "[style.max-width]": 'multipleSelect ? maxWidth : "none"',
        "[style.width]": '!multipleSelect ? width : "none"'
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelectGroup), multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSelectGroup extends AbstractJigsawComponent implements ControlValueAccessor, OnInit {
    constructor(
        protected _zone: NgZone,
        private _changeDetector: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector
    ) {
        super(_zone);
    }

    protected _width: string = "160px";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
    }

    private _minWidth: string = "160px";
    /**
     * 用于多选时设置最小宽度
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get minWidth(): string {
        return this._minWidth;
    }

    public set minWidth(value: string) {
        this._minWidth = CommonUtils.getCssValue(value);
    }

    private _maxWidth: string;

    /**
     * 用于多选时设置最大宽度
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get maxWidth(): string {
        return this._maxWidth;
    }

    public set maxWidth(value: string) {
        this._maxWidth = CommonUtils.getCssValue(value);
    }

    /**
     * 选择结果框的清除按钮的显示与隐藏
     * $demo = select/clearable
     */
    @RequireMarkForCheck()
    @Input()
    public clearable: boolean;

    /**
     * 设置对象的标识
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public trackItemBy: string | string[];

    /**
     * 设置数据的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = "label";

    /**
     * 设置组名的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public groupName: string = "groupName";

    /**
     * 已选选项
     *
     * @internal
     */
    public _$selectedItems: ArrayCollection<any> | any[];

    /**
     * 是否有效
     *
     * @internal
     */
    @Input()
    @RequireMarkForCheck()
    public valid: boolean = true;

    /**
     * 不可用属性
     *
     * @internal
     */
    @RequireMarkForCheck()
    @Input()
    public disabled: boolean;

    /**
     * placeholder文本
     *
     * @internal
     */
    @RequireMarkForCheck()
    @Input()
    public placeholder: string;

    /**
     * 多选开关
     *
     * @NoMarkForCheckRequired
     *
     */
    @Input()
    public multipleSelect: boolean = false;

    /**
     * 设置多选框显示详细结果/统计结果
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public overall: boolean = true;

    /**
     * 全选
     *
     * @internal
     */
    public _$selectAllChecked: boolean = false;
    public _$selectAll() {
        if (this._$selectedItems && this._$selectedItems.length === this.vaildData.length) {
            this._$selectedItems = [];
            this._$selectAllChecked = false;
        } else {
            this._$selectedItems = this.vaildData;
            this._$selectAllChecked = true;
        }
        this._changeDetector.markForCheck();
    }
    public _$checkSelectAll() {
        if (this._$selectedItems.length === this.vaildData.length) {
            this._$selectAllChecked = true;
        } else {
            this._$selectAllChecked = false;
        }
        this._changeDetector.markForCheck();
    }

    /**
     * 查看已选
     *
     * @internal
     */
    public _$listFilter: boolean = false;
    public _$listShowSelected() {
        this._$listFilter = true;
    }
    public _$listShowAll() {
        this._$listFilter = false;
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public optionWidth: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public optionHeight: string;

    /**
     * 显示的option个数，超出的会显示滚动条
     *
     * @NoMarkForCheckRequired
     *
     * $demo = select/option-count
     */
    @Input()
    public optionCount: number;

    /**
     * 搜索开关
     *
     * @NoMarkForCheckRequired
     *
     * $demo = select/searchable
     */
    @Input()
    public searchable: boolean;

    /**
     * 打开下拉的触发方式
     *
     * $demo = select/trigger
     */
    @RequireMarkForCheck()
    @Input()
    public openTrigger: "click" | "mouseenter" = "click";

    /**
     * 关闭下拉的触发方式
     *
     * @NoMarkForCheckRequired
     *
     * $demo = select/trigger
     */
    @Input()
    public closeTrigger: "click" | "mouseleave" = "click";

    private _data: ArrayCollection<object>;
    private vaildData: any[];
    public _$allOptions: any[];

    /**
     * 提供选择的数据集合
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<object> | object[] {
        return this._data;
    }

    public set data(value: ArrayCollection<object> | object[]) {
        this._data = value instanceof ArrayCollection ? value : new ArrayCollection(value);
        this._$allOptions = [];
        value.forEach(item => {
            this._$allOptions = this._$allOptions.concat(item["data"]);
        });
        this.vaildData = this._$allOptions.filter(item => item["disabled"] !== true);
    }

    private _value: any;

    /**
     * 选择的结果，单选时单个的item对象，多选时是item对象的数组
     * $demo = select/basic
     * $demo = select/multiple
     * $demo = select/async
     */
    @RequireMarkForCheck()
    @Input()
    public get value(): any {
        return this._value;
    }

    public set value(newValue: any) {
        if (this._value == newValue) {
            return;
        }
        let trackItemBy: string[];
        if (this.trackItemBy) {
            trackItemBy =
                Object.prototype.toString.call(this.trackItemBy) == "[object Array]"
                    ? <string[]>this.trackItemBy
                    : [this.trackItemBy.toString()];
        }
        if (this.initialized && CommonUtils.compareWithKeyProperty(this._value, newValue, trackItemBy)) {
            return;
        }
        this._propagateChange(newValue);
        this._value = newValue;
        if (this.initialized) {
            this.writeValue(newValue);
        }
    }

    /**
     * 选择结果发生变化时，向外面发送事件
     *
     * $demo = select/basic
     */
    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter<any>();

    /**
     * 在多选时，用户点击被选中条目的叉叉时发出此事件
     *
     * $demo = select/multiple
     */
    @Output()
    public remove: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(JigsawListLite)
    private _listCmp: JigsawListLite;

    /**
     * @internal
     */
    public _$handleSelectChange(selectedItems: any[]) {
        if (!selectedItems) return;
        this._value = this.multipleSelect ? selectedItems : selectedItems[0];
        this._propagateChange(this.value);
        this.valueChange.emit(this.value);
        this._$checkSelectAll();
        this._changeDetector.markForCheck();
    }

    /**
     * @internal
     */
    public _$handleClearable(selectedItems: any[]) {
        if (!this.clearable) {
            return;
        }
        if (!selectedItems || selectedItems.length == 0) {
            this.value = [];
            this._changeDetector.markForCheck();
        }
    }

    /**
     * @internal
     */
    public _$onComboOpenChange(optionState: boolean) {
        if (optionState || !this.searchable) return;
        // combo关闭时，重置数据
        this._listCmp && this._listCmp._$handleSearching();
    }

    /**
     * @internal
     */
    public _$onTagRemove(removedItem): void {
        this.remove.emit(removedItem);
        this.valueChange.emit(this.value);
        this._changeDetector.markForCheck();
    }

    private _propagateChange: any = () => {};

    public writeValue(value: any, emit = true): void {
        if (CommonUtils.isDefined(value)) {
            this._$selectedItems = this.multipleSelect ? value : [value];
        } else {
            this._$selectedItems = [];
        }
        if (this.initialized && emit) {
            this.valueChange.emit(this.value);
        }
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {}

    ngOnInit() {
        super.ngOnInit();
        // 设置默认选中的初始值
        if (CommonUtils.isDefined(this.value)) {
            this.writeValue(this.value, false);
        }
    }
}
