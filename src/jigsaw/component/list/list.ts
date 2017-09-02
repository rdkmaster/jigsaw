import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, NgModule, Output, QueryList} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AbstractJigsawComponent} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";

@Component({
    selector: 'j-list-item',
    templateUrl: 'list-item.html',
    host: {
        '[class.jigsaw-list-item]': 'true',
        '[class.jigsaw-list-item-active]': 'selected',
        '(click)': '_$handleClick()'
    }
})
export class JigsawListItem extends AbstractJigsawComponent{
    @Input()
    value: any;

    @Input()
    selected: boolean = false;

    @Output()
    selectedChange = new EventEmitter<any>();

    /**
     * @internal
     */
    public _$handleClick(){
        this.selectedChange.emit(this);
    }
}

@Component({
    selector: 'j-list',
    template: '<ng-content></ng-content>',
    host: {
        '[class.jigsaw-list]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawList extends AbstractJigsawComponent implements AfterContentInit{
    @ContentChildren(JigsawListItem) items: QueryList<JigsawListItem>;

    @Input()
    public selectedItems: object[];

    @Output()
    public selectedItemsChange = new EventEmitter<object[]>();

    @Input()
    public multipleSelect: boolean = false;

    //设置对象的标识
    @Input()
    public trackItemBy: string | string[];

    private _singleSelect(clickedItem: JigsawListItem){
        this.items.forEach(item => {
            item.selected = item === clickedItem ? true : false;
        })
    }

    ngAfterContentInit(){
        this.items.forEach(item => {
            item.selectedChange.subscribe(() => {
                if(this.multipleSelect){
                    // 多选模式
                    item.selected = !item.selected;
                    if(item.selected){
                        // 选中
                        this.selectedItems.push(item.value);
                    } else {
                        // 取消选中
                        this.selectedItems.splice(this.selectedItems.findIndex(selectedItem =>
                            selectedItem.toString() === item.value.toString(), 1));
                    }
                } else{
                    // 单选模式
                    if(!item.selected){
                        this._singleSelect(item);
                        this.selectedItems = [item.value];
                    }
                }
                this.selectedItemsChange.emit(this.selectedItems);
            })
        })
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawList, JigsawListItem],
    exports: [JigsawList, JigsawListItem]
})
export class JigsawListModule{

}
