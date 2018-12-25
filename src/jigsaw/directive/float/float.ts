import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, TemplateRef, Type} from "@angular/core";
import {
    IPopupable,
    PopupDisposer,
    PopupOptions,
    PopupPoint,
    PopupPositionType,
    PopupPositionValue,
    PopupService
} from "../../service/popup.service";
import {AbstractJigsawViewBase} from "../../component/common";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {AffixUtils} from "../../core/utils/internal-utils";

export enum FloatTrigger {
    click,
    mouseenter,
    mouseleave,
    none,
}

@Directive({
    selector: '[jigsaw-float],[j-float],[jigsawFloat]',
    host: {
        '(mouseenter)': "_$openByHover($event)",
        '(mouseleave)': "_$closeByHover($event)",
        '(click)': "_$openAndCloseByClick($event)"
    }
})
export class JigsawFloat extends AbstractJigsawViewBase implements OnInit, OnDestroy {
    private _disposePopup: PopupDisposer;
    private _popupElement: HTMLElement;
    private _removeWindowClickHandler: Function;
    private _removePopupClickHandler: Function;
    private _removeMouseOverHandler: Function;
    private _removeMouseOutHandler: Function;
    private _removeRefreshCallback: CallbackRemoval;
    private _rollOutDenouncesTimer: any = null;
    private _rollInDenouncesTimer: any = null;
    private _$target: Type<IPopupable> | TemplateRef<any>;

    @Input()
    public get jigsawFloatTarget(): Type<IPopupable> | TemplateRef<any> {
        return this._$target;
    }

    public set jigsawFloatTarget(value: Type<IPopupable> | TemplateRef<any>) {
        if(this._$target!=value){
            this._$target = value;
            this.jigsawFloatTargetChange.emit(value);
            if (this._$opened == true) {
                this._$opened = false
                this._closeFloat();
                this.callLater(() => {
                    this._openFloat();
                    this._$opened = true
                })
            }
        }
    }

    @Output()
    public jigsawFloatTargetChange: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    public jigsawFloatOptions: PopupOptions;

    // 一共8个位置，其中第一个单词表示弹出视图在触发点的哪个位置，第二个单词控制弹出视图的哪个边缘与触发点对齐，比如'bottomLeft'表示在下面弹出来，
    // 并且视图左侧与触发点左侧对齐。注意，这个位置是应用给的理想位置，在弹出的时候，我们应该使用PopupService的位置修正函数来对理想位置坐修正，
    // 避免视图超时浏览器边界的情况
    @Input()
    public jigsawFloatPosition: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' |
        'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'

    /**
     * @internal
     */
    private _$opened: boolean = false;

    @Input()
    public get jigsawFloatOpen(): boolean {
        return this._$opened;
    }

    public set jigsawFloatOpen(value: boolean) {
        this.callLater(() => {
            // toggle open 外部控制时，用异步触发变更检查
            // 初始化open，等待组件初始化后执行
            if (value) {
                this._openFloat();
            } else {
                this._closeFloat();
            }
            this._$opened = value;
            this.jigsawFloatOpenChange.emit(value);
        });
    }

    @Output()
    public jigsawFloatOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    private _openTrigger: FloatTrigger = FloatTrigger.mouseenter; // 打开下拉触发方式，默认值是'mouseenter'
    @Input()
    public get jigsawFloatOpenTrigger(): FloatTrigger {
        return this._openTrigger;
    }

    public set jigsawFloatOpenTrigger(value: FloatTrigger) {
        // 从模板过来的值，不会受到类型的约束
        this._openTrigger = typeof value === 'string' ? FloatTrigger[<string>value] : value;
    }

    private _closeTrigger: FloatTrigger = FloatTrigger.mouseleave; // 打开下拉触发方式，默认值是'mouseleave'
    @Input()
    public get jigsawFloatCloseTrigger(): FloatTrigger {
        return this._closeTrigger;
    }

    public set jigsawFloatCloseTrigger(value: FloatTrigger) {
        // 从模板过来的值，不会受到类型的约束
        this._closeTrigger = typeof value === 'string' ? FloatTrigger[<string>value] : value;
    }

    constructor(private _renderer: Renderer2,
                private _elementRef: ElementRef,
                private _popupService: PopupService) {
        super();
    }

