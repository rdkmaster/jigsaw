import {
    Injectable, ComponentFactoryResolver, ComponentRef, Renderer2, ElementRef, Type, ViewContainerRef, ApplicationRef
} from '@angular/core';

import {AppComponent} from '../../../app/app.component';

export type PopupOptions = {
    modal: boolean, //是否模态
    showEffect: PopupEffect,//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
    hideEffect: PopupEffect, //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
    pos?: PopupPosition, //控制弹出对象的左上角位置，下面2者选其一。
    posOffset?: PopupPositionOffset,
    posType?: PopupPositionType
}

export enum PopupEffect {
    fadeIn, fadeOut
}

export type PopupPosition = PopupPositionXy | ElementRef;

export class PopupPositionXy {x: number; y: number}

export type PopupPositionOffset = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}

export enum PopupPositionType {
    absolute, fixed
}

export interface IPopupable {
    renderer: Renderer2;
    el: ElementRef;
    initData: any;
}

@Injectable()
export class PopupService {

    private _componentRef: ComponentRef<any> = null;

    private _renderer: Renderer2;

    private _el: ElementRef;

    private _vcr: ViewContainerRef;

    constructor(private _cfr: ComponentFactoryResolver, private _appRef: ApplicationRef) {
        this._vcr = (_appRef.components[0].instance as AppComponent).vcr;
    }

    popup(what: Type<IPopupable>, initData: any, options: PopupOptions) {
        this.close();
        let factory = this._cfr.resolveComponentFactory(what);
        this._componentRef = this._vcr.createComponent(factory);
        this._componentRef.instance.initData = initData;
        this._renderer = this._componentRef.instance.renderer;
        this._el = this._componentRef.instance.el;
        if (options && !options.modal) {
            let top;
            let left;
            if(options.pos instanceof ElementRef){
                top = (options.pos.nativeElement.offsetTop - options.pos.nativeElement.offsetHeight + options.posOffset.top) + 'px';
                left = (options.pos.nativeElement.offsetLeft + options.posOffset.left) + 'px';
            }else if(options.pos instanceof PopupPositionXy) {
                top = options.pos.y + 'px';
                left = options.pos.x + 'px';
            }
            this._renderer.setStyle(this._el.nativeElement, 'position', this._getPosType(options.posType));
            this._renderer.setStyle(this._el.nativeElement, 'top', top);
            this._renderer.setStyle(this._el.nativeElement, 'left', left);
        }

    }

    close() {
        this._componentRef && this._componentRef.destroy();
    }

    private _getPosType(posType: number){
        switch (posType){
            case 0:
                return 'absolute';
            case 1:
                return 'fixed';
            default:
                return 'absolute';
        }
    }


}
