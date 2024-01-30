import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef, Injector,
    Input,
    NgModule,
    QueryList,
    Renderer2
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawOptionComponent} from "./group-common";
import {AbstractJigsawGroupComponent} from "./group-common";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {WingsTheme} from "../../common/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { JigsawToast } from "../toast/toast";
import {TranslateHelper} from "../../common/core/utils/translate-helper";

@WingsTheme('list.scss')
@Component({
    selector: 'jigsaw-list, j-list',
    template: '<div *ngIf="disabled" class="jigsaw-list-disabled"></div><ng-content></ng-content>',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]':'theme',
        '[class.jigsaw-list-host]': 'true',
        '[class.jigsaw-list-error]': '!valid',
        '[class.jigsaw-list-max-option-reached]': '_$maxSelectionReached',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawList), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawList extends AbstractJigsawGroupComponent implements AfterContentInit {
    constructor(public _cdr: ChangeDetectorRef,
        public renderer: Renderer2,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super(_cdr, _injector);
    }
    /**
     * 默认单选
     */
    public multipleSelect: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled: boolean = false;

    /**
     * 获取映射的子组件
     * @internal
     */
    @ContentChildren(forwardRef(() => JigsawListOption),{descendants: true})
    public _items: QueryList<JigsawListOption>;
}

@WingsTheme('list-option.scss')
@Component({
    selector: 'jigsaw-list-option,j-list-option',
    templateUrl: 'list-option.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-list-option-host]': 'true',
        '[class.jigsaw-list-option-active]': 'selected',
        '[class.jigsaw-list-option-disabled]': 'disabled || (!selected && maxSelectionReached)',
        '[class.jigsaw-list-option-separator]': 'value ? false : (value == null)',
        '(click)': '_$handleClick()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawListOption extends AbstractJigsawOptionComponent {
    constructor(public elementRef: ElementRef,
                protected _translateService: TranslateService,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector) {
        super(_injector);
    }

    private _selected: boolean = false; // 选中状态

    @RequireMarkForCheck()
    @Input()
    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        if (this._selected === value) {
            return;
        }
        this._selected = value;
        this.selectedChange.emit(value);
    }

    @RequireMarkForCheck()
    @Input()
    public maxSelectionReached: boolean = false;

    /**
     * 点击组件触发
     * @internal
     */
    public _$handleClick(): void {
        if (this.disabled || this.value == null) {
            return;
        }
        if (!this.selected && this.maxSelectionReached) {
            JigsawToast.showError(this._translateService.instant("list.maxSelectionReached"))
            return;
        }
        this.change.emit(this);
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule.forChild()],
    declarations: [JigsawList, JigsawListOption],
    exports: [JigsawList, JigsawListOption]
})
export class JigsawListModule {
    constructor() {
        TranslateHelper.initI18n("list", {
            zh: {
                maxSelectionReached: "已达到选择上限"
            },
            en: {
                maxSelectionReached: "Maximum selection reached"
            }
        });
    }
}
