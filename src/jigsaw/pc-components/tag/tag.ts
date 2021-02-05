import {
    ChangeDetectionStrategy,
    Injector,
    Component,
    ElementRef,
    EventEmitter,
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

@Component({
    selector: 'jigsaw-tag, j-tag',
    templateUrl: 'tag.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[style.background]': 'color',
        '[style.border-color]': 'color',
        '[class.jigsaw-tag-without-border]': '!showBorder',
        '[class.jigsaw-tag-closable]': 'closable && showBorder',
        '[class.jigsaw-tag-disabled]': 'disabled',
        '[class.jigsaw-tag-add]': 'isAdd',
        '[class.jigsaw-tag-color]': '!!color',
        '[class.jigsaw-tag-host]': 'true',
        '[class.jigsaw-tag-preset-blue]': 'preset == "blue"',
        '[class.jigsaw-tag-preset-cyan]': 'preset == "cyan"',
        '[class.jigsaw-tag-preset-green]': 'preset == "green"',
        '[class.jigsaw-tag-preset-magenta]': 'preset == "magenta"',
        '[class.jigsaw-tag-preset-orange]': 'preset == "orange"',
        '[class.jigsaw-tag-preset-red]': 'preset == "red"',
        '[class.jigsaw-tag-preset-purple]': 'preset == "purple"',
        '[class.jigsaw-tag-preset-gray]': 'preset == "gray"',
        '[class.jigsaw-tag-size-med]': 'size == "medium"',
        '[class.jigsaw-tag-size-sm]': 'size == "small"',
        '[class.jigsaw-tag-selected]': 'selected',
        '[@AnimationDestroy]': '_state',
        '(@AnimationDestroy.done)': '_animationDone($event)',
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
    public preset: string = "gray";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public size: "small" | "medium";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public isAdd:boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled:boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public color: string;

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
     * 是否显示tag的边框和删除按钮，默认显示
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public showBorder: boolean = true;

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

    /**
     * @internal
     */
    public _$close(event) {
        event.preventDefault();
        event.stopPropagation();
        this._state = 'inactive';
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public selected: boolean = false;

    @Output()
    public selectedChange = new EventEmitter<JigsawTag>();

    /**
     * @internal
     */
    public _$select(event) {
        event.preventDefault();
        event.stopPropagation();
        this.selected  = !this.selected;
        this.selectedChange.emit(event);
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
