import {Directive, EventEmitter, Input, NgZone, Output, Renderer2} from "@angular/core";
import {CallbackRemoval} from "../../core/utils/common-utils";
import {AffixUtils} from "../../core/utils/internal-utils";

@Directive({
    selector: '[jigsaw-resizable], [j-resizable]',
    host: {
        '[class.jigsaw-box-resizing]': '_$moving',
        '(mousedown)': '_$dragStart($event)'
    }
})
export class JigsawBoxResizable {
    constructor(private _renderer: Renderer2, private _zone: NgZone) {
    }

    @Input()
    public parentBox: HTMLElement;

    @Input()
    public effectBox: HTMLElement;

    @Input()
    public effectDirection: string;

    @Input()
    public range: number[];

    @Output()
    public resize = new EventEmitter<number>();

    @Output()
    public resizeEnd = new EventEmitter<number>();

    private _effectOffset: number;

    public _$moving: boolean = false;
    private _position: number[];

    private _removeWindowMouseMoveListener: CallbackRemoval;
    private _removeWindowMouseUpListener: CallbackRemoval;

    public _$dragStart = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!this.parentBox || !this.effectBox) return;

        const startOffsetX = AffixUtils.offset(this.parentBox).left - AffixUtils.offset(this.effectBox).left;
        const startOffsetY = AffixUtils.offset(this.parentBox).top - AffixUtils.offset(this.effectBox).top;

        this._position = [event.clientX - startOffsetX, event.clientY - startOffsetY];
        this._$moving = true;
        this._renderer.setStyle(document.body, 'cursor',
            this.effectDirection == 'column' ? 'n-resize' : 'e-resize');

        this._removeWindowListener();

        this._zone.runOutsideAngular(() => {
            this._removeWindowMouseMoveListener = this._renderer.listen(document, 'mousemove', this._dragMove);
        });

        this._removeWindowMouseUpListener = this._renderer.listen(document, 'mouseup', this._dragEnd);
    };

    private _dragMove = (event) => {
        if (!this._$moving || !this.range) return;
        let eventProp = this.effectDirection == 'column' ? 'clientY' : 'clientX',
            rawPosition = this.effectDirection == 'column' ? this._position[1] : this._position[0];
        let offset = event[eventProp] - rawPosition;
        if (offset < this.range[0]) {
            offset = this.range[0] + 5
        } else if (offset > this.range[1]) {
            offset = this.range[1] - 5
        }
        this._effectOffset = offset;
        this.resize.emit(offset);
    };

    private _dragEnd = () => {
        this._$moving = false;
        this._position = null;
        this._removeWindowListener();
        this._renderer.setStyle(document.body, 'cursor', 'auto');
        this.resizeEnd.emit();
    };

    private _removeWindowListener() {
        if (this._removeWindowMouseMoveListener) {
            this._removeWindowMouseMoveListener();
        }
        if (this._removeWindowMouseUpListener) {
            this._removeWindowMouseUpListener();
        }
    }

    ngOnDestroy() {
        this._removeWindowListener();
    }
}
