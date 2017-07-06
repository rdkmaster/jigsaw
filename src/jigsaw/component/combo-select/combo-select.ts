import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    TemplateRef,
    ViewChild
} from "@angular/core";
import {
    PopupDisposer,
    PopupInfo,
    PopupOptions,
    PopupPositionType,
    PopupPositionValue,
    PopupService
} from "../../service/popup.service";
import {AbstractJigsawComponent} from "../core";
import {CallbackRemoval} from "../../core/data/component-data";
import {ArrayCollection} from "../../core/data/array-collection";
export enum DropDownTrigger {
    click,
    mouseenter,
    mouseleave,
}

export class ComboSelectValue {
    [index: string]: any;
    closable?: boolean;
}

@Component({
    selector: 'jigsaw-combo-select',
    templateUrl: 'combo-select.html',
    styleUrls: ['combo-select.scss'],
    host: {
        '[style.min-width]': 'width',
    }
})
export class JigsawComboSelect extends AbstractJigsawComponent implements OnDestroy, OnInit {
    private _disposePopup: PopupDisposer;
    private _popupElement: HTMLElement;
    private _removeWindowClickHandler: Function;
    private _removePopupClickHandler: Function;
    private _removeMouseOverHandler: Function;
    private _removeMouseOutHandler: Function;
    private _removeRefreshCallback: CallbackRemoval;

    constructor(private _render: Renderer2,
                private _elementRef: ElementRef,
                private _popupService: PopupService) {
        super();
    }

    private _value: ArrayCollection<ComboSelectValue> = new ArrayCollection();

    @Input()
    public get value(): ArrayCollection<ComboSelectValue> {
        return this._value;
    }

    public set value(value: ArrayCollection<ComboSelectValue>) {
        if (this._value === value || !(value instanceof ArrayCollection)) {
            return;
        }
        if (this._value != value) {
            this._value = value;
            this.valueChange.emit(this._value);
            this._autoWidth();

            if (this._removeRefreshCallback) {
                this._removeRefreshCallback()
            }
            this._removeRefreshCallback = value.onRefresh(() => {
                this.valueChange.emit(this._value);
                this._autoWidth();
            });
        }
    }

    @Output() public valueChange = new EventEmitter<any[]>();

    @Input() public labelField: string = 'label';

    @Output()
    public select = new EventEmitter<any>();

    @Output()
    public remove = new EventEmitter<any>();

    @Input()
    public placeholder: string;

    private _disabled: boolean;
    @Input()
    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(value: boolean) {
        this._disabled = value;
        if (value) {
            this.open = false;
        }
    }

    private _openTrigger: DropDownTrigger = DropDownTrigger.mouseenter;
    @Input()
    public get openTrigger(): DropDownTrigger {
        return this._openTrigger;
    }

    public set openTrigger(value: DropDownTrigger) {
        //从模板过来的值，不会受到类型的约束
        this._openTrigger = typeof value === 'string' ? DropDownTrigger[<string>value] : value;
    }

    private _closeTrigger: DropDownTrigger = DropDownTrigger.mouseleave;
    @Input()
    public get closeTrigger(): DropDownTrigger {
        return this._closeTrigger;
    }

    public set closeTrigger(value: DropDownTrigger) {
        //从模板过来的值，不会受到类型的约束
        this._closeTrigger = typeof value === 'string' ? DropDownTrigger[<string>value] : value;
    }

    @ViewChild('dropContent')
    private _contentTemplateRef: TemplateRef<any>;

    public _$opened: boolean = false;

    @Input()
    public get open(): boolean {
        return this._$opened;
    }

    public set open(value: boolean) {
        if (value === this._$opened && !this.initialized) {
            return;
        }
        setTimeout(() => {
            if (value) {
                this._openDropDown();
            } else {
                this._closeDropDown();
            }
            this._$opened = value;
            this.openChange.emit(value);
        }, 0);
    }

    @Output()
    public openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    public autoClose: boolean; //自动关闭dropdown

    @Input()
    public autoWidth: boolean; //自动同步dropdown宽度，与combo-select宽度相同

    public _$removeTag(tag) {
        const index = this.value.indexOf(tag);
        if (index != -1) {
            this.value.splice(index, 1);
            this.value.refresh();
            this.remove.emit(tag);
        }
        this._autoWidth();
    }

