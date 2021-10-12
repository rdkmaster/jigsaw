import {ChangeDetectorRef, Directive, EventEmitter, Injector, Input, NgZone, OnDestroy, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor} from "@angular/forms";
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {AbstractJigsawComponent, IJigsawFormControl} from "../../common/common";
import {ArrayCollection, LocalPageableArray, PageableArray} from "../../common/core/data/array-collection";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {CheckBoxStatus} from "../checkbox/typings";

export type SelectOption = {
    disabled?: boolean;
    label?: string;
    [field: string]: string | boolean | SelectOption[];
};

@Directive()
export abstract class JigsawSelectBase extends AbstractJigsawComponent implements IJigsawFormControl, ControlValueAccessor, OnDestroy {
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
     * @internal
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

    private _trackItemBy: string | string[];

    /**
     * 设置对象的标识
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get trackItemBy(): string | string[] {
        const isObjectArray = this.data && typeof this.data[0] !== 'string' && typeof this.data[0] !== 'number';
        return isObjectArray ? (CommonUtils.isDefined(this._trackItemBy) ? this._trackItemBy : [this.labelField]) : null;
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

    protected _value: any;

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
        const changed = this._setValue(newValue);
        if (!changed) {
            return;
        }
        this.runMicrotask(() => {
            if (CommonUtils.isDefined(newValue)) {
                this._$selectedItems = this.multipleSelect ? newValue : [newValue];
            } else {
                this._$selectedItems = new ArrayCollection([]);
            }
            this._$checkSelectAll();
        })
    }

    protected _setValue(newValue: any): boolean {
        if (this._$selectedItems == newValue) {
            this._value = newValue;
            return false;
        }

        if (this._value == newValue) {
            return false;
        }

        let trackItemBy: string[];
        if (this.trackItemBy) {
            trackItemBy =
                Object.prototype.toString.call(this.trackItemBy) == "[object Array]"
                    ? <string[]>this.trackItemBy
                    : [this.trackItemBy.toString()];
        }
        if (this.initialized && CommonUtils.compareWithKeyProperty(this._value, newValue, trackItemBy)) {
            return false;
        }
        this._value = newValue;
        return true;
    }

    /**
     * 选择结果发生变化时，向外面发送事件
     *
     * $demo = select/basic
     */
    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter<any>();

    public writeValue(value: any, emit = true): void {
        // 表单初始值需要check
        this.value = value;
        this._changeDetector.markForCheck();
    }

    protected _propagateChange: any = () => {
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
        if (this._allSelectCheck()) {
            this._$selectedItems = new ArrayCollection([]);
            this._$selectAllChecked = CheckBoxStatus.unchecked;
        } else {
            this._$selectedItems = new ArrayCollection(this._getValidData());
            this._$selectAllChecked = CheckBoxStatus.checked;
        }
        this._value = this._$selectedItems;
        this._propagateChange(this.value);
        this.valueChange.emit(this.value);
        this._changeDetector.markForCheck();
    }

    /**
     * @internal
     */
    public _$checkSelectAll() {
        if (!this._$selectedItems || this._$selectedItems.length === 0 || this._validDataAllNotSelected()) {
            this._$selectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this._allSelectCheck()) {
            this._$selectAllChecked = CheckBoxStatus.checked;
        } else {
            this._$selectAllChecked = CheckBoxStatus.indeterminate;
        }
        this._changeDetector.markForCheck();
    }

    /**
     * 搜索过滤的时候会存在当前已选不在当期列表中的情况
     */
    private _validDataAllNotSelected(): boolean {
        if (!this._$selectedItems || !this._getValidData()) {
            return false;
        }
        return this.searchable && this._$selectedItems.every(
            item => !this._getValidData().find(data => CommonUtils.compareWithKeyProperty(item, data, <string[]>this._trackItemBy)))
    }

    /**
     * 搜索过滤的时候会存在当前已选不在当期列表中的情况
     */
    protected _validDataAllSelected(): boolean {
        if (!this._$selectedItems || !this._getValidData()) {
            return false;
        }
        return this.searchable && this._getValidData().every(
            data => !!this._$selectedItems.find(item => CommonUtils.compareWithKeyProperty(item, data, <string[]>this._trackItemBy)))
    }

    protected _allSelectCheck() {
        const validData = this._getValidData();
        if (!this._$selectedItems || !validData) {
            return false;
        }
        if (this.searchable) {
            return this._validDataAllSelected();
        } else {
            return this._$selectedItems.length === validData.length
        }
    }

