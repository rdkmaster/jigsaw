import {
    Injectable, ComponentFactoryResolver, ComponentRef, Renderer2, ElementRef, Type, ViewContainerRef, ApplicationRef
} from '@angular/core';

import {AppComponent} from '../../../app/app.component';

export class PopupOptions {
    modal: boolean; //是否模态
    showEffect: PopupEffect;//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
    hideEffect: PopupEffect; //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
    pos?: PopupPosition; //控制弹出对象的左上角位置，下面2者选其一。
    posOffset?: PopupPositionOffset;
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

export type PopupComponent = {
    id: number;
    componentRef: ComponentRef<IPopupable>;
}

export type ButtonOptions = {
    label: string;
    callback: () => void;
}

export interface IPopupable {
    id: number;
    initData: any;
    options: PopupOptions;
}

export interface IDialog extends IPopupable {
    buttons: Array<ButtonOptions>;
    title: string;
}

@Injectable()
export class PopupService {

    private _componentId: number;

    private _components: Array<PopupComponent> = [];

    private _vcr: ViewContainerRef;

    constructor(private _cfr: ComponentFactoryResolver, private _appRef: ApplicationRef) {
        this._vcr = (_appRef.components[0].instance as AppComponent).vcr;
        this._componentId = new Date().getTime();
    }

    popup(what: Type<IPopupable>, options: PopupOptions, initData?: any) {
        let factory = this._cfr.resolveComponentFactory(what);
        let componentRef = this._vcr.createComponent(factory);
        componentRef.instance.id = this._componentId;
        componentRef.instance.initData = initData;
        componentRef.instance.options = options;
        this._components.push({id: this._componentId, componentRef: componentRef});
        this._componentId++;
        return componentRef.instance.id;
    }

    close(componentId) {
        let component = this._components.find(component => componentId === component.id)
        component.componentRef.destroy();
        this._components.splice(this._components.indexOf(component), 1);
    }

    public getPosType(posType: number){
        switch (posType){
            case 0:
                return 'absolute';
            case 1:
                return 'fixed';
            default:
                return 'absolute';
        }
    }

    public getPosition(options){
        let top: string;
        let left: string;
        if (options && !options.modal) {
            if(options.pos instanceof ElementRef){
                top = (options.pos.nativeElement.offsetTop - options.pos.nativeElement.offsetHeight + options.posOffset.top) + 'px';
                left = (options.pos.nativeElement.offsetLeft + options.posOffset.left) + 'px';
            }else if(options.pos instanceof PopupPositionXy) {
                top = options.pos.y + 'px';
                left = options.pos.x + 'px';
            }
        }
        return {
            top: top,
            left: left
        }
    }

}
