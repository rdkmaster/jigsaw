/**
 * Created by 10177553 on 2017/3/29.
 */

import {
    Component, Input, ViewContainerRef,
    TemplateRef, ViewChild, Renderer2, ElementRef, AfterViewInit, EmbeddedViewRef, ChangeDetectorRef
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
export class RdkTabContent extends AbstractRDKComponent implements AfterViewInit {

    constructor(private _changeDetector: ChangeDetectorRef){
        super()
    }

    @ViewChild('body', {read: ViewContainerRef}) _body: ViewContainerRef;

    @Input('content')
    private _content: TemplateRef<Object>;

    @Input()
    public contentKey: number;

    @Input()
    public async: boolean;

    @Input()
    private initData: Object;

    private _contentRef: EmbeddedViewRef<any>;

    private _isActive: boolean;

    @Input()
    public get isActive(): boolean {
        return this._isActive;
    }

    public set isActive(active: boolean) {
        this._isActive = active;
        if (this.initialized && this.async) {
            if (active) {
                this.insert();
            } else {
                this.destroy();
            }
        }
    }

    ngAfterViewInit() {
        if (!this.async || this._isActive) {
            this._contentRef = this._body.createEmbeddedView(this._content, this.initData);
            this._changeDetector.detectChanges()
        }
    }

    public insert(): void {
        if (!this._contentRef) {
            this._contentRef = this._body.createEmbeddedView(this._content, this.initData);
        }
    }

    public destroy(): void {
        if (this._contentRef) {
            this._contentRef.destroy();
            this._contentRef = null
        }
    }
}
