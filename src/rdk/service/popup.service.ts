import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    Injectable, Renderer2,
    TemplateRef,
    Type,
    ViewContainerRef
} from "@angular/core";
import {CommonUtils} from "../core/utils/common-utils";

export enum PopupEffect {
    fadeIn, fadeOut
}

export class PopupOptions {
    modal?: boolean; //是否模态
    showEffect?: PopupEffect = PopupEffect.fadeIn;//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
    hideEffect?: PopupEffect = PopupEffect.fadeOut; //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
    pos?: PopupPosition; //控制弹出对象的左上角位置，下面2者选其一。
    posOffset?: PopupPositionOffset;
    posType?: PopupPositionType;
    size?: { width?: number, height?: number };
}

export type PopupPosition = PopupPoint | ElementRef;

export class PopupPoint {
    public x: number;
    public y: number;
}

export class PopupPositionOffset {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}

export enum PopupPositionType {
    absolute, fixed
}

export type PopupRef = ComponentRef<IPopupable> | EmbeddedViewRef<any>;

export class ButtonInfo {
    public label: string;
    public callback?: () => void;
    public callbackContext?: any;
    public clazz?: string = '';
}

export class PopupPositionValue {
    public top?: string;
    public left?: string;
}

export type PopupDisposer = () => void;

export interface IPopupable {
    disposer: PopupDisposer;
    initData: any;
    options: PopupOptions;
}

@Injectable()
export class PopupService {
    //全局插入点
    private _viewContainerRef: ViewContainerRef;
    private _renderer: Renderer2;

    constructor(private _cfr: ComponentFactoryResolver,
                private _appRef: ApplicationRef) {
        _appRef.components.length && _appRef.components.forEach(component => {
            //TODO by chenxu 自动获取viewContainerRef，而不要应用提供
            if (component.instance.hasOwnProperty('viewContainerRef')) {
                this._viewContainerRef = component.instance.viewContainerRef;
            }
            if (component.instance.hasOwnProperty('renderer')) {
                this._renderer = component.instance.renderer;
            }
        });
        if (!this._viewContainerRef || !this._renderer) {
            console.error("please add 'constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2){}' into AppComponent");
        }
    }

    /*
     * 打开弹框
     * return 弹框的销毁回调
     * */
    public popup(what: Type<IPopupable>, options?: PopupOptions, initData?: any): PopupDisposer;
    public popup(what: TemplateRef<any>, options?: PopupOptions): PopupDisposer;
    public popup(what: Type<IPopupable> | TemplateRef<any>, options?: PopupOptions, initData?: any): PopupDisposer {
        let disposer: PopupDisposer;
        let ref: PopupRef;
        if (what instanceof TemplateRef) {
            ref = this._viewContainerRef.createEmbeddedView(what);
            disposer = this._getDisposer(ref);
            let popupElement = ref.rootNodes.find(rootNode => rootNode instanceof HTMLElement);
            if (options) {
                PopupService.setSize(options, popupElement, this._renderer);
                PopupService.setPosition(options, popupElement, this._renderer);
            }
        } else {
            const factory = this._cfr.resolveComponentFactory(what);
            ref = this._viewContainerRef.createComponent(factory);
            disposer = this._getDisposer(ref);
            ref.instance.disposer = disposer;
            ref.instance.initData = initData;
            ref.instance.options = options;
        }
        return disposer;
    }

    private _getDisposer(popupRef: PopupRef): PopupDisposer {
        return () => {
            popupRef.destroy();
        }
    }

    /*
     * 设置弹框尺寸
     * */
    public static setSize(options: PopupOptions, element: HTMLElement, renderer: Renderer2) {
        if (!options.size) return;
        let size = options.size;
        if (size.width) {
            renderer.setStyle(element, 'width', CommonUtils.getCssValue(size.width));
        }
        if (size.height) {
            renderer.setStyle(element, 'height', CommonUtils.getCssValue(size.height));
        }
    }

    /*
     * 设置弹出的位置
     * */
    public static setPosition(options: PopupOptions, element: HTMLElement, renderer: Renderer2): void {
        let posType: string = options.modal ? 'fixed' : PopupService.getPositionType(options.posType);
        let position = PopupService.getPositionValue(options, element);
        renderer.setStyle(element, 'position', posType);
        renderer.setStyle(element, 'top', position.top);
        renderer.setStyle(element, 'left', position.left);
    }

    /*
     * 获取posType字符串类型
     * */
    public static getPositionType(posType: number): string {
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
    public static getPositionValue(options: PopupOptions, element: HTMLElement): PopupPositionValue {
        if (!options) {
            return {top: '', left: ''};
        }

        let top: string = '';
        let left: string = '';
        if (options.modal) {
            top = (window.innerHeight / 2 - element.offsetHeight / 2) + 'px';
            left = (window.innerWidth / 2 - element.offsetWidth / 2) + 'px';
        } else if (options.pos instanceof ElementRef) {
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
        } else {
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

        return {top: top, left: left};
    }
}
