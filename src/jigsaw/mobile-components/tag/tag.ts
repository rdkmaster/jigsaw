import {Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Output, Renderer2} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnimationDestroy} from "../../common/components/animations/destroy";
import {AbstractJigsawComponent} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";

@Component({
    selector: 'jigsaw-mobile-tag, jm-tag',
    templateUrl: 'tag.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[style.background]': 'color',
        '[style.border-color]': 'color',
        '[class.jigsaw-tag-without-border]': '!showBorder',
        '[class.jigsaw-tag-closable]': 'closable && showBorder',
        '[class.jigsaw-tag-color]': '!!color',
        '[class.jigsaw-tag-host]': 'true',
        '[@AnimationDestroy]': '_state',
        '(@AnimationDestroy.done)': '_animationDone($event)',
    },
    animations: [
        AnimationDestroy
    ]
})
export class JigsawMobileTag extends AbstractJigsawComponent implements OnInit {

    @Input() public color: string;

    private _closable: boolean;
    @Input()
    public get closable(): boolean {
        return this._closable;
    };

    public set closable(value: boolean) {
        this._closable = CommonUtils.isDefined(value) ? value : true;
    }

    /**
     * 是否显示tag的边框和删除按钮，默认显示
     * @type {boolean}
     */
    @Input()
    public showBorder: boolean = true;

    private _state: string;

    constructor(private _renderer: Renderer2,
                public _elementRef: ElementRef) {
        super();
    }

    @Output() public close = new EventEmitter<JigsawMobileTag>();

    /**
     * @internal
     */
    public _$close(event) {
        event.preventDefault();
        event.stopPropagation();
        this._state = 'inactive';
    }

    @Output() public select = new EventEmitter<JigsawMobileTag>();

    /**
     * @internal
     */
    public _$select(event) {
        event.preventDefault();
        event.stopPropagation();
        this.select.emit(this);
    }

    public show() {
        this._state = 'active';
    }

    private _animationDone($event) {
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
    declarations: [JigsawMobileTag],
    exports: [JigsawMobileTag]
})
export class JigsawMobileTagModule {

}
