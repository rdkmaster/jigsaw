import {
    NgModule, Component, EventEmitter, Input, Output, ElementRef, ViewChild,
    AfterContentInit, Renderer2, AfterViewChecked, ChangeDetectorRef, forwardRef
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent, IJigsawFormControl} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";

/**
 * 单行输入框组件，常常用于接收用户的文本输入。
 *
 * 支持前后置图标，且每个图标都可交互，[参考demo]($demo=input/icons)。
 *
 * 这是一个表单友好组件。
 *
 * $demo = input/full
 */
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

    /**
     * 在文本框里的文本非空时，是否显示快速清除按钮，默认为显示。用户单击了清除按钮时，文本框里的文本立即被清空。
     *
     * $demo = input/clearable
     */
    @Input() public clearable: boolean = true;

    /**
     * 设置按钮不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     * $demo = input/disabled
     */
    @Input() public disabled: boolean = false;

    /**
     * 当用户输入非法时，组件给予样式上的提示，以提升易用性，常常和表单配合使用。
     *
     * $demo = input/valid
     * $demo = form/template-driven
     */
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

    /**
     * 文本框中当前的文本
     *
     * $demo = input/valid
     */
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

    /**
     * 当文本框中的文本发生变化时，组件会发出此事件。
     *
     * $demo = input/value-change
     */
    @Output()
    public valueChange: EventEmitter<string> = new EventEmitter<string>();

    private _placeholder: string = '';

    /**
     * 当文本框内无文本时，显示这些文本以提示用户如何输入。
     *
     * $demo = input/valid
     */
    @Input()
    public set placeholder(txt: string) {
        this._placeholder = txt;
    }

    public get placeholder() {
        return this._placeholder;
    }


    @ViewChild('input')
    private _inputElement: ElementRef;

    /**
     * 调用此方法可以通过编程方式使得文本获得焦点。
     * 当确信用户需要在文本框中输入时，自动让文本框获得焦点可以提升体验。
     *
     * $demo = input/focus
     */
    public focus() {
        this._focused = true;
        this._inputElement.nativeElement.focus();
    }

    /**
     * 调用此方法可以通过编程方式选中文本框中的所有文本。
     * 当确信用户需要修改文本框里的文本时，自动选中所有文本可以提升体验。
     *
     * $demo = input/select
     */
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

    /**
     * 获取文本框是否有焦点
     *
     * $demo = input/focus
     */
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

    /**
     * 在单击了清除文本按钮时，是否让文本失去焦点，默认为失去焦点。
     * 一般来说，是否失去焦点关系不大，但是在一些特定场合，却有很大关系。`JigsawTable`的默认单元格编辑渲染就是`JigsawInput`组件，
     * 按照`JigsawTable`的交互逻辑，单元格编辑器一旦失去焦点，就必须退回到单元格显示渲染器。
     * 在这个情况下，用户单击了清除文本按钮时就不能让输入框失去焦点。参考[这个demo]($demo=table/update-column-define)的职位列
     *
     * $demo = table/update-column-define
     */
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
        });
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
