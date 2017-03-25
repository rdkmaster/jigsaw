import {
    Injectable, ComponentFactoryResolver, ComponentRef, Renderer, ElementRef, Type
} from '@angular/core';

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

    componentRef: ComponentRef<any>;

    renderer: Renderer;

    el: ElementRef;

    constructor(private _cfr: ComponentFactoryResolver) {

    }

    popup(insertPlace, what: Type<IPopupable>, option: PositionOption) {
        let factory = this._cfr.resolveComponentFactory(what);
        this.componentRef = insertPlace.createComponent(factory);
        this.renderer = this.componentRef.instance.renderer;
        this.el = this.componentRef.instance.el;
        if (option) {
            this.renderer.setElementStyle(this.el.nativeElement, 'position', option.position);
            this.renderer.setElementStyle(this.el.nativeElement, 'top', option.top);
            this.renderer.setElementStyle(this.el.nativeElement, 'left', option.left);
            this.renderer.setElementStyle(this.el.nativeElement, 'right', option.right);
            this.renderer.setElementStyle(this.el.nativeElement, 'bottom', option.bottom);
        }

    }

    close() {
        this.componentRef.destroy();
    }

}
