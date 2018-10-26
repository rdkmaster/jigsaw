import {
    Component, Input, Output, EventEmitter, OnInit, forwardRef, ElementRef, ViewChild,
    Renderer2, ChangeDetectorRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent, IJigsawFormControl} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";

/**
 * @description 开关组件
 *
 * 何时使用
 * 只有两种状态切换时.
 */
@Component({
    selector: 'jigsaw-textarea, j-textarea',
    templateUrl: './textarea.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'maxHeight',
        '[style.line-height]': 'height',
        '[class.jigsaw-textarea]': 'true',
        '[class.jigsaw-textarea-error]': '!valid'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTextarea), multi: true},
    ]
})

export class JigsawTextarea extends AbstractJigsawComponent implements IJigsawFormControl, ControlValueAccessor {


    /**
     * 在文本框里的文本非空时，是否显示快速清除按钮，默认为显示。用户单击了清除按钮时，文本框里的文本立即被清空。
     *
     * $demo = textarea/clearable
     */
    @Input() public clearable: boolean = true;

    /**
     * 设置按钮不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     * $demo = textarea/disabled
     */
    @Input() public disabled: boolean = false;

    /**
     * 当用户输入非法时，组件给予样式上的提示，以提升易用性，常常和表单配合使用。
     *
     * $demo = textarea/valid
     * $demo = form/template-driven
     */
    @Input() public valid: boolean = true;

    @Output('focus')
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

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

    private _value: string = ''; //textarea表单值

    /**
     * 文本框中当前的文本
     *
     * $demo = textarea/valid
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
     * $demo = textarea/value-change
     */
    @Output()
    public valueChange: EventEmitter<string> = new EventEmitter<string>();

    private _placeholder: string = '';

    /**
     * 当文本框内无文本时，显示这些文本以提示用户如何输入。
     *
     * $demo = textarea/valid
     */
    @Input()
    public set placeholder(txt: string) {
        this._placeholder = txt;
    }

    public get placeholder() {
        return this._placeholder;
    }


    @ViewChild('textarea')
    private _textareaElement: ElementRef;

    /**
     * 调用此方法可以通过编程方式使得文本获得焦点。
     * 当确信用户需要在文本框中输入时，自动让文本框获得焦点可以提升体验。
     *
     * $demo = textarea/focus
     */
    public focus() {
        this._focused = true;
        this._textareaElement.nativeElement.focus();
    }

    /**
     * 调用此方法可以通过编程方式选中文本框中的所有文本。
     * 当确信用户需要修改文本框里的文本时，自动选中所有文本可以提升体验。
     *
     * $demo = textarea/select
     */
    public select() {
        this._textareaElement.nativeElement.select();
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
     * $demo = textarea/focus
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

}
