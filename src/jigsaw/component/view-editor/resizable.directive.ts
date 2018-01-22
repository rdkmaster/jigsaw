import {Directive, ElementRef, EventEmitter, Input, NgModule, NgZone, Output, Renderer2} from "@angular/core";
import {CallbackRemoval} from "../../core/utils/common-utils";
import {AffixUtils} from "../../core/utils/internal-utils";

@Directive({
    selector: '[jigsaw-resizable], [j-resizable]',
    host: {
        '(mousedown)': '_dragStart($event)'
    }
})
export class JigsawResizable {
    constructor(elementRef: ElementRef, private _renderer: Renderer2, private _zone: NgZone) {
        this._host = elementRef.nativeElement;
    }

    @Input()
    public movableTarget: HTMLElement;

    @Input()
    public effectBox: HTMLElement;

    @Input()
    public effectDirection: string;

    @Input()
    public range: number[];

    @Output()
    public resize = new EventEmitter<number>();

    private _effectOffset: number;

    private _host: HTMLElement;
    private _moving: boolean = false;
    private _position: number[];

    private _removeWindowMouseMoveListener: CallbackRemoval;
    private _removeWindowMouseUpListener: CallbackRemoval;

    private _dragStart = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!this.movableTarget || !this.effectBox) return;

        const startOffsetX = AffixUtils.offset(this._host).left - AffixUtils.offset(this.effectBox).left;
        const startOffsetY = AffixUtils.offset(this._host).top - AffixUtils.offset(this.effectBox).top;

        const startOffset = this.effectDirection == 'column' ? startOffsetY : startOffsetX;
        const offsetProp = this.effectDirection == 'column' ? 'top' : 'left';
        this._initTargetPosition(offsetProp, startOffset);

        this._position = [event.clientX - startOffsetX, event.clientY - startOffsetY];
        this._moving = true;

        this._removeWindowListener();

        this._zone.runOutsideAngular(() => {
            this._removeWindowMouseMoveListener = this._renderer.listen(document, 'mousemove', this._dragMove);
        });

        this._removeWindowMouseUpListener = this._renderer.listen(document, 'mouseup', this._dragEnd);
    };

    private _dragMove = (event) => {
        if (!this._moving || !this.range || !this.movableTarget) return;

        let eventProp = this.effectDirection == 'column' ? 'clientY' : 'clientX',
            rawPosition = this.effectDirection == 'column' ? this._position[1] : this._position[0],
            offsetProp = this.effectDirection == 'column' ? 'top' : 'left';
        this._moveTarget(event, eventProp, rawPosition, offsetProp);
    };

    private _dragEnd = () => {
        this._moving = false;
        this._position = null;
        this._removeWindowListener();
        this._renderer.setStyle(this.movableTarget, 'display', 'none');
        this.resize.emit(this._effectOffset);
    };

    private _initTargetPosition(offsetProp: string, startOffset: number) {
        this._renderer.setStyle(this.movableTarget, offsetProp, startOffset + 'px');
        this._renderer.setStyle(this.movableTarget, 'display', 'block');
    }

    private _moveTarget(event: MouseEvent, eventProp: string, rawPosition: number, offsetProp: string) {
        let offset = event[eventProp] - rawPosition;
        if (offset < this.range[0]) {
            offset = this.range[0] + 5
        } else if (offset > this.range[1]) {
            offset = this.range[1] - 5
        }
        this._effectOffset = offset;
        this._renderer.setStyle(this.movableTarget, offsetProp, offset + 'px');
    }

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

@NgModule({
    declarations: [JigsawResizable],
    exports: [JigsawResizable]
})
export class JigsawResizableModule {

}
