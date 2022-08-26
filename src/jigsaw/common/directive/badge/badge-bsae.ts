import {Directive, ElementRef, NgZone, Renderer2} from "@angular/core";
import {AbstractJigsawViewBase} from "../../common";

export type BaseStyle = {
    left?: string | number,
    right?: string | number,
    top?: string | number,
    bottom?: string | number,
    width?: string,
    height?: string,
}
export type BasePosition = {
    host: BaseStyle,
}

@Directive()
export abstract class BadgeBsae extends AbstractJigsawViewBase {
    protected _accessory: HTMLElement;
    protected _elementRef: ElementRef;

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    protected _render: Renderer2;
    public value: string | number | "dot";
    public size: 'large' | 'normal' | 'small' = 'normal';
    public pointerCursor: boolean;
    public position: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'top' | 'bottom' | 'center' | 'left' | 'right';
    public offset: number;

    protected constructor(
        protected elementRef: ElementRef,
        protected render: Renderer2,
        protected _zone?: NgZone,
    ) {
        super(_zone);
        this._elementRef = elementRef;
        this._render = render;
    }

    protected _updatePosition(position: BasePosition): void {
        this._setHostStyle();
        this._render.setStyle(this._accessory, 'left', position.host.left);
        this._render.setStyle(this._accessory, 'right', position.host.right);
        this._render.setStyle(this._accessory, 'top', position.host.top);
        this._render.setStyle(this._accessory, 'bottom', position.host.bottom);
        this._render.setStyle(this._accessory, 'width', position.host.width);
        this._render.setStyle(this._accessory, 'height', position.host.height);
    }

    // 设置宿主的样式，徽标本身采用absolute布局，所以需要考虑宿主的position和overflow
    private _setHostStyle(): void {
        const hostStyle = getComputedStyle(this._elementRef.nativeElement);
        if (["absolute", "relative", "fixed", "sticky"].findIndex(item => item == hostStyle.position) == -1) {
            this._elementRef.nativeElement.style.position = "relative";
        }
        if (hostStyle.overflow == 'hidden' || hostStyle.overflow == 'scroll') {
            this._elementRef.nativeElement.style.overflow = "visible";
        }
    }

    protected abstract _calPosition(): any;
}
