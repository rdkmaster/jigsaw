import { ChangeDetectorRef, Directive, EventEmitter, Injector, Input, NgZone, OnDestroy, Output, Renderer2, ViewChild } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { AbstractJigsawComponent, IJigsawFormControl } from "../../common/common";
import { ArrayCollection, LocalPageableArray, InfiniteScrollLocalPageableArray, InfiniteScrollPageableArray } from "../../common/core/data/array-collection";
import { CallbackRemoval, CommonUtils } from "../../common/core/utils/common-utils";
import { PopupPositionType } from "../../common/service/popup.service";
import { RequireMarkForCheck } from "../../common/decorator/mark-for-check";
import { CheckBoxStatus } from "../checkbox/typings";
import { JigsawComboSelect } from '../combo-select/index';
import { JigsawList } from "../list-and-tile/list";
import { JigsawCollapse } from "../collapse/collapse";
import { TranslateService } from "@ngx-translate/core";

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
        protected _renderer: Renderer2,
        protected _translateService: TranslateService,
        protected _zone?: NgZone
    ) {
        super(_zone);
    }

    /**
     * @internal
     */
    public _$infiniteScroll: boolean = false;

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

    protected _trackItemBy: string[];

    /**
     * 设置对象的标识
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get trackItemBy(): string | string[] {
        if (!this.data) {
            return null;
        }
        // 如果是基础类型，则也不用trackItemBy
        if (typeof this.data[0] != "object" || this.data[0] == null) {
            return null;
        }
        return CommonUtils.isDefined(this._trackItemBy) ? this._trackItemBy : [this.labelField];
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
     */
    @RequireMarkForCheck()
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
     * 多选最大个数限制
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public maxSelectedItemsLimit: number = 0;

    public _$allowSelect = true;

    private _checkAllowSelect() {
        if (this._checkmaxSelectedItemsLimit()) {
            this._$allowSelect = true
            return;
        }
        this._$allowSelect = this._value.length < this.maxSelectedItemsLimit
    }

    private _checkmaxSelectedItemsLimit(): boolean {
        return !this.multipleSelect || !this._value || isNaN(this.maxSelectedItemsLimit) || this.maxSelectedItemsLimit <= 0
    }

    private _getAvailableValue(value) {
        if (!this._checkmaxSelectedItemsLimit() && value.length >= this.maxSelectedItemsLimit) {
            value.splice(this.maxSelectedItemsLimit)
            return value;
        }
        return value;
    }

    /**
    availableOptions * 选择结果框的清除按钮的显示与隐藏
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
     * 搜索框placeholder文本
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public searchPlaceholder: string;

    /**
     * @internal
     */
    public _$allSelectedText: string = this._translateService.instant("select.allSelected");

    private _allSelectedText: string;

    /**
     * 全选时显示的文本
     */
    @RequireMarkForCheck()
    @Input()
    public get allSelectedText(): string {
        return this._allSelectedText;
    }

    public set allSelectedText(newValue: string) {
        if (this._allSelectedText === newValue) {
            return;
        }
        this._allSelectedText = newValue;
        this._$allSelectedText = this._allSelectedText || this._translateService.instant("select.allSelected");
    }

    /**
     * 设置多选框显示详细结果/统计结果
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public useStatistics: boolean = true;

    /**
     * 设置多选框下拉框位置
     */
    @RequireMarkForCheck()
    @Input()
    public selectListPositionType: PopupPositionType = PopupPositionType.absolute;

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
        if (this.initialized && CommonUtils.compareValue(this._value, newValue, this.trackItemBy)) {
            return;
        }

        this._value = newValue;
        this._propagateChange(newValue);
        this.runMicrotask(() => {
            if (CommonUtils.isDefined(newValue)) {
                this._$selectedItems = this.multipleSelect ? this._getAvailableValue(newValue) : this._getSelectedItems(newValue);
            } else {
                this._$selectedItems = new ArrayCollection([]);
            }
            this._$checkSelectAll();
            this._changeDetector.detectChanges();
        })
    }

    /**
     * **问题描述：**
     * 目前在处理无效数值时，空字符串和undefined均存在问题。
     *
     * **解决方案：**
     * 1. 对于已知数据中包含空字符串的情况，将空字符串视为合法值。
     * 2. 对于已知数据中不包含空字符串的情况，将空字符串视为非法值。
     *
     * **按钮清空行为：**
     * 1. 当已知数据中包含空字符串时，点击清空按钮将使用undefined作为默认值。
     * 2. 当已知数据中不包含空字符串时，点击清空按钮将使用空字符串作为默认值以保持兼容性。
     */
    private _getSelectedItems(newValue: any): any[] {
        if (newValue != "") {
            return [newValue];
        }
        return this._containsEmptyString ? [newValue] : new ArrayCollection([]);
    }

    private _containsEmptyString: boolean = false;

    protected _checkDataContainsEmptyString(): void {
        if (!this._data || this._data.length == 0) {
            this._containsEmptyString = false;
            return;
        }

        for (let i = 0; i < this._data.length; i++) {
            const data = this._data[i];
            if (data === '') {
                this._containsEmptyString = true;
                return;
            }
            if (typeof data != 'object') {
                continue;
            }
            if (data[this.labelField] === '') {
                this._containsEmptyString = true;
                return;
            }
        }
        this._containsEmptyString = false;
    }

    /**
     * 设置select的size大小
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public size: "small" | "medium" | "large" = "large";

    /**
     * 选择结果发生变化时，向外面发送事件
     *
     * $demo = select/basic
     */
    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter<any>();

    public writeValue(value: any): void {
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
        const disabledSelectedItems = [];
        if (this._$selectedItems?.length > 0) {
            disabledSelectedItems.push(...this._$selectedItems.filter(item => item.disabled));
        }
        if (this._allSelectCheck()) {
            this._$selectedItems = new ArrayCollection(disabledSelectedItems);
            this._$selectAllChecked = CheckBoxStatus.unchecked;
        } else {
            let availableOptions = this._getValidData().concat(disabledSelectedItems);
            if (!this._checkmaxSelectedItemsLimit() && availableOptions.length >= this.maxSelectedItemsLimit) {
                // 如果已有已选项，则依照已选项排序，将选项依次放在availableOptions的前面
                if (this._$selectedItems?.length > 0) {
                    availableOptions = availableOptions.sort((a, b) => {
                        const aInSelected = this._$selectedItems.includes(a);
                        const bInSelected = this._$selectedItems.includes(b);
                        if (aInSelected && !bInSelected) {
                            return -1;
                        } else if (!aInSelected && bInSelected) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                }
                availableOptions.splice(this.maxSelectedItemsLimit);
            }
            this._$selectedItems = new ArrayCollection(availableOptions);
            this._$selectAllChecked = CheckBoxStatus.checked;
        }
        this._value = this._$selectedItems;
        this._checkAllowSelect();
        this._valueChange(this.value);
        this._changeDetector.markForCheck();
    }

    /**
     * @internal
     */
    public _$checkSelectAll() {
        this._changeDetector.markForCheck();
        if (!this._$selectedItems || this._$selectedItems.length === 0) {
            this._$selectAllChecked = CheckBoxStatus.unchecked;
            return;
        }
        if (this._allSelectCheck()) {
            this._$selectAllChecked = CheckBoxStatus.checked;
        } else if (this._allDisabledCheck()) {
            this._$selectAllChecked = CheckBoxStatus.unchecked;
        } else {
            this._$selectAllChecked = CheckBoxStatus.indeterminate;
        }
    }

    /**
     * 全选按钮只考虑可选内容，不考虑disabled
     * 会存在当前已选不在当期列表中的情况(已选项默认disabled)
     */
    protected _allSelectCheck(): boolean {
        const validData = this._getValidData();
        if (!this._$selectedItems || !validData.length) {
            return false;
        }
        return validData.every(
            data => !!this._$selectedItems.find(item => CommonUtils.compareValue(item, data, this.trackItemBy)))
    }

    /**
     * 判断已选内容是否全为disabled项
     */
    private _allDisabledCheck(): boolean {
        if (!this._$selectedItems) {
            return false;
        }
        const disabledData = this._data.concat().filter(item => item.disabled);
        if (!disabledData.length) {
            return false;
        }
        return this._$selectedItems.every(
            selectedItem => !!disabledData.find(data => CommonUtils.compareValue(data, selectedItem, this.trackItemBy))
        );
    }

    /**
     * @internal
     */
    public _$showAllStatistics(): boolean {
        if (!this.multipleSelect || !this.useStatistics || !this._$selectedItems || !this._$selectedItems.length) {
            return false
        }
        if (this._$infiniteScroll) {
            // this._$infiniteScroll为真就确保是滚动分页数据类型了
            const data = <InfiniteScrollLocalPageableArray<SelectOption> | InfiniteScrollPageableArray>this.data;
            return this._$selectedItems.length === data.pagingInfo.totalRecord;
        }
        if (!this.data.length) {
            return false;
        }
        return this._$selectedItems.length === this.data.length;
    }

    /**
     * @internal
     */
    public _$showNumStatistics(): boolean {
        if (!this.multipleSelect || !this.useStatistics || !this._$selectedItems || !this._$selectedItems.length) {
            return false;
        }
        if (!this.data.length) {
            return false;
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

    protected _data: ArrayCollection<SelectOption> | InfiniteScrollLocalPageableArray<SelectOption> | InfiniteScrollPageableArray;
    protected _removeOnRefresh: CallbackRemoval;

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeOnRefresh) {
            this._removeOnRefresh();
        }
    }

    /**
     * @internal
     */
    public get _$viewData() {
        return this._$showSelected ? this._$selectedItems : this._data;
    }

    /**
     * 提供选择的数据集合
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<SelectOption> | SelectOption[] | InfiniteScrollLocalPageableArray<SelectOption> | InfiniteScrollPageableArray {
        return this._data;
    }

    public set data(value: ArrayCollection<SelectOption> | SelectOption[] | InfiniteScrollLocalPageableArray<SelectOption> | InfiniteScrollPageableArray) {
        if (value instanceof InfiniteScrollLocalPageableArray || value instanceof InfiniteScrollPageableArray) {
            this._$infiniteScroll = true;
        }
        this._setData(value);
        this._checkDataContainsEmptyString();
        if (!(this._data.onRefresh instanceof Function)) {
            return;
        }
        if (this._removeOnRefresh) {
            this._removeOnRefresh();
        }
        this._removeOnRefresh = this._data.onRefresh(() => {
            this._updateViewData();
            this._$checkSelectAll();
            this._checkDataContainsEmptyString();
            // 等待数据处理完成赋值，消除统计的闪动
            this._searchKey = this._searchKeyBak;
        })
    }

    protected _setData(value: ArrayCollection<SelectOption> | SelectOption[] | InfiniteScrollLocalPageableArray<SelectOption> | InfiniteScrollPageableArray) {
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

    protected _getValidData(): SelectOption[] {
        // 不能直接使用this.data.filter，data可能是LocalPageableArray或者PageableArray，filter api不一样
        return this._data.concat().filter(item => !item.disabled);
    }

    protected _updateViewData(): void { }

    /**
     * 在多选时，用户点击被选中条目的叉叉时发出此事件
     *
     * $demo = select/multiple
     */
    @Output()
    public remove: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('contentList')
    private _contentList: JigsawList | JigsawCollapse;
    @ViewChild(PerfectScrollbarDirective)
    private _listScrollbar: PerfectScrollbarDirective;
    @ViewChild('comboSelect')
    private _comboSelect: JigsawComboSelect;

    /**
     * @internal
     */
    public _$handleSelectChange(selectedItems: any[]) {
        if (selectedItems == null) {
            return;
        }
        this._value = this.multipleSelect ? selectedItems : selectedItems[0];
        this._checkAllowSelect();
        this._valueChange(this.value);
        if (this._$showSelected && this.value.length == 0) {
            this._$showSelected = false;
        }
        this._$checkSelectAll();
        this._changeDetector.markForCheck();
    }

    /**
     * @internal
     */
    public _$handleClearable() {
        this._handleClearableValue();
        this._$selectAllChecked = CheckBoxStatus.unchecked;
        this._$allowSelect = true;
        this._valueChange(this.value);
        this._changeDetector.markForCheck();
    }

    protected _handleClearableValue() {
        this._value = this.multipleSelect ? new ArrayCollection([]) : "";
    }

    /**
     * @internal
     */
    public _$onComboOpenChange(openState: boolean) {
        this.openChange.emit(openState);
        this._onTouched();
        if (openState) {
            this._$showSelected = false;
            this._checkAllowSelect();
            const removeListener = this._renderer.listen(this._comboSelect._jigsawFloat.popupElement, 'animationend', () => {
                removeListener();
                this._setInfiniteScroll()
            })
        }
        if (openState || !this.searchable && !this._$infiniteScroll) {
            return;
        }
        if (!openState && this._removeScrollBarListener) {
            this._removeScrollBarListener();
        }
        // combo关闭时，重置数据
        this._$handleSearching();
    }

    /**
     * @internal
     */
    public _$onTagRemove(removedItem): void {
        this.remove.emit(removedItem);
        this._value = this._$selectedItems;
        this._valueChange(this.value);
        this._$checkSelectAll();
        this._changeDetector.markForCheck();
    }

    /**
     * 阻止下拉框自带的搜索行为
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public manualSearch: boolean = false;

    private _searchDebounce: number = 300;

    /**
     * 设置了此属性会给搜索增加一个防抖功能，并增加enter回车立刻搜索
     * 设为'none'、NaN、小于0，或者不设置则表示不设置防抖
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get searchDebounce(): number | "none" {
        return this._searchDebounce;
    }

    public set searchDebounce(value: number | "none") {
        value = value == 'none' ? 0 : Number(value);
        this._searchDebounce = isNaN(value) ? 0 : value;
    }

    /**
     * 设置边框显隐开关。
     * @NoMarkForCheckRequired
     */
    @Input()
    public showBorder: boolean = true;

    /**
     * 搜索框的值发生改变时，向外发出事件
     */
    @Output()
    public searchKeywordChange: EventEmitter<{searchKey: string, data: any, instance: JigsawSelectBase}> = new EventEmitter<any>();

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        if (this.manualSearch && CommonUtils.isDefined(filterKey)) {
            this.searchKeywordChange.emit({ searchKey: filterKey, data: this.data, instance: this });
            return;
        }

        // 为了消除统计的闪动，需要先把搜索字段临时存放在bak里面
        this._searchKeyBak = filterKey;
        if (this.data instanceof InfiniteScrollLocalPageableArray || this.data instanceof InfiniteScrollPageableArray) {
            this._filterData(filterKey);
            return;
        }

        const data = new LocalPageableArray<SelectOption>();
        data.pagingInfo.pageSize = Infinity;
        data.debounceTime = this._searchDebounce;
        const removeUpdateSubscriber = data.pagingInfo.subscribe(() => {
            // 在新建data准备好再赋值给组件data，防止出现闪动的情况
            removeUpdateSubscriber.unsubscribe();
            this.data = data;
            this._filterData(filterKey);
        });
        data.fromArray(this.data);
    }

    protected _filterData(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        (<InfiniteScrollLocalPageableArray<any> | InfiniteScrollPageableArray>this.data).filter(filterKey, [this.labelField]);
        this.resetScrollbar();
    }

    public resetScrollbar() {
        this._listScrollbar && this._listScrollbar.scrollToTop();
    }

    private _removeScrollBarListener: Function;

    private _setInfiniteScroll() {
        if (!this._$infiniteScroll || !this._listScrollbar) {
            return;
        }
        if (this._removeScrollBarListener) {
            this._removeScrollBarListener();
        }
        const el = this._listScrollbar.elementRef.nativeElement;
        this._removeScrollBarListener = this._contentList.renderer.listen(el, "ps-y-reach-end", () => {
            if (this._$showSelected) {
                return;
            }
            this._zone.run(() => {
                const data = <InfiniteScrollLocalPageableArray<any> | InfiniteScrollPageableArray>this.data;
                if (data.busy || data.pagingInfo.currentPage == data.pagingInfo.totalPage) {
                    return;
                }
                data.nextPage();
                this._changeDetector.markForCheck();
            });
        })
    }

    protected _valueChange(value): void {
        this.valueChange.emit(value);
        this._propagateChange(value);
    }
}

