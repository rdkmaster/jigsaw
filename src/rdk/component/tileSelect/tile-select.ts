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
    private _contentInit: boolean = false;
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

    @Output() selectedItemsChange = new EventEmitter<any[]>();

    //设置对象的标识
    @Input() trackItemBy: any;

    //显示在界面上的属性名
    @Input() labelField: string = 'label';

    //判断是否支持多选
    @Input() multipleSelect: boolean = true;

    @Input() searchable: boolean = false;

    //获取映射的子组件
    @ContentChildren(forwardRef(() => TileOptionComponent))
    private _options: QueryList<TileOptionComponent>;

    constructor(){
    }

    //根据选中的option更新selectedItems
    public updateSelectItems(optionItem, selected): void{
        if(this.multipleSelect){ //多选
            if(selected){
                this.selectedItems.push(optionItem);
            }else{
                this._selectedItems.forEach(selectedItem => {
                   if(this._compareJsonObj(selectedItem, optionItem)){
                       this.selectedItems.splice(this.selectedItems.indexOf(selectedItem), 1);
                   }
                });
            }
        }else{ //单选选中
            this._options.length && this._options.forEach((option: TileOptionComponent) => {
                //去除其他option选中
                if(!this._compareJsonObj(option.optionItem, optionItem) && option.selected){
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
    private _compareJsonObj(item1, item2): boolean{
        for(let i=0; i<this.trackItemBy.length; i++){
            if (item1[this.trackItemBy[i]] == item2[this.trackItemBy[i]]) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }

    //根据selectedItems设置选中的option
    private _setOptionState(): void{
        this._selectedItems.length && this._options.length && this._options.forEach((option) => {
            this._selectedItems.forEach((optionItem) => {
                if(this._compareJsonObj(option.optionItem, optionItem) && !option.selected){
                    option.selected = true;
                    option._cdref.detectChanges();
                }
            })
        });
    }

    /*
     * 初始化对象标识，转化为数组
     * */
    private _initTrackItemBy(): void{
        if(!this.trackItemBy){ //标识没有输入值，采用显示属性名
            this.trackItemBy = this.labelField;
        }
        if(this.trackItemBy.indexOf(",") != -1){ //标识是多个
            this.trackItemBy = this.trackItemBy.replace(" ","").split(",");
        }else { //标识是单个
            let arr = [];
            arr.push(this.trackItemBy);
            this.trackItemBy = arr;
        }
    }

    ngOnInit(){
        this._initTrackItemBy();
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

    private _optionView: string; //显示在页面上的值
    private _tileSelect: TileSelectComponent; //父组件

    public selected:boolean = false;//选中状态

    constructor(@Optional() tileSelect: TileSelectComponent, public _cdref: ChangeDetectorRef){
        this._tileSelect = tileSelect;
    }

    //点击组件触发
    private _onClick(): void{
        if(this._tileSelect.multipleSelect){ //多选
            this.selected = !this.selected;//切换组件选中状态
            this._tileSelect.updateSelectItems(this.optionItem, this.selected);
        }else{ //单选
            if(this.selected){
                return;
            }else{
                this.selected = true;
                this._tileSelect.updateSelectItems(this.optionItem, this.selected);
            }
        }

    }

    ngOnInit(){
        //初始化option显示值
        this._optionView = this.optionItem[this._tileSelect.labelField];
    }

}

@NgModule({
    imports: [CommonModule, FormsModule, InputModule],
    declarations: [TileSelectComponent, TileOptionComponent],
    exports: [TileSelectComponent, TileOptionComponent]
})
export class TileSelectorModule{

}




