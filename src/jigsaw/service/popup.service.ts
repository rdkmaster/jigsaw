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
import {CommonUtils} from "../core/utils/common-utils";
import {ElementEventHelper} from "../core/utils/internal-utils";
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

/**
 * 用于控制弹出视图的各种参数，包括是否模态、弹出位置、视图尺寸、弹出动画等等，`PopupService`能够覆盖所有弹出场景，
 * 很大程度上得益于这个参数的强大扩展性，熟悉这个参数的各个属性对是否能够用好`PopupService`有着决定性的影响。
 *
 * [这个demo](/components/dialog/demo#popup-option)详细的说明了如何使用这个对象。
 */
export class PopupOptions {
    /**
     * 控制弹出的视图是否模态。
     *
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
     *
     * @type {PopupEffect}
     */
    hideEffect?: PopupEffect = PopupEffect.fadeOut;

    /**
     * 控制弹出对象的相对位置，可以是相对一个点({@link PopupPoint})，也可以相对一个组件或者dom元素，支持如下类型：
     * - {@link PopupPoint}类型：控制弹出视图的左上角位置，一般常常用于弹出上下文菜单，通过鼠标的事件（click/hover）等得到鼠标事件，
     * 从事件对象中提取出位置信息传过来，从而让视图出现在鼠标的附近，配合`posOffset`属性可以进一步修正位置，避免遮挡到其他重要视图。
     * - `ElementRef`和`HTMLElement`类型：相对某个已知UI元素的位置，不配置偏移的话，弹出视图的左上角会和给定的UI元素的左上角位置重合。
     * Jigsaw会自动计算出给定元素的位置，并将弹出视图移动到该位置上。一般需要配合`posOffset`属性一起调整弹出位置，
     * 避免遮挡到给定的UI元素。这个方式在实现一些下拉功能的时候会非常有用。
     *
     * 请参考[这个demo]($demo/dialog/popup-option)。
     *
     * @type {PopupPosition}
     */
    pos?: PopupPosition;

    /**
     * 弹出位置的偏移量，注意left属性是以弹出组件的左侧为基准，top属性是以弹出组件的上方为基准，
     * right属性是以弹出组件的右侧为基准，bottom是以弹出组件的下方为基准点。
     *
     * 请参考[这个demo]($demo/dialog/popup-option)。
     *
     * @type {PopupPositionOffset}
     */
    posOffset?: PopupPositionOffset;

    /**
     * 弹出的组件的定位方式，和css的 absolute/fixed 含义类似。
     *
     * 请参考[这个demo]($demo/dialog/popup-option)。
     *
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
     * 弹出组件的尺寸，多数组件在定义的时候，认为其尺寸是来自于父级元素，特别是组件的宽度更是如此，
     * 这个组件在弹出来的时候，父级元素的宽度和高度都是100%，这会让自己占满整个屏幕，非常难看。
     * 在这个场景下就可以通过这个属性设置组件在弹出状态下的尺寸。
     * 如果你的组件在实现的时候就给定了尺寸或者最大尺寸，则无需设置这个属性。
     *
     * @type {PopupSize}
     */
    size?: PopupSize;

    /**
     * 当应用页面的路由改变了的时候，自动销毁弹出的组件。当弹出的视图只归属于某个路由状态的时候，
     * 这个功能会很有用，在路由变化之后，你无需手工销毁这些弹出的视图。
     *
     * 但凡事都有两面性，当你弹出的视图在全局下都有意义时，请注意务必关闭这个功能。
     * 这样的场景比如通知类的对话框（alert或者notification），他们弹出后，就需要等待用户关闭，不应该自动关闭。
     *
     * @type {boolean}
     */
    disposeOnRouterChanged?: boolean = true;

