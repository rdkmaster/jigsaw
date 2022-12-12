import {Directive, ElementRef, EventEmitter, Input, NgModule, NgZone, OnDestroy, Output, Renderer2, TemplateRef, Type} from "@angular/core";
import {Subscription} from 'rxjs';
import {
    IPopupable,
    PopupDisposer,
    PopupInfo,
    PopupOptions,
    PopupPoint,
    PopupPositionType,
    PopupPositionValue,
    PopupService
} from "../../service/popup.service";
import {AbstractJigsawViewBase} from "../../common";
import {CommonUtils} from "../../core/utils/common-utils";
import {AffixUtils} from "../../core/utils/internal-utils";

export enum DropDownTrigger {
    click,
    mouseenter,
    mouseleave,
    none,
}

export type FloatPosition = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | 'leftTop' |
    'leftBottom' | 'rightTop' | 'rightBottom' | 'left' | 'right' | 'top' | 'bottom';

@Directive()
export class JigsawFloatBase extends AbstractJigsawViewBase implements OnDestroy {
    protected _removeWindowClickHandler: Function;

    private _popupInfo: PopupInfo;
    private _originDisposer: PopupDisposer;
    private _removePopupClickHandler: Function;
    private _removeMouseOverHandler: Function;
    private _removeMouseOutHandler: Function;
    private _removeResizeHandler: Function;
    private _rollOutDenouncesTimer: any = null;
    private _rollInDenouncesTimer: any = null;

    /**
     * @internal
     */
    public _jigsawFloatOpenDelay: number = 100;

    public get jigsawFloatOpenDelay(): number {
        return this._jigsawFloatOpenDelay;
    }

    public set jigsawFloatOpenDelay(value: number) {
        this._jigsawFloatOpenDelay = typeof value != 'number' ? parseInt(value) : value;
    }

    /**
     * @internal
     */
    private _jigsawFloatCloseDelay: number = 400;

    public get jigsawFloatCloseDelay(): number {
        return this._jigsawFloatCloseDelay;
    }

    public set jigsawFloatCloseDelay(value: number) {
        this._jigsawFloatCloseDelay = typeof value != 'number' ? parseInt(value) : value;
    }

    public get popupElement(): HTMLElement {
        return this._popupInfo ? this._popupInfo.element : null;
    }

    public get popupInstance(): any {
        return this._popupInfo ? this._popupInfo.instance : null;
    }

    private _jigsawFloatArrowElement: HTMLElement;

    /**
     * @internal
     */
    public get jigsawFloatArrowElement(): HTMLElement {
        return this._jigsawFloatArrowElement;
    }

    public set jigsawFloatArrowElement(el: HTMLElement) {
        this._jigsawFloatArrowElement = el;
        this._setArrow(this.popupElement);
    }

    private _jigsawFloatInitData: any;
    /**
     * @internal
     */
    public get jigsawFloatInitData(): any {
        return this._jigsawFloatInitData;
    }

    public set jigsawFloatInitData(data: any) {
        this._jigsawFloatInitData = data;
        if (this.popupInstance && this.initialized) {
            this.popupInstance.initData = data;
        }
    }

    private _floatTarget: Type<IPopupable> | TemplateRef<any>;

    /**
     * @internal
     */
    public get jigsawFloatTarget(): Type<IPopupable> | TemplateRef<any> {
        return this._floatTarget;
    }

    public set jigsawFloatTarget(value: Type<IPopupable> | TemplateRef<any>) {
        if (this._floatTarget == value) {
            return;
        }
        this._floatTarget = value;
        if (!this._opened) {
            return;
        }
        this._closeFloat();
        this.callLater(() => {
            // 这里必须使用setTimeout来跳过第一次冒泡上来的window.click
            this._openFloat();
        });
    }

    /**
     * @internal
     */
    public jigsawFloatOptions: PopupOptions;

    /**
     * @internal
     */
    public jigsawFloatPosition: FloatPosition = 'bottomLeft';

    private _opened: boolean = false;

    /**
     * @internal
     */
    public get jigsawFloatOpen(): boolean {
        return this._opened;
    }

