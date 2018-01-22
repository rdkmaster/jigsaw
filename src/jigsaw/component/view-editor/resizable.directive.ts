
import {Directive, ElementRef, Input, NgModule, NgZone, Renderer2} from "@angular/core";
import {CallbackRemoval} from "../../core/utils/common-utils";
import {JigsawViewLayout} from "./view-editor";
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
    public parent: JigsawViewLayout;

    private _host: HTMLElement;

    private _movableTarget: HTMLElement;
    private _moving: boolean = false;
    private _position: number[];

    private _removeWindowMouseMoveListener: CallbackRemoval;
    private _removeWindowMouseUpListener: CallbackRemoval;

    private _dragStart = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!this.parent) return;

        const resizeLineEl = this._host;
        this._movableTarget = this.parent.resizingLine.nativeElement;
        const startOffsetX = AffixUtils.offset(resizeLineEl).left - AffixUtils.offset(this.parent.element).left;
        const startOffsetY = AffixUtils.offset(resizeLineEl).top - AffixUtils.offset(this.parent.element).top;
        if (this.parent.direction == 'column') {
            this._renderer.setStyle(this._movableTarget, 'top', startOffsetY + 'px');
        } else {
            this._renderer.setStyle(this._movableTarget, 'left', startOffsetX + 'px');
        }
        this._renderer.setStyle(this._movableTarget, 'display', 'block');
        //this.parent.isResizing = true;

        this._position = [event.clientX - startOffsetX, event.clientY - startOffsetY];
        this._moving = true;

        if (this._removeWindowMouseMoveListener) {
            this._removeWindowMouseMoveListener();
        }
        this._zone.runOutsideAngular(() => {
            this._removeWindowMouseMoveListener = this._renderer.listen(document, 'mousemove', this._dragMove);
        });

        if (this._removeWindowMouseUpListener) {
            this._removeWindowMouseUpListener();
        }
        this._removeWindowMouseUpListener = this._renderer.listen(document, 'mouseup', this._dragEnd);
    };

    private _dragMove = (event) => {
        if (this._moving) {
            /*const isFixed = this._movableTarget.style.position == 'fixed';
            const ox = event.clientX - this._position[0] - (isFixed ? window.pageXOffset : 0);
            const oy = event.clientY - this._position[1] - (isFixed ? window.pageYOffset : 0);*/
            if (this.parent.direction == 'column') {
                let oy = event.clientY - this._position[1];
                if (oy < 0) {
                    oy = 0
                } else if (oy > this.parent.element.offsetHeight) {
                    oy = this.parent.element.offsetHeight - 5
                }
                this._renderer.setStyle(this._movableTarget, 'top', oy + 'px');
            } else {
                let ox = event.clientX - this._position[0];
                if (ox < 0) {
                    ox = 0
                } else if (ox > this.parent.element.offsetWidth) {
                    ox = this.parent.element.offsetWidth - 5
                }
                this._renderer.setStyle(this._movableTarget, 'left', ox + 'px');
            }
        }
    };

    private _dragEnd = () => {
        this._moving = false;
        this._position = null;
        this._removeWindowListener();
        this._renderer.setStyle(this._movableTarget, 'display', 'none');
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
