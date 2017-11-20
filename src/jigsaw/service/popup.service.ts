import {
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    Injectable, Renderer2,
    TemplateRef,
    Type,
    ViewContainerRef,
    EventEmitter, Optional, NgZone,
} from "@angular/core";
import {CommonUtils, ElementEventHelper} from "../core/utils/common-utils";
import {JigsawBlock} from "../component/block/block";
import {AffixUtils} from "../core/utils/internal-utils";
import {IDynamicInstantiatable} from "../component/common";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Subscription} from "rxjs/Subscription";

export enum PopupEffect {
    fadeIn, fadeOut, bubbleIn, bubbleOut
}

export class PopupOptions {
    /**
     * 是否模态
     * @type {boolean} 默认值是false
     */
    modal?: boolean;

    /**
     * 弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
     *
     * @type {PopupEffect}
     */
    showEffect?: PopupEffect = PopupEffect.fadeIn;

    /**
     * 隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
     * @type {PopupEffect}
     */
    hideEffect?: PopupEffect = PopupEffect.fadeOut;

    /**
     * 控制弹出对象的相对位置，可以是相对一个点({@link PopupPoint})，也可以相对一个组件或者dom元素。
     * @type {PopupPosition}
     */
    pos?: PopupPosition;

    /**
     * 弹出位置的偏移量，注意left属性是以弹出组件的左侧为基准，top属性是以弹出组件的上方为基准，right属性是以弹出组件的右侧为基准，bottom是以弹出组件的下方为基准点。
     * @type {PopupPositionOffset}
     */
    posOffset?: PopupPositionOffset;

    /**
     * 弹出的组件的定位方式，和css的 absolute/fixed 含义类似
     * @type {PopupPositionType}
     */
    posType?: PopupPositionType;

    /**
     * 弹出位置修正函数，在PopupService自动计算的位置无法满足需要的时候，可以通过它来修正，在一些需要精确定位的场景非常有用，函数的定义如下：
     *
     * ```
     * (pos: PopupPositionValue, popupElement: HTMLElement) => PopupPositionValue
     * ```
     */
    posReviser?: (pos: PopupPositionValue, popupElement: HTMLElement) => PopupPositionValue;

    /**
     * 弹出组件的尺寸，某些组件在定义的时候没有设置尺寸，这样在弹出的时候位置不可控，通过这个属性可以精确控制弹出组件的尺寸。
     * @type {PopupSize}
     */
    size?: PopupSize;

    /**
     * 当应用页面的路由改变了的时候，自动将弹出的组件销毁。
     * @type {boolean} 默认值是true
     */
    disposeOnRouterChanged?: boolean = true;

    /**
     * 弹框是否要加边框
     * @type {boolean}
     */
    showBorder?: boolean;
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

export enum PopupZIndex {
    modal = 1000, popover = 1030
}

export type PopupRef = ComponentRef<IPopupable> | EmbeddedViewRef<any>;

export class ButtonInfo {
    [index: string]: any;
    public label: string;
    public clazz?: string = '';
    public type?: string;
    public disabled?: boolean;
    public preSize?: string;
}

export type PopupDisposer = () => void;

export interface IPopupable extends IDynamicInstantiatable {
    answer: EventEmitter<ButtonInfo>;

    [index: string]: any;
}

export class PopupInfo {
    instance: IPopupable;
    element: HTMLElement;
    dispose: PopupDisposer;
    answer: EventEmitter<ButtonInfo>;
}

@Injectable()
export class PopupService {
    private static _instance: PopupService;

    public static get instance(): PopupService {
        return PopupService._instance;
    }

    /**
     * 全局插入点
     * @internal
     */
    public static _viewContainerRef: ViewContainerRef;
    /**
     * @internal
     */
    public static _renderer: Renderer2;

    private _eventHelper: ElementEventHelper = new ElementEventHelper();

    constructor(private _cfr: ComponentFactoryResolver,
                private _zone: NgZone,
                @Optional() private _router: Router,
                @Optional() private _activatedRoute: ActivatedRoute) {
        PopupService._instance = this;
    }

    private _listenRouterChange(disposer: PopupDisposer): void {
        if (!this._router) {
            return;
        }
        const disposerSubscription: Subscription = this._router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this._activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .subscribe(() => {
                disposerSubscription.unsubscribe();
                disposer();
            });
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
        if (!PopupService._viewContainerRef || !PopupService._renderer) {
            console.error("please use 'jigsaw-root' element as the root of your root component");
            return;
        }

        let popupInfo: PopupInfo,
            popupRef: PopupRef,
            element: HTMLElement,
            popupDisposer: PopupDisposer,
            blockDisposer: PopupDisposer,
            disposer: PopupDisposer,
            removeWindowListens: PopupDisposer[] = [];

        //popup block
        blockDisposer = this._popupBlocker(options);
        [popupInfo, popupRef] = this._popupFactory(what, options);
        element = popupInfo.element;
        popupDisposer = popupInfo.dispose;

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
            popupRef.instance.dispose = disposer;
            popupRef.instance.initData = initData;
        }
        removeWindowListens = this._beforePopup(options, element, PopupService._renderer, disposer);
        setTimeout(() => {
            this._setPopup(options, element, PopupService._renderer);
        }, 0);

        return {
            instance: popupRef['instance'], element: element, dispose: disposer,
            answer: popupRef['instance'] ? popupRef['instance'].answer : undefined
        }
    }

