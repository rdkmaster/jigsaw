import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, NgModule, Output, QueryList} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AbstractJigsawComponent} from "../common";

@Component({
    selector: 'j-list-item',
    templateUrl: 'list-item.html',
    host: {
        '[class.jigsaw-list-item]': 'true',
        '[class.jigsaw-list-item-active]': 'active',
        '(click)': '_$handleClick()'
    }
})
export class JigsawListItem extends AbstractJigsawComponent{
    @Input()
    active: boolean = false;

    @Output()
    activeChange = new EventEmitter<any>();

    /**
     * @internal
     */
    public _$handleClick(){
        this.activeChange.emit(this);
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
    multipleSelect: boolean = false;

    private _singleSelect(clickedItem: JigsawListItem){
        this.items.forEach(item => {
            item.active = item === clickedItem ? true : false;
        })
    }

    ngAfterContentInit(){
        this.items.forEach(item => {
            item.activeChange.subscribe(() => {
                if(this.multipleSelect){
                    // 多选模式
                    item.active = !item.active;
                } else{
                    // 单选模式
                    if(!item.active){
                        this._singleSelect(item);
                    }
                }
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
