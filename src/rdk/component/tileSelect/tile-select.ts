import {
    NgModule, Component, ContentChildren, QueryList, Input, Output, EventEmitter,
    Optional, OnInit, forwardRef, AfterContentInit, ChangeDetectorRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'

import {InputModule} from '../input/input';

@Component({
    selector: 'rdk-tile-select',
    templateUrl: 'tile-select.html',
    styleUrls: ['tile-select.scss']
})
export class TileSelectComponent implements OnInit, AfterContentInit{

    _contentInit: boolean = false;

    private _selectedItems: any[] = [];

    @Input()
    get selectedItems() {
        return this._selectedItems;
    }
    set selectedItems(newValue) {
        if(newValue && !newValue.length){
            return;
        }
        if(this._selectedItems != newValue){
            this._selectedItems = newValue;
            this._contentInit && this._setOptionState();
        }
    }

    @Output('selected') selectedItemsChange = new EventEmitter<any[]>();

    //设置对象的标识
    @Input() track_item_by: any;

    //显示在界面上的属性名
    @Input() label_field: string = 'label';

    //判断是否支持多选
    @Input() multiple_select: boolean = true;

    @Input() searchable: boolean = false;

    //获取映射的子组件
    @ContentChildren(forwardRef(() => TileOptionComponent)) options: QueryList<TileOptionComponent>;

    constructor(){
    }

    //根据选中的option更新selectedItems
    _updateSelectItems(optionItem, selected){
        if(this.multiple_select){ //多选
            if(selected){
                this.selectedItems.push(optionItem);
            }else{
                this._selectedItems.forEach(selectedItem => {
                   if(this._compareOption(selectedItem, optionItem)){
                       this.selectedItems.splice(this.selectedItems.indexOf(selectedItem), 1);
                   }
                });
            }
        }else{ //单选选中
            this.options.length && this.options.forEach((option: TileOptionComponent) => {
                //去除其他option选中
                if(!this._compareOption(option.optionItem, optionItem) && option.selected){
                    option.selected = false;
                    this.selectedItems.splice(this.selectedItems.indexOf(option.optionItem), 1);
                }
            });
            //添加选中数据
            this.selectedItems.push(optionItem);
        }
        this.selectedItemsChange.emit(this.selectedItems);

    }

    //比较两个option是否相等
    _compareOption(item1, item2): boolean{
        for(let i=0; i<this.track_item_by.length; i++){
            if (item1[this.track_item_by[i]] == item2[this.track_item_by[i]]) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }

    //根据selectedItems设置选中的option
    _setOptionState(){
        this._selectedItems.length && this.options.length && this.options.forEach((option) => {
            this._selectedItems.forEach((optionItem) => {
                if(this._compareOption(option.optionItem, optionItem) && !option.selected){
                    option.selected = true;
                    option._cdref.detectChanges();
                }
            })
        });
    }

    ngOnInit(){
        //初始化对象标识，转化为数组
        if(!this.track_item_by){ //标识没有输入值，采用显示属性名
            this.track_item_by = this.label_field;
        }
        if(this.track_item_by.indexOf(",") != -1){ //标识是多个
            this.track_item_by = this.track_item_by.replace(" ","").split(",");
        }else { //标识是单个
            let arr = [];
            arr.push(this.track_item_by);
            this.track_item_by = arr;
        }
    }

    ngAfterContentInit(){
        this._contentInit = true;
        this._setOptionState();
    }
}

@Component({
    selector: 'rdk-tile-option',
    templateUrl: 'tile-option.html',
    styleUrls: ['tile-option.scss']
})
export class TileOptionComponent implements OnInit{
    @Input() optionItem: any; //option对象

    optionView: string; //显示在页面上的值

    selected:boolean = false;//选中状态

    tileSelect: TileSelectComponent; //父组件

    constructor(@Optional() tileSelect: TileSelectComponent, public _cdref: ChangeDetectorRef){
        this.tileSelect = tileSelect;
    }

    //点击组件触发
    onClick(){
        if(this.tileSelect.multiple_select){ //多选
            this.selected = !this.selected;//切换组件选中状态
            this.tileSelect._updateSelectItems(this.optionItem, this.selected);
        }else{ //单选
            if(this.selected){
                return;
            }else{
                this.selected = true;
                this.tileSelect._updateSelectItems(this.optionItem, this.selected);
            }
        }

    }

    ngOnInit(){
        //初始化option显示值
        this.optionView = this.optionItem[this.tileSelect.label_field];
    }

}

@NgModule({
    imports: [CommonModule, FormsModule, InputModule],
    declarations: [TileSelectComponent, TileOptionComponent],
    exports: [TileSelectComponent, TileOptionComponent]
})
export class TileSelectorModule{

}




