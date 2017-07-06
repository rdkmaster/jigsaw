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
import {JigsawBlock} from "../component/block/block";
import {AffixUtils} from "../core/utils/internal-utils";
import {IDynamicInstantiatable} from "../component/core";

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
    posReviser?: (pos: PopupPositionValue, popupElement: HTMLElement) => PopupPositionValue;
    size?: PopupSize;
}

export type PopupPosition = PopupPoint | ElementRef | HTMLElement;

export class PopupPositionValue {
    left: number;
    top: number;
}

export class PopupSize {
    width?: string | number;
    height?: string | number;
    minWidth?: string | number;
}

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

export enum PopupEventType {
    instanceCreated, positionReady, ready
}

export type PopupRef = ComponentRef<IPopupable> | EmbeddedViewRef<any>;

export class ButtonInfo {
    [index: string]: any;
    public label: string;
    public clazz?: string = '';
}

export type PopupDisposer = () => void;

export interface IPopupable extends IDynamicInstantiatable {
    answer: EventEmitter<ButtonInfo>;
}

export class PopupInfo {
    popupRef: PopupRef;
    element: HTMLElement;
    dispose: PopupDisposer;
    event: EventEmitter<PopupEventType>;
}

@Injectable()
export class PopupService {
    //全局插入点
    private _viewContainerRef: ViewContainerRef;
    private _renderer: Renderer2;

    constructor(private _cfr: ComponentFactoryResolver,
                private _appRef: ApplicationRef) {

    }

    private _init(): void {
        this._initViewContainerRef();
        this._initRenderer();
    }

    private _initViewContainerRef(): void {
        if (!this._viewContainerRef) {
            this._appRef.components.length && this._appRef.components.forEach(component => {
                //TODO by chenxu 自动获取viewContainerRef，而不要应用提供
                if (component.instance.hasOwnProperty('viewContainerRef')) {
                    this._viewContainerRef = component.instance.viewContainerRef;
                }
            });
        }
    }

