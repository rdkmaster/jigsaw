import {Directive, EventEmitter, Input, NgZone, Output, Renderer2} from "@angular/core";
import {CallbackRemoval} from "../../common/core/utils/common-utils";
import {AffixUtils} from "../../common/core/utils/internal-utils";

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

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public parentBox: any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public effectBox: any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public effectDirection: string;

    @Input()
    public resizeStep: number = 1;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public range: number[];

    @Output()
    public resize = new EventEmitter<number>();

    @Output()
    public resizeEnd = new EventEmitter<number>();

    /**
     * @internal
     */
    public _$moving: boolean = false;

    private _removeWindowMouseMoveListener: CallbackRemoval;
    private _removeWindowMouseUpListener: CallbackRemoval;
    private _effectOffset: number;
    private _position: number[];
    private _rawPosOfMouse: number[];

    /**
     * @internal
     */
    public _$dragStart = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!this.parentBox || !this.effectBox) return;

        const startOffsetX = AffixUtils.offset(this.parentBox).left - AffixUtils.offset(this.effectBox).left;
        const startOffsetY = AffixUtils.offset(this.parentBox).top - AffixUtils.offset(this.effectBox).top;
        this._rawPosOfMouse = [event.clientX, event.clientY];
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
            rawPosition = this.effectDirection == 'column' ? this._position[1] : this._position[0],
            rawPosOfMouse = this.effectDirection == 'column' ? this._rawPosOfMouse[1] : this._rawPosOfMouse[0];
        const remainder = isNaN(this.resizeStep) ? 0 : (event[eventProp] - rawPosOfMouse) % Number(this.resizeStep);
        let offset = event[eventProp] - rawPosition - remainder;
        if (offset < this.range[0]) {
            offset = this.range[0] + 5;
        } else if (offset > this.range[1]) {
            offset = this.range[1] - 5;
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