    private _autoWidth() {
        if (!this.autoWidth || !this._popupElement) {
            return;
        }
        setTimeout(() => {
            this._render.setStyle(this._popupElement, 'width', this._elementRef.nativeElement.offsetWidth + 'px');
        }, 0);
    }

    private _rollOutDenouncesTimer: any = null;

    private _openDropDown(): void {
        if (this._$opened) {
            return;
        }

        this._removeWindowClickHandler = this._render.listen('window', 'click', () => {
            this.open = false
        });

        const option: PopupOptions = {
            pos: this._elementRef,
            posType: PopupPositionType.absolute,
            posOffset: {
                top: this._elementRef.nativeElement.offsetHeight
            },
            posReviser: (pos: PopupPositionValue, popupElement: HTMLElement): PopupPositionValue => {
                const upDelta = this._elementRef.nativeElement.offsetHeight + popupElement.offsetHeight;
                if (document.body.clientHeight <= upDelta) {
                    //可视区域比弹出的UI高度还小就不要调整了
                    return pos;
                }

                const needHeight = pos.top + popupElement.offsetHeight;
                const totalHeight = document.body.scrollTop + document.body.clientHeight;
                if (needHeight >= totalHeight && pos.top > upDelta) {
                    //下方位置不够且上方位置足够的时候才做调整
                    pos.top -= upDelta;
                }
                return pos;
            },
            size: {
                minWidth: this.width ? this.width : 240
            }
        };
        const popupInfo: PopupInfo = this._popupService.popup(this._contentTemplateRef, option);

        this._popupElement = popupInfo.element;
        this._disposePopup = popupInfo.dispose;
        PopupService.setBackground(this._popupElement, this._render);

        if (this._openTrigger === DropDownTrigger.mouseenter && this._popupElement) {
            this._removeMouseOverHandler = this._render.listen(this._popupElement, 'mouseenter', () => {
                if (this._rollOutDenouncesTimer) {
                    clearTimeout(this._rollOutDenouncesTimer);
                    this._rollOutDenouncesTimer = null;
                }
            });
        }
        if (this._closeTrigger === DropDownTrigger.mouseleave && this._popupElement) {
            this._removeMouseOutHandler = this._render.listen(this._popupElement, 'mouseleave', () => {
                if (!this._rollOutDenouncesTimer) {
                    this._rollOutDenouncesTimer = setTimeout(() => {
                        this.open = false;
                    }, 200);
                }
            });
        }

        //点击dropdown，自动关闭dropdown，主要用于单选的情况
        if (!this.autoClose) {
            this._removePopupClickHandler = this._render.listen(this._popupElement, 'click', event => {
                event.stopPropagation();
                event.preventDefault();
            });
        }

        //同步dropdown宽度
        this._autoWidth();
    }

    private _closeDropDown(): void {
        if (this._disposePopup) {
            this._disposePopup();
            this._disposePopup = null;
        }
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

    public _$openAndCloseByClick(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._openTrigger === DropDownTrigger.mouseenter && this.open) {
            return;
        }
        this.open = !this.open;
    }

    private _$tagClick(tagItem) {
        // 阻止事件冒泡;
        event.preventDefault();
        event.stopPropagation();

        // 返回选中的tag
        this.select.emit(tagItem);

        // 控制下拉状态;(如果没有打开下拉内容，下拉，如果已经下拉保持不变;)
        if (this._openTrigger === DropDownTrigger.mouseenter || this.open || this.disabled) return;

        this.open = true;
    }

    public _$openByHover(event): void {
        if (this._openTrigger !== DropDownTrigger.mouseenter) return;
        event.preventDefault();
        event.stopPropagation();
        if (this._rollOutDenouncesTimer) {
            clearTimeout(this._rollOutDenouncesTimer);
            this._rollOutDenouncesTimer = null;
        }
        this.open = true;
    }

    public _$closeByHover(event) {
        if (this.closeTrigger !== DropDownTrigger.mouseleave) return;
        event.preventDefault();
        event.stopPropagation();
        if (!this._rollOutDenouncesTimer) {
            this._rollOutDenouncesTimer = setTimeout(() => {
                this.open = false;
            }, 200);
        }
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    public ngOnDestroy() {
        this.open = false;

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
        this._rollOutDenouncesTimer = null;
    }

}
