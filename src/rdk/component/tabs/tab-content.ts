/**
 * Created by 10177553 on 2017/3/29.
 */

import {
    Component, Input, ViewContainerRef,
    TemplateRef, AfterViewChecked, ViewChild, Renderer2, ElementRef
} from '@angular/core';

@Component({
    selector: 'rdk-tab-content',
    host: {
        '[class.rdk-tabs-tabpane]': 'true',
        '[class.rdk-tabs-tabpane-active]': 'isActive',
        '[class.rdk-tabs-tabpane-inactive]': '!isActive'
    },
    template: `
        <div #body></div>
    `
})
export class TabContent implements AfterViewChecked {
    @ViewChild('body', {read: ViewContainerRef}) _body: ViewContainerRef;

    @Input('content')
    private _content: TemplateRef<Object>;

    @Input()
    public contentKey: number;

    constructor(private _render: Renderer2, private _element: ElementRef) {};

    private _isActive: boolean;

    @Input()
    public get isActive(): boolean {
        return this._isActive;
    }

    public set isActive(active: boolean) {
        this._isActive = active;
    }

    ngAfterViewChecked() {
        this._body.createEmbeddedView(this._content);
    }

    public destroy(): void {
        this._render.parentNode(this._element.nativeElement).removeChild(this._element.nativeElement);
    }
}
