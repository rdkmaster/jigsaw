import {
    Injectable, ComponentFactoryResolver, ComponentRef, Renderer2, ElementRef, Type, ViewContainerRef, ApplicationRef,
    TemplateRef, EmbeddedViewRef
} from '@angular/core';

import {AppComponent} from '../../app/app.component';

export class PopupOptions {
    modal: boolean; //是否模态
    showEffect?: PopupEffect;//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
    hideEffect?: PopupEffect; //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
    pos?: PopupPosition; //控制弹出对象的左上角位置，下面2者选其一。
    posOffset?: PopupPositionOffset;
    posType?: PopupPositionType
}

export enum PopupEffect {
    fadeIn, fadeOut
}

export type PopupPosition = PopupPoint | ElementRef;

export class PopupPoint {
    constructor(public x: number, public y: number) {
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

type PopupInfo = {
    popupId: number;
    popupRef: PopupRef;
    options: PopupOptions
}

export type PopupRef = ComponentRef<IPopupable> | EmbeddedViewRef<any>;

export class ButtonInfo {
    constructor(public label: string,
                public callback: () => void,
                public callbackContext?: any,
                public clazz?: string) {
        this.clazz = clazz ? clazz : '';
    }
}

export type Position = {
    top: string,
    left: string
}

export interface IPopupable {
    popupId: number;
    initData: any;
}

@Injectable()
export class PopupService {

    private _popupId: number;

    private _popups: PopupInfo[] = [];

    //全局插入点
    private _viewContainerRef: ViewContainerRef;

    constructor(private _cfr: ComponentFactoryResolver, private _appRef: ApplicationRef) {
        _appRef.components.length && _appRef.components.forEach(component => {
            //TODO by chenxu 自动获取viewContainerRef，而不要应用提供
            if (component.instance.hasOwnProperty('viewContainerRef')) {
                this._viewContainerRef = component.instance.viewContainerRef;
            }
        });
        if (!this._viewContainerRef) {
            console.error("please add 'constructor(public viewContainerRef: ViewContainerRef){}' into AppComponent");
        }

        this._popupId = new Date().getTime();
    }

    /*
     * 打开弹框
     * return 弹框的id
     * */
    public popup(what: Type<IPopupable>, options: PopupOptions, initData?: any): number;
    public popup(what: TemplateRef<any>): number;
    public popup(what: Type<IPopupable> | TemplateRef<any>, options?: PopupOptions, initData?: any): number {
        this._popupId++;
        if (what instanceof TemplateRef) {
            let viewRef = this._viewContainerRef.createEmbeddedView(what);
            this._popups.push({popupId: this._popupId, popupRef: viewRef, options: null});
            return this._popupId;
        } else {
            let factory = this._cfr.resolveComponentFactory(what);
            let componentRef = this._viewContainerRef.createComponent(factory);
            componentRef.instance.popupId = this._popupId;
            componentRef.instance.initData = initData;
            this._popups.push({popupId: this._popupId, popupRef: componentRef, options: options});
            return this._popupId;
        }
    }

    /*
     * 关闭弹框
     * param 弹框组件的id
     * */
    public removePopup(popupId: number): void {
        let popup = this._popups.find(popup => popupId === popup.popupId);
        popup.popupRef.destroy();
        this._popups.splice(this._popups.indexOf(popup), 1);
    }

    /*
     * 获取popup的options
     * */
    public getOptions(popupId: number): PopupOptions {
        let popup = this._popups.find(popup => popupId === popup.popupId);
        return popup ? popup.options : null;
    }

    /*
     * 获取popup的popupRef
     * */
    public getPopupRef(popupId: number): PopupRef {
        let popup = this._popups.find(popup => popupId === popup.popupId);
        return popup ? popup.popupRef : null;
    }

    /*
     * 设置弹框的位置
     * */
    public setPopupPos(popupId: number, renderer: Renderer2, element: HTMLElement): void {
        let options = this._popups.find(popup => popupId === popup.popupId).options;
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
    private _getPosType(posType: number): string {
        switch (posType) {
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
    private _getPosition(options: PopupOptions, element: HTMLElement): Position {
        let top: string;
        let left: string;
        if (options && !options.modal) {
            if (options.pos instanceof ElementRef) {
                if (options.posOffset.top || options.posOffset.top == 0) {
                    top = (options.pos.nativeElement.offsetTop + options.posOffset.top) + 'px';
                }
                else if (options.posOffset.bottom || options.posOffset.bottom == 0) {
                    top = (options.pos.nativeElement.offsetTop - element.offsetHeight + options.posOffset.bottom) + 'px';
                }
                else {
                    top = options.pos.nativeElement.offsetTop + 'px';
                }

                if (options.posOffset.left || options.posOffset.left == 0) {
                    left = (options.pos.nativeElement.offsetLeft + options.posOffset.left) + 'px';
                }
                else if (options.posOffset.right || options.posOffset.right == 0) {
                    left = (options.pos.nativeElement.offsetLeft - element.offsetWidth + options.posOffset.right) + 'px';
                }
                else {
                    left = options.pos.nativeElement.offsetLeft + 'px';
                }
            } else if (options.pos instanceof PopupPoint) {
                if (options.posOffset.top) {
                    top = (options.pos.y + options.posOffset.top) + 'px';
                } else {
                    top = options.pos.y + 'px';
                }
                if (options.posOffset.left) {
                    left = (options.pos.x + options.posOffset.left) + 'px';
                } else {
                    left = options.pos.x + 'px';
                }
            }
        }
        return {
            top: top,
            left: left
        }
    }

}
