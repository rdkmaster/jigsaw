import {AbstractJigsawComponent} from "../../common/common";
import {ControlValueAccessor} from "@angular/forms";
import {
    AfterContentInit,
    ChangeDetectorRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    QueryList,
    OnInit,
    Directive,
    Injector
} from "@angular/core";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {Subscription} from "rxjs";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

export class GroupOptionValue {
    [index: string]: any;

    disabled?: boolean;
}

@Directive()
export class AbstractJigsawGroupComponent extends AbstractJigsawComponent implements ControlValueAccessor, AfterContentInit, OnDestroy, OnInit {

    protected _removeRefreshCallback: CallbackRemoval;
    private _removeItemsChanges: Subscription;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public valid: boolean = true;

    //设置对象的标识
    private _trackItemBy: string[] = [];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get trackItemBy(): string | string[] {
        return this._trackItemBy;
    }

    public set trackItemBy(value: string | string[]) {
        this._trackItemBy = typeof value === 'string' ? value.split(/\s*,\s*/g) : value;
    }

    /**
     * 判断是否支持多选
     * @NoMarkForCheckRequired
     */
    @Input()
    public multipleSelect: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public autoRemoveInvalidValue: boolean = true;

    protected _selectedItems = new ArrayCollection<any>();

    @RequireMarkForCheck()
    @Input()
    public get selectedItems(): ArrayCollection<any> | any[] {
        return this._selectedItems;
    }

    public set selectedItems(newValue: ArrayCollection<any> | any[]) {
        this.writeValue(newValue);
        if (this._selectedItems === newValue) {
            return;
        }
        this._propagateChange(newValue);
        this._checkMaxSelectionLimit();
    }
    
    constructor(protected _cdr: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
            super();
        }

    /**
     * @internal
     */
    public _$maxSelectionReached: boolean = false;

    /**
     * 判断是否达到最大已选项
     */
    @RequireMarkForCheck()
    @Input()
    public get maxSelectionReached(): boolean {
        return this._$maxSelectionReached;
    }

    public set maxSelectionReached(value: boolean) {
        if (CommonUtils.isUndefined(value) || value == this._$maxSelectionReached) {
            return;
        }
        this._$maxSelectionReached = value;
        this.maxSelectionReachedChange.emit(this.maxSelectionReached);
    }

    @Output()
    public maxSelectionReachedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
        
    private _maxSelectionLimit: number = 0;

    @RequireMarkForCheck()
    @Input()
    public get maxSelectionLimit(): number {
        return this._maxSelectionLimit;
    }

    public set maxSelectionLimit(value: number) {
        if (CommonUtils.isUndefined(value) || isNaN(value)) {
            this._maxSelectionLimit = 0;
            return;
        }
        this._maxSelectionLimit = value;
        this._checkMaxSelectionLimit();
    }

    private _checkMaxSelectionLimit(): void {
        if (!this.multipleSelect || isNaN(this.maxSelectionLimit) || this.maxSelectionLimit <= 0 || !this.selectedItems) {
            this.maxSelectionReached = false;
            return;
        }
        this.maxSelectionReached = this.selectedItems.length >= this.maxSelectionLimit;
    }

    /**
     * @internal
     */
    public _removeInvalidSelectedItems(): void {
        this._cdr.markForCheck();
        if (!this._items || !this._selectedItems || !this._selectedItems.length) {
            return;
        }
        let needRefresh = false;
        let selectedItems = this._selectedItems.concat();
        selectedItems.forEach(selectedItem => {
            if (this._items.find(item => CommonUtils.compareWithKeyProperty(item.value, selectedItem, this._trackItemBy))) {
                return;
            }
            this._selectedItems.splice(this.selectedItems.indexOf(selectedItem), 1);
            needRefresh = true;
        });
        if (needRefresh) {
            this.selectedItemsChange.emit(this.selectedItems);
        }
    }

    @Output()
    public selectedItemsChange = new EventEmitter<any[]>();

    //获取映射的items
    protected _items: QueryList<AbstractJigsawOptionComponent>;

