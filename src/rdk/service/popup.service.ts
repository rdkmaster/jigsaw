import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    Injectable, Renderer2,
    TemplateRef,
    Type,
    ViewContainerRef,
    EventEmitter,
} from "@angular/core";
import {CommonUtils} from "../core/utils/common-utils";
import {RdkBlock} from "../component/block/block";

export enum PopupEffect {
    fadeIn, fadeOut, bubbleIn, bubbleOut
}

export class PopupOptions {
    modal?: boolean; //是否模态
    showEffect?: PopupEffect = PopupEffect.fadeIn;//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
    hideEffect?: PopupEffect = PopupEffect.fadeOut; //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
    pos?: PopupPosition; //控制弹出对象的左上角位置，下面2者选其一。
    posOffset?: PopupPositionOffset;
    posType?: PopupPositionType;
    size?: { width?: string | number, height?: string | number }
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
    initData: any;
    close: EventEmitter<any>;
}

export class PopupInfo {
    popupRef: PopupRef;
    element: HTMLElement;
    disposer: PopupDisposer
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

    /**
     * 打开弹框
     * @param what
     * @param options
     * @param initData
     * @return PopupInfo
     */
    public popup(what: Type<IPopupable>, options?: PopupOptions, initData?: any): PopupInfo;
    public popup(what: TemplateRef<any>, options?: PopupOptions): PopupInfo;
    public popup(what: Type<IPopupable> | TemplateRef<any>, options?: PopupOptions, initData?: any): PopupInfo {
        const popupInfo: PopupInfo = this._popupFactory(what, options);
        const ref: PopupRef = popupInfo.popupRef;
        const popupElement: HTMLElement = popupInfo.element;
        const disposer: PopupDisposer = popupInfo.disposer;
        if (ref instanceof ComponentRef) {
            ref.instance.initData = initData;
            ref.instance.close.subscribe(() => {
                popupDisposer();
            })
        }
        const removeWindowListens: PopupDisposer[] = this._beforePopup(options, popupElement, this._renderer);
        setTimeout(() => {
            PopupService.setPopup(options, popupElement, this._renderer);
        }, 0);

        //modal block
        let blockDisposer: PopupDisposer;
        if (PopupService.isModal(options)) {
            const blockOptions: PopupOptions = {
                modal: true,
                showEffect: PopupEffect.fadeIn,
                hideEffect: PopupEffect.fadeOut
            };
            if(!CommonUtils.isEmptyObject(options)){
                blockOptions.pos = options.pos;
                blockOptions.posOffset = options.posOffset;
                blockOptions.posType = options.posType;
                blockOptions.size = options.size;
            }

            const blockInfo: PopupInfo = this._popupFactory(RdkBlock, blockOptions);
            blockDisposer = blockInfo.disposer;
            PopupService.setPopup(blockOptions, blockInfo.element, this._renderer);
        }

        //set disposer
        const popupDisposer: PopupDisposer = () => {
            if (disposer) {
                disposer();
            }
            if (blockDisposer) {
                blockDisposer();
            }
            removeWindowListens.forEach(removeWindowListen => removeWindowListen())
        };

        return {
            popupRef: ref,
            element: popupElement,
            disposer: popupDisposer
        }
    }

    private _beforePopup(options:PopupOptions, popupElement, renderer: Renderer2): PopupDisposer[] {
        this._renderer.setStyle(popupElement, 'z-index', '10000');
        this._renderer.setStyle(popupElement, 'visibility', 'hidden');
        return this._setWindowListener(options, popupElement, renderer);
    }

    private _popupFactory(what: Type<IPopupable> | TemplateRef<any>, options: PopupOptions): PopupInfo {
        const ref: PopupRef = this._createPopup(what);
        const element: HTMLElement = PopupService.getPopupElement(ref);
        const disposer: PopupDisposer = PopupService.getDisposer(options, ref, element, this._renderer);
        return {
            popupRef: ref,
            element: element,
            disposer: disposer
        }
    }

    private _createPopup(what: Type<IPopupable> | TemplateRef<any>) {
        if (what instanceof TemplateRef) {
            return this._viewContainerRef.createEmbeddedView(what);
        } else {
            const factory = this._cfr.resolveComponentFactory(what);
            return this._viewContainerRef.createComponent(factory);
        }
    }

    public static getPopupElement(ref: PopupRef): HTMLElement {
        let popupElement: HTMLElement;
        if (ref instanceof ComponentRef) {
            popupElement = ref.location.nativeElement.localName == 'ng-component' ?
                ref.location.nativeElement.children[0] : ref.location.nativeElement;
        } else {
            popupElement = ref.rootNodes.find(rootNode => rootNode instanceof HTMLElement);
        }
        return popupElement
    }

