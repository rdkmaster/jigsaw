import {
    Injectable, ComponentFactoryResolver, ComponentRef, Renderer, ElementRef, Type, ViewContainerRef, ApplicationRef
} from '@angular/core';

import {AppComponent} from '../../../app/app.component';

export type PositionOption = {
    position: string;
    top: string;
    left: string;
    right: string;
    bottom: string;
}

export interface IPopupable {
    renderer: Renderer;
    el: ElementRef;
}

@Injectable()
export class PopupService {

    private _componentRef: ComponentRef<any>;

    private _renderer: Renderer;

    private _el: ElementRef;

    private _vcr: ViewContainerRef;

    constructor(private _cfr: ComponentFactoryResolver, private _appRef: ApplicationRef) {
        this._vcr = (_appRef.components[0].instance as AppComponent).vcr;
    }

    popup(what: Type<IPopupable>, option: PositionOption) {
        let factory = this._cfr.resolveComponentFactory(what);
        this._componentRef = this._vcr.createComponent(factory);
        this._renderer = this._componentRef.instance.renderer;
        this._el = this._componentRef.instance.el;
        if (option) {
            this._renderer.setElementStyle(this._el.nativeElement, 'position', option.position);
            this._renderer.setElementStyle(this._el.nativeElement, 'top', option.top);
            this._renderer.setElementStyle(this._el.nativeElement, 'left', option.left);
            this._renderer.setElementStyle(this._el.nativeElement, 'right', option.right);
            this._renderer.setElementStyle(this._el.nativeElement, 'bottom', option.bottom);
        }

    }

    close() {
        this._componentRef.destroy();
    }

}
