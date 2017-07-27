import {Directive, Renderer2, ElementRef, NgModule, OnInit, Input, OnDestroy} from "@angular/core";
import {AffixUtils} from "../../core/utils/internal-utils";
import {CommonUtils} from "../../core/utils/common-utils";
import {CallbackRemoval} from "../../core/data/component-data";

@Directive({
    selector: '[jigsaw-draggable]'
})
export class JigsawDraggable implements OnInit, OnDestroy {
    private _dragTarget: HTMLElement;
    private _host: HTMLElement;
    private _draging: boolean = false;
    private _position: number[];
    private _removeHostMouseDownListener: CallbackRemoval;
    private _removeWindowMouseMoveListener: CallbackRemoval;
    private _removeWindowMouseUpListener: CallbackRemoval;

    @Input()
    public affectedSelector: string;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
    }

    private _dragStart = (event) => {
        this._position = [event.clientX - AffixUtils.offset(this._dragTarget).left,
            event.clientY - AffixUtils.offset(this._dragTarget).top];
        this._draging = true;
        event.preventDefault();
        event.stopPropagation();
    };

    private _dragMove = (event) => {
        if (this._draging) {
            const ox = event.clientX - this._position[0];
            const oy = event.clientY - this._position[1];
            this._renderer.setStyle(this._dragTarget, 'left', ox + 'px');
            this._renderer.setStyle(this._dragTarget, 'top', oy + 'px');
        }
    };

    private _dragEnd = () => {
        this._draging = false;
        this._position = null;
    };

    ngOnInit() {
        this._host = this._elementRef.nativeElement;
        this._dragTarget = this.affectedSelector ?
            CommonUtils.getParentNodeBySelector(this._host, this.affectedSelector) : this._host;

        setTimeout(() => {
            if (this._isElementAffixed(this._dragTarget)) {
                this._removeHostMouseDownListener = this._renderer.listen(this._host, 'mousedown', this._dragStart);
                this._removeWindowMouseMoveListener = this._renderer.listen(document, 'mousemove', this._dragMove);
                this._removeWindowMouseUpListener = this._renderer.listen(document, 'mouseup', this._dragEnd);
            }
        })
    }

    private _isElementAffixed(element: HTMLElement): boolean {
        if (!(element instanceof HTMLElement)) return false;
        const positionType = element.style.position;
        return positionType == 'fixed' || positionType == 'absolute';
    }

    ngOnDestroy(){
        this._removeHostMouseDownListener();
        this._removeWindowMouseMoveListener();
        this._removeWindowMouseUpListener();
    }
}

@NgModule({
    imports: [],
    declarations: [JigsawDraggable],
    exports: [JigsawDraggable]
})
export class JigsawDraggableModule {
}

