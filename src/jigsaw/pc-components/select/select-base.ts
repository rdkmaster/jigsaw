import {ChangeDetectorRef, Directive, EventEmitter, Injector, Input, NgZone, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor} from "@angular/forms";
import {AbstractJigsawComponent, IJigsawFormControl} from "../../common/common";
import {ArrayCollection, LocalPageableArray, PageableArray} from "../../common/core/data/array-collection";
import {JigsawListLite} from "../list-and-tile/list-lite";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {CheckBoxStatus} from "../checkbox/typings";
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

type SelectOption = {
    (labelField: string): string;
    disabled?: boolean;
};

@Directive()
export abstract class JigsawSelectBase
    extends AbstractJigsawComponent
    implements IJigsawFormControl, ControlValueAccessor {
    public constructor(
        protected _changeDetector: ChangeDetectorRef,
        protected _injector: Injector,
        protected _zone?: NgZone
    ) {
        super(_zone);
    }

    protected _width: string = "120px";

    /**
     * 宽度
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
        this.runAfterMicrotasks(() => {
            this._zone.run(() => {
                if (this.multipleSelect) {
                    this.minWidth = CommonUtils.getCssValue(value);
                    this.maxWidth = CommonUtils.getCssValue(value);
                }
            });
        });
    }

    private _minWidth: string = "120px";

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

    private _maxWidth: string = "100%";

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

    private _optionWidth: string;
    /**
     * 选项宽度
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get optionWidth(): string {
        return this._optionWidth;
    }

    public set optionWidth(value: string) {
        this._optionWidth = CommonUtils.getCssValue(value);
    }

    /**
     * 选项高度
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public optionHeight = 32;

    private _optionCount: number;
    /**
     * 显示的option个数，超出的会显示滚动条
     * 目前默认
     * optionHeight = 32px;
     * 多选时，全选高度为32px
     *
     * @NoMarkForCheckRequired
     *
     * $demo = select/option-count
     */
    @Input()
    public get optionCount(): number {
        return this._optionCount;
    }

    public set optionCount(value: number) {
        this._optionCount = value;
        let multiHeight = 0;
        if (CommonUtils.isUndefined(value)) {
            return;
        }
        if (this.multipleSelect) {
            multiHeight = 32;
        }
        this._$listHeight = value * this.optionHeight + multiHeight + "px";
    }

    /**
     * @internal
     */
    public _$listHeight: string;

    /**
     * 设置对象的标识
     *
     * @NoMarkForCheckRequired
     */
    private _trackItemBy: string | string[];

    /**
     * 设置对象的标识
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get trackItemBy(): string | string[] {
        if (this.data && (typeof this.data[0] == 'string' || typeof this.data[0] == 'number')) {
            this._trackItemBy = null;
        } else if (CommonUtils.isUndefined(this._trackItemBy) && this.data && typeof this.data[0] !== 'string') {
            this._trackItemBy = [this.labelField];
        }
        return this._trackItemBy;
    }

    public set trackItemBy(value: string | string[]) {
        this._trackItemBy = typeof value === 'string' ? value.split(/\s*,\s*/g) : value;
    }

    /**
     * 设置数据的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = "label";

    /**
     * 是否有效
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public valid: boolean = true;

    /**
     * 不可用属性
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled: boolean;

    /**
     * 多选开关
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public multipleSelect: boolean = false;

    /**
     * 选择结果框的清除按钮的显示与隐藏
     * $demo = select/clearable
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public clearable: boolean;

    /**
     * placeholder文本
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public placeholder: string;

    /**
     * 设置多选框显示详细结果/统计结果
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public useStatistics: boolean = true;

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
    public closeTrigger: "click" | "mouseleave" = "mouseleave";

    /**
     * 已选选项
     *
     * @internal
     */
    public _$selectedItems: ArrayCollection<SelectOption> | any[];

    private _value: any;

    /**
     * 选择的结果，单选时单个的item对象，多选时是item对象的数组
     *
     * @NoMarkForCheckRequired
     */
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

    public writeValue(value: any, emit = true): void {
        if (CommonUtils.isDefined(value)) {
            this._$selectedItems = this.multipleSelect ? value : [value];
        } else {
            this._$selectedItems = [];
        }
        // 表单初始值需要check
        this._changeDetector.markForCheck();
        if (this.initialized && emit) {
            this.valueChange.emit(this.value);
        }
    }

    private _propagateChange: any = () => {
    };

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    private _onTouched: any = () => {
    };

    public registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    /**
     * 全选
     *
     * @internal
     */
    public _$selectAllChecked = CheckBoxStatus.unchecked;

    /**
     * @internal
     */
    public _$selectAll() {
        if (this._$selectedItems && this._$selectedItems.length === this.validData.length) {
            this._$selectedItems = [];
            this._$selectAllChecked = CheckBoxStatus.unchecked;
        } else {
            this._$selectedItems = this.validData;
            this._$selectAllChecked = CheckBoxStatus.checked;
        }
        this._changeDetector.markForCheck();
    }

    /**
     * @internal
     */
    public _$checkSelectAll() {
        if (this._$selectedItems.length === 0) {
            this._$selectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this._$selectedItems.length === this.validData.length) {
            this._$selectAllChecked = CheckBoxStatus.checked;
        } else {
            this._$selectAllChecked = CheckBoxStatus.indeterminate;
        }
        this._changeDetector.markForCheck();
    }

    /**
     * 下拉显示已选选项
     *
     * @internal
     */
    public _$showSelected: boolean = false;

    private _removeOnRefresh: CallbackRemoval;

    protected _data: ArrayCollection<SelectOption>;
    public validData: SelectOption[];

    /**
     * 提供选择的数据集合
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<SelectOption> | SelectOption[] | LocalPageableArray<SelectOption> | PageableArray {
        return this._data;
    }

    public set data(value: ArrayCollection<SelectOption> | SelectOption[] | LocalPageableArray<SelectOption> | PageableArray) {
        this._data = (value instanceof ArrayCollection || value instanceof LocalPageableArray || value instanceof PageableArray) ? value : new ArrayCollection(value);
        this._setValidData();
        if (this._data instanceof LocalPageableArray || this._data instanceof PageableArray || this._data instanceof ArrayCollection) {
            if (this._removeOnRefresh) {
                this._removeOnRefresh();
            }
            this._removeOnRefresh = this._data.onRefresh(() => {
                this._setValidData();
                this._changeDetector.markForCheck();
            })
        }
    }

    private _setValidData() {
        // 不能直接使用this.data.filter，data可能是LocalPageableArray或者PageableArray，filter api不一样
        this.validData = this._data.concat().filter(item => item["disabled"] !== true);
    }

    /**
     * 在多选时，用户点击被选中条目的叉叉时发出此事件
     *
     * $demo = select/multiple
     */
    @Output()
    public remove: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(JigsawListLite)
    private _listCmp: JigsawListLite;

    @ViewChild(PerfectScrollbarDirective)
    private _listScrollbar: PerfectScrollbarDirective;

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
            this._value = (this.multipleSelect || !selectedItems) ? selectedItems : selectedItems[0];
            this._propagateChange(this.value);
            this.valueChange.emit(this.value);
            this._changeDetector.markForCheck();
        }
    }

    /**
     * @internal
     */
    public _$onComboOpenChange(optionState: boolean) {
        if (optionState || !this.searchable) return;
        // combo关闭时，重置数据
        this._$handleSearching();
    }

    /**
     * @internal
     */
    public _$onTagRemove(removedItem): void {
        this.remove.emit(removedItem);
        this.valueChange.emit(this.value);
        this._$checkSelectAll();
        this._changeDetector.markForCheck();
    }

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        if(this.data instanceof LocalPageableArray || this.data instanceof PageableArray) {
            this._filterData(filterKey);
        } else {
            const data = new LocalPageableArray<SelectOption>();
            data.pagingInfo.pageSize = Infinity;
            const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
                // 在新建data准备好再赋值给组件data，防止出现闪动的情况
                removeUpdateSubscriber.unsubscribe();
                this.data = data;
                this._filterData(filterKey);
            });
            data.fromArray(this.data);
        }
    }

    private _filterData(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        (<LocalPageableArray<any> | PageableArray>this.data).filter(filterKey, [this.labelField]);
        this._listScrollbar && this._listScrollbar.scrollToTop();
    }
}

export abstract class JigsawSelectGroupBase extends JigsawSelectBase {
    /**
     * 设置组名的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public groupField: string = "groupName";

    protected _data: ArrayCollection<SelectOption>;
    public validData: any[];

    /**
     * 提供选择的数据集合
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<SelectOption> | SelectOption[] {
        return this._data;
    }

    public set data(value: ArrayCollection<SelectOption> | SelectOption[]) {
        this._data = value instanceof ArrayCollection ? value : new ArrayCollection(value);
        let allOptions = [];
        value.forEach(item => {
            allOptions = allOptions.concat(item["data"]);
        });
        this.validData = allOptions.filter(item => item["disabled"] !== true);
    }
}