    public set jigsawFloatOpen(value: boolean) {
        value = !!value;
        if (value == this._opened) {
            return;
        }
        this.callLater(() => {
            // toggle open 外部控制时，用异步触发变更检查
            // 初始化open，等待组件初始化后执行
            // 这里必须使用setTimeout来跳过第一次冒泡上来的window.click
            if (value) {
                this.openFloat();
            } else {
                this.closeFloat();
            }
        });
    }

    /**
     * @internal
     */
    public jigsawFloatOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * @internal
     */
    public jigsawFloatCloseTrigger: 'click' | 'mouseleave' | 'none' | DropDownTrigger;

    /**
     * @internal
     */
    public jigsawFloatOpenTrigger: 'click' | 'mouseenter' | 'none' | DropDownTrigger;

    /**
     * @internal
     */
    public jigsawFloatAnswer = new EventEmitter<any>();

    constructor(protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                protected _popupService: PopupService,
                protected _zone: NgZone) {
        super(_zone);
        this._init();
    }

    /**
     * 留给子类去覆盖
     */
    protected _init(): void {
    }

    protected _emitOpenChange(open: boolean): void {
        this._opened = open;
        this.jigsawFloatOpenChange.emit(open);
    }

    public openFloat(): void {
        if (this._popupInfo) {
            return;
        }
        this._openFloat();
        this._emitOpenChange(true);
    }

    public closeFloat($event?: any): void {
        if (!this._popupInfo) {
            return;
        }
        this._closeFloat($event);
        this._emitOpenChange(false);
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.jigsawFloatOpen = false;
        this._floatTarget = null;
        this._clearAllListeners();
        this._disposePopup();
        if (this._removeAnswerSubscriber) {
            this._removeAnswerSubscriber.unsubscribe();
            this._removeAnswerSubscriber = null;
        }
    }

    /**
     * 弹出的视图在用户交互过程中，有可能发生尺寸变化，有可能造成位置错误
     * 此时通过调用这个方法可以重新定位弹出视图的位置
     */
    public reposition(): void {
        if (this.popupElement) {
            this._popupService.setPosition(this._getPopupOption(), this.popupElement);
            this._setArrow(this.popupElement);
        }
    }

