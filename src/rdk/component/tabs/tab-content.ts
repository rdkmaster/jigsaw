/**
 * Created by 10177553 on 2017/3/29.
 */

import {
    Component, Input, ViewContainerRef,
    TemplateRef, ViewChild, Renderer2, ElementRef, AfterViewInit, EmbeddedViewRef
} from '@angular/core';
import {AbstractRDKComponent} from "../core";

@Component({
    selector: 'rdk-tab-content',
    host: {
        '[class.rdk-tabs-tabpane]': 'true',
        '[class.rdk-tabs-tabpane-active]': 'isActive',
        '[class.rdk-tabs-tabpane-inactive]': '!isActive'
    },
    template: `
        <ng-template #body></ng-template>
    `
})
export class TabContent extends AbstractRDKComponent implements AfterViewInit {
    @ViewChild('body', {read: ViewContainerRef}) _body: ViewContainerRef;

    @Input('content')
    private _content: TemplateRef<Object>;

    @Input()
    public contentKey: number;

    @Input()
    public async: boolean;

    private _contentRef: EmbeddedViewRef<any>;

    constructor(private _render: Renderer2, private _element: ElementRef) {
        super()
    };

    private _isActive: boolean;

    @Input()
    public get isActive(): boolean {
        return this._isActive;
    }

    public set isActive(active: boolean) {
        this._isActive = active;
        if (this.initialized) {
            if (active) {
                this.insert();
            } else {
                this.destroy();
            }
        }
    }

    ngAfterViewInit() {
        if (!this.async || this._isActive) {
            this._contentRef = this._body.createEmbeddedView(this._content);
        }
    }

    public insert(): void {
        if (!this._contentRef) {
            this._contentRef = this._body.createEmbeddedView(this._content);
        }
    }

    public destroy(): void {
        if (this._contentRef) {
            this._contentRef.destroy();
            this._contentRef = null
        }
    }
}