    protected _updateSelectItems(itemValue, selected): void {
        if (this.multipleSelect) { //多选
            if (selected) {
                this.selectedItems.push(itemValue);
            } else {
                this._selectedItems.forEach(selectedItemValue => {
                    if (CommonUtils.compareWithKeyProperty(selectedItemValue, itemValue, this._trackItemBy)) {
                        this._selectedItems.splice(this.selectedItems.indexOf(selectedItemValue), 1);
                    }
                });
            }
        } else {
            //单选选中
            this._selectedItems.splice(0, this._selectedItems.length);
            this.selectedItems.push(itemValue);
        }
        this._selectedItems.refresh();
        this.selectedItemsChange.emit(this.selectedItems);
    }

    //根据选中的item更新selectedItems
    protected _updateSelectItemsForForm(itemValue, selected): void {
        this._updateSelectItems(itemValue, selected);
        this._propagateChange(this.selectedItems);
    }

    public update(itemValue, selected) {
        this._updateSelectItemsForForm(itemValue, selected);
    }

    //根据selectedItems设置选中的option
    protected _setItemState(items: QueryList<AbstractJigsawOptionComponent>): void {
        this._checkMaxSelectionLimit();
        if (!(this.selectedItems instanceof ArrayCollection) || !items.length) {
            return;
        }
        this.runMicrotask(() => {
            items.forEach(item => {
                let hasSelected = false;
                this._selectedItems.forEach(selectedItem => {
                    if (CommonUtils.compareWithKeyProperty(item.value, selectedItem, this._trackItemBy)) {
                        hasSelected = true;
                    }
                });
                item.selected = hasSelected;
            });
        });
    }

    protected _setItemTheme(items: QueryList<AbstractJigsawOptionComponent>): void {
        items.forEach(item => {
            item.theme = this.theme;
        });
    }

    private _subscribeItemSelectedChange(items: QueryList<AbstractJigsawOptionComponent>) {
        items.forEach((item: AbstractJigsawOptionComponent) => {
            // 取消可能重复的订阅事件
            item.change.observers.length = 0;
            item.change.subscribe(() => {
                if (this.multipleSelect) { //多选
                    item.selected = !item.selected;//切换组件选中状态
                    this._updateSelectItemsForForm(item.value, item.selected);
                } else { //单选
                    if (!item.selected) {
                        item.selected = true;
                        this._updateSelectItemsForForm(item.value, item.selected);
                    }
                }
            })
        });
    }

    ngOnInit() {
        super.ngOnInit();
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
        this._removeRefreshCallback = this._selectedItems.onRefresh(() => this._setItemState(this._items));
    }

    ngAfterContentInit() {
        this._setItemState(this._items);
        this._setItemTheme(this._items);
        this._subscribeItemSelectedChange(this._items);
        this._removeItemsChanges = this._items.changes.subscribe(items => {
            // 异步变更data数据
            this._setItemState(items);
            this._setItemTheme(this._items);
            this._subscribeItemSelectedChange(items);
        });
        if (this._items.length && this.autoRemoveInvalidValue) {
            // 在本地数据为空时，不检查无用选项
            this._removeInvalidSelectedItems();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
        if (this._items) {
            this._items.forEach(item => item.change.unsubscribe());
        }
        if (this._removeItemsChanges) {
            this._removeItemsChanges.unsubscribe();
        }
    }

    protected _propagateChange: any = () => {
    };

    protected _setSelectedItems(newValue: any): void {
        if (this._selectedItems === newValue) {
            return;
        }
        newValue = newValue instanceof ArrayCollection ? newValue : new ArrayCollection(newValue);

        this._selectedItems = newValue;
        if (this.initialized) {
            this._setItemState(this._items);
        }

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._removeRefreshCallback = this._selectedItems.onRefresh(() => this._setItemState(this._items));
    }

    public writeValue(newValue: any): void {
        this._setSelectedItems(newValue);
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}

@Directive()
export class AbstractJigsawOptionComponent extends AbstractJigsawComponent {

    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super();
    }

    @RequireMarkForCheck()
    @Input()
    public value: any;

    @RequireMarkForCheck()
    @Input()
    public disabled: boolean = false;

    @Output()
    public selectedChange = new EventEmitter<boolean>();

    @RequireMarkForCheck()
    @Input()
    public selected: boolean = false; // 选中状态

    @Output()
    public change = new EventEmitter<AbstractJigsawOptionComponent>();
}
