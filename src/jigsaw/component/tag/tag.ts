import {Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Output, Renderer2} from "@angular/core";
import {CommonModule} from "@angular/common";
import {bubbleIn} from "../animations/bubble-in";
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
        '[@bubbleIn]': '_animationState',
        '(@bubbleIn.done)': '_animationDone($event)',
    },
    animations: [bubbleIn]
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

    private _animationState: string;

    constructor(private _renderer: Renderer2,
                public _elementRef: ElementRef) {
        super();
    }

    @Output() public close = new EventEmitter<JigsawTag>();

    /**
     * @internal
     */
    public _$close(event) {
        event.preventDefault();
        event.stopPropagation();
        this._animationState = 'void';
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
        if ($event.toState === 'void') {
            this.close.emit(this);
            const parentNode = this._renderer.parentNode(this._elementRef.nativeElement);
            if (parentNode) parentNode.removeChild(this._elementRef.nativeElement);
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