    /**
     * @internal
     */
    public _$openByHover(event): void {
        this.clearCallLater(this._rollOutDenouncesTimer);

        if (this.jigsawFloatOpenTrigger != 'mouseenter') {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        this._rollInDenouncesTimer = this.callLater(() => {
            this.jigsawFloatOpen = true;
        }, this.jigsawFloatOpenDelay);
    }

    /**
     * @internal
     * @param event
     * @param offset 代表偏移，注册在float触发器上的mouseleave在计算element中的位置是要往前回退一个坐标，
     * 注册在弹出层上的mouseleave无需偏移
     */
    public _$closeByHover(event: any, offset: number = 0) {
        const popups = this._popupService.popups;
        this.clearCallLater(this._rollInDenouncesTimer);
        if (this.jigsawFloatCloseTrigger != 'mouseleave' || !popups || popups.length == 0) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        let canClose = true;
        // currentIndex之后的弹层导致触发mouseleave不应关闭float
        const currentIndex = popups.indexOf(popups.find(p => p.element === this.popupElement));
        for (let i = popups.length - 1; i > currentIndex - offset && i >= 0; i--) {
            if (canClose == false) {
                break;
            }
            if (i > currentIndex - offset) {
                canClose = !this._isChildOf(event.toElement, popups[i].element);
            }
        }
        // 弹出的全局遮盖jigsaw-block' 触发的mouseleave不应关闭float
        if (event.toElement && event.toElement.className !== 'jigsaw-block' && canClose) {
            this._rollOutDenouncesTimer = this.callLater(() => {
                this.closeFloat(event);
            }, this.jigsawFloatCloseDelay);
        }
    }

    /**
     * @internal
     */
    public _$onHostClick() {
        if (this.jigsawFloatOpenTrigger == 'click' && !this.jigsawFloatOpen) {
            this.jigsawFloatOpen = true;
        }
    }

    private _isChildOf(child, parent): boolean {
        if (child && parent) {
            let parentNode = child;
            while (parentNode) {
                if (parent === parentNode) {
                    return true;
                }
                parentNode = parentNode.parentNode;
            }
        }
        return false;
    }

    protected _onWindowClick(event: any): void {
        if (this.jigsawFloatCloseTrigger == 'none') {
            return;
        }
        if (event.target == this._elementRef.nativeElement) {
            return;
        }
        if (this._isChildOf(event.target, this._elementRef.nativeElement)) {
            return;
        }
        if (this._removeWindowClickHandler) {
            this._removeWindowClickHandler();
            this._removeWindowClickHandler = null;
        }
        if (this._removeResizeHandler) {
            this._removeResizeHandler();
            this._removeResizeHandler = null;
        }
        this.closeFloat(event);
    }

    protected _onPopupElementClick(event: any): void {
        event.stopPropagation();
        event.preventDefault();
    }

    protected _disposePopup() {
        if (!this._popupInfo || !this._originDisposer) {
            return;
        }
        this._originDisposer();
        this._originDisposer = null;
        this._popupInfo = null;
    }

    private _removeAnswerSubscriber: Subscription;

    /**
     * 立即弹出下拉视图，请注意不要重复弹出，此方法没有做下拉重复弹出的保护
     */
    protected _openFloat(): PopupInfo {
        if (!this.jigsawFloatTarget || this._opened) {
            return;
        }
        this._opened = true;
        if (this._removeWindowClickHandler) {
            this._removeWindowClickHandler();
        }
        // 点击window时，自动关闭,但当closeTrigger为none时无法关掉的
        this._removeWindowClickHandler = this._renderer.listen('window', 'click', event => this._onWindowClick(event));

        const option: PopupOptions = this._getPopupOption();
        const popupInfo = this._popupService.popup(this.jigsawFloatTarget as any, option, this.jigsawFloatInitData);
        if (!popupInfo.element) {
            console.error('unable to popup drop down, unknown error!');
            return popupInfo;
        }
        this._popupInfo = popupInfo;
        this._originDisposer = popupInfo.dispose;
        popupInfo.dispose = this.closeFloat.bind(this);

        if (this._removeAnswerSubscriber) {
            this._removeAnswerSubscriber.unsubscribe();
            this._removeAnswerSubscriber = null;
        }
        if (popupInfo.answer) {
            this._removeAnswerSubscriber = popupInfo.answer.subscribe(data => {
                this.jigsawFloatAnswer.emit(data);
            });
        }

        if (option.borderType == 'pointer') {
            this.runAfterMicrotasks(() => this._setArrow(this.popupElement));
        }

        if (!this._removeMouseOverHandler) {
            this._removeMouseOverHandler = this._renderer.listen(
                popupInfo.element, 'mouseenter',
                () => this.clearCallLater(this._rollOutDenouncesTimer));
        }
        if (this.jigsawFloatCloseTrigger == 'mouseleave' && !this._removeMouseOutHandler) {
            this._removeMouseOutHandler = this._renderer.listen(
                popupInfo.element, 'mouseleave', event => this._$closeByHover(event));
        }

        // 阻止点击行为冒泡到window
        if (this._removePopupClickHandler) {
            this._removePopupClickHandler();
        }
        this._removePopupClickHandler = this._renderer.listen(
            popupInfo.element, 'click', event => this._onPopupElementClick(event));

        // 监听window的resize事件，自动更新位置
        if (this._removeResizeHandler) {
            this._removeResizeHandler();
        }
        this._removeResizeHandler = this._renderer.listen("window", "resize", () => {
            PopupService.instance.setPosition(this._getPopupOption(), popupInfo.element);
            if (option.borderType == 'pointer') {
                popupInfo.element.removeChild(popupInfo.element.children[popupInfo.element.children.length - 1]);
                this._setArrow(popupInfo.element);
            }
        });
        return popupInfo;
    }

    private _getPos(): PopupPoint {
        let point = this._getElementPos();
        const differ = this.jigsawFloatOptions && this.jigsawFloatOptions.borderType == 'pointer' ? 7 : 0;
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        switch (this.jigsawFloatPosition) {
            case 'bottomLeft':
                point.y += hostRect.height + differ;
                break;
            case 'bottomRight':
                point.x += hostRect.width;
                point.y += hostRect.height + differ;
                break;
            case 'topRight':
                point.x += hostRect.width;
                break;
            case 'leftBottom':
                point.y += hostRect.height;
                break;
            case 'rightTop':
                point.x += hostRect.width + differ;
                break;
            case 'rightBottom':
                point.x += hostRect.width + differ;
                point.y += hostRect.height;
                break;
            case 'top':
                point.x += hostRect.width / 2;
                break;
            case 'bottom':
                point.x += hostRect.width / 2;
                point.y += hostRect.height;
                break;
            case 'left':
                point.y += hostRect.height / 2;
                break;
            case 'right':
                point.x += hostRect.width;
                point.y += hostRect.height / 2;
        }
        return point;
    }

    private _getElementPos(element?: HTMLElement) {
        element = element ? element : this._elementRef.nativeElement;
        let point = new PopupPoint();
        if (this.jigsawFloatOptions && this.jigsawFloatOptions.posType == PopupPositionType.fixed) {
            // 获取触发点相对于视窗的位置
            const tempRect = element.getBoundingClientRect();
            point.y = tempRect.top;
            point.x = tempRect.left;
        } else {
            point.y = AffixUtils.offset(element).top;
            point.x = AffixUtils.offset(element).left;
        }
        return point;
    }

    // 被弹出的控件高度宽度，在弹出之前并不知道，故要再控件位置微调时加入进去
    private _changePosByFloatPosition(pos: PopupPositionValue, popupElement: HTMLElement) {
        const popupRect = popupElement.getBoundingClientRect();
        switch (this.jigsawFloatPosition) {
            case 'bottomRight':
                pos.left -= popupRect.width;
                break;
            case 'topLeft':
                pos.top -= popupRect.height;
                break;
            case 'topRight':
                pos.top -= popupRect.height;
                pos.left -= popupRect.width;
                break;
            case 'rightBottom':
                pos.top -= popupRect.height;
                break;
            case 'leftTop':
                pos.left -= popupRect.width;
                break;
            case 'leftBottom':
                pos.left -= popupRect.width;
                pos.top -= popupRect.height;
                break;
            case 'top':
                pos.left -= popupRect.width / 2;
                pos.top -= popupRect.height;
                break;
            case 'bottom':
                pos.left -= popupRect.width / 2;
                break;
            case 'left':
                pos.left -= popupRect.width;
                pos.top -= popupRect.height / 2;
                break;
            case 'right':
                pos.top -= popupRect.height / 2;
                break;
        }
    }

    /**
     * @internal
     */
    public _getPopupOption(): PopupOptions {
        let option: any = {};
        const calc: any = {
            pos: this._getPos(),
            posType: PopupPositionType.absolute,
            posReviser: (pos: PopupPositionValue, popupElement: HTMLElement): PopupPositionValue => {
                const scale = CommonUtils.getScale(this._elementRef.nativeElement);
                if (scale != 1 && isNaN(CommonUtils.getScale(popupElement, NaN))) {
                    popupElement.style.transform += `scale(${scale})`;
                    popupElement.style.transformOrigin = 'left top';
                }
                this._changePosByFloatPosition(pos, popupElement);
                this._positionReviser(pos, popupElement);
                return pos;
            },
            size: {
                minWidth: this._elementRef.nativeElement.offsetWidth
            }
        };
        Object.assign(option, calc);
        if (this.jigsawFloatOptions) {
            Object.assign(option, this.jigsawFloatOptions);
            if (CommonUtils.isDefined(this.jigsawFloatOptions.modal)) {
                console.warn('modal can not be set');
                option.modal = false;
            }
            if (CommonUtils.isDefined(this.jigsawFloatOptions.pos)) {
                console.warn('pos can not be set');
                option.pos = calc.pos;
            }
            if (CommonUtils.isDefined(this.jigsawFloatOptions.posReviser)) {
                option.posReviser = (pos: PopupPositionValue, popupElement: HTMLElement): PopupPositionValue => {
                    this._changePosByFloatPosition(pos, popupElement);
                    this.jigsawFloatOptions.posReviser(pos, popupElement);
                    return pos;
                };
            }
        }
        return option;
    }

    /*
    * 设置弹框是否有三角指向
    */
    private _setArrow(popupElement: HTMLElement) {
        const options = this._getPopupOption();
        if (options.borderType != 'pointer' || !popupElement) {
            return;
        }
        const hostPosition = this._getElementPos();
        const position: PopupPoint = {x: Math.round(hostPosition.x), y: Math.round(hostPosition.y)};
        const arrowPosition = this._getElementPos(this.jigsawFloatArrowElement);
        const arrowPoint: PopupPoint = {x: Math.round(arrowPosition.x), y: Math.round(arrowPosition.y)};
        const host = this.jigsawFloatArrowElement ? this.jigsawFloatArrowElement : this._elementRef.nativeElement;
        let ele = <HTMLElement>this.popupElement.querySelector('.jigsaw-float-arrow');
        if (ele) {
            this._setArrowPosition(ele, popupElement, position, host, arrowPoint, options);
        } else {
            ele = document.createElement('div');
            ele.setAttribute("class", "jigsaw-float-arrow");
            // 根据tooltip尖角算出来大概在5√2，约为7px
            ele.style.width = '7px';
            ele.style.height = '7px';
            ele.style.position = 'absolute';
            ele.style.transform = 'rotateZ(-45deg)';
            ele.style.backgroundColor = 'inherit';
            this._setArrowPosition(ele, popupElement, position, host, arrowPoint, options)
            popupElement.appendChild(ele);
        }
    }

    private _setArrowPosition(ele: HTMLElement, popupElement: HTMLElement, position: PopupPoint, host: HTMLElement, arrowPoint: PopupPoint, options: PopupOptions) {
        const hostRect = host.getBoundingClientRect();
        const popupRect = popupElement.getBoundingClientRect();
        const scale = CommonUtils.getScale(host);
        const popupPos = this._getElementPos(popupElement);
        const arrowOffset = options.showBorder ? 7 / 2 + 1 : 7 / 2;
        const borderColor = options.borderColor ? options.borderColor : '#dcdcdc';
        const popupEleTop = popupPos.y;
        const popupEleBottom = popupPos.y + popupRect.height;
        const popupEleLeft = popupPos.x;
        const popupEleRight = popupPos.x + popupRect.width;
        const hostTop = position.y;
        const hostBottom = position.y + hostRect.height;
        const hostRight = position.x + hostRect.width;
        const hostLeft = position.x;

        let adjustPopup = true;
        if (popupEleTop >= hostBottom) {
            _createTopArrow();
        } else if (popupEleBottom <= hostTop) {
            _createBottomArrow();
        } else if (popupEleLeft >= hostRight) {
            _createLeftArrow();
        } else if (popupEleRight <= hostLeft) {
            _createRightArrow();
        } else {
            // 覆盖在host上面，根据float配置渲染箭头位置
            adjustPopup = false;
            if (this.jigsawFloatPosition.indexOf('bottom') !== -1) {
                _createTopArrow();
            } else if (this.jigsawFloatPosition.indexOf('top') !== -1) {
                _createBottomArrow();
            } else if (this.jigsawFloatPosition.indexOf('left') !== -1) {
                _createRightArrow();
            } else if (this.jigsawFloatPosition.indexOf('right') !== -1) {
                _createLeftArrow();
            } else {
                _createDefaultArrow();
            }
        }

        /* 箭头在上 */
        function _createTopArrow() {
            if (adjustPopup && (popupEleTop - hostBottom < 7)) {
                popupElement.style.top = 7 + hostBottom + 'px';
            }
            ele.style.top = `-${arrowOffset}px`;
            ele.style.left = _getLeft(host, popupElement, arrowPoint, scale)  + 'px';
            if (options.showBorder) {
                ele.style.borderTop = `1px solid ${borderColor}`;
                ele.style.borderRight = `1px solid ${borderColor}`;
            }
        }

        /* 箭头在下 */
        function _createBottomArrow() {
            const popupRect = popupElement.getBoundingClientRect();
            if (adjustPopup && (hostTop - popupEleBottom < 7)) {
                popupElement.style.top = hostTop - popupRect.height - 7 + 'px';
            }
            ele.style.bottom = `-${arrowOffset}px`;
            ele.style.left = _getLeft(host, popupElement, arrowPoint, scale)  + 'px';
            if (options.showBorder) {
                ele.style.borderLeft = `1px solid ${borderColor}`;
                ele.style.borderBottom = `1px solid ${borderColor}`;
            }
        }

        /* 箭头在左 */
        function _createLeftArrow() {
            if (adjustPopup && (popupEleLeft - hostRight < 7)) {
                popupElement.style.left = hostRight + 7 + 'px';
            }
            ele.style.left = `-${arrowOffset}px`;
            ele.style.top = _getTop(host, popupElement, arrowPoint, scale)  + 'px';
            if (options.showBorder) {
                ele.style.borderTop = `1px solid ${borderColor}`;
                ele.style.borderLeft = `1px solid ${borderColor}`;
            }
        }

        /* 箭头在右 */
        function _createRightArrow() {
            const popupRect = popupElement.getBoundingClientRect();
            if (adjustPopup && (hostLeft - popupEleRight < 7)) {
                popupElement.style.left = hostLeft - popupRect.width - 7 + 'px';
            }
            ele.style.right = `-${arrowOffset}px`;
            ele.style.top = _getTop(host, popupElement, arrowPoint, scale) + 'px';
            if (options.showBorder) {
                ele.style.borderRight = `1px solid ${borderColor}`;
                ele.style.borderBottom = `1px solid ${borderColor}`;
            }
        }

        /* 默认箭头 */
        function _createDefaultArrow() {
            ele.style.left = '6px';
            ele.style.bottom = `-${arrowOffset}px`;
            if (options.showBorder) {
                ele.style.borderLeft = `1px solid ${borderColor}`;
                ele.style.borderBottom = `1px solid ${borderColor}`;
            }
        }

        function _getLeft(host: HTMLElement, popupElement: HTMLElement, position: PopupPoint, scale: number): number {
            // 箭头的位置要计算缩放前的，因为float弹出组件会缩放，箭头会跟着缩放
            let delta = position.x / scale + host.offsetWidth / 2 - popupElement.offsetLeft / scale - 7 / 2;
            if (delta < 4) {
                delta = 4;
            } else if (delta > popupElement.offsetWidth - 13) {
                delta = popupElement.offsetWidth - 13;
            }
            return delta;
        }

        function _getTop(host: HTMLElement, popupElement: HTMLElement, position: PopupPoint, scale: number): number {
            // 箭头的位置要计算缩放前的，因为float弹出组件会缩放，箭头会跟着缩放
            let delta = position.y / scale + host.offsetHeight / 2 - popupElement.offsetTop / scale - 7 / 2;
            if (delta < 4) {
                delta = 4;
            } else if (delta > popupElement.offsetHeight - 13) {
                delta = popupElement.offsetHeight - 13;
            }
            return delta;
        }
    }

    /**
     * 计算弹层区域的位置，当指定的方向位置不够，且反向弹位置足够时，那么反向弹层
     */
    private _positionReviser(pos: PopupPositionValue, popupElement: HTMLElement): PopupPositionValue {
        const hostRect = this._elementRef.nativeElement.getBoundingClientRect();
        const popupRect = popupElement.getBoundingClientRect();
        const point = this._getElementPos();
        const differ = this.jigsawFloatOptions && this.jigsawFloatOptions.borderType == 'pointer' ? 7 : 0;
        // 调整上下左右位置
        if (this.jigsawFloatPosition === 'topLeft' || this.jigsawFloatPosition === 'topRight' ||
            this.jigsawFloatPosition === 'bottomLeft' || this.jigsawFloatPosition === 'bottomRight') {
            const upDelta = hostRect.height + popupRect.height + differ;
            pos = this._calPositionY(pos, upDelta, popupElement, point, hostRect.height);
            const leftDelta = popupRect.width;
            pos = this._calPositionX(pos, leftDelta, popupElement, point, hostRect.width);
        } else if (this.jigsawFloatPosition === 'leftTop' || this.jigsawFloatPosition === 'rightTop' ||
            this.jigsawFloatPosition === 'leftBottom' || this.jigsawFloatPosition === 'rightBottom') {
            const upDelta = popupRect.height;
            pos = this._calPositionY(pos, upDelta, popupElement, point, hostRect.height);
            const leftDelta = popupRect.width + hostRect.width + differ;
            pos = this._calPositionX(pos, leftDelta, popupElement, point, hostRect.width);
        } else if (this.jigsawFloatPosition === 'top' || this.jigsawFloatPosition === 'bottom') {
            pos.left = Math.max(8 /*安全边距*/, pos.left);
            const upDelta = hostRect.height + popupRect.height + differ;
            pos = this._calPositionY(pos, upDelta, popupElement, point, hostRect.height);
        } else if (this.jigsawFloatPosition === 'left' || this.jigsawFloatPosition === 'right') {
            pos.top = Math.max(8 /*安全边距*/, pos.top);
            const leftDelta = popupRect.width + hostRect.width + differ + 8 /*安全边距*/;
            pos = this._calPositionX(pos, leftDelta, popupElement, point, hostRect.width);
        }
        return pos;
    }

    private _calPositionX(pos, leftDelta, popupElement, point, offsetWidth) {
        if (document.body.clientWidth <= leftDelta) {
            // 可视区域比弹出的UI宽度还小就不要调整了
            return pos;
        }
        const popupRect = popupElement.getBoundingClientRect();
        const totalWidth = window.pageXOffset + document.body.clientWidth;
        // 宿主组件在可视范围外
        const atLeft = this.jigsawFloatPosition == 'topLeft' || this.jigsawFloatPosition == 'bottomLeft' || this.jigsawFloatPosition == 'left';
        const atRight = this.jigsawFloatPosition == 'topRight' || this.jigsawFloatPosition == 'bottomRight' || this.jigsawFloatPosition == 'right';
        if (point.x < 0 && atLeft && leftDelta <= totalWidth - (offsetWidth + point.x)) {
            pos.left += offsetWidth;
        } else if (point.x + offsetWidth > totalWidth && atRight && point.x >= leftDelta) {
            pos.left -= offsetWidth;
        }
        if (pos.left < 0 && pos.left + leftDelta + popupRect.width <= totalWidth) {
            // 左边位置不够且右边位置足够的时候才做调整
            pos.left += leftDelta;
        } else if (pos.left + popupRect.width > totalWidth && pos.left >= leftDelta) {
            // 右边位置不够且左边位置足够的时候才做调整
            pos.left -= leftDelta;
        }
        return pos;
    }

    private _calPositionY(pos, upDelta, popupElement, point, offsetHeight) {
        if (document.body.clientHeight <= upDelta) {
            // 可视区域比弹出的UI高度还小就不要调整了
            return pos;
        }
        const popupRect = popupElement.getBoundingClientRect();
        const totalHeight = window.pageYOffset + document.body.clientHeight;

        // 宿主组件在可视范围外
        const atTop = this.jigsawFloatPosition == 'leftTop' || this.jigsawFloatPosition == 'rightTop' || this.jigsawFloatPosition == 'top';
        const atBottom = this.jigsawFloatPosition == 'leftBottom' || this.jigsawFloatPosition == 'rightBottom' || this.jigsawFloatPosition == 'bottom';
        if (point.y < 0 && atTop && upDelta <= totalHeight - (offsetHeight + point.y)) {
            pos.top += offsetHeight;
        } else if (point.y + offsetHeight > totalHeight && atBottom && point.y >= upDelta) {
            pos.top -= offsetHeight;
        }
        if (pos.top < 0 && pos.top + upDelta + popupRect.height <= totalHeight) {
            // 上位置不够且下方位置足够的时候才做调整
            pos.top += upDelta;
        } else if (pos.top + popupRect.height > totalHeight && pos.top >= upDelta) {
            // 下方位置不够且上方位置足够的时候才做调整
            pos.top -= upDelta;
        }
        return pos;
    }

    /**
     * 立即关闭下拉视图
     * @event 子类有用到
     */
    protected _closeFloat(event?: any): void {
        this._opened = false;
        this._disposePopup();
        this._clearAllListeners();
    }

    private _clearAllListeners() {
        if (this._removeWindowClickHandler) {
            this._removeWindowClickHandler();
            this._removeWindowClickHandler = null;
        }
        if (this._removePopupClickHandler) {
            this._removePopupClickHandler();
            this._removePopupClickHandler = null;
        }
        if (this._removeResizeHandler) {
            this._removeResizeHandler();
            this._removeResizeHandler = null;
        }
        if (this._removeMouseOverHandler) {
            this._removeMouseOverHandler();
            this._removeMouseOverHandler = null;
        }
        if (this._removeMouseOutHandler) {
            this._removeMouseOutHandler();
            this._removeMouseOutHandler = null;
        }
    }
}

@Directive({
    selector: '[jigsaw-float],[j-float],[jigsawFloat]',
    host: {
        '(mouseenter)': "_$openByHover($event)",
        '(mouseleave)': "_$closeByHover($event, 1)",
        '(click)': "_$onHostClick()"
    }
})
export class JigsawFloat extends JigsawFloatBase implements OnDestroy {

