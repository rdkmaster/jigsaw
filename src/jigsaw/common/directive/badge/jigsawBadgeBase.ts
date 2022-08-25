import {Directive, ElementRef, Input, NgZone, Renderer2} from "@angular/core";
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
export abstract class JigsawBadgeBase extends AbstractJigsawViewBase{
     _badge: HTMLElement;
     _elementRef: ElementRef;
     _render: Renderer2;
     public constructor(
        protected elementRef: ElementRef,
        protected render: Renderer2,
        protected _zone?: NgZone,
        ) {
         super(_zone);
         this._elementRef = elementRef;
         this._render = render;
    }
    public _addPosition(position:BasePosition): void {
        this._setHostStyle();
        this._render.setStyle(this._badge, 'left', position.host.left);
        this._render.setStyle(this._badge, 'right', position.host.right);
        this._render.setStyle(this._badge, 'top', position.host.top);
        this._render.setStyle(this._badge, 'bottom', position.host.bottom);
        this._render.setStyle(this._badge, 'width', position.host.width);
        this._render.setStyle(this._badge, 'height', position.host.height);
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
    abstract _calPosition(): any;
}
