import {AbstractJigsawComponent} from "../../common/common";
import {ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";

export class JigsawInputBase extends AbstractJigsawComponent {

    constructor(protected _elementRef: ElementRef) {
        super();
    }

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
    protected _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @Output('blur')
    protected _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    protected _propagateChange: any = () => {
    };

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

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


    @ViewChild('input', {static: false})
    protected _inputElement: ElementRef;

    /**
     * 让输入框获取焦点的函数
     */
    public focus() {
        this._focused = true;
        this._inputElement.nativeElement.focus();
    }

    /**
     * 让输入框文本选中的函数
     */
    public select() {
        this._inputElement.nativeElement.select();
    }

    protected _focused: boolean = false;

    public get focused(): boolean {
        return this._focused;
    }

    /**
     * @internal
     */
    public handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
    }

    @Input()
    public blurOnClear: boolean = true;

    /**
     * @internal
     */
    public handleBlur(event: FocusEvent) {
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
    public stopPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }


    /**
     * @internal
     */
    public inputPaddingStyle: {};


    /**
     * 动态计算 input的padding-left 和padding-right (不确定图标的个数, 好空出对应的位置.)
     * 当前计算方法根据图标的个数计算, 默认图标大小为12px , dom大小获取的不准确.
     *
     */
    public setInputPaddingStyle() {
        let prefixIconWidth = this._elementRef.nativeElement.querySelector(".jigsaw-input-icon-front").offsetWidth;
        let endIconWidth = this._elementRef.nativeElement.querySelector(".jigsaw-input-icon-end").offsetWidth;

        let prefixIconPadding = prefixIconWidth + 10;
        if (prefixIconWidth !== 0) {
            prefixIconPadding = prefixIconPadding + 8;
        }

        let endPadding = endIconWidth + 8;

        this.inputPaddingStyle = {
            "padding-left": prefixIconPadding + "px",
            "padding-right": endPadding + "px"
        };
    }

}
