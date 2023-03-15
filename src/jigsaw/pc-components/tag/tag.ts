import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    NgModule,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnimationDestroy} from "../../common/components/animations/destroy";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

export type PresetColor = 'preset-blue' | 'preset-cyan' | 'preset-green' | 'preset-magenta' |
    'preset-orange' | 'preset-red' | 'preset-purple' | 'preset-gray';

@WingsTheme('tag.scss')
@Component({
    selector: 'jigsaw-tag, j-tag',
    templateUrl: 'tag.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[style.background]': '_$commonColor',
        '[style.border-color]': '_$commonColor',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-tag-host]': 'true',
        '[class.jigsaw-tag-closable]': 'closable && !isAdd',
        '[class.jigsaw-tag-disabled]': 'disabled',
        '[class.jigsaw-tag-add]': 'isAdd',
        '[class.jigsaw-tag-preset-blue]': '_$realColor == "preset-blue"',
        '[class.jigsaw-tag-preset-cyan]': '_$realColor == "preset-cyan"',
        '[class.jigsaw-tag-preset-green]': '_$realColor == "preset-green"',
        '[class.jigsaw-tag-preset-magenta]': '_$realColor == "preset-magenta"',
        '[class.jigsaw-tag-preset-orange]': '_$realColor == "preset-orange"',
        '[class.jigsaw-tag-preset-red]': '_$realColor == "preset-red"',
        '[class.jigsaw-tag-preset-purple]': '_$realColor == "preset-purple"',
        '[class.jigsaw-tag-preset-gray]': '_$realColor == "preset-gray"',
        '[class.jigsaw-tag-size-med]': 'size == "medium"',
        '[class.jigsaw-tag-size-sm]': 'size == "small"',
        '[class.jigsaw-tag-selected]': 'select',
        '[@AnimationDestroy]': '_state',
        '(@AnimationDestroy.done)': '_animationDone($event)',
        '(click)': '_$click($event)',
    },
    animations: [
        AnimationDestroy
    ]
})
export class JigsawTag extends AbstractJigsawComponent implements OnInit {
    constructor(private _renderer: Renderer2,
        /**
         * @internal
         */
        public _elementRef: ElementRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
        super(null);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public size: "small" | "medium";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public isAdd: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabledColor: string | PresetColor = 'preset-gray';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public color: string | PresetColor = 'preset-gray';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public selectedColor: string | PresetColor;

    /**
     * 配置按钮图标
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public icon: string;

    @ViewChild('text', { read: ElementRef })
    private _text: ElementRef;

    private _title: string;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get title(): string {
        return CommonUtils.isDefined(this._title) ? this._title : this._text?.nativeElement.innerText;
    }

    public set title(value: string) {
        if (value == this._title) {
            return;
        }
        this._title = value;
    }

    /**
     * @internal
     */
    public get _$realColor(): string {
        let color;
        if (this.disabled) {
            color = this.disabledColor;
        } else if (this.select) {
            color = this.selectedColor || this.color;
        } else {
            color = this.color;
        }
        return typeof color == 'string' ? color : 'preset-gray';
    }

    /**
     * 当使用普通原色时，需要在切换选中时，通过设置null值，清除之前的值
     * @internal
     */
    public get _$commonColor(): string {
        const realColor = this._$realColor;
        return realColor.startsWith("preset-") ? null : realColor;
    }

    private _closable: boolean;

    @Input()
    @RequireMarkForCheck()
    public get closable(): boolean {
        return this._closable;
    };

    public set closable(value: boolean) {
        this._closable = CommonUtils.isDefined(value) ? value : true;
    }

    /**
     * @internal
     */
    public _state: string;

    @Output()
    public close = new EventEmitter<JigsawTag>();

    @Output()
    public add = new EventEmitter<JigsawTag>();

    /**
     * @internal
     */
    public _$close(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this._state = 'inactive';
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public select: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public toggleSelect: boolean = false;

    @Output()
    public selectChange = new EventEmitter<boolean>();

    /**
     * @internal
     */
    public _$click(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        if (this.isAdd) {
            this.add.emit(this);
            return;
        }
        if (!this.toggleSelect) {
            this.select = !this.select;
        }
        this.selectChange.emit(this.select);
    }

    public show() {
        this._state = 'active';
    }

    /**
     * @internal
     */
    public _animationDone($event) {
        if ($event.toState === 'inactive') {
            this.close.emit(this);
        }
    }

    ngOnInit() {
        this.basicClass && this._renderer.addClass(this._elementRef.nativeElement, this.basicClass);
    }
}


@NgModule({
    imports: [CommonModule],
    declarations: [JigsawTag],
    exports: [JigsawTag]
})
export class JigsawTagModule {
}
