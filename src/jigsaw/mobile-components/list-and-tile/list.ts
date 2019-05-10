import {
    AfterContentInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, forwardRef, Input, NgModule,
    QueryList
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawMobileOptionComponent} from "./group-common";
import {AbstractJigsawMobileGroupComponent} from "./group-common";

@Component({
    selector: 'jigsaw-mobile-list, jm-list',
    template: '<div *ngIf="disabled" class="jigsaw-mobilelist-disabled"></div><ng-content></ng-content>',
    host: {
        '[class.jigsaw-list]': 'true',
        '[class.jigsaw-list-error]': '!valid',
        '[style.width]': 'width',
        '[style.height]': 'height'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawMobileList), multi: true},
    ]
})
export class JigsawMobileList extends AbstractJigsawMobileGroupComponent implements AfterContentInit {
    // 默认单选
    public multipleSelect: boolean = false;

    @Input()
    public disabled : boolean =false;
    // 获取映射的子组件
    @ContentChildren(forwardRef(() => JigsawMobileListOption))
    protected _items: QueryList<JigsawMobileListOption>;
}

@Component({
    selector: 'jigsaw-mobile-list-option,jm-list-option',
    templateUrl: 'list-option.html',
    host: {
        '[class.jigsaw-list-option]': 'true',
        '[class.jigsaw-list-option-active]': 'selected',
        '[class.jigsaw-list-option-disabled]': 'disabled',
        '[class.jigsaw-list-option-separator]': '!value',
        '(click)': '_$handleClick()'
    }
})
export class JigsawMobileListOption extends AbstractJigsawMobileOptionComponent {
    constructor(public changeDetector: ChangeDetectorRef, public elementRef: ElementRef) {
        super();
    }

    private _selected: boolean = false; // 选中状态

    @Input()
    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
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
        if(this.disabled || !this.value) return;
        this.change.emit(this);
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawMobileList, JigsawMobileListOption],
    exports: [JigsawMobileList, JigsawMobileListOption]
})
export class JigsawMobileListModule {

}
