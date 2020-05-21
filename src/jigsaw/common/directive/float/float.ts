import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    Renderer2,
    TemplateRef,
    Type
} from "@angular/core";
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
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {AffixUtils} from "../../core/utils/internal-utils";

export enum DropDownTrigger {
    click,
    mouseenter,
    mouseleave,
    none,
}

export type FloatPosition = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' |
    'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export class JigsawFloatBase extends AbstractJigsawViewBase implements OnDestroy {
    protected _removeWindowClickHandler: Function;
    protected _floatOpenDelay = 100;
    protected _floatCloseDelay = 400;

    private _disposePopup: PopupDisposer;
    private _removePopupClickHandler: Function;
    private _removeMouseOverHandler: Function;
    private _removeMouseOutHandler: Function;
    private _removeResizeHandler: Function;
    private _removeRefreshCallback: CallbackRemoval;
    private _rollOutDenouncesTimer: any = null;
    private _rollInDenouncesTimer: any = null;
    private _$target: Type<IPopupable> | TemplateRef<any>;
    private _popupElement: HTMLElement;

    public get popupElement(): HTMLElement {
        return this._popupElement;
    }

    /**
     * @internal
     */
    public jigsawFloatInitData: any;

    /**
     * @internal
     */
    public get jigsawFloatTarget(): Type<IPopupable> | TemplateRef<any> {
        return this._$target;
    }

    public set jigsawFloatTarget(value: Type<IPopupable> | TemplateRef<any>) {
        if (this._$target != value) {
            this._$target = value;
            if (this._opened == true) {
                this._closeFloat();
                this.callLater(() => {
                    this._openFloat();
                });
            }
        }
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
        this._opened = value;
        this.callLater(() => {
            // toggle open 外部控制时，用异步触发变更检查
            // 初始化open，等待组件初始化后执行
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

    constructor(protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                protected _popupService: PopupService) {
        super();
    }

    public openFloat(): void {
        if (this._disposePopup) {
            return;
        }
        this._openFloat();
        this._opened = true;
        this.jigsawFloatOpenChange.emit(this._opened);
    }

    public closeFloat(): void {
        if (!this._disposePopup) {
            return;
        }
        this._closeFloat();
        this._opened = false;
        this.jigsawFloatOpenChange.emit(this._opened);
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.jigsawFloatOpen = false;
        this._$target = null;
        this._clearAllListeners();

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
            this._removeRefreshCallback = null;
        }

        this._popupElement = null;
        if (this._disposePopup) {
            this._disposePopup();
            this._disposePopup = null;
        }
    }

    /**
     * 弹出的视图在用户交互过程中，有可能发生尺寸变化，有可能造成位置错误
     * 此时通过调用这个方法可以重新定位弹出视图的位置
     */
    public reposition(): void {
        if (this._popupElement) {
            this._popupService.setPosition(this._getPopupOption(), this._popupElement);
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
        }, this._floatOpenDelay);
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
        const currentIndex = popups.indexOf(popups.find(p => p.element === this._popupElement));
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
                this._closeFloat(event);
            }, this._floatCloseDelay);
        }
    }

    protected _mouseInPopup(mouseEvent: MouseEvent, element: HTMLElement): boolean {
        return mouseEvent.clientX >= element.offsetLeft && mouseEvent.clientX < element.offsetLeft + element.offsetWidth
            && mouseEvent.clientY >= element.offsetTop && mouseEvent.clientY < element.offsetTop + element.offsetHeight;
    }

    /**
     * @internal
     */
    public _$onHostClick() {
        if (this.jigsawFloatOpenTrigger == 'click' && this.jigsawFloatOpen == false) {
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

    protected _closeByWindowClick() {
        this.closeFloat();
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
        this._removeWindowClickHandler();
        this._removeWindowClickHandler = null;
        if (this._removeResizeHandler) {
            this._removeResizeHandler();
            this._removeResizeHandler = null;
        }
        this._closeFloat(event);
    }

    /**
     * 立即弹出下拉视图，请注意不要重复弹出，此方法没有做下拉重复弹出的保护
     */
    protected _openFloat(): PopupInfo {
        if (!this.jigsawFloatTarget) {
            return;
        }
        this._opened = true;
        if (this._removeWindowClickHandler) {
            this._removeWindowClickHandler();
        }
        // 点击window时，自动关闭,但当closeTrigger为none时无法关掉的
        this._removeWindowClickHandler = this._renderer.listen('window', 'click', (event) => this._onWindowClick(event));

        const option: PopupOptions = this._getPopupOption();
        const popupInfo = this._popupService.popup(this.jigsawFloatTarget as any, option, this.jigsawFloatInitData);
        this._popupElement = popupInfo.element;
        this._disposePopup = popupInfo.dispose;
        popupInfo.dispose = this.closeFloat.bind(this);
        if (!this._popupElement) {
            console.error('unable to popup drop down, unknown error!');
            return popupInfo;
        }

        if (option.borderType == 'pointer') {
            setTimeout(() => this._setArrow(this._popupElement));
        }

        if (!this._removeMouseOverHandler) {
            this._removeMouseOverHandler = this._renderer.listen(
                this._popupElement, 'mouseenter',
                () => this.clearCallLater(this._rollOutDenouncesTimer));
        }
        if (this.jigsawFloatCloseTrigger == 'mouseleave' && !this._removeMouseOutHandler) {
            this._removeMouseOutHandler = this._renderer.listen(
                this._popupElement, 'mouseleave', event => this._$closeByHover(event));
        }

        // 阻止点击行为冒泡到window
        if (this._removePopupClickHandler) {
            this._removePopupClickHandler();
        }
        this._removePopupClickHandler = this._renderer.listen(this._popupElement, 'click', event => {
            event.stopPropagation();
            event.preventDefault();
        });

        // 监听window的resize事件，自动更新位置
        if (this._removeResizeHandler) {
            this._removeResizeHandler();
        }
        this._removeResizeHandler = this._renderer.listen("window", "resize", () => {
                PopupService.instance.setPosition(this._getPopupOption(), this._popupElement);
                if (option.borderType == 'pointer') {
                    this._popupElement.removeChild(this._popupElement.children[this._popupElement.children.length - 1]);
                    this._setArrow(this._popupElement);
                }
            });
        return popupInfo;
    }

    private _getPos(): PopupPoint {
        let point = this._getHostElementPos();
        const differ = this.jigsawFloatOptions && this.jigsawFloatOptions.borderType == 'pointer' ? 7 : 0;
        switch (this.jigsawFloatPosition) {
            case 'bottomLeft':
                point.y += this._elementRef.nativeElement.offsetHeight + differ;
                break;
            case 'bottomRight':
                point.x += this._elementRef.nativeElement.offsetWidth;
                point.y += this._elementRef.nativeElement.offsetHeight + differ;
                break;
            case 'topRight':
                point.x += this._elementRef.nativeElement.offsetWidth;
                break;
            case 'leftBottom':
                point.y += this._elementRef.nativeElement.offsetHeight;
                break;
            case 'rightTop':
                point.x += this._elementRef.nativeElement.offsetWidth + differ;
                break;
            case 'rightBottom':
                point.x += this._elementRef.nativeElement.offsetWidth + differ;
                point.y += this._elementRef.nativeElement.offsetHeight;
                break;
        }
        return point;
    }

    private _getHostElementPos() {
        let point = new PopupPoint();
        if (this.jigsawFloatOptions && this.jigsawFloatOptions.posType == PopupPositionType.fixed) {
            // 获取触发点相对于视窗的位置
            const tempRect = this._elementRef.nativeElement.getBoundingClientRect();
            point.y = tempRect.top;
            point.x = tempRect.left;
        } else {
            point.y = AffixUtils.offset(this._elementRef.nativeElement).top;
            point.x = AffixUtils.offset(this._elementRef.nativeElement).left;
        }
        return point;
    }

    // 被弹出的控件高度宽度，在弹出之前并不知道，故要再控件位置微调时加入进去
    private _changePosByFloatPosition(pos: PopupPositionValue, popupElement: HTMLElement) {
        switch (this.jigsawFloatPosition) {
            case 'bottomRight':
                pos.left -= popupElement.offsetWidth;
                break;
            case 'topLeft':
                pos.top -= popupElement.offsetHeight;
                break;
            case 'topRight':
                pos.top -= popupElement.offsetHeight;
                pos.left -= popupElement.offsetWidth;
                break;
            case 'rightBottom':
                pos.top -= popupElement.offsetHeight;
                break;
            case 'leftTop':
                pos.left -= popupElement.offsetWidth;
                break;
            case 'leftBottom':
                pos.left -= popupElement.offsetWidth;
                pos.top -= popupElement.offsetHeight;
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
        const hostPosition = this._getHostElementPos();
        const position: PopupPoint = {x: Math.round(hostPosition.x), y: Math.round(hostPosition.y)}
        const host = this._elementRef.nativeElement;
        let ele = document.createElement('div');
        // 根据tooltip尖角算出来大概在5√2，约为7px
        ele.style.width = '7px';
        ele.style.height = '7px';
        ele.style.position = 'absolute';
        ele.style.transform = 'rotateZ(-45deg)';
        ele.style.backgroundColor = 'inherit';

        if (popupElement.offsetTop >= position.y + host.offsetHeight) {
            ele.style.top = '-4px';
            if (popupElement.offsetTop - position.y - host.offsetHeight < 7) {
                popupElement.style.top = 7 + position.y + host.offsetHeight + 'px';
            }
            ele.style.left = this._getLeft(host, popupElement, position) + 'px';
            if (options.showBorder) {
                ele.style.borderTop = "1px solid #dcdcdc";
                ele.style.borderRight = "1px solid #dcdcdc";
            }
        } else if (popupElement.offsetTop + popupElement.offsetHeight <= position.y) {
            const differ = options.showBorder ? 5 : 3;
            ele.style.top = popupElement.offsetHeight - differ + 'px';
            if (position.y - popupElement.offsetTop - popupElement.offsetHeight < 7) {
                popupElement.style.top = position.y - 7 - popupElement.offsetHeight + 'px';
            }
            ele.style.left = this._getLeft(host, popupElement, position) + 'px';
            if (options.showBorder) {
                ele.style.borderLeft = "1px solid #dcdcdc";
                ele.style.borderBottom = "1px solid #dcdcdc";
            }
        } else if (popupElement.offsetLeft >= position.x + host.offsetWidth) {
            ele.style.left = '-4px';
            if (popupElement.offsetLeft - position.x - host.offsetWidth < 7) {
                popupElement.style.left = position.x + host.offsetWidth + 7 + 'px';
            }
            ele.style.top = this._getTop(host, popupElement, position) + 'px';
            if (options.showBorder) {
                ele.style.borderTop = "1px solid #dcdcdc";
                ele.style.borderLeft = "1px solid #dcdcdc";
            }
        } else if (popupElement.offsetLeft + popupElement.offsetWidth <= position.x) {
            ele.style.left = popupElement.offsetWidth - 3 + 'px';
            if (position.x - popupElement.offsetLeft - popupElement.offsetWidth < 7) {
                popupElement.style.left = position.x - popupElement.offsetWidth - 7 + 'px';
            }
            ele.style.top = this._getTop(host, popupElement, position) + 'px';
            if (options.showBorder) {
                ele.style.borderRight = "1px solid #dcdcdc";
                ele.style.borderBottom = "1px solid #dcdcdc";
            }
        }
        popupElement.appendChild(ele);
    }

    private _getLeft(host: HTMLElement, popupElement: HTMLElement, position: PopupPoint): number {
        let delta = position.x + host.offsetWidth / 2 - popupElement.offsetLeft - 5;
        if (delta < 4) {
            delta = 4;
        } else if (delta > popupElement.offsetWidth - 13) {
            delta = popupElement.offsetWidth - 13;
        }
        return delta;
    }

    private _getTop(host: HTMLElement, popupElement: HTMLElement, position: PopupPoint): number {
        let delta = position.y + host.offsetHeight / 2 - popupElement.offsetTop - 5;
        if (delta < 4) {
            delta = 4;
        } else if (delta > popupElement.offsetHeight - 13) {
            delta = popupElement.offsetHeight - 13;
        }
        return delta;
    }

    /**
     * 计算弹层区域的位置，当指定的方向位置不够，且反向弹位置足够时，那么反向弹层
     */
    private _positionReviser(pos: PopupPositionValue, popupElement: HTMLElement): PopupPositionValue {
        const offsetWidth = this._elementRef.nativeElement.offsetWidth;
        const offsetHeight = this._elementRef.nativeElement.offsetHeight;
        const point = this._getHostElementPos();
        const differ = this.jigsawFloatOptions && this.jigsawFloatOptions.borderType == 'pointer' ? 7 : 0;
        // 调整上下左右位置
        if (this.jigsawFloatPosition === 'topLeft' || this.jigsawFloatPosition === 'topRight' ||
            this.jigsawFloatPosition === 'bottomLeft' || this.jigsawFloatPosition === 'bottomRight') {
            const upDelta = offsetHeight + popupElement.offsetHeight + differ;
            pos = this._calPositionY(pos, upDelta, popupElement, point, offsetHeight);
            const leftDelta = popupElement.offsetWidth;
            pos = this._calPositionX(pos, leftDelta, popupElement, point, offsetWidth);
        } else {
            const upDelta = popupElement.offsetHeight;
            pos = this._calPositionY(pos, upDelta, popupElement, point, offsetHeight);
            const leftDelta = popupElement.offsetWidth + offsetWidth + differ;
            pos = this._calPositionX(pos, leftDelta, popupElement, point, offsetWidth);
        }
        return pos;
    }

    private _calPositionX(pos, leftDelta, popupElement, point, offsetWidth) {
        if (document.body.clientWidth <= leftDelta) {
            // 可视区域比弹出的UI宽度还小就不要调整了
            return pos;
        }
        const totalWidth = window.pageXOffset + document.body.clientWidth;
        // 宿主组件在可视范围外
        if (point.x < 0 && (this.jigsawFloatPosition === 'topLeft' || this.jigsawFloatPosition === 'bottomLeft') && leftDelta <= totalWidth - (offsetWidth + point.x)) {
            pos.left += offsetWidth;
        } else if (point.x + offsetWidth > totalWidth && (this.jigsawFloatPosition === 'topRight' || this.jigsawFloatPosition === 'bottomRight') && point.x >= leftDelta) {
            pos.left -= offsetWidth;
        }
        if (pos.left < 0 && pos.left + leftDelta + popupElement.offsetWidth <= totalWidth) {
            // 左边位置不够且右边位置足够的时候才做调整
            pos.left += leftDelta;
        } else if (pos.left + popupElement.offsetWidth > totalWidth && pos.left >= leftDelta) {
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
        const totalHeight = window.pageYOffset + document.body.clientHeight;

        // 宿主组件在可视范围外
        if (point.y < 0 && (this.jigsawFloatPosition === 'leftTop' || this.jigsawFloatPosition === 'rightTop') && upDelta <= totalHeight - (offsetHeight + point.y)) {
            pos.top += offsetHeight;
        } else if (point.y + offsetHeight > totalHeight && (this.jigsawFloatPosition === 'leftBottom' || this.jigsawFloatPosition === 'rightBottom') && point.y >= upDelta) {
            pos.top -= offsetHeight;
        }
        if (pos.top < 0 && pos.top + upDelta + popupElement.offsetHeight <= totalHeight) {
            // 上位置不够且下方位置足够的时候才做调整
            pos.top += upDelta;
        } else if (pos.top + popupElement.offsetHeight > totalHeight && pos.top >= upDelta) {
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
        if (this._disposePopup) {
            this._disposePopup();
            this._disposePopup = null;
        }
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
    constructor(protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                protected _popupService: PopupService) {
        super(_renderer, _elementRef, _popupService);
    }

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
    public jigsawFloatInitData: any;

    @Input()
    public jigsawFloatOpen: boolean;

    /**
     * $demo = float/option
     */
    @Input()
    public jigsawFloatOptions: PopupOptions;

    /**
     * 一共8个位置，其中第一个单词表示弹出视图在触发点的哪个位置，第二个单词控制弹出视图的哪个边缘与触发点对齐，比如'bottomLeft'表示在下面弹出来，
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

}
