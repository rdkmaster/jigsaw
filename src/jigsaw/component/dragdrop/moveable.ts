import {Directive, Renderer2, ElementRef, OnInit, Input, OnDestroy, NgZone} from "@angular/core";
import {AffixUtils} from "../../core/utils/internal-utils";
import {CommonUtils} from "../../core/utils/common-utils";
import {CallbackRemoval} from "../../core/data/component-data";

@Directive({
    selector: '[jigsaw-moveable], [jigsawMoveable]'
})
export class JigsawMoveable implements OnInit, OnDestroy {
    private _moveableTarget: HTMLElement;
    private _host: HTMLElement;
    private _moving: boolean = false;
    private _position: number[];
    private _removeHostMouseDownListener: CallbackRemoval;
    private _removeWindowMouseMoveListener: CallbackRemoval;
    private _removeWindowMouseUpListener: CallbackRemoval;

    @Input()
    public moveableAffected: string;

    constructor(private _renderer: Renderer2,
                private _elementRef: ElementRef,
                private _zone: NgZone) {
    }

    private _dragStart = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this._position = [event.clientX - AffixUtils.offset(this._moveableTarget).left,
            event.clientY - AffixUtils.offset(this._moveableTarget).top];
        this._moving = true;
        this._removeWindowMouseMoveListener = this._renderer.listen(document, 'mousemove', this._dragMove);
        this._removeWindowMouseUpListener = this._renderer.listen(document, 'mouseup', this._dragEnd);
    };

    private _dragMove = (event) => {
        this._zone.runOutsideAngular(() => {
            if (this._moving) {
                const ox = event.clientX - this._position[0];
                const oy = event.clientY - this._position[1];
                this._renderer.setStyle(this._moveableTarget, 'left', ox + 'px');
                this._renderer.setStyle(this._moveableTarget, 'top', oy + 'px');
            }
        })
    };

    private _dragEnd = () => {
        this._moving = false;
        this._position = null;
        this._removeWindowListener();
    };

    ngOnInit() {
        this._host = this._elementRef.nativeElement;
        this._moveableTarget = this.moveableAffected ?
            CommonUtils.getParentNodeBySelector(this._host, this.moveableAffected) : this._host;

        setTimeout(() => {
            if (this._isElementAffixed(this._moveableTarget)) {
                this._removeHostMouseDownListener = this._renderer.listen(this._host, 'mousedown', this._dragStart);
            }
        })
    }

    private _isElementAffixed(element: HTMLElement): boolean {
        if (!(element instanceof HTMLElement)) return false;
        const positionType = element.style.position;
        return positionType == 'fixed' || positionType == 'absolute';
    }

    private _removeWindowListener(){
        if(this._removeWindowMouseMoveListener){
            this._removeWindowMouseMoveListener();
        }
        if(this._removeWindowMouseUpListener){
            this._removeWindowMouseUpListener();
        }
    }

    ngOnDestroy(){
        if(this._removeHostMouseDownListener){
            this._removeHostMouseDownListener();
        }
        this._removeWindowListener();
    }
}


