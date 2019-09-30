import {
    NgModule, Component, EventEmitter, Input, Output, ElementRef, ViewChild,
    AfterContentInit, Renderer2, forwardRef
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent, IJigsawFormControl} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {JigsawInputBase} from "./input-base";

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
        '(click)': 'stopPropagation($event)',
        '[class.jigsaw-input]': 'true',
        '[class.jigsaw-input-error]': '!valid',
        '[class.jigsaw-input-focused]': 'focused',
        '[class.jigsaw-input-disabled]': 'disabled'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawInput), multi: true},
    ]
})
export class JigsawInput extends JigsawInputBase
    implements IJigsawFormControl, ControlValueAccessor, AfterContentInit {

    /**
     * 在文本框里的文本非空时，是否显示快速清除按钮，默认为显示。用户单击了清除按钮时，文本框里的文本立即被清空。
     *
     * $demo = input/clearable
     */
    @Input() public clearable: boolean = true;

    /**
     * 当用户设置类型为password时，输入内容隐藏为特殊字符。
     *
     * $demo = input/password
     */
    @Input() public password: boolean = false;

    @Input()
    public get type(): string {
        return this.password ? "password" : "text";
    }

    constructor(protected _render2: Renderer2,
                protected _elementRef: ElementRef) {
        super(_elementRef);
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

        if (this.clearable && ((newValue != '' && this._value == '') || (newValue == '' && this._value != ''))) {
            this.callLater(() => this.setInputPaddingStyle());
        }
        this._value = newValue;
        this.valueChange.emit(this._value);
        this._propagateChange(this._value);
    }

    /**
     * @internal
     */
    public clearValue(): void {
        this.value = '';
        this.focus();
    }

    public writeValue(value: any): void {
        if (CommonUtils.isUndefined(value)) {
            return;
        }
        this._value = value.toString();
    }

    /**
     * 当文本框中的文本发生变化时，组件会发出此事件。
     *
     * $demo = input/value-change
     */
    @Output()
    public valueChange: EventEmitter<string> = new EventEmitter<string>();

    ngAfterContentInit() {
        this.callLater(() => {
            this._render2.setStyle(this._elementRef.nativeElement, 'opacity', 1);
            this.setInputPaddingStyle();
        });
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawInput],
    exports: [JigsawInput],
})
export class JigsawInputModule {

}