export type GroupSelectOption = {
    data: ArrayCollection<SelectOption>
}
@Directive()
export abstract class JigsawSelectGroupBase extends JigsawSelectBase {
    /**
     * 设置组名的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public groupField: string = "groupName";

    private _viewData: SelectOption[][];
    private _viewValue: SelectOption[][];
    private _outputValue: any;

    /**
     * @internal
     */
    public get _$viewData() {
        return this._$showSelected ? this._viewValue : this._viewData;
    }

    /**
     * @internal
     */
    public _$collapseStatus: boolean[] = [];

    /**
     * select分组下拉的类型，用于给float添加class进行样式控制
     * @internal
     */
    public _$dropdownType: "collapse" | "group";

    protected _updateViewData(): void {
        const data = (this.data as ArrayCollection<SelectOption>).toJSON();
        this._viewData = this._getGroupedData(data);
    }

    // 获取结构化分组数据
    private _getGroupedData(data: SelectOption[]): SelectOption[][] {
        const groups = new Set(data.map(item => item[this.groupField]))
        const result: SelectOption[][] = [];
        groups.forEach(group => {
            const arr = data.filter(item => item[this.groupField] == group);
            result.push(arr);
        })
        return result;
    }

    protected _setData(value: ArrayCollection<GroupSelectOption> | GroupSelectOption[] | InfiniteScrollLocalPageableArray<SelectOption> | InfiniteScrollPageableArray) {
        this._viewData = undefined;
        if (value instanceof InfiniteScrollLocalPageableArray || value instanceof InfiniteScrollPageableArray) {
            this._data = value;
            return;
        }
        if (value instanceof ArrayCollection) {
            for (let i = value.length - 1; i >= 0; i--) {
                if (CommonUtils.isUndefined(value[i])) {
                    value.splice(i, 1);
                }
            }
            this._originalData = value;
            value = value.toJSON();
            if (!(this._originalData.onRefresh instanceof Function)) {
                return;
            }
            if (this._removeOriginalOnRefresh) {
                this._removeOriginalOnRefresh();
            }
            this._removeOriginalOnRefresh = this._originalData.onRefresh(() => {
                this.data = this._originalData;
            })
        } else {
            value = (value || []).filter(el => el != null);
        }
        this._data = new InfiniteScrollLocalPageableArray<SelectOption>();
        this._data.fromArray(this._getFlatData(value));
        (this._data as InfiniteScrollLocalPageableArray<SelectOption>).pagingInfo.pageSize = Infinity;
    }

