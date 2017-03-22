import {
    NgModule, Component, ContentChildren, QueryList, Input, Output, EventEmitter,
    Optional, OnInit, forwardRef, AfterContentInit, ChangeDetectorRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import {CompareJsonObjComponent} from '../../core/api/compareJsonObjComponent';
import {InputModule} from '../input/input';

@Component({
    selector: 'rdk-tile-select',
    templateUrl: 'tile-select.html',
    styleUrls: ['tile-select.scss']
})
export class TileSelectComponent extends CompareJsonObjComponent implements OnInit, AfterContentInit {
    private _contentInit: boolean = false;
    private _selectedItems: any[] = [];

    @Input()
    public get selectedItems(): any[] {
        return this._selectedItems;
    }

    public set selectedItems(newValue: any[]) {
        if (newValue && !newValue.length) {
            return;
        }
        if (this._selectedItems != newValue) {
            this._selectedItems = newValue;
            this._contentInit && this._setOptionState();
        }
    }

    @Output() public selectedItemsChange = new EventEmitter<any[]>();

    //判断是否支持多选
    @Input() public multipleSelect: boolean = true;

    @Input() public searchable: boolean = false;

    //获取映射的子组件
    @ContentChildren(forwardRef(() => TileOptionComponent))
    private _options: QueryList<TileOptionComponent>;


    //根据选中的option更新selectedItems
    public updateSelectItems(optionItem, selected): void {
        if (this.multipleSelect) { //多选
            if (selected) {
                this.selectedItems.push(optionItem);
            } else {
                this._selectedItems.forEach(selectedItem => {
                    if (this._compareJsonObj(selectedItem, optionItem)) {
                        this.selectedItems.splice(this.selectedItems.indexOf(selectedItem), 1);
                    }
                });
            }
        } else { //单选选中
            this._options.length && this._options.forEach((option: TileOptionComponent) => {
                //去除其他option选中
                if (!this._compareJsonObj(option.optionItem, optionItem) && option.selected) {
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
                if (this._compareJsonObj(option.optionItem, optionItem) && !option.selected) {
                    option.selected = true;
                    option._cdref.detectChanges();
                }
            })
        });
    }

    ngOnInit() {
        this._initTrackItemBy();
    }

    ngAfterContentInit() {
        this._contentInit = true;
        this._setOptionState();
    }
}

@Component({
    selector: 'rdk-tile-option',
    templateUrl: 'tile-option.html',
    styleUrls: ['tile-option.scss']
})
export class TileOptionComponent implements OnInit {
    @Input() public optionItem: any; //option对象

    private _optionView: string; //显示在页面上的值
    private _tileSelect: TileSelectComponent; //父组件

    public selected: boolean = false;//选中状态

    constructor(@Optional() tileSelect: TileSelectComponent, public _cdref: ChangeDetectorRef) {
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
        this._optionView = this.optionItem[this._tileSelect.labelField];
    }

}

@NgModule({
    imports: [CommonModule, FormsModule, InputModule],
    declarations: [TileSelectComponent, TileOptionComponent],
    exports: [TileSelectComponent, TileOptionComponent]
})
export class TileSelectorModule {

}