    ngOnInit() {
        console.log(this.jigsawFloatOpenTrigger);
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.jigsawFloatOpen = false;
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
     * @internal
     */
    public _$openByHover(event): void {
        this.clearCallLater(this._rollOutDenouncesTimer);

        if (this.jigsawFloatOpenTrigger != FloatTrigger.mouseenter) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        this._rollInDenouncesTimer = this.callLater(() => {
            this.jigsawFloatOpen = true;
        }, 100);
    }

    /**
     * @internal
     */
    public _$closeByHover(event) {
        this.clearCallLater(this._rollInDenouncesTimer);
        if (this.jigsawFloatCloseTrigger != FloatTrigger.mouseleave) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this._rollOutDenouncesTimer = this.callLater(() =>
                this.jigsawFloatOpen = false
            , 400);
    }

    /**
     * @internal
     */
    public _$openAndCloseByClick(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._openTrigger == FloatTrigger.click && this.jigsawFloatOpen == false) {
            this.jigsawFloatOpen = true;
        }
        if (this._closeTrigger == FloatTrigger.click && this.jigsawFloatOpen == true) {
            this.jigsawFloatOpen = false;
        }
    }

    private _openFloat(): void {
        if (this._$opened) {
            return;
        }

        if (this._removeWindowClickHandler) {
            this._removeWindowClickHandler();
        }
        // 点击window时，自动关闭,但当closeTrigger为none时无法关掉的
        this._removeWindowClickHandler = this._renderer.listen('window', 'click', () => {
            if (this.jigsawFloatCloseTrigger != FloatTrigger.none) {
                this._removeWindowClickHandler();
                this._removeWindowClickHandler = null;
                this.jigsawFloatOpen = false;
            }
        });

        const option: PopupOptions = this._getPopupOption();
        const popupInfo = this._popupService.popup(this.jigsawFloatTarget as any, option);
        this._popupElement = popupInfo.element;
        this._disposePopup = popupInfo.dispose;

        if (!this._popupElement) {
            console.error('unable to popup drop down, unknown error!');
            return;
        }

        if (!this._removeMouseOverHandler) {
            this._removeMouseOverHandler = this._renderer.listen(
                this._popupElement, 'mouseenter',
                () => this.clearCallLater(this._rollOutDenouncesTimer));
        }
        if (this._closeTrigger == FloatTrigger.mouseleave && !this._removeMouseOutHandler) {
            this._removeMouseOutHandler = this._renderer.listen(
                this._popupElement, 'mouseleave', () => {
                    this._rollOutDenouncesTimer = this.callLater(() => this.jigsawFloatOpen = false, 400);
                });
        }

        // 阻止点击行为冒泡到window
        this._removePopupClickHandler = this._renderer.listen(this._popupElement, 'click', event => {
            event.stopPropagation();
            event.preventDefault();
        });


    }

    private _getPos(): PopupPoint {
        let point = new PopupPoint();
        point.y = AffixUtils.offset(this._elementRef.nativeElement).top;
        point.x = AffixUtils.offset(this._elementRef.nativeElement).left;
        window['jigsawFloatTarget'] = this.jigsawFloatTarget;
        switch (this.jigsawFloatPosition) {
            case 'bottomRight':
                point.x += this._elementRef.nativeElement.offsetWidth;
                break;
            case 'topLeft':
                point.y -= this._elementRef.nativeElement.offsetHeight;
                break;
            case 'topRight':
                point.y -= this._elementRef.nativeElement.offsetHeight;
                point.x += this._elementRef.nativeElement.offsetWidth;
                break;
            case 'rightTop':
                point.x += this._elementRef.nativeElement.offsetWidth;
                point.y -= this._elementRef.nativeElement.offsetHeight;
                break;
            case 'rightBottom':
                point.x += this._elementRef.nativeElement.offsetWidth;
                break;
            case 'leftTop':
                point.y -= this._elementRef.nativeElement.offsetHeight;
                break;
        }
        return point;
    }

    // 被弹出的控件高度宽度，在弹出之前并不知道，故要再控件位置微调时加入进去
    private changePosByFloatPosition(pos: PopupPositionValue, popupElement: HTMLElement) {
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

    private _getPopupOption(): PopupOptions {

        let option: any = {};

        const calc: any = {
            pos: this._getPos(),
            posType: PopupPositionType.absolute,
            posOffset: {
                top: this._elementRef.nativeElement.offsetHeight
            },
            posReviser: (pos: PopupPositionValue, popupElement: HTMLElement): PopupPositionValue => {
                this.changePosByFloatPosition(pos, popupElement)
                return pos;
            },
            size: {
                minWidth: this._elementRef.nativeElement.offsetWidth
            }
        };
        Object.assign(option, calc)
        if (this.jigsawFloatOptions) {
            Object.assign(option, this.jigsawFloatOptions);
            if (CommonUtils.isDefined(this.jigsawFloatOptions.modal)) {
                console.warn('modal can not be set')
                option.modal = false;
            }
            if (CommonUtils.isDefined(this.jigsawFloatOptions.pos)) {
                console.warn('pos can not be set')
                option.pos = calc.pos;
            }
        }
        return option;
    }

    private _closeFloat(): void {
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