    private _originalData: ArrayCollection<GroupSelectOption>;
    private _removeOriginalOnRefresh: Function;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get trackItemBy(): string | string[] {
        if (!this.data) {
            return null;
        }
        // 如果是基础类型，则也不用trackItemBy
        if (typeof this.data[0] != "object" || this.data[0] == null) {
            return null;
        }
        return CommonUtils.isDefined(this._trackItemBy) ? this._trackItemBy : [this.labelField, this.groupField];
    }

    public set trackItemBy(value: string | string[]) {
        this._trackItemBy = typeof value === 'string' ? value.split(/\s*,\s*/g) : value;
    }

    private _updateOutputValue() {
        if (CommonUtils.isUndefined(this._value)) {
            this._outputValue = this._value;
            return;
        }
        const value = this._value instanceof ArrayCollection ? this._value : [this._value];
        const groups = new Set(value.map(item => item[this.groupField]))
        const result = new ArrayCollection([]);
        groups.forEach(group => {
            const arr = value.filter(item => item[this.groupField] == group);
            result.push({ [this.groupField]: group, data: arr });
        })
        this._outputValue = result;
    }

    private _updateViewValue() {
        if (!this.multipleSelect) {
            return;
        }
        const data = (this._value as ArrayCollection<SelectOption>).toJSON();
        this._viewValue = this._getGroupedData(data);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): any {
        return this._$infiniteScroll ? this._value : this._outputValue;
    }