    private _initRenderer(): void {
        if (!this._renderer) {
            this._appRef.components.length && this._appRef.components.forEach(component => {
                if (component.instance.hasOwnProperty('renderer')) {
                    this._renderer = component.instance.renderer;
                }
            });
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
        this._init();
        if (!this._viewContainerRef || !this._renderer) {
            console.error("please add 'constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2){}' into AppComponent");
            return;
        }

        let popupInfo: PopupInfo,
            popupRef: PopupRef,
            element: HTMLElement,
            event: EventEmitter<PopupEventType>,
            popupDisposer: PopupDisposer,
            blockDisposer: PopupDisposer,
            disposer: PopupDisposer,
            removeWindowListens: PopupDisposer[] = [];

        //popup block
        blockDisposer = this._popupBlocker(options);
        popupInfo = this._popupFactory(what, options);
        popupRef = popupInfo.popupRef;
        element = popupInfo.element;
        popupDisposer = popupInfo.dispose;
        event = popupInfo.event;

        //set disposer
        disposer = () => {
            if (popupDisposer) {
                popupDisposer();
            }

            if (blockDisposer) {
                blockDisposer();
            }
            removeWindowListens.forEach(removeWindowListen => removeWindowListen());
        };

        //set popup
        if (popupRef instanceof ComponentRef) {
            popupRef.instance.initData = initData;
        }
        removeWindowListens = this._beforePopup(options, element, this._renderer, disposer);
        setTimeout(() => {
            event.emit(PopupEventType.instanceCreated);
            this._setPopup(options, element, this._renderer, event);
        }, 0);

        return {popupRef: popupRef, element: element, dispose: disposer, event: event}
    }

    private _popupBlocker(options: PopupOptions): PopupDisposer {
        let disposer: PopupDisposer;
        let element: HTMLElement;
        if (this._isModal(options)) {
            const blockOptions: PopupOptions = {
                modal: true,
                showEffect: PopupEffect.fadeIn,
                hideEffect: PopupEffect.fadeOut
            };

            const blockInfo: PopupInfo = this._popupFactory(JigsawBlock, blockOptions);
            disposer = blockInfo.dispose;
            element = blockInfo.element;
            this._setStyle(options, element, this._renderer);
            this._setPopup(blockOptions, element, this._renderer);
        }
        return disposer
    }

    private _beforePopup(options: PopupOptions, element: HTMLElement, renderer: Renderer2, disposer: PopupDisposer): PopupDisposer[] {
        this._removeAnimation(options, element, renderer);
        this._setStyle(options, element, renderer);
        return this._setWindowListener(options, element, renderer, disposer);
    }

    private _setStyle(options: PopupOptions, element: HTMLElement, renderer: Renderer2): void {
        if (this._isModal(options)) {
            renderer.setStyle(element, 'z-index', '10000');
        } else {
            renderer.setStyle(element, 'z-index', '9000');
        }
        renderer.setStyle(element, 'visibility', 'hidden');
    }

    private _removeAnimation(options: PopupOptions, element: HTMLElement, renderer: Renderer2) {
        const popupEffect = PopupService._getPopupEffect(options);

        //删除可能有的动画class，确保能触发动画的animationend事件
        if (element.classList.contains(popupEffect.showEffect)) {
            renderer.removeClass(element, popupEffect.showEffect);
        }
        if (element.classList.contains(popupEffect.hideEffect)) {
            renderer.removeClass(element, popupEffect.hideEffect);
        }

        //弹出EmbeddedViewRef时，防止同一个HtmlElement被反复弹出和销毁，使的弹出时监听到上次销毁时的animationend事件
        element.removeEventListener('animationend');
    }

    private _popupFactory(what: Type<IPopupable> | TemplateRef<any>, options: PopupOptions): PopupInfo {
        const ref: PopupRef = this._createPopup(what);
        const element: HTMLElement = this._getElement(ref);
        //一出来就插入到文档流的最后，这给后续计算尺寸造成麻烦，这里给设置fixed，就可以避免影响滚动条位置
        this._renderer.setStyle(element, 'position', 'fixed');
        this._renderer.setStyle(element, 'top', 0);
        const disposer: PopupDisposer = this._getDisposer(options, ref, element, this._renderer);
        return {
            popupRef: ref, element: element, dispose: disposer,
            event: new EventEmitter<PopupEventType>()
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

    private _getElement(ref: PopupRef): HTMLElement {
        let element: HTMLElement;
        if (ref instanceof ComponentRef) {
            element = ref.location.nativeElement.localName == 'ng-component' ?
                ref.location.nativeElement.children[0] : ref.location.nativeElement;
        } else {
            element = ref.rootNodes.find(rootNode => rootNode instanceof HTMLElement);
        }
        return element
    }

    private _getDisposer(options: PopupOptions, popupRef: PopupRef, element: HTMLElement, renderer: Renderer2): PopupDisposer {
        return () => {
            this._setHideAnimate(options, element, renderer, () => {
                popupRef.destroy()
            });
        }
    }

    /**
     * 是否模态(popupService只提供全局模态)：
     * 没配options
     * 或options为空对象
     * 或者modal为true
     * @param options
     * @returns {boolean}
     */
    private _isModal(options: PopupOptions): boolean {
        return CommonUtils.isEmptyObject(options) || options.modal;
    }

    /**
     * 判断弹框是否居中显示:
     * 没配options
     * 或options为空对象
     * 或没有配options.pos
     * @param options
     * @returns {boolean}
     */
    private _isGlobalPopup(options: PopupOptions): boolean {
        return CommonUtils.isEmptyObject(options) || !options.pos;
    }

    private _setPopup(options: PopupOptions, element: HTMLElement, renderer: Renderer2, event?: EventEmitter<PopupEventType>) {
        if (element && renderer) {
            this._setSize(options, element, renderer);
            this._setPosition(options, element, renderer);
            this._setShowAnimate(options, element, renderer, event);
            if (event) {
                event.emit(PopupEventType.positionReady);
            }
        }
    }

    private _setWindowListener(options: PopupOptions, element: HTMLElement, renderer: Renderer2, disposer: PopupDisposer): PopupDisposer[] {
        let removeWindowListens: PopupDisposer[] = [];
        if (this._isGlobalPopup(options)) {
            removeWindowListens.push(renderer.listen('window', 'resize', () => {
                renderer.setStyle(element, 'top',
                    (document.body.clientHeight / 2 - element.offsetHeight / 2) + 'px');
                renderer.setStyle(element, 'left',
                    (document.body.clientWidth / 2 - element.offsetWidth / 2) + 'px');
            }));
        }
        removeWindowListens.push(renderer.listen('window', 'popstate', () => {
            disposer()
        }));
        return removeWindowListens;
    }

    /*
     * 设置弹框尺寸
     * */
    private _setSize(options: PopupOptions, element: HTMLElement, renderer: Renderer2) {
        if (!options || !options.size) return;
        let size = options.size;

        if (size.width) {
            renderer.setStyle(element, 'width', CommonUtils.getCssValue(size.width));
        }
        if (size.minWidth) {
            renderer.setStyle(element, 'min-width', CommonUtils.getCssValue(size.minWidth));
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
        renderer.setStyle(element, 'background', '#ffffff');
    }

    private _setShowAnimate(options: PopupOptions, element: HTMLElement, renderer: Renderer2, event?: EventEmitter<PopupEventType>) {
        renderer.setStyle(element, 'visibility', 'visible');
        renderer.addClass(element, PopupService._getPopupEffect(options).showEffect);

        if (event) {
            const removeElementListen = renderer.listen(element, 'animationend', () => {
                removeElementListen();
                event.emit(PopupEventType.ready);
            });
        }
    }

    private _setHideAnimate(options: PopupOptions, element: HTMLElement, renderer: Renderer2, cb: () => void) {
        renderer.addClass(element, PopupService._getPopupEffect(options).hideEffect);
        const removeElementListen = renderer.listen(element, 'animationend', () => {
            removeElementListen();
            cb();
        });
    }

    private static _getPopupEffect(options: PopupOptions) {
        let showEffect: string;
        let hideEffect: string;
        if (options) {
            showEffect = PopupService._animateMap.has(options.showEffect) ?
                PopupService._animateMap.get(options.showEffect) :
                PopupService._animateMap.get(PopupEffect.fadeIn);
            hideEffect = PopupService._animateMap.has(options.hideEffect) ?
                PopupService._animateMap.get(options.hideEffect) :
                PopupService._animateMap.get(PopupEffect.fadeOut);
        } else {
            showEffect = PopupService._animateMap.get(PopupEffect.fadeIn);
            hideEffect = PopupService._animateMap.get(PopupEffect.fadeOut);
        }
        return {
            showEffect: showEffect,
            hideEffect: hideEffect
        }
    }

    private static _animateMap = new Map([
        [PopupEffect.fadeIn, 'jigsaw-am-fade-in'],
        [PopupEffect.fadeOut, 'jigsaw-am-fade-out'],
        [PopupEffect.bubbleIn, 'jigsaw-am-bubble-in'],
        [PopupEffect.bubbleOut, 'jigsaw-am-bubble-out'],
    ]);

    /*
     * 设置弹出的位置
     * */
    private _setPosition(options: PopupOptions, element: HTMLElement, renderer: Renderer2): void {
        let posType: string = this._isGlobalPopup(options) ? 'fixed' : this._getPositionType(options.posType);
        let position = this._getPositionValue(options, element);
        renderer.setStyle(element, 'position', posType);
        renderer.setStyle(element, 'top', position.top + 'px');
        renderer.setStyle(element, 'left', position.left + 'px');
    }

    /*
     * 获取posType字符串类型
     * */
    private _getPositionType(posType: number): string {
        switch (posType) {
            case 0:
                return 'absolute';
            case 1:
                return 'fixed';
            default:
                return 'absolute';
        }
    }

    /**
     * 获取位置具体的top和left
     *
     * options为{}或者null,或者options.pos没配时，默认相对屏幕居中显示
     *
     *
     * */
    private _getPositionValue(options: PopupOptions, element: HTMLElement): PopupPositionValue {

        let top: number = 0,
            left: number = 0;

        const popupWidth = element.offsetWidth,
            popupHeight = element.offsetHeight;

        if (this._isGlobalPopup(options)) {
            top = (document.body.clientHeight / 2 - popupHeight / 2);
            left = (document.body.clientWidth / 2 - popupWidth / 2);
        } else if (options) {
            const pos = options.pos,
                posOffset = options.posOffset;

            if (pos instanceof ElementRef || pos instanceof HTMLElement) {
                let posOffsetTop: number,
                    posOffsetLeft: number;

                if (pos instanceof ElementRef) {
                    posOffsetTop = AffixUtils.offset(pos.nativeElement).top;
                    posOffsetLeft = AffixUtils.offset(pos.nativeElement).left;
                } else if (pos instanceof HTMLElement) {
                    posOffsetTop = AffixUtils.offset(pos).top;
                    posOffsetLeft = AffixUtils.offset(pos).left;
                }

                if (posOffset && typeof posOffset.top == 'number') {
                    top = (posOffsetTop + posOffset.top);
                } else if (posOffset && typeof posOffset.bottom == 'number') {
                    top = (posOffsetTop - popupHeight + posOffset.bottom);
                } else {
                    top = posOffsetTop;
                }

                if (posOffset && typeof posOffset.left == 'number') {
                    left = (posOffsetLeft + posOffset.left);
                } else if (posOffset && typeof posOffset.right == 'number') {
                    left = (posOffsetLeft - popupWidth + posOffset.right);
                } else {
                    left = posOffsetLeft;
                }
            } else if (pos) {
                if (typeof pos.y == 'number') {
                    if (posOffset && typeof posOffset.top == 'number') {
                        top = (pos.y + posOffset.top);
                    } else {
                        top = pos.y;
                    }
                }

                if (typeof pos.x == 'number') {
                    if (posOffset && typeof posOffset.left == 'number') {
                        left = (pos.x + posOffset.left);
                    } else {
                        left = pos.x;
                    }
                }
            }
        }

        const result = {top: top, left: left};
        if (options && options.posReviser) {
            const revised = options.posReviser(result, element);
            return revised ? revised : result;
        } else {
            return result;
        }
    }
}