    private _closeTrigger: 'click' | 'mouseleave' | 'none' = 'mouseleave';

    /**
     * 打开下拉触发方式，默认值是'mouseleave'
     * $demo = float/trigger
     */
    @Input()
    public get jigsawFloatCloseTrigger(): 'click' | 'mouseleave' | 'none' | DropDownTrigger {
        return this._closeTrigger;
    }

    public set jigsawFloatCloseTrigger(value: 'click' | 'mouseleave' | 'none' | DropDownTrigger) {
        // 从模板过来的值，不会受到类型的约束
        switch (value as any) {
            case DropDownTrigger.none:
            case "none":
                this._closeTrigger = 'none';
                break;
            case DropDownTrigger.click:
            case "click":
                this._closeTrigger = 'click';
                break;
            case DropDownTrigger.mouseleave:
            case "mouseleave":
                this._closeTrigger = 'mouseleave';
                break;
        }
    }

    private _openTrigger: 'click' | 'mouseenter' | 'none' = 'mouseenter';

    /**
     * 打开下拉触发方式，默认值是'mouseenter'
     * $demo = float/trigger
     */
    @Input()
    public get jigsawFloatOpenTrigger(): 'click' | 'mouseenter' | 'none' | DropDownTrigger {
        return this._openTrigger;
    }

