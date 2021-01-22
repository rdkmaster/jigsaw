import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Injector, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent, IJigsawFormControl} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

/**
 * @description 多行输入框组件，常常用于接收用户的文本输入
 *
 * 这是一个表单友好组件
 */
@Component({
    selector: 'jigsaw-textarea, j-textarea',
    templateUrl: './textarea.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-textarea]': 'true',
        '[class.jigsaw-textarea-error]': '!valid',
        '[class.jigsaw-textarea-disabled]': 'disabled'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTextarea), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class JigsawTextarea extends AbstractJigsawComponent implements IJigsawFormControl, ControlValueAccessor {
    /**
     * 在文本框里的文本非空时，是否显示快速清除按钮，默认为显示。用户单击了清除按钮时，文本框里的文本立即被清空。
     *
     * $demo = textarea/clearable
     */
    @RequireMarkForCheck()
    @Input()
    public clearable: boolean = true;

    /**
     * 设置按钮不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     * @NoMarkForCheckRequired
     *
     * $demo = textarea/disabled
     */
    @Input()
    public disabled: boolean = false;

    /**
     * 当用户输入非法时，组件给予样式上的提示，以提升易用性，常常和表单配合使用。
     *
     * @NoMarkForCheckRequired
     *
     * $demo = textarea/valid
     * $demo = form/template-driven
     */
    @Input()
    public valid: boolean = true;

    @Output() public blur: EventEmitter<Event> = new EventEmitter<Event>();

    @Output('focus')
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    constructor(
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
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
     * $demo = textarea/valid
     */
    @RequireMarkForCheck()
    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(newValue: string) {
        if (CommonUtils.isUndefined(newValue) || this._value === newValue) {
            return;
        }

        if (!isNaN(this.maxLength) && this.maxLength > 0) {
            // 只有合法的正整数才计算限制字符数
            newValue = this._updateValue(newValue);
            this._$currentLength = this.includesCRLF ? newValue.length : this._getLengthWithoutCRLF(newValue);
        }

        this._propagateChange(newValue);
        if (this.initialized && (this.maxLength === 0 || (this.maxLength !== 0 && this._value !== newValue))) {
            // 长度为0说明无字符数限制；或者就是在有字符数限制，但是值改变的时候
            this.valueChange.emit(newValue);
        }
        this._value = newValue;
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
    @RequireMarkForCheck()
    public set placeholder(txt: string) {
        this._placeholder = txt;
    }

    public get placeholder() {
        return this._placeholder;
    }

    /**
     * 设置多行文本框字数，是否包含回车换行符
     * true：表示字数包含换行符
     * false：表示字数不包含换行符。
     *
     * @NoMarkForCheckRequired
     *
     * $demo = textarea/max-length
     */
    @Input()
    public includesCRLF: boolean = false;

    /**
     * @internal
     */
    public _$currentLength: number = 0;

    private _maxLength: number = 0;

    /**
     * 最大字数
     *
     * @NoMarkForCheckRequired
     *
     * $demo = textarea/max-length
     */
    @Input()
    public get maxLength(): number {
        return this._maxLength;
    }

    public set maxLength(value: number) {
        if (isNaN(value) || value < 0) {
            console.error('maxLength property must be a non-negative number, please input a number or number string');
            return;
        }
        this._maxLength = Number(value);
    }

    private _updateValue(value: string): string {
        if (this.includesCRLF) {
            value = value.substring(0, this._maxLength);
        } else {
            // 换行符和回车符不计入字符数
            const textLength = this._getLengthWithoutCRLF(value);
            if (textLength > this._maxLength) {
                value = this._getValue(value);
            }
        }
        this._textareaElement.nativeElement.value = value;
        return value;
    }

    private _getLengthWithoutCRLF(value: string): number {
        const newLines = value.match(/(\r\n|\n|\r)/g);
        const lineLen = newLines ? newLines.length : 0;
        return value.length - lineLen;
    }

    private _getValue(value: string): string {
        let tempValue = value.substring(0, this._maxLength);
        const newLines = tempValue.match(/(\r\n|\n|\r)/g);
        if (newLines) {
            // 存在换行符
            let position = this._maxLength;
            for (let i = 0; i < newLines.length; i++) {
                const char = value.charAt(position + i);
                tempValue += char;
                if (char.match(/(\r\n|\n|\r)/g)) {
                    // 换行符，不算个数
                    i--;
                    position++
                }
            }
        }
        return tempValue;
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
    public _$clearValue(): void {
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

    /**
     * @internal
     */
    public _$handleBlur($event: FocusEvent) {
        this._focused = false;
        this.blur.emit($event)
    }
}
