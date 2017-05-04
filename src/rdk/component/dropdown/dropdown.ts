/**
 * Created by 10177553 on 2017/4/10.
 */

import {
    Component,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    Input,
    Output,
    EventEmitter,
    Renderer2,
    ViewChild,
    TemplateRef,
    ElementRef
} from '@angular/core';
import {PopupService, PopupDisposer} from "rdk/service/popup.service";

export enum DropDownMode {
    single,
    multiple
}

export enum DropDownTrigger {
    click,
    hover
}

@Component({
    selector: 'rdk-drop-down',
    templateUrl: 'dropdown.html',
    styleUrls: ['dropdown.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class RdkDropDown implements OnInit, OnDestroy {
    constructor(private _render: Renderer2,
                private _popupService: PopupService,
                private _elementRef: ElementRef) {
    }

    private _value: string | Array<any>;

    @Input()
    public get value() {
        return this._value;
    }

    public set value(value) {
        this._handleShowValue(value);
        this._value = value;
    }

    @Input()
    public labelField: string = 'label';

    private _showValue: string | Array<any>[] = '';

    private _isArray: boolean = false;

    private _handleShowValue(value) {
        if (typeof value === 'string') {
            this._showValue = value;
        } else if (value instanceof Array) { // 数组或者对象.
            this._showValue = '';
            this._isArray = true;
        } else  if (value instanceof Object){ // 对象
            this._showValue = value[this.labelField];
        }else{
            return;
        }
    }

    // TODO 对外事件，通过popup暴露不了
    /**
     * 对外值变化事件.
     * @type {EventEmitter<string|Array<any>>}
     */
    @Output()
    public change = new EventEmitter<string | Array<any>>(); // 双向绑定

    @Input()
    public placeholder: string;

    @Input()
    public disabled: boolean;

    @Input()
    public mode: DropDownMode = DropDownMode.single;

    public _trigger: DropDownTrigger = DropDownTrigger.click;
    @Input()
    public get trigger() {
        return this._trigger;
    }

    public set trigger(value: DropDownTrigger) {

        this._trigger = value;
    }

    private _dropDownWidth: string;

    @Input()
    public get dropDownWidth(): string {
        return this._dropDownWidth;
    };

    public set dropDownWidth(width) {
        this._dropDownWidth = width;
    }

    private _PopupDisposer: PopupDisposer;
    @ViewChild("dropdowntcontent", {read: ElementRef}) dropdowntcontent: ElementRef;
    private _contentTemplateRef: TemplateRef<any>;

    @Input()
    public get pane(): TemplateRef<any> {
        return this._contentTemplateRef;
    };

    public set pane(ref: TemplateRef<any>) {
        this._contentTemplateRef = ref;

    }

    private _hasContent: boolean = false;
    @Input()
    public get hasContent() {
        return this._hasContent;
    }

    public set hasContent(value: boolean) {
        this._hasContent = value;
    }

    private _toggleClick() {
        event.preventDefault();
        event.stopPropagation();
        this._checkContent();
        this._hasContent = !this._hasContent;
        console.log(this._hasContent)
    }

    public _checkContent() {
        if (this._hasContent == true && typeof this._PopupDisposer === "function") {
            this._PopupDisposer();
        } else if (this._hasContent == true && typeof this._PopupDisposer !== "function") {
            this._PopupDisposer = this._popupService.popup(this._contentTemplateRef, null, this._dropDownWidth, this.dropdowntcontent, this._render);
        } else if (this._hasContent == false && typeof this._PopupDisposer === "function") {
            this._PopupDisposer();
            this._PopupDisposer = this._popupService.popup(this._contentTemplateRef, null, this._dropDownWidth, this.dropdowntcontent, this._render);
        } else if (this._hasContent == false && typeof this._PopupDisposer !== "function") {
            this._PopupDisposer = this._popupService.popup(this._contentTemplateRef, null, this._dropDownWidth, this.dropdowntcontent, this._render);
        }
    }

    private _hoverHandle(): void {
        if (this._trigger === DropDownTrigger.click) return;
        this._checkContent();
        this._hasContent = !this._hasContent;
    }

    public open() {
        this._hasContent = true;
    }

    public close() {
        this._hasContent = false;
    }

    ngOnInit() {
        //TODO 阻止click冒泡事件可以实现autoCloseDropDown这一属性
        this._render.listen('window', 'click', () => {
            if (this._hasContent == true) {
                this._checkContent();
                this._hasContent = !this._hasContent;
            }
        })

        if (this._hasContent) {
            this._PopupDisposer = this._popupService.popup(this._contentTemplateRef, null, this._dropDownWidth, this.dropdowntcontent, this._render);
            this._hasContent = !this._hasContent;
        }
    }

    ngOnDestroy() {
        if (this._PopupDisposer) this._PopupDisposer();
    }
}
