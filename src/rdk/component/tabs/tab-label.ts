/**
 * Created by 10177553 on 2017/3/29.
 */

import {
    Input, ElementRef, Renderer2, TemplateRef, Component, ViewChild, ViewContainerRef, AfterViewInit,
    EmbeddedViewRef
} from "@angular/core";

@Component({
    selector: 'rdk-tab-label',
    template: `
        <ng-template #body></ng-template>
    `
})
export class TabLabel implements AfterViewInit{
    @Input()
    public key: number;

    @Input('title')
    private _title: TemplateRef<any>;

    @ViewChild('body', {read: ViewContainerRef}) _body: ViewContainerRef;

    private _labelRef: EmbeddedViewRef<any>;

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

    ngAfterViewInit() {
        this.insert()
    }

    public insert(): void {
        if (!this._labelRef) {
            this._labelRef = this._body.createEmbeddedView(this._title);
        }
    }

    public destroy(): void {
        //this._render.parentNode(this._elementRef.nativeElement).removeChild(this._elementRef.nativeElement);
        if (this._labelRef) {
            this._labelRef.destroy();
            this._labelRef = null
        }
    }

}