    public static getDisposer(options: PopupOptions, popupRef: PopupRef, element: HTMLElement, renderer: Renderer2): PopupDisposer {
        return () => {
            PopupService.setHideAnimate(options, element, renderer, () => {
                popupRef.destroy()
            });
        }
    }

    /**
     * 是否模态，包括全局和局部的：
     * 没配options
     * 或options为空对象
     * 或者modal为true
     * @param options
     * @returns {boolean}
     */
    public static isModal(options: PopupOptions): boolean {
        return CommonUtils.isEmptyObject(options) || options.modal;
    }

    /**
     * 是否全局模态:
     * 没配options
     * 或options为空对象
     * 或者modal为true，并且没有配options.pos
     * @param options
     * @returns {boolean}
     */
    public static isGlobalModal(options: PopupOptions): boolean {
        return CommonUtils.isEmptyObject(options) || (options.modal && !options.pos);
    }

    public static setPopup(options: PopupOptions, element: HTMLElement, renderer: Renderer2) {
        if (element && renderer) {
            PopupService.setSize(options, element, renderer);
            PopupService.setPosition(options, element, renderer);
            PopupService.setShowAnimate(options, element, renderer);
        }
    }

    private _setWindowListener(options: PopupOptions, element: HTMLElement, renderer: Renderer2): PopupDisposer[] {
        let removeWindowListens: PopupDisposer[] = [];
        if(PopupService.isGlobalModal(options)){
            removeWindowListens.push(renderer.listen('window', 'resize', () => {
                renderer.setStyle(element, 'top',
                    (document.body.clientHeight / 2 - element.offsetHeight / 2) + 'px');
                renderer.setStyle(element, 'left',
                    (document.body.clientWidth / 2 - element.offsetWidth / 2) + 'px');
            }));
        }
        return removeWindowListens;
    }

    /*
     * 设置弹框尺寸
     * */
    public static setSize(options: PopupOptions, element: HTMLElement, renderer: Renderer2) {
        if (!options || !options.size) return;
        let size = options.size;
        if (size.width) {
            renderer.setStyle(element, 'width', CommonUtils.getCssValue(size.width));
        }
        if (size.height) {
            renderer.setStyle(element, 'height', CommonUtils.getCssValue(size.height));
        }
    }

    /*
     * 设置边框、阴影、动画
     * */
    public static setBackground(element: HTMLElement, renderer: Renderer2) {
        renderer.setStyle(element, 'border', '1px solid #d9d9d9');
        renderer.setStyle(element, 'border-radius', '2px');
        renderer.setStyle(element, 'box-shadow', '1px 1px 1px #d9d9d9');
        renderer.addClass(element, 'rdk-drop-down-animations');
    }

    public static setShowAnimate(options: PopupOptions, element: HTMLElement, renderer: Renderer2) {
        options = options && options.showEffect ? options : {showEffect: PopupEffect.fadeIn};
        renderer.setStyle(element, 'visibility', 'visible');
        renderer.addClass(element, 'rdk-am-' + PopupService.getAnimateName(options.showEffect));
    }

    public static setHideAnimate(options: PopupOptions, element: HTMLElement, renderer: Renderer2, cb: () => void) {
        options = options && options.hideEffect ? options : {hideEffect: PopupEffect.fadeOut};
        renderer.addClass(element, 'rdk-am-' + PopupService.getAnimateName(options.hideEffect));
        renderer.listen(element, 'animationend', () => {
            cb()
        })
    }

    public static getAnimateName(popupEffect: PopupEffect): string {
        let animateName: string;
        switch (popupEffect) {
            case 0:
                animateName = 'fade-in';
                break;
            case 1:
                animateName = 'fade-out';
                break;
            case 2:
                animateName = 'bubble-in';
                break;
            case 3:
                animateName = 'bubble-out';
                break;
            default:
                animateName = 'fade-in';
        }
        return animateName;
    }

    /*
     * 设置弹出的位置
     * */
    public static setPosition(options: PopupOptions, element: HTMLElement, renderer: Renderer2): void {
        let posType: string = PopupService.isGlobalModal(options) ? 'fixed' : PopupService.getPositionType(options.posType);
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
        let top: string = '';
        let left: string = '';
        if (PopupService.isGlobalModal(options)) {
            top = (document.body.clientHeight / 2 - element.offsetHeight / 2) + 'px';
            left = (document.body.clientWidth / 2 - element.offsetWidth / 2) + 'px';
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