    public set value(newValue: any) {
        const value = this._$infiniteScroll ? newValue : this._getFlatData(newValue);
        if (this.initialized && CommonUtils.compareValue(this._value, value, this.trackItemBy)) {
            return;
        }

        this._value = value;
        this._updateOutputValue();
        this._propagateChange(value);
        this.runMicrotask(() => {
            if (CommonUtils.isDefined(value)) {
                this._$selectedItems = this._$infiniteScroll && !this.multipleSelect ? [value] : value;
            } else {
                this._$selectedItems = new ArrayCollection([]);
            }
            this._$checkSelectAll();
            this._changeDetector.detectChanges();
        })
    }

    protected _checkDataContainsEmptyString() {
        return;
    }

    protected _handleClearableValue() {
        this._value = this.multipleSelect ? new ArrayCollection([]) : undefined;
    }

    protected _valueChange(value: any): void {
        this._updateViewValue();
        if (this._$infiniteScroll) {
            this.valueChange.emit(value);
            this._propagateChange(value);
            return;
        }
        this._updateOutputValue();
        this.valueChange.emit(this._outputValue);
        this._propagateChange(this._outputValue);
    }

    private _getFlatData(value: GroupSelectOption[]): SelectOption[] {
        if (!value) {
            return;
        }
        const result = [];
        value.forEach(group => {
            if (!group.data) {
                return;
            }
            group.data.forEach(item => {
                item[this.groupField] = group[this.groupField];
                result.push(item);
            })
        })
        return result;
    }

    protected _filterData(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        (<InfiniteScrollLocalPageableArray<any> | InfiniteScrollPageableArray>this.data).filter(filterKey, [this.labelField, this.groupField]);
        this._$collapseStatus = [];
    }

    /**
     * @internal
     */
    public _$getCollapseFrozen(last: boolean) {
        if (!this._$infiniteScroll || !last || this._$showSelected) {
            return false;
        }
        const pagingInfo = this.data['pagingInfo'];
        return pagingInfo.currentPage != pagingInfo.totalPage;
    }
}
