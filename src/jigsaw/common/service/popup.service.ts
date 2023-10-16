import {
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    Injectable,
    NgZone,
    Optional,
    TemplateRef,
    Type,
    ViewContainerRef,
} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, take} from 'rxjs/operators';
import {Subscription} from "rxjs";
import {CommonUtils} from "../core/utils/common-utils";
import {AffixUtils, ElementEventHelper, InternalUtils} from "../core/utils/internal-utils";
import {JigsawBlock} from "../components/block/block";
import {IDynamicInstantiatable} from "../common";
import {JigsawThemeService} from '../core/theming/theme';

export enum PopupEffect {
    fadeIn, fadeOut, bubbleIn, bubbleOut
}

/**
 * 用于控制弹出视图的各种参数，包括是否模态、弹出位置、视图尺寸、弹出动画等等，`PopupService`能够覆盖所有弹出场景，
 * 很大程度上得益于这个参数的强大扩展性，熟悉这个参数的各个属性对是否能够用好`PopupService`有着决定性的影响。
 *
 * [这个demo]($demo=dialog/popup-option)详细的说明了如何使用这个对象。
 */
export class PopupOptions {
    /**
     * 控制弹出的视图是否模态。
     */
    modal?: boolean;

    /**
     * 弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
     */
    showEffect?: PopupEffect = PopupEffect.fadeIn;

    /**
     * 隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
     */
    hideEffect?: PopupEffect = PopupEffect.fadeOut;

    /**
     * 控制弹出对象的相对位置，可以是相对一个点({@link PopupPoint})，也可以相对一个组件或者dom元素，支持如下类型：
     * - {@link PopupPoint}类型：控制弹出视图的左上角位置，一般常常用于弹出上下文菜单，通过鼠标的事件（click/hover）等得到鼠标事件，
     * 从事件对象中提取出位置信息传过来，从而让视图出现在鼠标的附近，配合`posOffset`属性可以进一步修正位置，避免遮挡到其他重要视图。
     * - `ElementRef`和`HTMLElement`类型：相对某个已知UI元素的位置，不配置偏移的话，弹出视图的左上角会和给定的UI元素的左上角位置重合。
     * Jigsaw会自动计算出给定元素的位置，并将弹出视图移动到该位置上。一般需要配合`posOffset`属性一起调整弹出位置，
     * 避免遮挡到给定的UI元素。这个方式在实现一些下拉功能的时候会非常有用。
     * - 也可以是 'top' | 'left' | 'right' | 'bottom' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
     *   中的某一个值，用来控制弹出视图的绝对位置，
     * 配合posOffset属性中的top/right/left/bottom，可以指定绝对位置的偏移量
     *
     * 请参考 [这个demo]($demo=dialog/popup-option) 和[这个demo]($demo=dialog/absolute-position)。
     */
    pos?: PopupPosition;

    /**
     * 弹出位置的偏移量，注意left属性是以弹出组件的左侧为基准，top属性是以弹出组件的上方为基准，
     * right属性是以弹出组件的右侧为基准，bottom是以弹出组件的下方为基准点。
     *
     * 请参考[这个demo]($demo=dialog/popup-option)。
     */
    posOffset?: PopupPositionOffset;

    /**
     * 弹出的组件的定位方式，和css的 absolute/fixed 含义类似。
     *
     * 请参考[这个demo]($demo=dialog/popup-option)。
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
     */
    size?: PopupSize;

    /**
     * 当应用页面的路由改变了的时候，自动销毁弹出的组件。当弹出的视图只归属于某个路由状态的时候，
     * 这个功能会很有用，在路由变化之后，你无需手工销毁这些弹出的视图。
     *
     * 但凡事都有两面性，当你弹出的视图在全局下都有意义时，请注意务必关闭这个功能。
     * 这样的场景比如通知类的对话框（alert或者notification），他们弹出后，就需要等待用户关闭，不应该自动关闭。
     */
    disposeOnRouterChanged?: boolean = true;

