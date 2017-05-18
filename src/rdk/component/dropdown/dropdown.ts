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
    TemplateRef,
    ViewChild
} from '@angular/core';
import {
    PopupDisposer, PopupInfo, PopupOptions, PopupPositionType, PopupService
} from 'rdk/service/popup.service';
import {AbstractRDKComponent} from '../core';
import {TagGroupValue} from '../tag/tag';
export type DropdownInputValue = TagGroupValue;
export enum DropDownTrigger {
    click,
    mouseover,
    mouseout,
}

@Component({
    selector: 'rdk-drop-down',
    templateUrl: 'dropdown.html',
    styleUrls: ['dropdown.scss']
})
export class RdkDropDown extends AbstractRDKComponent implements OnDestroy, OnInit {
    private _disposePopup: PopupDisposer;
    private _popupElement: HTMLElement;
    private _removeClickHandler: Function;
    private _removeMouseoverHandler: Function;
    private _removeMouseoutHandler: Function;

    constructor(private _render: Renderer2,
                private _elementRef: ElementRef,
                private _popupService: PopupService) {
        super();
    }

    private _value: DropdownInputValue = null;

    @Input()
    public get value(): DropdownInputValue {
        return this._value;
    }

    public set value(value: DropdownInputValue) {
        this._value = value;
        this.valueChange.emit(this._value);
    }

    @Output() public valueChange = new EventEmitter<DropdownInputValue>();

    @Input() public labelField: string = 'label';

    @Output()
    public select = new EventEmitter<any>();

    @Output()
    public remove = new EventEmitter<any>();

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

    private _openTrigger: DropDownTrigger = DropDownTrigger.mouseover;
    @Input()
    public get openTrigger(): DropDownTrigger {
        return this._openTrigger;
    }

    public set openTrigger(value: DropDownTrigger) {
        this._openTrigger = value;
    }

    private _closeTrigger: DropDownTrigger = DropDownTrigger.mouseout;
    @Input()
    public get closeTrigger(): DropDownTrigger {
        return this._closeTrigger;
    }

    public set closeTrigger(value: DropDownTrigger) {
        this._closeTrigger = value;
    }

    private _dropDownWidth: string;
    @Input()
    public get dropDownWidth(): string {
        return this._dropDownWidth;
    };

    public set dropDownWidth(width) {
        this._dropDownWidth = width;
    }

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
        return !!this._disposePopup && !!this._popupElement;
    }

    public set open(value: boolean) {
        if (value === this.open) {
            return;
        }
        if (!this.initialized) {
            console.warn('not initialized yet, call this later!');
            return;
        }
        if (value) {
            this._openDropDown();
        } else {
            this._closeDropDown();
        }
    }

    private _timeout: any = null;

    private _openDropDown(): void {
        if (this.open) {
            return;
        }

        this._$opened = true; 

        //TODO 阻止click冒泡事件可以实现autoCloseDropDown这一属性
        if (this._closeTrigger === DropDownTrigger.click) {
            this._removeClickHandler = this._render.listen('window', 'click', () => this._closeDropDown());
        }

        const option: PopupOptions = {
            pos: this._elementRef,
            posType: PopupPositionType.absolute,
            posOffset: {
                top: this._elementRef.nativeElement.offsetHeight
            },
            size: {width: Number(this._elementRef.nativeElement.offsetWidth)}
        };
        const popupInfo: PopupInfo = this._popupService.popup(this._contentTemplateRef, option);
        this._popupElement = popupInfo.element;
        this._disposePopup = () => {
            popupInfo.dispose()
        };
        PopupService.setBackground(this._popupElement, this._render);

        if (this._openTrigger === DropDownTrigger.mouseover && this._popupElement) {
            this._removeMouseoverHandler = this._render.listen(this._popupElement, 'mouseover', () => {
                if (this._timeout) {
                    clearTimeout(this._timeout);
                    this._timeout = null;
                }
            });
        }
        if (this._closeTrigger === DropDownTrigger.mouseout && this._popupElement) {
            this._removeMouseoutHandler = this._render.listen(this._popupElement, 'mouseout', () => {
                if (!this._timeout) {
                    this._timeout = setTimeout(() => {
                        this._closeDropDown();
                    }, 400);
                }
            });

        }
    }

    private _closeDropDown(): void {
        if (this._removeClickHandler) {
            this._removeClickHandler();
            this._removeClickHandler = null;
        }
        if (this._disposePopup) {
            this._disposePopup();
            this._disposePopup = null;
        }

        if (this._removeMouseoverHandler) {
            this._removeMouseoverHandler();
            this._removeMouseoverHandler = null;
        }
        if (this._removeMouseoutHandler) {
            this._removeMouseoutHandler();
            this._removeMouseoutHandler = null;
        }
        this._$opened = false;
    }

    //TODO 后续再优化：所有组件，凡是html模板中用到的变量&方法，都以 _$ 开头。
    //TODO 因为上次用--prod编译的时候，好像报在html模板中不能用private变量，因此用下划线开头。
    //TODO 对于那些变量&方法，即在html模板中用到，又需要暴露给应用的，则额外再定义一个非 _$ 开头的变量or方法暴露出去。
    private _$openDropDownByClick() {
        if (this._openTrigger !== DropDownTrigger.click) return;
        event.preventDefault();
        event.stopPropagation();
        this._openDropDown();
    }

    private _$openDropDownByHover(): void {
        if (this._openTrigger !== DropDownTrigger.mouseover) return;
        event.preventDefault();
        event.stopPropagation();
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._openDropDown();
            this._timeout = null;
        } else {
            this._openDropDown();
        }
    }

    private _$closeDropDownByHover() {
        if (this.closeTrigger !== DropDownTrigger.mouseout) return;
        event.preventDefault();
        event.stopPropagation();
        if (!this._timeout) {
            this._timeout = setTimeout(() => {
                this._closeDropDown();
            }, 200);
        }
    }

    public ngOnInit() {

    }

    ngOnDestroy() {
        this._closeDropDown();

    }
}