    /**
     * @internal
     */
    public _$showAllStatistics(): boolean {
        if (!this.multipleSelect || !this.useStatistics || !this._$selectedItems || !this._$selectedItems.length) {
            return false
        }
        if (this.searchable) {
            return this._$selectedItems.length === this._getValidData().length && !this._searchKey;
        } else {
            return this._$selectedItems.length === this._getValidData().length
        }
    }

    /**
     * @internal
     */
    public _$showNumStatistics(): boolean {
        if (!this.multipleSelect || !this.useStatistics || !this._$selectedItems || !this._getValidData() || !this._$selectedItems.length) {
            return false
        }
        return !this._$showAllStatistics();
    }

    /**
     * 为了消除统计的闪动，需要先把搜索字段临时存放在bak里面
     */
    protected _searchKey: string;
    protected _searchKeyBak: string;

    /**
     * 下拉显示已选选项
     *
     * @internal
     */
    public _$showSelected: boolean = false;

    protected _data: ArrayCollection<SelectOption>;
    protected _removeOnRefresh: CallbackRemoval;

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeOnRefresh) {
            this._removeOnRefresh();
        }
    }

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
        this._setData(value);
        if (this._data instanceof LocalPageableArray || this._data instanceof PageableArray || this._data instanceof ArrayCollection) {
            if (this._removeOnRefresh) {
                this._removeOnRefresh();
            }
            this._removeOnRefresh = this._data.onRefresh(() => {
                this._$checkSelectAll();
                // 等待数据处理完成赋值，消除统计的闪动
                this._searchKey = this._searchKeyBak;
                this._changeDetector.markForCheck();
            })
        }
    }

    protected _setData(value: ArrayCollection<SelectOption> | SelectOption[] | LocalPageableArray<SelectOption> | PageableArray) {
        if (value instanceof ArrayCollection) {
            for (let i = value.length - 1; i >= 0; i--) {
                if (CommonUtils.isUndefined(value[i])) {
                    value.splice(i, 1);
                }
            }
        } else {
            value = (value || []).filter(el => el != null);
        }
        this._data = value instanceof ArrayCollection ? value : new ArrayCollection(value);
    }

    protected _getValidData(){
        // 不能直接使用this.data.filter，data可能是LocalPageableArray或者PageableArray，filter api不一样
        return this._data.concat().filter(item => !item.disabled);
    }

    /**
     * 在多选时，用户点击被选中条目的叉叉时发出此事件
     *
     * $demo = select/multiple
     */
    @Output()
    public remove: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(PerfectScrollbarDirective)
    private _listScrollbar: PerfectScrollbarDirective;

    /**
     * @internal
     */
    public _$handleSelectChange(selectedItems: any[]) {
        if (!selectedItems) return;
        this._value = this.multipleSelect ? selectedItems : selectedItems[0];
        this.valueChange.emit(this.value);
        this._propagateChange(this.value);
        this._$checkSelectAll();
        this._changeDetector.markForCheck();
    }

    /**
     * @internal
     */
    public _$handleClearable() {
        this._value = this.multipleSelect ? new ArrayCollection([]) : "";
        this._$selectAllChecked = CheckBoxStatus.unchecked;
        this._propagateChange(this.value);
        this.valueChange.emit(this.value);
        this._changeDetector.markForCheck();
    }

    /**
     * @internal
     */
    public _$onComboOpenChange(optionState: boolean) {
        this._onTouched();
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
        // 为了消除统计的闪动，需要先把搜索字段临时存放在bak里面
        this._searchKeyBak = filterKey;
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

export type GroupSelectOption = {
    data: ArrayCollection<SelectOption>
}

export abstract class JigsawSelectGroupBase extends JigsawSelectBase {
    /**
     * 设置组名的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public groupField: string = "groupName";

    protected _data: ArrayCollection<GroupSelectOption>;
    /**
     * select分组下拉的类型，用于给float添加class进行样式控制
     * @internal
     */
    public _$type: "collapse" | "group";

    /**
     * 提供选择的数据集合
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<GroupSelectOption> | GroupSelectOption[] | LocalPageableArray<GroupSelectOption> | PageableArray {
        return this._data;
    }

    public set data(value: ArrayCollection<GroupSelectOption> | GroupSelectOption[] | LocalPageableArray<GroupSelectOption> | PageableArray) {
        this._setData(value);
        this._setEmptyValue(value);
        if (this._data instanceof ArrayCollection) {
            if (this._removeOnRefresh) {
                this._removeOnRefresh();
            }
            this._removeOnRefresh = this._data.onRefresh(() => {
                this._setEmptyValue(this._data);
                this._$checkSelectAll();
                // 等待数据处理完成赋值，消除统计的闪动
                this._searchKey = this._searchKeyBak;
                this._changeDetector.markForCheck();
            })
        }
    }

    private _setEmptyValue(value: ArrayCollection<GroupSelectOption> | GroupSelectOption[] | LocalPageableArray<GroupSelectOption> | PageableArray): void {
        this._$listValue = new ArrayCollection([]);
        value.forEach(groupData => {
            this._$listValue.push({ [this.groupField]: groupData[this.groupField], data: new ArrayCollection([]) })
        });
        this._$selectedItems = [];
    }

    protected _getValidData() {
        const validData = [];
        this._data.forEach((group: GroupSelectOption) => {
            group.data.filter(item => !item.disabled).forEach(item => validData.push(item));
        });
        return validData;
    }

    /**
     * @internal
     */
    public _$listValue: ArrayCollection<GroupSelectOption>;

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
        if (CommonUtils.isUndefined(newValue)) {
            return;
        }

        this.runMicrotask(() => {
            newValue.forEach((groupData: GroupSelectOption) => {
                const srcData = this._data.find(dataItem => dataItem[this.groupField] === groupData[this.groupField]).data;
                const targetData = this._$listValue.find(dataItem => dataItem[this.groupField] === groupData[this.groupField]).data;
                groupData.data.forEach(item => {
                    const srcDataItem = srcData.find(srcDataItem => item[this.labelField] === srcDataItem[this.labelField]);
                    if (srcDataItem) {
                        targetData.push(srcDataItem);
                    }
                });
            });
            this._updateSelectedItems();
            this._$checkSelectAll();
        });
    }

    /**
     * @internal
     */
    public _$handleGroupSelectChange(groupIndex: number): void {
        if (!this.multipleSelect) {
            this._$listValue
                .filter((group: GroupSelectOption, index: number) => index !== groupIndex && group.data.length > 0)
                .forEach((group: GroupSelectOption) => group.data = new ArrayCollection([]));
        }
        this._updateSelectedItems();
        this._$checkSelectAll();
        this._propagateChange(this.value);
        this._changeDetector.markForCheck();
        this.valueChange.emit(this.value);
    }

    private _updateSelectedItems(): void {
        this._$selectedItems = [];
        this._value = new ArrayCollection([]);
        this._$listValue.forEach((groupData: GroupSelectOption) => {
            this._$selectedItems = [...this._$selectedItems, ...groupData.data];
            if (groupData.data.length > 0) {
                this._value.push(groupData);
            }
        });
        this._changeDetector.markForCheck();
        this.valueChange.emit(this.value);
    }

    /**
     * @internal
     */
    public _$selectAll() {
        if (this._allSelectCheck()) {
            this._setEmptyValue(this._data);
            this._$selectAllChecked = CheckBoxStatus.unchecked;
        } else {
            this._data.forEach((groupData: GroupSelectOption, index) => {
                this._$listValue[index].data = new ArrayCollection(groupData.data.filter(item => !item.disabled))
            })
            this._$selectAllChecked = CheckBoxStatus.checked;
        }
        this._updateSelectedItems();
        this._propagateChange(this.value);
        this._changeDetector.markForCheck();
        this.valueChange.emit(this.value);
    }

    /**
     * @internal
     */
    public _$handleClearable(): void {
        this._setEmptyValue(this._data);
        this._updateSelectedItems();
        this._$selectAllChecked = CheckBoxStatus.unchecked;
        this._propagateChange(this.value);
        this._changeDetector.markForCheck();
        this.valueChange.emit(this.value);
    }

    /**
    * @internal
    */
    public _$onTagRemove(removedItem): void {
        this._$listValue.forEach((groupData: GroupSelectOption) => {
            const itemIndex = groupData.data.findIndex(item => item == removedItem);
            if (itemIndex !== -1) {
                groupData.data.splice(itemIndex, 1);
                groupData.data.refresh();
            }
        });
        this._updateSelectedItems();
        this._$checkSelectAll();
        this.remove.emit(removedItem);
    }
}