    /**
     * 是否自动给弹出视图添加 `box-shadow: 1px 1px 6px rgba(0, 0, 0, .2)` 的样式，为false则不加，默认会加上
     */
    showShadow?: boolean = true;

    /**
     * 阴影深度（基于altitude），默认为default
     * - inline: 适用于页面内联元素，比如页内卡片
     * - default: 适用于Tooltip、浮动按钮、卡片hover、popover、抽屉、下拉框、级联框 、datepicker等悬浮类视图弹出场景
     * - dialog: 适用于及时消息、模态弹框等对话框场景
     * - alert: 适用于警示框等重要对话框场景
     */
    shadowType?: 'inline' | 'default' | 'dialog' | 'alert' = 'default';

    /**
     * 是否要自动给弹出视图加上边框。默认`PopupService`会检测弹出的视图是否有边框，如果有则不加，如果没有则自动加上边框和阴影。
     * 设置了true/false之后，则`PopupService`不再自动检测，而是根据这个属性的值决定是否要还是不加边框&阴影。
     */
    showBorder?: boolean;

    /**
     * popupService会默认给弹框设置一个背景（除了默认皮肤），用来适配皮肤的风格，如果用户使用了自定义的背景，请设置这个属性为`true`
     */
    useCustomizedBackground?: boolean;
    /**
     * pointer表示弹出的模块带指向的三角
     */
    borderType?: 'default' | 'pointer';
    /**
     * borderRadius表示弹框的边框圆角
     */
    borderRadius?: string | number;
    /**
     * borderRadius表示弹框的边框颜色
     */
    borderColor?: string;
    /**
     * popupService会默认给弹框设置一个背景（除了默认皮肤），用来适配皮肤的风格，defaultBackground可以用来设置这个背景的颜色
     * **注意**
     * 目前该属性用作内部wings-theme给combo-select来做弹出背景色的配置，如果开放使用则去除此条注释
     */
    defaultBackground?: string;
}

export type AbsolutePosition =
    'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
export type PopupPosition = PopupPoint | ElementRef | HTMLElement | AbsolutePosition;

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

export interface IPopupable<T = ButtonInfo> extends IDynamicInstantiatable {
    answer: EventEmitter<T>;

    [index: string]: any;
}

export class PopupInfo {
    instance: IPopupable;
    element: HTMLElement;
    dispose: PopupDisposer;
    answer: EventEmitter<ButtonInfo>;
    windowListener?: PopupDisposer;
    // 用于弹出方自行定制
    extra?: any;

    promise: Promise<any>;
    private _promiseResolver: Function;
    toPromise<T = ButtonInfo>(): Promise<T> {
        if (!this.answer) {
            return null;
        }
        this.promise = new Promise(resolve => {
            this._promiseResolver = resolve;
            this.answer.subscribe(
                (value: T) => {
                    this.answer?.unsubscribe();
                    resolve(value);
                },
                () => {
                    this.answer?.unsubscribe();
                    resolve(null);
                },
                () => {
                    this.answer?.unsubscribe();
                    resolve(null);
                });
        });
        return this.promise;
    }
}

// @dynamic
@Injectable()
export class PopupService {

    private static _instance: PopupService;

    public static get instance(): PopupService {
        return PopupService._instance;
    }

    private static _popups: PopupInfo[] = [];

    public static get allPopups(): PopupInfo[] {
        return this._popups.concat();
    }

    public get popups(): PopupInfo[] {
        return PopupService.allPopups;
    }

    public static mouseInPopupElement(mouseEvent: MouseEvent, element: HTMLElement): boolean {
        // 加1减1为了兼容有border的情况
        return mouseEvent.clientX >= element.offsetLeft + 1 && mouseEvent.clientX < element.offsetLeft + element.offsetWidth - 1
            && mouseEvent.clientY >= element.offsetTop + 1 && mouseEvent.clientY < element.offsetTop + element.offsetHeight - 1;
    }

    public elements: HTMLElement[] = [];

    private _eventHelper: ElementEventHelper = new ElementEventHelper();

