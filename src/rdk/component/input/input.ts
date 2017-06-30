import {
    NgModule, Component, EventEmitter, Input, Output, ContentChildren, Directive, QueryList,
    ElementRef, ViewChild, AfterContentInit, Renderer2, AfterViewChecked, ChangeDetectorRef
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AbstractRDKComponent} from "../core";
import {Observable} from "rxjs/Observable";

@Directive({selector: '[rdk-prefix-icon]'})
export class RdkPrefixIcon {
}

@Component({
    selector: 'rdk-input',
    templateUrl: 'input.html',
    styleUrls: ['input.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '(click)': '_stopPropagation($event)'
    }
})
export class RdkInput extends AbstractRDKComponent implements AfterContentInit, AfterViewChecked {
    private _value: string | number; //input表单值
    public _$longIndent: boolean = false;
    private _focused: boolean;
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();


    constructor(private _render2: Renderer2,
                private _elementRef: ElementRef,
                private _changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    //input form表单值
    @Input()
    public get value(): string | number {
        return this._value;
    }

    public set value(newValue: string | number) {
        if (this._value != newValue) {
            this._value = newValue;
            this.valueChange.emit(newValue);
        }
    }

    @Output() public valueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

    @Input() public clearable: boolean = true;

    private _placeholder:string='';
    @Input()
    public set placeholder(txt:string) {
        this._placeholder = txt;
    }

    public get placeholder() {
        return this._placeholder;
    }

    @Output('blur')
    get onBlur(): Observable<FocusEvent> {
        return this._blurEmitter.asObservable();
    }

    @Output('focus')
    get onFocus(): Observable<FocusEvent> {
        return this._focusEmitter.asObservable();
    }

    @ContentChildren(RdkPrefixIcon) _iconFront: QueryList<RdkPrefixIcon> = null;

    @ViewChild('input') _inputElement: ElementRef;

    public focus() {
        this._inputElement.nativeElement.focus();
    }

    private _clearValue(event): void {
        this.value = null;
    }

    public _$handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
    }

    public _$handleBlur(event: FocusEvent) {
        this._focused = false;
        this._blurEmitter.emit(event);
    }

    private _stopPropagation(event){
        event.preventDefault();
        event.stopPropagation();
    }

    public _$inputPaddingStyle: {};

    /**
     * 动态计算 input的padding-left 和padding-right (不确定图标的个数, 好空出对应的位置.)
     * 当前计算方法根据图标的个数计算, 默认图标大小为12px , dom大小获取的不准确.
     * @private
     */
    private _setInputPaddingStyle() {
        let prefixIconWidth = this._elementRef.nativeElement.querySelector(".rdk-input-icon-front").offsetWidth;
        let endIconWidth = this._elementRef.nativeElement.querySelector(".rdk-input-icon-end").offsetWidth;

        let prefixIconPadding = prefixIconWidth + 4;
        if(prefixIconWidth !== 0) {
            prefixIconPadding = prefixIconPadding + 8;
        }

        let endPadding = endIconWidth + 8;

        this._$inputPaddingStyle = {
            "padding-left": prefixIconPadding + "px",
            "padding-right": endPadding + "px"
        }

        this._changeDetectorRef.detectChanges();
    }

    ngAfterContentInit() {
        this._iconFront && this._iconFront.length ? this._$longIndent = true : null;
        setTimeout(() => {
            this._render2.setStyle(this._elementRef.nativeElement, 'opacity', 1);
        }, 0);
    }

    ngAfterViewChecked() {
        this._setInputPaddingStyle();
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [RdkInput, RdkPrefixIcon],
    exports: [RdkInput, RdkPrefixIcon],
})
export class RdkInputModule {

}


