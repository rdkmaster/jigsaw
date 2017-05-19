/**
 * Created by 10177553 on 2017/4/10.
 */

import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    TemplateRef
} from '@angular/core';
import {
    PopupDisposer, PopupInfo, PopupOptions, PopupPositionType, PopupService
} from 'rdk/service/popup.service';
import {AbstractRDKComponent} from '../core';
import {TagGroupValue} from '../tag/tag';
import {CommonUtils} from "../../core/utils/common-utils";
export type DropdownInputValue = TagGroupValue;
export enum DropDownTrigger {
    click,
    mouseenter,
    mouseleave,
}

@Component({
    selector: 'rdk-drop-down',
    templateUrl: 'dropdown.html',
    styleUrls: ['dropdown.scss']
})
export class RdkDropDown extends AbstractRDKComponent implements OnDestroy, OnInit {
    private _disposePopup: PopupDisposer;
    private _popupElement: HTMLElement;
    private _removeWindowClickHandler: Function;
    private _removePopupClickHandler: Function;
    private _removeMouseoverHandler: Function;
    private _removeMouseoutHandler: Function;

    constructor(private _render: Renderer2,
                private _elementRef: ElementRef,
                private _popupService: PopupService) {
        super();
    }

    private _value: any[] = [];

    @Input()
    public get value(): any[] {
        return this._value;
    }

    public set value(value: any[]) {
        this._value = value;
        this.valueChange.emit(this._value);
        this._autoWidth();
    }

    @Output() public valueChange = new EventEmitter<any[]>();

    @Input() public labelField: string = 'label';

    @Output()
    public select = new EventEmitter<any>();

    /*@Output()
    public remove = new EventEmitter<any>();*/

    @Input()
    public placeholder: string;

    @Input()
    public disabled: boolean;

    public _trigger: DropDownTrigger = DropDownTrigger.click;
    @Input()
    public get trigger() {
        return this._trigger;
    }

    public set trigger(value: DropDownTrigger) {
        this._trigger = value;
    }

    private _openTrigger: DropDownTrigger = DropDownTrigger.mouseenter;
    @Input()
    public get openTrigger(): DropDownTrigger {
        return this._openTrigger;
    }

    public set openTrigger(value: DropDownTrigger) {
        this._openTrigger = value;
    }

    private _closeTrigger: DropDownTrigger = DropDownTrigger.mouseleave;
    @Input()
    public get closeTrigger(): DropDownTrigger {
        return this._closeTrigger;
    }

    public set closeTrigger(value: DropDownTrigger) {
        this._closeTrigger = value;
    }

    /*private _dropDownWidth: string;
    @Input()
    public get dropDownWidth(): string {
        return this._dropDownWidth;
    };

    public set dropDownWidth(width) {
        this._dropDownWidth = width;
    }*/
    @Input()
    public dropDownWidth: string;

    private _contentTemplateRef: TemplateRef<any>;

    @Input()
    public get pane(): TemplateRef<any> {
        return this._contentTemplateRef;
    };

    public set pane(ref: TemplateRef<any>) {
        this._contentTemplateRef = ref;
    }

    private _$opened: boolean = false;

    @Input()
    public get open(): boolean {
        return this._$opened;
    }

    public set open(value: boolean) {
        if (value === this._$opened) {
            return;
        }
        setTimeout(() => {
            if (this.initialized) {
                if (value) {
                    this._openDropDown();
                } else {
                    this._closeDropDown();
                }
                this._$opened = value;
                this.openChange.emit(value);
            }
        }, 0);
    }

    @Output()
    public openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    private autoCloseDropDown: boolean;

    @Input()
    autoWidth: boolean;

    private _removeTag(tag){
        const index = this.value.indexOf(tag);
        if(index != -1){
            this.value.splice(index, 1);
            this.value = <any[]>CommonUtils.shallowCopy(this.value);
        }
        this._autoWidth();
    }

    private _autoWidth(){
        setTimeout(() => {
            if(this.autoWidth){
                if(this._popupElement){
                    this._render.setStyle(this._popupElement, 'width', this._elementRef.nativeElement.offsetWidth + 'px');
                }
            }
        }, 0)
    }

    private _timeout: any = null;
    private _isSafeCloseTime: boolean = true;

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
            size: {width: this.dropDownWidth ? this.dropDownWidth : this._elementRef.nativeElement.offsetWidth}
        };
        const popupInfo: PopupInfo = this._popupService.popup(this._contentTemplateRef, option);
        this._popupElement = popupInfo.element;
        this._disposePopup = () => {
            popupInfo.dispose()
        };
        PopupService.setBackground(this._popupElement, this._render);

        if (this._openTrigger === DropDownTrigger.mouseenter && this._popupElement) {
            this._removeMouseoverHandler = this._render.listen(this._popupElement, 'mouseenter', () => {
                if (this._timeout) {
                    clearTimeout(this._timeout);
                    this._timeout = null;
                }
            });
        }
        if (this._closeTrigger === DropDownTrigger.mouseleave && this._popupElement) {
            this._removeMouseoutHandler = this._render.listen(this._popupElement, 'mouseleave', () => {
                if (!this._timeout) {
                    this._timeout = setTimeout(() => {
                        this.open = false;
                    }, 200);
                }
            });
        }

        if(!this.autoCloseDropDown){
            this._removePopupClickHandler = this._render.listen(this._popupElement, 'click', event => {
                event.stopPropagation();
                event.preventDefault();
            });
        }
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
        if (this._removeMouseoverHandler) {
            this._removeMouseoverHandler();
            this._removeMouseoverHandler = null;
        }
        if (this._removeMouseoutHandler) {
            this._removeMouseoutHandler();
            this._removeMouseoutHandler = null;
        }
    }

    //TODO 后续再优化：所有组件，凡是html模板中用到的变量&方法，都以 _$ 开头。
    //TODO 因为上次用--prod编译的时候，好像报在html模板中不能用private变量，因此用下划线开头。
    //TODO 对于那些变量&方法，即在html模板中用到，又需要暴露给应用的，则额外再定义一个非 _$ 开头的变量or方法暴露出去。
    private _$openDropDownByClick(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._openTrigger === DropDownTrigger.mouseenter && this.open && !this._isSafeCloseTime){
            return;
        }else{
            this.open = !this.open;
        }
    }

    private _$openDropDownByHover(event): void {
        if (this._openTrigger !== DropDownTrigger.mouseenter) return;
        event.preventDefault();
        event.stopPropagation();
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        this.open = true;
        this._isSafeCloseTime = false;
        setTimeout(() => {
            this._isSafeCloseTime = true
        }, 400)
    }

    private _$closeDropDownByHover(event) {
        if (this.closeTrigger !== DropDownTrigger.mouseleave) return;
        event.preventDefault();
        event.stopPropagation();
        if (!this._timeout) {
            this._timeout = setTimeout(() => {
                this.open = false;
            }, 200);
        }
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        this.open = false;
    }
}
