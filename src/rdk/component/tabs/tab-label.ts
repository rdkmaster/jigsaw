/**
 * Created by 10177553 on 2017/3/29.
 */

import {Directive, Input, ElementRef, Renderer2} from "@angular/core";

@Directive({
    selector: '[tab-label]'
})
// Todo label 渲染器,以备将来支持html的渲染;
export class TabLabel {
    @Input()
    public key: number;

    constructor( private _elementRef: ElementRef, private _render: Renderer2) {}

    // label 左侧的距离
    public getOffsetLeft(): number {
        return this._elementRef.nativeElement.offsetLeft;
    }

    public getOffsetTop(): number {
        return this._elementRef.nativeElement.offsetTop;
    }

    // 组件的宽度
    public getOffsetWidth(): number {
        return this._elementRef.nativeElement.offsetWidth;
    }

    public destroy(): void {
        this._render.parentNode(this._elementRef.nativeElement).removeChild(this._elementRef.nativeElement);
    }
}
