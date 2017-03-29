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

export class PopupPositionXy {
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}

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

export type Position = {
    top: string,
    left: string
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

    //全局插入点
    private _vcr: ViewContainerRef;

    constructor(private _cfr: ComponentFactoryResolver, private _appRef: ApplicationRef) {
        this._vcr = (_appRef.components[0].instance as AppComponent).vcr;
        this._componentId = new Date().getTime();
    }

    /*
    * 打开弹框
    * return 弹框组件的id
    * */
    public popup(what: Type<IPopupable>, options: PopupOptions, initData?: any): number {
        let factory = this._cfr.resolveComponentFactory(what);
        let componentRef = this._vcr.createComponent(factory);
        componentRef.instance.id = this._componentId;
        componentRef.instance.initData = initData;
        componentRef.instance.options = options;
        this._components.push({id: this._componentId, componentRef: componentRef});
        this._componentId++;
        return componentRef.instance.id;
    }

    /*
    * 关闭弹框
    * param 弹框组件的id
    * */
    public close(componentId: number): void {
        let component = this._components.find(component => componentId === component.id);
        component.componentRef.destroy();
        this._components.splice(this._components.indexOf(component), 1);
    }

    /*
    * 设置弹框的位置
    *
    * */
    public setPopupPos(options: PopupOptions, renderer: Renderer2, element: HTMLElement): void{
        if (options && !options.modal) {
            let posType: string = this._getPosType(options.posType);
            let position: Position = this._getPosition(options, element);
            renderer.setStyle(element, 'position', posType);
            renderer.setStyle(element, 'top', position.top);
            renderer.setStyle(element, 'left', position.left);
        }
    }

    /*
    * 获取posType字符串类型
    * */
    private _getPosType(posType: number): string{
        switch (posType){
            case 0:
                return 'absolute';
            case 1:
                return 'fixed';
            default:
                return 'absolute';
        }
    }

    /*
    * 获取位置具体的top和left
    * */
    private _getPosition(options: PopupOptions, element: HTMLElement): Position{
        let top: string;
        let left: string;
        if (options && !options.modal) {
            if(options.pos instanceof ElementRef){
                top = (options.pos.nativeElement.offsetTop - element.offsetHeight + options.posOffset.top) + 'px';
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
