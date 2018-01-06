import {AbstractJigsawComponent} from "../common";
import {ControlValueAccessor} from "@angular/forms";
import {AfterContentInit, ChangeDetectorRef, EventEmitter, Input, OnDestroy, Output, QueryList} from "@angular/core";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {ArrayCollection} from "../../core/data/array-collection";

export class AbstractJigsawGroupComponent extends AbstractJigsawComponent implements ControlValueAccessor, AfterContentInit, OnDestroy {

    protected _removeRefreshCallback: CallbackRemoval;

    //设置对象的标识
    private _trackItemBy: string[] = [];

    @Input()
    public get trackItemBy(): string | string[] {
        return this._trackItemBy;
    }

    public set trackItemBy(value: string | string[]) {
        if (!value) {
            return;
        }
        this._trackItemBy = typeof value === 'string' ? value.split(/\s*,\s*/g) : value;
    }

    //判断是否支持多选
    @Input() public multipleSelect: boolean;

    protected _selectedItems = new ArrayCollection<any>();

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
        this._removeInvalidSelectedItems();
    }

    private _removeInvalidSelectedItems():void {
        if (!this._items || !this._selectedItems) {
            return;
        }
        this._selectedItems.forEach(selectedItem => {
            if (this._items.find(item => CommonUtils.compareWithKeyProperty(item.value, selectedItem, this._trackItemBy))) {
                return;
            }
            this._selectedItems.splice(this.selectedItems.indexOf(selectedItem), 1);
        });
    }

    @Output() public selectedItemsChange = new EventEmitter<any[]>();

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
        } else { //单选选中
            this._items.length && this._items.forEach((item: AbstractJigsawOptionComponent) => {
                //去除其他option选中
                if (!CommonUtils.compareWithKeyProperty(item.value, itemValue, this._trackItemBy) && item.selected) {
                    item.selected = false;
                    item.changeDetector.detectChanges();
                    this._selectedItems.splice(this.selectedItems.indexOf(item.value), 1);
                }
            });
            //添加选中数据
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

    //根据selectedItems设置选中的option
    protected _setItemState(items: QueryList<AbstractJigsawOptionComponent>): void {
        if (!(this.selectedItems instanceof ArrayCollection) || !items.length) {
            return;
        }
        setTimeout(() => {
            items.forEach(item => {
                let hasSelected = false;
                this._selectedItems.forEach(selectedItem => {
                    if (CommonUtils.compareWithKeyProperty(item.value, selectedItem, this._trackItemBy)) {
                        hasSelected = true;
                    }
                });
                item.selected = hasSelected;
            });
        })
    }

    private _subscribeItemSelectedChange(items: QueryList<AbstractJigsawOptionComponent>) {
        items.forEach(item => {
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

    ngAfterContentInit() {
        this._setItemState(this._items);
        this._subscribeItemSelectedChange(this._items);
        this._items.changes.subscribe(items => {
            this._setItemState(items);
            this._subscribeItemSelectedChange(items);
        });

        this._removeInvalidSelectedItems();
    }

    ngOnDestroy() {
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
        this._items.forEach(item => item.change.unsubscribe());
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
            this._removeRefreshCallback()
        }
        this._removeRefreshCallback = newValue.onRefresh(() => this._setItemState(this._items));
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

export class AbstractJigsawOptionComponent extends AbstractJigsawComponent {
    @Input() public value: any;

    @Input() public disabled: boolean = false;

    @Output()
    public selectedChange = new EventEmitter<boolean>();

    @Input()
    public selected: boolean = false; // 选中状态

    @Output()
    public change = new EventEmitter<AbstractJigsawOptionComponent>();

    public changeDetector: ChangeDetectorRef

}
