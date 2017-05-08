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
import {PopupService, PopupDisposer, PopupOptions, PopupPositionType} from "rdk/service/popup.service";
import {AbstractRDKComponent} from "../core";


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
export class RdkDropDown extends AbstractRDKComponent implements OnDestroy {
    @ViewChild("dropDownContainer", {read: ElementRef})
    private _dropDownContainer: ElementRef;
    private _disposePopup: PopupDisposer;
    private _removeClickHandler:Function;

    constructor(private _render: Renderer2,
                private _elementRef: ElementRef,
                private _popupService: PopupService) {
        super();
    }

    private _value: Array<{[index:string]:any}>;

    @Input()
    public get value():Array<{[index:string]:any}> {
        return this._value;
    }

    public set value(value:Array<{[index:string]:any}>) {
        this._value = value;
    }

    @Input()
    public labelField: string = 'label';

    // TODO 对外事件，通过popup暴露不了
    /**
     * 对外值变化事件.
     * @type {EventEmitter<string|Array<any>>}
     */
    @Output()
    public change = new EventEmitter<any>(); // 双向绑定

    private _$tagClickHandler(item):void {
        this.change.emit(item);
    }

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

    @Input()
    public get open():boolean {
        return !!this._removeClickHandler && !!this._disposePopup;
    }

    public set open(value: boolean) {
        if (value == this.open) {
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

    private _openDropDown():void {
        if (this.open) {
            return;
        }

        //TODO 阻止click冒泡事件可以实现autoCloseDropDown这一属性
        this._removeClickHandler = this._render.listen('window', 'click', () => this._closeDropDown());

        const option:PopupOptions = {
            pos: this._dropDownContainer, posType: PopupPositionType.absolute,
            posOffset: {
                top: this._dropDownContainer.nativeElement.offsetHeight
            },
            size: {width: this._elementRef.nativeElement.offSetWidth, height: this._elementRef.nativeElement.offSetHeight}
        };
        this._disposePopup = this._popupService.popup(this._contentTemplateRef, option);
    }

    private _closeDropDown():void {
        if (this._removeClickHandler) {
            this._removeClickHandler();
            this._removeClickHandler = null;
        }
        if (this._disposePopup) {
            this._disposePopup();
            this._disposePopup = null;
        }
    }

    //TODO 后续再优化：所有组件，凡是html模板中用到的变量&方法，都以 _$ 开头。
    //TODO 因为上次用--prod编译的时候，好像报在html模板中不能用private变量，因此用下划线开头。
    //TODO 对于那些变量&方法，即在html模板中用到，又需要暴露给应用的，则额外再定义一个非 _$ 开头的变量or方法暴露出去。
    private _$openDropDownByClick() {
        event.preventDefault();
        event.stopPropagation();
        this._openDropDown();
    }

    private _$openDropDownByHover(): void {
        if (this._trigger === DropDownTrigger.click) return;
        // this._checkContent();
        // this._isOpen = !this._isOpen;
    }

    ngOnDestroy() {
        if (this._disposePopup) {
            this._disposePopup();
            this._disposePopup = null;
        }
    }
}
