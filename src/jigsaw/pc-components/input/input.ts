import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    NgModule,
    NgZone,
    Output,
    ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent, IJigsawFormControl} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {JigsawPrefixSuffixModule} from "./prefix-suffix-widget";
import {GroupOptionValue} from "../list-and-tile/group-common";

type BorderRadiusValue = {
    'border-top-left-radius'?: number, 'border-bottom-left-radius'?: number,
    'border-top-right-radius'?: number, 'border-bottom-right-radius'?: number
}

@Directive()
export abstract class JigsawInputBase extends AbstractJigsawComponent implements IJigsawFormControl, ControlValueAccessor {
    protected constructor(protected _cdr: ChangeDetectorRef, protected _injector: Injector, protected _zone?: NgZone) {
        super(_zone);
    }

    /**
     * 在文本框里的文本非空时，是否显示快速清除按钮，默认为显示。用户单击了清除按钮时，文本框里的文本立即被清空。
     *
     * $demo = input/clearable
     */
    @RequireMarkForCheck()
    @Input()
    public clearable: boolean = true;

    /**
     * 设置按钮不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     * $demo = input/disabled
     */
    @RequireMarkForCheck()
    @Input()
    public disabled: boolean = false;

    /**
     * 当用户输入非法时，组件给予样式上的提示，以提升易用性，常常和表单配合使用。
     *
     * $demo = input/valid
     * $demo = form/template-driven
     */
    @RequireMarkForCheck()
    @Input()
    public valid: boolean = true;

    @Output('focus')
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @Output('blur')
    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    private _propagateChange: any = () => {
    };

    public writeValue(value: any): void {
        if (CommonUtils.isUndefined(value)) {
            return;
        }
        this._value = value.toString();
        this._cdr.markForCheck();
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
    @RequireMarkForCheck()
    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(newValue: string) {
        newValue = CommonUtils.isUndefined(newValue) ? '' : newValue;
        if (this._value === newValue) {
            return;
        }
        this._value = newValue;
        this._propagateChange(this._value);
        if (this.initialized) {
            this.valueChange.emit(this._value);
        }
    }

    /**
     * 当文本框中的文本发生变化时，组件会发出此事件。
     *
     * $demo = input/value-change
     */
    @Output()
    public valueChange: EventEmitter<string> = new EventEmitter<string>();

    /**
     * 当文本框内无文本时，显示这些文本以提示用户如何输入。
     *
     * $demo = input/valid
     */
    @Input()
    @RequireMarkForCheck()
    public placeholder: string = '';

    protected _focused: boolean = false;

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
     * @NoMarkForCheckRequired
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
    public _$preIcon: string[];

    /**
     * @NoMarkForCheckRequired
     *
     * $demo = input/icons
     */
    @Input()
    public set preIcon(value: string | string[]) {
        this._$preIcon = typeof value == 'string' ? [value] : value;
    }

    /**
     * @internal
     */
    public _$icon: string[];

    /**
     * @NoMarkForCheckRequired
     *
     * $demo = input/icons
     */
    @Input()
    public set icon(value: string | string[]) {
        this._$icon = typeof value == 'string' ? [value] : value;
    }

    /**
     * $demo = input/icons
     */
    @Output()
    public preIconSelect: EventEmitter<string> = new EventEmitter<string>();

    /**
     * $demo = input/icons
     */
    @Output()
    public iconSelect: EventEmitter<string> = new EventEmitter<string>();

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public suffix: GroupOptionValue | GroupOptionValue[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public suffixWidth: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public suffixLabelField: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public prefix: GroupOptionValue | GroupOptionValue[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public prefixWidth: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public prefixLabelField: string;

    @Output()
    public suffixChange: EventEmitter<GroupOptionValue> = new EventEmitter<GroupOptionValue>();

    @Output()
    public prefixChange: EventEmitter<GroupOptionValue> = new EventEmitter<GroupOptionValue>();

    /**
     * @internal
     */
    public get _$getBorderRadius(): BorderRadiusValue {
        const radius: BorderRadiusValue = {};
        if (CommonUtils.isDefined(this.prefix)) {
            Object.assign(radius, {'border-top-left-radius': 0, 'border-bottom-left-radius': 0});
        }
        if (CommonUtils.isDefined(this.suffix)) {
            Object.assign(radius, {'border-top-right-radius': 0, 'border-bottom-right-radius': 0});
        }
        return radius;
    }

    /**
     * @internal
     */
    public get _$getWrapperClass(): 'jigsaw-input-both' | 'jigsaw-input-left' | 'jigsaw-input-right' | 'jigsaw-input-none' {
        if (CommonUtils.isDefined(this.prefix) && CommonUtils.isDefined(this.suffix)) {
            return 'jigsaw-input-both';
        }
        if (CommonUtils.isDefined(this.prefix)) {
            return 'jigsaw-input-left';
        }
        if (CommonUtils.isDefined(this.suffix)) {
            return 'jigsaw-input-right';
        }
        return 'jigsaw-input-none';
    }
}

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
        '(click)': '_$stopPropagation($event)',
        '[class.jigsaw-input]': 'true',
        '[class.jigsaw-input-error]': '!valid',
        '[class.jigsaw-input-focused]': 'focused',
        '[class.jigsaw-input-disabled]': 'disabled'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawInput), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawInput extends JigsawInputBase {
    constructor(protected _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                protected _injector: Injector) {
        super(_cdr, _injector);
    }

    /**
     * 当用户设置类型为password时，输入内容隐藏为特殊字符。
     *
     * $demo = input/password
     */
    @RequireMarkForCheck()
    @Input()
    public password: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get type(): string {
        return this.password ? "password" : "text";
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get autocomplete(): string {
        return this.password ? "new-password" : "off";
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
    public _$clearValue(): void {
        this.value = '';
        this.focus();
    }

    /**
     * @internal
     */
    public _$stopPropagation(event) {
        if (!this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawPrefixSuffixModule],
    declarations: [JigsawInput],
    exports: [JigsawInput],
})
export class JigsawInputModule {
}
