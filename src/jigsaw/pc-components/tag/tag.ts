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
    Renderer2
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnimationDestroy} from "../../common/components/animations/destroy";
import {AbstractJigsawComponent} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

export type PresetColor = 'preset-blue' | 'preset-cyan' | 'preset-green' | 'preset-magenta' |
    'preset-orange' | 'preset-red' | 'preset-purple' | 'preset-gray';

@Component({
    selector: 'jigsaw-tag, j-tag',
    templateUrl: 'tag.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[style.background]': '_$realColor',
        '[style.border-color]': '_$realColor',
        '[class.jigsaw-tag-closable]': 'closable && !isAdd',
        '[class.jigsaw-tag-disabled]': 'disabled',
        '[class.jigsaw-tag-add]': 'isAdd',
        '[class.jigsaw-tag-color]': '_$realColor?.startsWith("preset-")',
        '[class.jigsaw-tag-host]': 'true',
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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTag extends AbstractJigsawComponent implements OnInit {
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

    /**
     * @internal
     */
    public get _$realColor(): string {
        if (this.disabled) {
            return this.disabledColor || 'preset-gray';
        } else if (this.select) {
            return this.selectedColor || this.color;
        } else {
            return this.color;
        }
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

    constructor(private _renderer: Renderer2,
                /**
                 * @internal
                 */
                public _elementRef: ElementRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
    }

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
        this.select = !this.select;
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
