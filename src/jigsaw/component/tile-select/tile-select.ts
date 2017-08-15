import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Renderer2,
    ViewChildren
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms'
import {JigsawInputModule} from '../input/input';
import {AbstractJigsawComponent} from '../core';
import {CallbackRemoval, CommonUtils} from '../../core/utils/common-utils';
import {InternalUtils} from '../../core/utils/internal-utils';
import {ArrayCollection} from "../../core/data/array-collection";

@Component({
    selector: 'jigsaw-tile-select',
    templateUrl: 'tile-select.html',
    //styleUrls: ['tile-select.scss'],
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTileSelect), multi: true},
    ]
})
export class JigsawTileSelect extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

    private _removeRefreshCallback: CallbackRemoval;

    constructor(private _render: Renderer2,
                private _elementRef: ElementRef) {
        super();
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
        this._render.setStyle(this._elementRef.nativeElement, 'width', this._width);
    }

    public set height(value: string) {
        this._height = CommonUtils.getCssValue(value);
        this._render.setStyle(this._elementRef.nativeElement, 'height', this._height);
    }

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

    //设置对象的标识
    @Input() public trackItemBy: string | string[];

    //显示在界面上的属性名
    @Input() public labelField: string = 'label';

    //判断是否支持多选
    @Input() public multipleSelect: boolean = true;

    @Input() public searchable: boolean = false;

    private _data: ArrayCollection<object>;

    @Input()
    public get data(): ArrayCollection<object> | object[] {
        return this._data;
    }

    public set data(value: ArrayCollection<object> | object[]) {
        this._data = value instanceof ArrayCollection ? value : new ArrayCollection(value);
    }

    @Input() public tileOptionWidth: string;

    @Input() public tileOptionHeight: string;

    //获取映射的子组件
    @ViewChildren(forwardRef(() => JigsawTileOption))
    private _options: QueryList<JigsawTileOption>;


    //根据选中的option更新selectedItems
    public updateSelectItems(optionItem, selected): void {
        if (this.multipleSelect) { //多选
            if (selected) {
                this.selectedItems.push(optionItem);
            } else {
                this._selectedItems.forEach(selectedItem => {
                    if (CommonUtils.compareWithKeyProperty(selectedItem, optionItem, <string[]>this.trackItemBy)) {
                        this._selectedItems.splice(this.selectedItems.indexOf(selectedItem), 1);
                    }
                });
            }
        } else { //单选选中
            this._options.length && this._options.forEach((option: JigsawTileOption) => {
                //去除其他option选中
                if (!CommonUtils.compareWithKeyProperty(option.optionItem, optionItem, <string[]>this.trackItemBy) && option.selected) {
                    option.selected = false;
                    this._selectedItems.splice(this.selectedItems.indexOf(option.optionItem), 1);
                }
            });
            //添加选中数据
            this.selectedItems.push(optionItem);
        }
        this._selectedItems.refresh();
        this.selectedItemsChange.emit(this.selectedItems);
        this._propagateChange(this.selectedItems);
    }

    //根据selectedItems设置选中的option
    private _setOptionState(): void {
        if (!(this.selectedItems instanceof ArrayCollection) || !this._options.length) {
            return;
        }
        this._options.forEach((option) => {
            let _hasSelected = false;
            this._selectedItems.forEach((optionItem) => {
                if (CommonUtils.compareWithKeyProperty(option.optionItem, optionItem, <string[]>this.trackItemBy)) {
                    _hasSelected = true;
                }
            });
            option.selected = _hasSelected;
            option._cdref.detectChanges();
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.trackItemBy = InternalUtils.initTrackItemBy(<string>this.trackItemBy, this.labelField);
        setTimeout(() => {
            this._render.setStyle(this._elementRef.nativeElement, 'width', this._width);
            this._render.setStyle(this._elementRef.nativeElement, 'height', this._height);
            this._render.setStyle(this._elementRef.nativeElement, 'opacity', 1);
        }, 0);

    }

    ngAfterViewInit() {
        this._setOptionState();
    }

    ngOnDestroy() {
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
    }

    private _propagateChange: any = () => {
    };

    public writeValue(newValue: any): void {
        if (this._selectedItems === newValue) {
            return;
        }
        newValue = newValue instanceof ArrayCollection ? newValue : new ArrayCollection(newValue);

        this._selectedItems = newValue;
        if (this.initialized) {
            this._setOptionState();
        }

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
        this._removeRefreshCallback = newValue.onRefresh(() => {
            this._setOptionState();
        });
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}

@Component({
    selector: 'jigsaw-tile-option',
    templateUrl: 'tile-option.html',
    //styleUrls: ['tile-option.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height'
    }
})
export class JigsawTileOption extends AbstractJigsawComponent implements OnInit {
    @Input() public optionItem: any; //option对象

    public _$optionLabel: string; //显示在页面上的值
    private _tileSelect: JigsawTileSelect; //父组件

    public selected: boolean = false;//选中状态

    constructor(@Optional() tileSelect: JigsawTileSelect, public _cdref: ChangeDetectorRef) {
        super();
        this._tileSelect = tileSelect;
    }

    /**
     * 点击组件触发
     * @internal
     */
    public _$onClick(): void {
        if (this._tileSelect.multipleSelect) { //多选
            this.selected = !this.selected;//切换组件选中状态
            this._tileSelect.updateSelectItems(this.optionItem, this.selected);
        } else { //单选
            if (this.selected) {
                return;
            } else {
                this.selected = true;
                this._tileSelect.updateSelectItems(this.optionItem, this.selected);
            }
        }

    }

    ngOnInit() {
        //初始化option显示值
        this._$optionLabel = this.optionItem[this._tileSelect.labelField];
    }

}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawInputModule],
    declarations: [JigsawTileSelect, JigsawTileOption],
    exports: [JigsawTileSelect, JigsawTileOption]
})
export class JigsawTileSelectModule {

}




