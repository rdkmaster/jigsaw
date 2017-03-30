/**
 * Created by 10177553 on 2017/3/29.
 */

import {
    Component, Input, ViewContainerRef,
    TemplateRef, AfterViewChecked, ViewChild
} from '@angular/core';

@Component({
    selector: 'tab-content',
    host: {
        '[class.rdk-tabs-tabpane]': 'true',
        '[class.rdk-tabs-tabpane-active]': 'isActive',
        '[class.rdk-tabs-tabpane-inactive]': '!isActive'
    },
    template: `
        <div #body></div>
    `
})
export class RdkTabContent implements AfterViewChecked {
    @ViewChild('body', {read: ViewContainerRef}) body: ViewContainerRef;

    @Input('content')
    private _content: TemplateRef<Object>;

    @Input()
    contentKey: number;

    private _isActive: boolean;

    @Input()
    public get isActive(): boolean {
        return this._isActive;
    }

    public set isActive(active: boolean) {
        this._isActive = active;
    }

    ngAfterViewChecked() {
        this.body.createEmbeddedView(this._content);
    }
}
