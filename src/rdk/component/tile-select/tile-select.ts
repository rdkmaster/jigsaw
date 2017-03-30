import {
    NgModule, Component, ContentChildren, QueryList, Input, Output, EventEmitter,
    Optional, OnInit, forwardRef, AfterContentInit, ChangeDetectorRef, AfterViewInit, ViewChildren
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import {RdkInputModule} from '../input/input';
import {AbstractRDKComponent} from '../../core/api/component-api';
import {CommonUtils} from '../../core/utils/common-utils';
import {InternalUtils} from '../../core/utils/internal-utils';

@Component({
    selector: 'rdk-tile-select',
    templateUrl: 'tile-select.html',
    styleUrls: ['tile-select.scss'],
    host: {
        '[style.width]': 'width'
    }
})
export class RdkTileSelect extends AbstractRDKComponent implements OnInit, AfterViewInit {
    private _contentInit: boolean = false;
    private _selectedItems: any[] = [];

    @Input()
    public get selectedItems(): any[] {
        return this._selectedItems;
    }

    public set selectedItems(newValue: any[]) {
        if (!newValue || !newValue.length) {
            return;
        }
        if (this._selectedItems != newValue) {
            this._selectedItems = newValue;
            this._contentInit && this._setOptionState();
        }
    }

    @Output() public selectedItemsChange = new EventEmitter<any[]>();

    //设置对象的标识
    @Input() public trackItemBy: string|string[];

    //显示在界面上的属性名
    @Input() public labelField: string = 'label';

    //判断是否支持多选
    @Input() public multipleSelect: boolean = true;

    @Input() public searchable: boolean = false;

    @Input() public data: Array<object>;

    @Input() public tileOptionWidth: string;

    @Input() public tileOptionHeight: string;

    //获取映射的子组件
    @ViewChildren(forwardRef(() => RdkTileOption))
    private _options: QueryList<RdkTileOption>;


    //根据选中的option更新selectedItems
    public updateSelectItems(optionItem, selected): void {
        if (this.multipleSelect) { //多选
            if (selected) {
                this.selectedItems.push(optionItem);
            } else {
                this._selectedItems.forEach(selectedItem => {
                    if (CommonUtils.compareWithKeyProperty(selectedItem, optionItem, <string[]>this.trackItemBy)) {
                        this.selectedItems.splice(this.selectedItems.indexOf(selectedItem), 1);
                    }
                });
            }
        } else { //单选选中
            this._options.length && this._options.forEach((option: RdkTileOption) => {
                //去除其他option选中
                if (!CommonUtils.compareWithKeyProperty(option.optionItem, optionItem, <string[]>this.trackItemBy) && option.selected) {
                    option.selected = false;
                    this.selectedItems.splice(this.selectedItems.indexOf(option.optionItem), 1);
                }
            });
            //添加选中数据
            this.selectedItems.push(optionItem);
        }
        this.selectedItemsChange.emit(this.selectedItems);
    }

    //根据selectedItems设置选中的option
    private _setOptionState(): void {
        this._selectedItems.length && this._options.length && this._options.forEach((option) => {
            this._selectedItems.forEach((optionItem) => {
                if (CommonUtils.compareWithKeyProperty(option.optionItem, optionItem, <string[]>this.trackItemBy) && !option.selected) {
                    option.selected = true;
                    option._cdref.detectChanges();
                }
            })
        });
    }

    ngOnInit() {
        this.trackItemBy = InternalUtils.initTrackItemBy(<string>this.trackItemBy, this.labelField);
    }

    ngAfterViewInit() {
        this._contentInit = true;
        this._setOptionState();
    }
}

@Component({
    selector: 'rdk-tile-option',
    templateUrl: 'tile-option.html',
    styleUrls: ['tile-option.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height'
    }
})
export class RdkTileOption extends AbstractRDKComponent implements OnInit {
    @Input() public optionItem: any; //option对象

    private _optionLabel: string; //显示在页面上的值
    private _tileSelect: RdkTileSelect; //父组件

    public selected: boolean = false;//选中状态

    constructor(@Optional() tileSelect: RdkTileSelect, public _cdref: ChangeDetectorRef) {
        super();
        this._tileSelect = tileSelect;
    }

    //点击组件触发
    private _onClick(): void {
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
        this._optionLabel = this.optionItem[this._tileSelect.labelField];
    }

}

@NgModule({
    imports: [CommonModule, FormsModule, RdkInputModule],
    declarations: [RdkTileSelect, RdkTileOption],
    exports: [RdkTileSelect, RdkTileOption]
})
export class RdkTileSelectModule {

}




