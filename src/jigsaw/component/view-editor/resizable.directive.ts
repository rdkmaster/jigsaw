import {Directive, ElementRef, EventEmitter, Input, NgModule, NgZone, Output, Renderer2} from "@angular/core";
import {CallbackRemoval} from "../../core/utils/common-utils";
import {AffixUtils} from "../../core/utils/internal-utils";

@Directive({
    selector: '[jigsaw-resizable], [j-resizable]',
    host: {
        '(mousedown)': '_dragStart($event)'
    }
})
export class JigsawResizable{
    constructor(elementRef: ElementRef, private _renderer: Renderer2, private _zone: NgZone){
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
        if (this.effectDirection == 'column') {
            this._renderer.setStyle(this.movableTarget, 'top', startOffsetY + 'px');
        } else {
            this._renderer.setStyle(this.movableTarget, 'left', startOffsetX + 'px');
        }
        this._renderer.setStyle(this.movableTarget, 'display', 'block');

        this._position = [event.clientX - startOffsetX, event.clientY - startOffsetY];
        this._moving = true;

        this._removeWindowListener();

        this._zone.runOutsideAngular(() => {
            this._removeWindowMouseMoveListener = this._renderer.listen(document, 'mousemove', this._dragMove);
        });

        this._removeWindowMouseUpListener = this._renderer.listen(document, 'mouseup', this._dragEnd);
    };

    private _dragMove = (event) => {
        console.log(11111, this.range);
        if (this._moving) {
            if (this.effectDirection == 'column') {
                let oy = event.clientY - this._position[1];
                if (oy < this.range[0]) {
                    oy = this.range[0] + 5
                } else if (oy > this.range[1]) {
                    oy = this.range[1] - 5
                }
                this._effectOffset = oy;
                this._renderer.setStyle(this.movableTarget, 'top', oy + 'px');
            } else {
                let ox = event.clientX - this._position[0];
                if (ox < this.range[0]) {
                    ox = this.range[0] + 5
                } else if (ox > this.range[1]) {
                    ox = this.range[1] - 5
                }
                this._effectOffset = ox;
                this._renderer.setStyle(this.movableTarget, 'left', ox + 'px');
            }
        }
    };

    private _dragEnd = () => {
        this._moving = false;
        this._position = null;
        this._removeWindowListener();
        this._renderer.setStyle(this.movableTarget, 'display', 'none');
        this.resize.emit(this._effectOffset);
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

@NgModule({
    declarations: [JigsawResizable],
    exports: [JigsawResizable]
})
export class JigsawResizableModule{

}
