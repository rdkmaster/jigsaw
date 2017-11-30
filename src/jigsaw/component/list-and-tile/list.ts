import {
    AfterContentInit, ChangeDetectorRef, Component, ContentChildren, forwardRef, Input, NgModule,
    QueryList
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawOptionComponent} from "./group-common";
import {AbstractJigsawGroupComponent} from "./group-common";

@Component({
    selector: 'jigsaw-list, j-list',
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
export class JigsawList extends AbstractJigsawGroupComponent implements AfterContentInit {
    // 默认单选
    public multipleSelect: boolean = false;

    // 获取映射的子组件
    @ContentChildren(forwardRef(() => JigsawListOption))
    protected _items: QueryList<JigsawListOption>;
}

@Component({
    selector: 'jigsaw-list-option,j-list-option',
    templateUrl: 'list-option.html',
    host: {
        '[class.jigsaw-list-option]': 'true',
        '[class.jigsaw-list-option-active]': 'selected',
        '[class.jigsaw-list-option-disabled]': 'disabled',
        '(click)': '_$handleClick()'
    }
})
export class JigsawListOption extends AbstractJigsawOptionComponent {
    constructor(public changeDetector: ChangeDetectorRef) {
        super();
    }

    private _selected: boolean = false; // 选中状态

    @Input()
    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        if (this._selected === value || this.disabled) {
            return;
        }
        this._selected = value;
        this.selectedChange.emit(value);
    }

    /**
     * 点击组件触发
     * @internal
     */
    public _$handleClick(): void {
        if (!this.disabled) {
            this.dispatchChangeEvent.emit(this);
        }
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawList, JigsawListOption],
    exports: [JigsawList, JigsawListOption]
})
export class JigsawListModule {

}
