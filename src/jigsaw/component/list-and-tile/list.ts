import {
    AfterContentInit, ChangeDetectorRef, Component, ContentChildren, forwardRef, NgModule,
    QueryList
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawOptionComponent} from "./group-common";
import {AbstractJigsawGroupComponent} from "./group-common";
import {CommonUtils} from "../../core/utils/common-utils";

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

    /**
     * 点击组件触发
     * @internal
     */
    public _$handleClick(event): void {
        if (!this.disabled) {
            if (CommonUtils.isUndefined(event)) {
                this.selectedChange.emit(this);
            } else {
                if (this.innerSelected) {
                    this.innerSelected = false;
                }
                else {
                    this.innerSelected = true;
                    this.selectedChange.emit(this);
                }
            }
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
