import {
    AfterContentInit, ChangeDetectorRef, Component, ContentChildren, forwardRef, Input, NgModule,
    QueryList
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawGroupComponent, AbstractJigsawItemComponent} from "../tile-select/tile-select";

@Component({
    selector: 'j-list',
    template: '<ng-content></ng-content>',
    host: {
        '[class.jigsaw-list]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawList), multi: true},
    ]
})
export class JigsawList extends AbstractJigsawGroupComponent implements AfterContentInit{
    @Input() public searchable: boolean = false;

    // 默认单选
    public multipleSelect: boolean = false;

    // 获取映射的子组件
    @ContentChildren(forwardRef(() => JigsawListItem))
    protected _items: QueryList<JigsawListItem>;
}

@Component({
    selector: 'j-list-item',
    templateUrl: 'list-item.html',
    host: {
        '[class.jigsaw-list-item]': 'true',
        '[class.jigsaw-list-item-active]': 'selected',
        '(click)': '_$handleClick()'
    }
})
export class JigsawListItem extends AbstractJigsawItemComponent{
    constructor(public changeDetector: ChangeDetectorRef) {
        super(changeDetector);
    }

    /**
     * 点击组件触发
     * @internal
     */
    public _$handleClick(): void {
        this.selectedChange.emit(this);
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawList, JigsawListItem],
    exports: [JigsawList, JigsawListItem]
})
export class JigsawListModule{

}
