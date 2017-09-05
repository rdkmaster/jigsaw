import {
    AfterContentInit,
    ChangeDetectorRef,
    Component, ContentChildren,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms'
import {JigsawInputModule} from '../input/input';
import {AbstractJigsawComponent} from '../common';
import {CallbackRemoval, CommonUtils} from '../../core/utils/common-utils';
import {ArrayCollection} from "../../core/data/array-collection";

export class AbstractJigsawGroupComponent extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, AfterContentInit, OnDestroy{
    private _removeRefreshCallback: CallbackRemoval;

    //设置对象的标识
    @Input() public trackItemBy: string | string[];

    //判断是否支持多选
    @Input() public multipleSelect: boolean;

    private _selectedItems = new ArrayCollection<object>();

    @Input()
    public get selectedItems(): ArrayCollection<object> | object[] {
        return this._selectedItems;
    }

    public set selectedItems(newValue: ArrayCollection<object> | object[]) {
        this.writeValue(newValue);
        if (this._selectedItems !== newValue) {
            this._propagateChange(newValue);
        }
    }

    @Output() public selectedItemsChange = new EventEmitter<any[]>();

    //获取映射的items
    protected _items: QueryList<AbstractJigsawItemComponent>;

    //根据选中的item更新selectedItems
    private _updateSelectItems(itemValue, selected): void {
        if (this.multipleSelect) { //多选
            if (selected) {
                this.selectedItems.push(itemValue);
            } else {
                this._selectedItems.forEach(selectedItemValue => {
                    if (CommonUtils.compareWithKeyProperty(selectedItemValue, itemValue, <string[]>this.trackItemBy)) {
                        this._selectedItems.splice(this.selectedItems.indexOf(selectedItemValue), 1);
                    }
                });
            }
        } else { //单选选中
            this._items.length && this._items.forEach((item: JigsawTileOption) => {
                //去除其他option选中
                if (!CommonUtils.compareWithKeyProperty(item.value, itemValue, <string[]>this.trackItemBy) && item.selected) {
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
        this._propagateChange(this.selectedItems);
    }

    //根据selectedItems设置选中的items
    private _setItemState(items: QueryList<AbstractJigsawItemComponent>): void {
        if (!(this.selectedItems instanceof ArrayCollection) || !this._items.length) {
            return;
        }
        setTimeout(() => {
            items.forEach(item => {
                let hasSelected = false;
                this._selectedItems.forEach(selectedItem => {
                    if (CommonUtils.compareWithKeyProperty(item.value, selectedItem, <string[]>this.trackItemBy)) {
                        hasSelected = true;
                    }
                });
                item.selected = hasSelected;
                item.changeDetector.detectChanges();
            });
        })
    }

    private _subscribeItemSelectedChange(items: QueryList<AbstractJigsawItemComponent>){
        items.forEach(item => {
            // 取消可能重复的订阅事件
            if(item.selectedChange.observers.length){
                item.selectedChange.observers = [];
            }
            item.selectedChange.subscribe(() => {
                if (this.multipleSelect) { //多选
                    item.selected = !item.selected;//切换组件选中状态
                    this._updateSelectItems(item.value, item.selected);
                } else { //单选
                    if (!item.selected) {
                        item.selected = true;
                        this._updateSelectItems(item.value, item.selected);
                    }
                }
            })
        });
    }

    ngOnInit() {
        super.ngOnInit();
        if(this.trackItemBy){
            this.trackItemBy = (<string>this.trackItemBy).split(/\s*,\s*/g);
        }else{
            console.warn('please input trackItemBy attribute in jigsaw-title control')
        }
    }

    ngAfterContentInit() {
        this._setItemState(this._items);
        this._subscribeItemSelectedChange(this._items);
        this._items.changes.subscribe(items => {
            this._setItemState(items);
            this._subscribeItemSelectedChange(items);
        });
    }

    ngOnDestroy() {
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
    }

    private _propagateChange: any = () => {};

    public writeValue(newValue: any): void {
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
        this._removeRefreshCallback = newValue.onRefresh(() => {
            this._setItemState(this._items);
        });
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}

export class AbstractJigsawItemComponent extends AbstractJigsawComponent{
    @Input() public value: any;

    @Input() public disabled: boolean = false;

    @Input()
    public selected: boolean = false; // 选中状态

    @Output()
    public selectedChange = new EventEmitter<JigsawTileOption>();

    constructor(public changeDetector: ChangeDetectorRef) {
        super();
    }
}

@Component({
    selector: 'jigsaw-tile',
    templateUrl: 'tile-select.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-tile]': 'true'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTileSelect), multi: true},
    ]
})
export class JigsawTileSelect extends AbstractJigsawGroupComponent{

    @Input() public searchable: boolean = false;

    // 默认多选
    public multipleSelect: boolean = true;

    @ContentChildren(forwardRef(() => JigsawTileOption))
    protected _items: QueryList<JigsawTileOption>;

}

@Component({
    selector: 'jigsaw-tile-option',
    template: '<ng-content></ng-content>',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[class.jigsaw-tile-option]': 'true',
        '[class.jigsaw-tile-option-active]': 'selected',
        '[class.jigsaw-tile-option-disabled]': 'disabled',
        '(click)': '_$handleClick()'
    }
})
export class JigsawTileOption extends AbstractJigsawItemComponent {

    constructor(public changeDetector: ChangeDetectorRef) {
        super(changeDetector);
    }

    /**
     * 点击组件触发
     * @internal
     */
    public _$handleClick(): void {
        if(!this.disabled){
            this.selectedChange.emit(this);
        }
    }

}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawInputModule],
    declarations: [JigsawTileSelect, JigsawTileOption],
    exports: [JigsawTileSelect, JigsawTileOption]
})
export class JigsawTileSelectModule {

}




