import {Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, Renderer2} from "@angular/core";
import {AffixUtils} from "../../core/utils/internal-utils";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {AbstractJigsawViewBase} from "../../common";

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

    @Input('jigsawMovableTargetSelector')
    public targetSelector: string;

    @Input('jigsawMovableAffixType')
    public affixType: 'fixed' | 'absolute';

    @Output('jigsawMovableMoving')
    public moving = new EventEmitter<{x: number, y: number}>();

    /**
     * 用于设置相对全局的偏移，如fixed不相对于body定位的情况
     */
    public moveOffset: () => { left: number, top: number } = () => ({left: 0, top: 0});

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
        event.preventDefault();
        event.stopPropagation();
        this._position = [event.clientX - AffixUtils.offset(this._movableTarget).left,
            event.clientY - AffixUtils.offset(this._movableTarget).top];
        this._moving = true;
        this._isFixed = this._checkFixed();

        if (this._removeWindowMouseMoveListener) {
            this._removeWindowMouseMoveListener();
        }
        const offset = this.moveOffset.apply(this);
        const scale = CommonUtils.getScale(this._movableTarget);
        this._zone.runOutsideAngular(() => {
            this._removeWindowMouseMoveListener = this._renderer.listen(document, 'mousemove', (event) => {
                this._dragMove(event, offset, scale)
            });
        });

        if (this._removeWindowMouseUpListener) {
            this._removeWindowMouseUpListener();
        }
        this._removeWindowMouseUpListener = this._renderer.listen(document, 'mouseup', this._dragEnd);
    };

    private _dragMove = (event, offset, scale) => {
        if (this._moving) {
            const ox = event.clientX - this._position[0] - (this._isFixed ? window.pageXOffset : 0) - offset.left;
            const oy = event.clientY - this._position[1] - (this._isFixed ? window.pageYOffset : 0) - offset.top;
            this._renderer.removeStyle(this._movableTarget, 'right');
            this._renderer.removeStyle(this._movableTarget, 'bottom');
            this._renderer.setStyle(this._movableTarget, 'left', ox/scale + 'px');
            this._renderer.setStyle(this._movableTarget, 'top', oy/scale + 'px');
            this.moving.emit({x: ox/scale, y: oy/scale});
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
        this._movableTarget = this.targetSelector ?
            CommonUtils.getParentNodeBySelector(this._host, this.targetSelector) : this._host;
        this.runAfterMicrotasks(() => {
            if (this.affixType) {
                // 不能先设置position样式，会改变元素位置
                this._setOffsetByCurPos();
                this._renderer.setStyle(this._movableTarget, 'position', this.affixType);
            }
            if (this._isElementAffixed(this._movableTarget)) {
                if (this._removeHostMouseDownListener) {
                    this._removeHostMouseDownListener();
                }
                this._removeHostMouseDownListener = this._renderer.listen(this._host, 'mousedown', this._dragStart);
            }
        })
    }

    /**
     * 根据当前在文档流的位置设置偏移样式
     * @param offset
     * @private
     */
    private _setOffsetByCurPos(offset?: {left: number, top: number}) {
        offset = offset ? offset : this.moveOffset.apply(this);
        if (!this.affixType) {
            return;
        }
        const rect = this.affixType == 'fixed' ? this._movableTarget.getBoundingClientRect() :
            AffixUtils.offset(this._movableTarget);
        this._renderer.setStyle(this._movableTarget, 'left', rect.left - offset.left + 'px');
        this._renderer.setStyle(this._movableTarget, 'top', rect.top - offset.top + 'px');
    }

    private _isElementAffixed(element: HTMLElement): boolean {
        if (!(element instanceof HTMLElement)) {
            return false;
        }
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


