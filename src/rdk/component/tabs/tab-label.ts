/**
 * Created by 10177553 on 2017/3/29.
 */

import {
    Input, ElementRef, TemplateRef, Component, ViewChild, ViewContainerRef, AfterViewInit, EmbeddedViewRef
} from "@angular/core";

@Component({
    selector: 'rdk-tab-label',
    template: `
        <ng-template #body></ng-template>
    `
})
export class RdkTabLabel implements AfterViewInit{
    @Input()
    public key: number;

    @Input('label')
    private _label: TemplateRef<any>;

    @ViewChild('body', {read: ViewContainerRef}) _body: ViewContainerRef;

    private _labelRef: EmbeddedViewRef<any>;

    constructor( private _elementRef: ElementRef) {}

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
            this._labelRef = this._body.createEmbeddedView(this._label);
        }
    }

    public destroy(): void {
        if (this._labelRef) {
            this._labelRef.destroy();
            this._labelRef = null
        }
    }

}
