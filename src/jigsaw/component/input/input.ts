import {
    NgModule, Component, EventEmitter, Input, Output, ElementRef, ViewChild,
    AfterContentInit, Renderer2, AfterViewChecked, ChangeDetectorRef, forwardRef
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent, IJigsawFormControl} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";

@Component({
    selector: 'jigsaw-input, j-input',
    templateUrl: 'input.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '(click)': '_$stopPropagation($event)',
        '[class.jigsaw-input]': 'true',
        '[class.jigsaw-input-error]': '!valid'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawInput), multi: true},
    ]
})
export class JigsawInput extends AbstractJigsawComponent
    implements IJigsawFormControl, ControlValueAccessor, AfterContentInit, AfterViewChecked {

    @Input() public clearable: boolean = true;
    @Input() public disabled: boolean = false;
    @Input() public valid: boolean = true;

    @Output('focus')
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @Output('blur')
    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    constructor(private _render2: Renderer2,
                private _elementRef: ElementRef,
                private _changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    private _propagateChange: any = () => {
    };

    public writeValue(value: any): void {
        if (CommonUtils.isUndefined(value)) {
            return;
        }
        this._value = value.toString();
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    private _value: string = ''; //input表单值

    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(newValue: string) {
        if (CommonUtils.isUndefined(newValue) || this._value === newValue) {
            return;
        }
        this._value = newValue;
        this.valueChange.emit(this._value);
        this._propagateChange(this._value);
    }

    @Output()
    public valueChange: EventEmitter<string> = new EventEmitter<string>();

    private _placeholder: string = '';

    @Input()
    public set placeholder(txt: string) {
        this._placeholder = txt;
    }

    public get placeholder() {
        return this._placeholder;
    }


    @ViewChild('input')
    private _inputElement: ElementRef;

    public focus() {
        this._focused = true;
        this._inputElement.nativeElement.focus();
    }

    public select() {
        this._inputElement.nativeElement.select();
    }

    /**
     * @internal
     */
    public _$clearValue(event): void {
        this.value = '';
        this.focus();
    }

    private _focused: boolean = false;

    public get focused(): boolean {
        return this._focused;
    }

    /**
     * @internal
     */
    public _$handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
    }

    @Input()
    public blurOnClear: boolean = true;

    /**
     * @internal
     */
    public _$handleBlur(event: FocusEvent) {
        this._focused = false;
        if (this.blurOnClear) {
            this._blurEmitter.emit(event);
        } else {
            this.callLater(() => {
                if (!this._focused) {
                    this._blurEmitter.emit(event);
                }
            }, 150);
        }
    }

    /**
     * @internal
     */
    public _$stopPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * @internal
     */
    public _$inputPaddingStyle: {};

    /**
     * 动态计算 input的padding-left 和padding-right (不确定图标的个数, 好空出对应的位置.)
     * 当前计算方法根据图标的个数计算, 默认图标大小为12px , dom大小获取的不准确.
     * @private
     */
    private _setInputPaddingStyle() {
        let prefixIconWidth = this._elementRef.nativeElement.querySelector(".jigsaw-input-icon-front").offsetWidth;
        let endIconWidth = this._elementRef.nativeElement.querySelector(".jigsaw-input-icon-end").offsetWidth;

        let prefixIconPadding = prefixIconWidth + 10;
        if (prefixIconWidth !== 0) {
            prefixIconPadding = prefixIconPadding + 8;
        }

        let endPadding = endIconWidth + 8;

        this._$inputPaddingStyle = {
            "padding-left": prefixIconPadding + "px",
            "padding-right": endPadding + "px"
        };

        this._changeDetectorRef.detectChanges();
    }

    ngAfterContentInit() {
        this.callLater(() => {
            this._render2.setStyle(this._elementRef.nativeElement, 'opacity', 1);
        }, 0);
    }

    ngAfterViewChecked() {
        this._setInputPaddingStyle();
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawInput],
    exports: [JigsawInput],
})
export class JigsawInputModule {

}