    public set jigsawFloatOpenTrigger(value: 'click' | 'mouseenter' | 'none' | DropDownTrigger) {
        // 从模板过来的值，不会受到类型的约束
        switch (value as any) {
            case DropDownTrigger.none:
            case "none":
                this._openTrigger = 'none';
                break;
            case DropDownTrigger.click:
            case "click":
                this._openTrigger = 'click';
                break;
            case DropDownTrigger.mouseenter:
            case "mouseenter":
                this._openTrigger = 'mouseenter';
                break;
        }
    }

    @Input()
    public jigsawFloatArrowElement: any;

    @Input()
    public jigsawFloatInitData: any;

    @Input()
    public jigsawFloatOpen: boolean;

    @Input()
    public jigsawFloatOpenDelay: number = 100;

    @Input()
    public jigsawFloatCloseDelay: number = 400;

    /**
     * $demo = float/option
     */
    @Input()
    public jigsawFloatOptions: PopupOptions;

    /**
     * 一共支持12个位置，其中第一个单词表示弹出视图在触发点的哪个位置，第二个单词控制弹出视图的哪个边缘与触发点对齐，比如'bottomLeft'表示在下面弹出来，
     * 并且视图左侧与触发点左侧对齐。注意，这个位置是应用给的理想位置，在弹出的时候，我们应该使用PopupService的位置修正函数来对理想位置坐修正，
     * 避免视图超时浏览器边界的情况
     * $demo = float/position
     */
    @Input()
    public jigsawFloatPosition: FloatPosition = 'bottomLeft';

    /**
     * $demo = float/target
     */
    @Input()
    public jigsawFloatTarget: Type<IPopupable> | TemplateRef<any>;

    @Output()
    public jigsawFloatOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    public jigsawFloatAnswer = new EventEmitter<any>();

}

@NgModule({
    declarations: [JigsawFloat],
    exports: [JigsawFloat],
    providers: [PopupService]
})
export class JigsawFloatModule {
}
