import {Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Output, Renderer2} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnimationDestroy} from "../animations/destroy";
import {AbstractJigsawComponent} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";

@Component({
    selector: 'jigsaw-tag, j-tag',
    templateUrl: 'tag.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[style.background]': 'color',
        '[style.border-color]': 'color',
        '[class.jigsaw-tag-closable]': '_closable',
        '[class.jigsaw-tag-color]': '!!color',
        '[class.jigsaw-tag-host]': 'true',
        '[@AnimationDestroy]': '_state',
        '(@AnimationDestroy.done)': '_animationDone($event)',
    },
    animations: [
        AnimationDestroy
    ]
})
export class JigsawTag extends AbstractJigsawComponent implements OnInit {

    @Input() public color: string;

    private _closable: boolean;
    @Input()
    public get closable(): boolean {
        return this._closable;
    };

    public set closable(value: boolean) {
        this._closable = CommonUtils.isDefined(value) ? value : true;
    }

    private _state: string;

    constructor(private _renderer: Renderer2,
                private _elementRef: ElementRef) {
        super();
    }

    @Output() public close = new EventEmitter<JigsawTag>();

    /**
     * @internal
     */
    public _$close(event) {
        event.preventDefault();
        event.stopPropagation();
        this._state = 'inactive';
    }

    @Output() public select = new EventEmitter<JigsawTag>();

    /**
     * @internal
     */
    public _$select(event) {
        event.preventDefault();
        event.stopPropagation();
        this.select.emit(this);
    }

    private _animationDone($event) {
        if ($event.toState === 'inactive') {
            this.close.emit(this);
            this._renderer.parentNode(this._elementRef.nativeElement).removeChild(this._elementRef.nativeElement);
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