    private _popupZIndex: number = 1000;

    constructor(private _cfr: ComponentFactoryResolver,
                private _zone: NgZone,
                @Optional()
                private _router: Router,
                @Optional()
                private _activatedRoute: ActivatedRoute,
                private _themeService: JigsawThemeService) {
        PopupService._instance = PopupService._instance || this;
    }

    private _listenRouterChange(disposer: PopupDisposer): void {
        if (!this._router) {
            return;
        }
        const disposerSubscription: Subscription = this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this._activatedRoute),
                map(route => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                })
            )
            .subscribe(() => {
                disposerSubscription.unsubscribe();
                disposer();
            });
    }

    private static _viewContainerRef: ViewContainerRef;

    public static get viewContainerRef(): ViewContainerRef {
        return this._viewContainerRef || InternalUtils.viewContainerRef;
    }

    public static set viewContainerRef(value: ViewContainerRef) {
        this._viewContainerRef = value;
    }

    /**
     * 打开弹框
     * @param what
     * @param options
     * @param initData
     * @return PopupInfo
     */
    public popup<T = ButtonInfo>(what: Type<IPopupable<T>>, options?: PopupOptions, initData?: any): PopupInfo;
    public popup<T = any>(what: TemplateRef<any>, options?: PopupOptions): PopupInfo;
    public popup<T = ButtonInfo>(what: Type<IPopupable<T>> | TemplateRef<any>, options?: PopupOptions, initData?: any): PopupInfo {
        if (!(this.constructor as typeof PopupService).viewContainerRef || !InternalUtils.renderer) {
            console.error("please use 'jigsaw-root' or 'jigsaw-mobile-root' element as the root of your root component");
            return;
        }
        let popupInfo: PopupInfo,
            popupRef: PopupRef,
            element: HTMLElement,
            popupDisposer: PopupDisposer,
            blockDisposer: PopupDisposer,
            disposer: PopupDisposer;
        options = options || {};
        //popup block
        blockDisposer = this._popupBlocker(options);
        [popupInfo, popupRef] = this._popupFactory(what, options);
        element = popupInfo.element;
        popupDisposer = popupInfo.dispose;
        //set disposer
        disposer = () => {
            const target: PopupInfo = PopupService._popups.find(p => p.element === element);
            const index = PopupService._popups.indexOf(target);
            if (index >= 0) {
                PopupService._popups.splice(index, 1);
            }

            if (popupDisposer) {
                popupDisposer();
            }

            if (blockDisposer) {
                blockDisposer();
            }
            if (target && target.windowListener) {
                target.windowListener();
            }
        };

        //set popup
        if (popupRef instanceof ComponentRef) {
            popupRef.instance.dispose = disposer;
            popupRef.instance.initData = initData;
        }
        this._beforePopup(options, element, disposer);
        this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
            this._setPopup(options, element);
            // 给弹出设置皮肤
            let tagName = element.tagName.toLowerCase();
            if ((!options || !options.useCustomizedBackground) && tagName != 'jigsaw-block' && tagName != 'j-block') {
                const backgroundColor = options.defaultBackground ? options.defaultBackground : this._themeService.popupBackgroundColor;
                if (backgroundColor) {
                    InternalUtils.renderer.setStyle(element, 'background', backgroundColor);
                }
            }
        });
        const result = new PopupInfo();
        result.instance = (<ComponentRef<IPopupable>>popupRef).instance;
        result.element = element;
        result.dispose = disposer;
        result.answer = result.instance?.answer;
        PopupService._popups.push(result);
        return result;
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

    private _beforePopup(options: PopupOptions, element: HTMLElement, disposer: PopupDisposer): void {
        this._removeAnimation(options, element);
        this._setStyle(options, element);
        if (!options || !options.hasOwnProperty('disposeOnRouterChanged') || options.disposeOnRouterChanged) {
            this._listenRouterChange(disposer);
        }
    }

    private _setStyle(options: PopupOptions, element: HTMLElement): void {
        InternalUtils.renderer.setStyle(element, 'z-index', this._popupZIndex);
        InternalUtils.renderer.setStyle(element, 'visibility', 'hidden');
    }

    private _removeAnimation(options: PopupOptions, element: HTMLElement) {
        const popupEffect = PopupService._getPopupEffect(options);

        //删除可能有的动画class，确保能触发动画的animationend事件
        if (element.classList.contains(popupEffect.showEffect)) {
            InternalUtils.renderer.removeClass(element, popupEffect.showEffect);
        }
        if (element.classList.contains(popupEffect.hideEffect)) {
            InternalUtils.renderer.removeClass(element, popupEffect.hideEffect);
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
        InternalUtils.renderer.setStyle(element, 'position', 'fixed');
        InternalUtils.renderer.setStyle(element, 'top', 0);
        const disposer: PopupDisposer = this._getDisposer(options, ref, element);
        const pi = new PopupInfo();
        pi.element = element;
        pi.dispose = disposer;
        return [pi, ref];
    }

    private _createPopup(what: Type<IPopupable> | TemplateRef<any>) {
        const classDefine = this.constructor as typeof PopupService;
        if (what instanceof TemplateRef) {
            return classDefine.viewContainerRef.createEmbeddedView(what);
        } else {
            const factory = this._cfr.resolveComponentFactory(what);
            return classDefine.viewContainerRef.createComponent(factory);
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
     *
     */
    private _isModal(options: PopupOptions): boolean {
        return CommonUtils.isEmptyObject(options) || options.modal;
    }

    /**
     * 这里的逻辑有点绕，主要是因为showShadow的默认值必须是true，但是人家给options的时候，有可能不是new出来的，而是给了json对象
     * 在非new出来的时候，showShadow属性就有可能未定义，那么在未定义的时候，也必须认为它的值是true
     * @param options
     */
    private _isShowShadow(options: PopupOptions): boolean {
        return !(options && options.showShadow === false);
    }

    /**
     * 判断弹框是否居中显示:
     * 没配options
     * 或options为空对象
     * 或没有配options.pos
     * 或pos配置的是四个方位的绝对位置
     * @param options
     *
     */
    private _isGlobalPopup(options: PopupOptions): boolean {
        return CommonUtils.isEmptyObject(options) || !options.pos || typeof options.pos == 'string';
    }

    private _setPopup(options: PopupOptions, element: HTMLElement) {
        if (element) {
            this._setSize(options, element);
            this._setBackground(options, element);
            this.setPosition(options, element);
            this._setShowAnimate(options, element);
        }
    }

    private _setWindowListener(options: PopupOptions, element: HTMLElement): PopupDisposer {
        let removeWindowListen: PopupDisposer;
        if (this._isGlobalPopup(options)) {
            this._zone.runOutsideAngular(() => {
                // 所有的全局事件应该放到zone外面，不一致会导致removeEvent失效，见#286
                removeWindowListen = InternalUtils.renderer.listen('window', 'resize', () => {
                    const documentBody = AffixUtils.getDocumentBody();
                    this._setAbsolutePosition((documentBody.clientWidth / 2 - element.offsetWidth / 2),
                        (documentBody.clientHeight / 2 - element.offsetHeight / 2), options, element);
                });
            });
        }
        return removeWindowListen;
    }

    /**
     * 根据options中的pos属性，是否配置了
     * 'top' | 'left' | 'right' | 'bottom' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
     * 值来设定弹窗的位置
     */
    private _setAbsolutePosition(left: number, top: number, options: PopupOptions, element: HTMLElement): void {
        const pos = options ? options.pos : '';
        switch (pos) {
            case 'top':
                InternalUtils.renderer.removeStyle(element, 'right');
                InternalUtils.renderer.removeStyle(element, 'bottom');
                InternalUtils.renderer.setStyle(element, 'left', left + 'px');
                InternalUtils.renderer.setStyle(element, 'top', options.posOffset.top + 'px');
                break;
            case 'left':
                InternalUtils.renderer.removeStyle(element, 'right');
                InternalUtils.renderer.removeStyle(element, 'bottom');
                InternalUtils.renderer.setStyle(element, 'top', top + 'px');
                InternalUtils.renderer.setStyle(element, 'left', options.posOffset.left + 'px');
                break;
            case 'right':
                InternalUtils.renderer.removeStyle(element, 'left');
                InternalUtils.renderer.removeStyle(element, 'bottom');
                InternalUtils.renderer.setStyle(element, 'top', top + 'px');
                InternalUtils.renderer.setStyle(element, 'right', options.posOffset.right + 'px');
                break;
            case 'bottom':
                InternalUtils.renderer.removeStyle(element, 'top');
                InternalUtils.renderer.removeStyle(element, 'right');
                InternalUtils.renderer.setStyle(element, 'left', left + 'px');
                InternalUtils.renderer.setStyle(element, 'bottom', options.posOffset.bottom + 'px');
                break;
            case 'leftTop':
                InternalUtils.renderer.removeStyle(element, 'right');
                InternalUtils.renderer.removeStyle(element, 'bottom');
                InternalUtils.renderer.setStyle(element, 'left', options.posOffset.left + 'px');
                InternalUtils.renderer.setStyle(element, 'top', options.posOffset.top + 'px');
                break;
            case 'leftBottom':
                InternalUtils.renderer.removeStyle(element, 'right');
                InternalUtils.renderer.removeStyle(element, 'top');
                InternalUtils.renderer.setStyle(element, 'left', options.posOffset.left + 'px');
                InternalUtils.renderer.setStyle(element, 'bottom', options.posOffset.bottom + 'px');
                break;
            case 'rightTop':
                InternalUtils.renderer.removeStyle(element, 'left');
                InternalUtils.renderer.removeStyle(element, 'bottom');
                InternalUtils.renderer.setStyle(element, 'right', options.posOffset.right + 'px');
                InternalUtils.renderer.setStyle(element, 'top', options.posOffset.top + 'px');
                break;
            case 'rightBottom':
                InternalUtils.renderer.removeStyle(element, 'left');
                InternalUtils.renderer.removeStyle(element, 'top');
                InternalUtils.renderer.setStyle(element, 'right', options.posOffset.right + 'px');
                InternalUtils.renderer.setStyle(element, 'bottom', options.posOffset.bottom + 'px');
                break;
            default:
                InternalUtils.renderer.removeStyle(element, 'right');
                InternalUtils.renderer.removeStyle(element, 'bottom');
                InternalUtils.renderer.setStyle(element, 'top', top + 'px');
                InternalUtils.renderer.setStyle(element, 'left', left + 'px');
        }
    }

    /*
     * 设置弹框尺寸
     * */
    private _setSize(options: PopupOptions, element: HTMLElement) {
        if (!options || !options.size) {
            return;
        }
        let size = options.size;

        if (size.width) {
            InternalUtils.renderer.setStyle(element, 'width', CommonUtils.getCssValue(size.width));
        }
        if (size.minWidth) {
            InternalUtils.renderer.setStyle(element, 'min-width', CommonUtils.getCssValue(size.minWidth));
        }
        if (size.height) {
            InternalUtils.renderer.setStyle(element, 'height', CommonUtils.getCssValue(size.height));
        }
    }

    /*
     * 设置边框、阴影、动画
     * */
    private _setBackground(options: PopupOptions, element: HTMLElement): void {
        // 这里的逻辑有点绕，主要是因为showShadow的默认值必须是true
        if (!this._isModal(options) && this._isShowShadow(options)) {
            const shadow = {
                inline: "0px 1px 2px hsla(0, 0%, 0%, 0.2)",
                default: "0px 2px 12px hsla(0, 0%, 0%, 0.15)",
                dialog: "0px 5px 15px hsla(0, 0%, 0%, 0.12)",
                alert: "0px 5px 15px hsla(0, 0%, 0%, 0.12)"
            };
            const shadowValue = shadow[options.shadowType] || shadow.default;
            InternalUtils.renderer.setStyle(element, "box-shadow", shadowValue);
        }
        if (options && options.showBorder) {
            const borderColor = options.borderColor ? options.borderColor : 'var(--border-color-default, #dcdcdc)';
            InternalUtils.renderer.setStyle(element, "border-width", "1px");
            InternalUtils.renderer.setStyle(element, "border-style", "solid");
            InternalUtils.renderer.setStyle(element, "border-color", borderColor);
            InternalUtils.renderer.setStyle(element, "border-radius", "4px");
        }
        if (options && options.borderRadius) {
            InternalUtils.renderer.setStyle(element, "border-radius", CommonUtils.getCssValue(options.borderRadius));
        }
    }

    private _setShowAnimate(options: PopupOptions, element: HTMLElement) {
        InternalUtils.renderer.setStyle(element, 'visibility', 'visible');
        InternalUtils.renderer.addClass(element, PopupService._getPopupEffect(options).showEffect);

        const removeElementListen = InternalUtils.renderer.listen(element, 'animationend', () => {
            removeElementListen();
            this._eventHelper.del(element, 'animationend', removeElementListen);
        });
        this._eventHelper.put(element, 'animationend', removeElementListen);
    }

    private _setHideAnimate(options: PopupOptions, element: HTMLElement, cb: () => void) {
        InternalUtils.renderer.addClass(element, PopupService._getPopupEffect(options).hideEffect);
        const removeElementListen = InternalUtils.renderer.listen(element, 'animationend', () => {
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
        if (!element || !options) {
            return;
        }
        let posType: string = this._isGlobalPopup(options) ? 'fixed' : this._getPositionType(options.posType);
        let position = this._getPositionValue(options, element);
        InternalUtils.renderer.setStyle(element, 'position', posType);
        this._setAbsolutePosition(position.left, position.top, options, element);

        // 注册窗口事件
        const target: PopupInfo = PopupService._popups.find(p => p.element === element);
        if (!target) {
            return;
        }
        if (target.windowListener) {
            target.windowListener();
        }
        target.windowListener = this._setWindowListener(options, element);
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
            } else if (typeof pos == 'object') {
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

    /**
     * 计算弹窗的位置，默认向下弹出，当下面的位置不足时，改成向上弹
     * 默认靠左弹，当右边位置不足时，靠右弹
     */
    public positionReviser(pos: PopupPositionValue, popupElement: HTMLElement,
                           options?: { offsetWidth?: number, offsetHeight?: number, direction?: 'v' | 'h' }): PopupPositionValue {
        const documentBody = AffixUtils.getDocumentBody();
        if (!options || !options.direction || options.direction == 'v') {
            // 调整上下位置
            const upDelta = (options && options.offsetHeight ? options.offsetHeight : 0) + popupElement.offsetHeight;
            if (documentBody.clientHeight <= upDelta) {
                // 可视区域比弹出的UI高度还小就不要调整了
                return pos;
            }
            const needHeight = pos.top + popupElement.offsetHeight;
            const totalHeight = window.pageYOffset + documentBody.clientHeight;
            if (needHeight >= totalHeight && pos.top > upDelta) {
                // 下方位置不够且上方位置足够的时候才做调整
                pos.top -= upDelta;
            }
        }

        if (!options || !options.direction || options.direction == 'h') {
            // 调整左右位置
            const leftDelta = popupElement.offsetWidth - (options && options.offsetWidth ? options.offsetWidth : 0);
            if (documentBody.clientWidth <= leftDelta && leftDelta <= 0) {
                // 可视区域比弹出的UI高度还小就不要调整了
                // 弹框宽度比宿主宽度小也不用调整
                return pos;
            }
            const needWidth = pos.left + popupElement.offsetWidth;
            const totalWidth = window.pageXOffset + documentBody.clientWidth;
            if (needWidth >= totalWidth && pos.left > leftDelta) {
                // 右边位置不够且左边位置足够的时候才做调整
                pos.left -= leftDelta;
            }
        }

        return pos;
    }
}