    /**
     * 是否要自动给弹出视图加上边框。默认`PopupService`会检测弹出的视图是否有边框，如果有则不加，如果没有则自动加上边框和阴影。
     * 设置了true/false之后，则`PopupService`不再自动检测，而是根据这个属性的值决定是否要还是不加边框&阴影。
     *
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
    x: number;
    y: number;
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
    [index: string]: any;
    label?: string;
    clazz?: string = '';
    type?: string;
    disabled?: boolean;
    preSize?: string;
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

    private _popupZIndex: number = 1000;

    constructor(private _cfr: ComponentFactoryResolver,
                private _zone: NgZone,
                @Optional() private _router: Router,
                @Optional() private _activatedRoute: ActivatedRoute) {
        PopupService._instance = PopupService._instance || this;
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
        removeWindowListens = this._beforePopup(options, element, disposer);
        setTimeout(() => {
            this._setPopup(options, element);
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
            this._setStyle(options, element);
            this._setPopup(blockOptions, element);
        }
        return disposer
    }

    private _beforePopup(options: PopupOptions, element: HTMLElement, disposer: PopupDisposer): PopupDisposer[] {
        this._removeAnimation(options, element);
        this._setStyle(options, element);
        if (!options || !options.hasOwnProperty('disposeOnRouterChanged') || options.disposeOnRouterChanged) {
            this._listenRouterChange(disposer);
        }
        return this._setWindowListener(options, element);
    }

    private _setStyle(options: PopupOptions, element: HTMLElement): void {
        PopupService._renderer.setStyle(element, 'z-index', this._popupZIndex);
        PopupService._renderer.setStyle(element, 'visibility', 'hidden');
    }

    private _removeAnimation(options: PopupOptions, element: HTMLElement) {
        const popupEffect = PopupService._getPopupEffect(options);

        //删除可能有的动画class，确保能触发动画的animationend事件
        if (element.classList.contains(popupEffect.showEffect)) {
            PopupService._renderer.removeClass(element, popupEffect.showEffect);
        }
        if (element.classList.contains(popupEffect.hideEffect)) {
            PopupService._renderer.removeClass(element, popupEffect.hideEffect);
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
        const disposer: PopupDisposer = this._getDisposer(options, ref, element);
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

    private _getDisposer(options: PopupOptions, popupRef: PopupRef, element: HTMLElement): PopupDisposer {
        return () => this._setHideAnimate(options, element, () => popupRef.destroy())
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

    private _setPopup(options: PopupOptions, element: HTMLElement) {
        if (element) {
            this._setSize(options, element);
            this.setPosition(options, element);
            this._setBackground(options, element);
            this._setShowAnimate(options, element);
        }
    }

    private _setWindowListener(options: PopupOptions, element: HTMLElement): PopupDisposer[] {
        let removeWindowListens: PopupDisposer[] = [];
        if (this._isGlobalPopup(options)) {
            this._zone.runOutsideAngular(() => {
                // 所有的全局事件应该放到zone外面，不一致会导致removeEvent失效，见#286
                removeWindowListens.push(PopupService._renderer.listen('window', 'resize', () => {
                    PopupService._renderer.setStyle(element, 'top',
                        (document.body.clientHeight / 2 - element.offsetHeight / 2) + 'px');
                    PopupService._renderer.setStyle(element, 'left',
                        (document.body.clientWidth / 2 - element.offsetWidth / 2) + 'px');
                }));
            });
        }
        return removeWindowListens;
    }

    /*
     * 设置弹框尺寸
     * */
    private _setSize(options: PopupOptions, element: HTMLElement) {
        if (!options || !options.size) return;
        let size = options.size;

        if (size.width) {
            PopupService._renderer.setStyle(element, 'width', CommonUtils.getCssValue(size.width));
        }
        if (size.minWidth) {
            PopupService._renderer.setStyle(element, 'min-width', CommonUtils.getCssValue(size.minWidth));
        }
        if (size.height) {
            PopupService._renderer.setStyle(element, 'height', CommonUtils.getCssValue(size.height));
        }
    }

    /*
     * 设置边框、阴影、动画
     * */
    private _setBackground(options: PopupOptions, element: HTMLElement) {
        if (!this._isModal(options)) {
            PopupService._renderer.setStyle(element, 'box-shadow', '1px 1px 6px rgba(0, 0, 0, .2)');
        }
        if (options && options.showBorder) {
            PopupService._renderer.setStyle(element, 'border', '1px solid #dcdcdc');
            PopupService._renderer.setStyle(element, 'border-radius', '4px');
        }
    }

    private _setShowAnimate(options: PopupOptions, element: HTMLElement) {
        PopupService._renderer.setStyle(element, 'visibility', 'visible');
        PopupService._renderer.addClass(element, PopupService._getPopupEffect(options).showEffect);

        const removeElementListen = PopupService._renderer.listen(element, 'animationend', () => {
            removeElementListen();
            this._eventHelper.del(element, 'animationend', removeElementListen);
        });
        this._eventHelper.put(element, 'animationend', removeElementListen);
    }

    private _setHideAnimate(options: PopupOptions, element: HTMLElement, cb: () => void) {
        PopupService._renderer.addClass(element, PopupService._getPopupEffect(options).hideEffect);
        const removeElementListen = PopupService._renderer.listen(element, 'animationend', () => {
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
    public setPosition(options: PopupOptions, element: HTMLElement): void {
        let posType: string = this._isGlobalPopup(options) ? 'fixed' : this._getPositionType(options.posType);
        let position = this._getPositionValue(options, element);
        PopupService._renderer.setStyle(element, 'position', posType);
        PopupService._renderer.setStyle(element, 'top', position.top + 'px');
        PopupService._renderer.setStyle(element, 'left', position.left + 'px');
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
