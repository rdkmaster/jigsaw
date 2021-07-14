import {Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, Renderer2} from "@angular/core";
import {AffixUtils} from "../../core/utils/internal-utils";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {AbstractJigsawViewBase} from "../../common";

// @dynamic
@Directive({
    selector: '[jigsaw-movable], [jigsawMovable], [j-movable]'
})
export class JigsawMovable extends AbstractJigsawViewBase implements OnInit, OnDestroy {
    private _movableTarget: HTMLElement;
    private _host: HTMLElement;
    private _moving: boolean = false;
    private _position: number[];

    private _removeHostMouseDownListener: CallbackRemoval;
    private _removeWindowMouseMoveListener: CallbackRemoval;
    private _removeWindowMouseUpListener: CallbackRemoval;

    @Input()
    public movableAffected: string;

    @Input()
    public affixType: 'fixed' | 'absolute';

    // 用于配置全局的偏移
    public static moveOffset: () => { left: number, top: number } = function() {return {left: 0, top: 0}};

    constructor(private _renderer: Renderer2,
                private _elementRef: ElementRef,
                protected _zone: NgZone) {
        super();
    }

    private _isFixed: boolean;

    private _checkFixed() {
        return this._movableTarget.style.position == 'fixed' || getComputedStyle(this._movableTarget)['position'] == 'fixed';
    }

    private _dragStart = (event) => {
        this._position = [event.clientX - AffixUtils.offset(this._movableTarget).left,
            event.clientY - AffixUtils.offset(this._movableTarget).top];
        this._moving = true;
        this._isFixed = this._checkFixed();

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

    @Output('jigsawMovableMoving')
    public moving = new EventEmitter<{x: number, y: number}>();

    private _dragMove = (event) => {
        if (this._moving) {
            const ox = event.clientX - this._position[0] - (this._isFixed ? window.pageXOffset : 0) - JigsawMovable.moveOffset.apply(this).left;
            const oy = event.clientY - this._position[1] - (this._isFixed ? window.pageYOffset : 0) - JigsawMovable.moveOffset.apply(this).top;
            this._renderer.removeStyle(this._movableTarget, 'right');
            this._renderer.removeStyle(this._movableTarget, 'bottom');
            this._renderer.setStyle(this._movableTarget, 'left', ox + 'px');
            this._renderer.setStyle(this._movableTarget, 'top', oy + 'px');
            this.moving.emit({x: ox, y: oy});
        }
    };

    private _dragEnd = () => {
        this._moving = false;
        this._position = null;
        this._removeWindowListener();
    };

    ngOnInit() {
        super.ngOnInit();
        this._host = this._elementRef.nativeElement;
        this._movableTarget = this.movableAffected ?
            CommonUtils.getParentNodeBySelector(this._host, this.movableAffected) : this._host;
        if (this.affixType) {
            this._renderer.setStyle(this._movableTarget, 'position', this.affixType);
            const rect = this.affixType == 'fixed' ? this._movableTarget.getBoundingClientRect() :
                AffixUtils.offset(this._movableTarget);
            this._renderer.setStyle(this._movableTarget, 'left', rect.left - JigsawMovable.moveOffset.apply(this).left + 'px');
            this._renderer.setStyle(this._movableTarget, 'top', rect.top - JigsawMovable.moveOffset.apply(this).top + 'px');
        }
        if (this._isElementAffixed(this._movableTarget)) {
            if (this._removeHostMouseDownListener) {
                this._removeHostMouseDownListener();
            }
            this._removeHostMouseDownListener = this._renderer.listen(this._host, 'mousedown', this._dragStart);
        }
    }

    private _isElementAffixed(element: HTMLElement): boolean {
        if (!(element instanceof HTMLElement)) return false;
        const positionType = element.style.position || getComputedStyle(element)['position'];
        return positionType == 'fixed' || positionType == 'absolute';
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
        super.ngOnDestroy();
        if (this._removeHostMouseDownListener) {
            this._removeHostMouseDownListener();
        }
        this._removeWindowListener();
    }
}