    private _popupBlocker(options: PopupOptions): PopupDisposer {
        let disposer: PopupDisposer;
        let element: HTMLElement;
        if (this._isModal(options)) {
            const blockOptions: PopupOptions = <PopupOptions>{
                modal: true,
                showEffect: PopupEffect.fadeIn,
                hideEffect: PopupEffect.fadeOut
            };

            const [blockInfo,] = this._popupFactory(JigsawBlock, blockOptions);
            disposer = blockInfo.dispose;
            element = blockInfo.element;
            this._setStyle(options, element, PopupService._renderer);
            this._setPopup(blockOptions, element, PopupService._renderer);
        }
        return disposer
    }

    private _beforePopup(options: PopupOptions, element: HTMLElement, renderer: Renderer2, disposer: PopupDisposer): PopupDisposer[] {
        this._removeAnimation(options, element, renderer);
        this._setStyle(options, element, renderer);
        if (!options || !options.disposeOnRouterChanged) {
            this._listenRouterChange(disposer);
        }
        return this._setWindowListener(options, element, renderer);
    }

    private _setStyle(options: PopupOptions, element: HTMLElement, renderer: Renderer2): void {
        if (this._isModal(options)) {
            renderer.setStyle(element, 'z-index', PopupZIndex.modal);
        } else {
            renderer.setStyle(element, 'z-index', PopupZIndex.popover);
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
        const removeEventListeners = this._eventHelper.get(element, 'animationend');
        if (removeEventListeners instanceof Array) {
            removeEventListeners.forEach(removeEventListener => {
                removeEventListener();
                this._eventHelper.del(element, 'animationend', removeEventListener);
            })
        }
    }

    private _popupFactory(what: Type<IPopupable> | TemplateRef<any>, options: PopupOptions): [PopupInfo, PopupRef] {
        const ref: PopupRef = this._createPopup(what);
        const element: HTMLElement = this._getElement(ref);
        //一出来就插入到文档流的最后，这给后续计算尺寸造成麻烦，这里给设置fixed，就可以避免影响滚动条位置
        PopupService._renderer.setStyle(element, 'position', 'fixed');
        PopupService._renderer.setStyle(element, 'top', 0);
        const disposer: PopupDisposer = this._getDisposer(options, ref, element, PopupService._renderer);
        return [{element: element, dispose: disposer, answer: null, instance: null}, ref];
    }

    private _createPopup(what: Type<IPopupable> | TemplateRef<any>) {
        if (what instanceof TemplateRef) {
            return PopupService._viewContainerRef.createEmbeddedView(what);
        } else {
            const factory = this._cfr.resolveComponentFactory(what);
            return PopupService._viewContainerRef.createComponent(factory);
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

    private _setPopup(options: PopupOptions, element: HTMLElement, renderer: Renderer2) {
        if (element && renderer) {
            this._setSize(options, element, renderer);
            this._setPosition(options, element, renderer);
            this._setBackground(options, element, renderer);
            this._setShowAnimate(options, element, renderer);
        }
    }

    private _setWindowListener(options: PopupOptions, element: HTMLElement, renderer: Renderer2): PopupDisposer[] {
        let removeWindowListens: PopupDisposer[] = [];
        if (this._isGlobalPopup(options)) {
            this._zone.runOutsideAngular(() => {
                // 所有的全局事件应该放到zone外面，不一致会导致removeEvent失效，见#286
                removeWindowListens.push(renderer.listen('window', 'resize', () => {
                    renderer.setStyle(element, 'top',
                        (document.body.clientHeight / 2 - element.offsetHeight / 2) + 'px');
                    renderer.setStyle(element, 'left',
                        (document.body.clientWidth / 2 - element.offsetWidth / 2) + 'px');
                }));
            });
        }
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
    private _setBackground(options: PopupOptions, element: HTMLElement, renderer: Renderer2) {
        if (!this._isModal(options)) {
            renderer.setStyle(element, 'box-shadow', '1px 1px 6px rgba(0, 0, 0, .2)');
        }
        if (options && options.showBorder) {
            renderer.setStyle(element, 'border', '1px solid #dcdcdc');
            renderer.setStyle(element, 'border-radius', '4px');
        }
    }

    private _setShowAnimate(options: PopupOptions, element: HTMLElement, renderer: Renderer2) {
        renderer.setStyle(element, 'visibility', 'visible');
        renderer.addClass(element, PopupService._getPopupEffect(options).showEffect);

        const removeElementListen = renderer.listen(element, 'animationend', () => {
            removeElementListen();
            this._eventHelper.del(element, 'animationend', removeElementListen);
        });
        this._eventHelper.put(element, 'animationend', removeElementListen);
    }

    private _setHideAnimate(options: PopupOptions, element: HTMLElement, renderer: Renderer2, cb: () => void) {
        renderer.addClass(element, PopupService._getPopupEffect(options).hideEffect);
        const removeElementListen = renderer.listen(element, 'animationend', () => {
            removeElementListen();
            this._eventHelper.del(element, 'animationend', removeElementListen);
            cb();
        });
        this._eventHelper.put(element, 'animationend', removeElementListen);
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
            const documentBody = AffixUtils.getDocumentBody();
            top = (documentBody.clientHeight / 2 - popupHeight / 2);
            left = (documentBody.clientWidth / 2 - popupWidth / 2);
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
