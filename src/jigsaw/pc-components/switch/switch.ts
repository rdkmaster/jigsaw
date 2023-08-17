import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    NgModule,
    OnInit,
    Output
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent, WingsTheme} from '../../common/common';

/**
 * @description 开关组件
 *
 * 何时使用
 * 只有两种状态切换时.
 */
@WingsTheme('switch.scss')
@Component({
    selector: 'jigsaw-switch, j-switch',
    templateUrl: './switch.html',
    host: {
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-switch-host]': 'true',
        '[class.jigsaw-switch-error]': '!valid'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSwitch), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class JigsawSwitch extends AbstractJigsawComponent implements ControlValueAccessor, OnInit {
    constructor(private _changeDetector: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
        super();
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public valid: boolean = true;

    /**
     * 当前显示的内容.
     * @internal
     */
    public _$content: any;

    private _onLabel: any;

    /**
     * 开关状态打开时的文本.(只支持字符串)
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get onLabel(): any {
        return this._onLabel;
    }

    public set onLabel(value: any) {
        if (this._onLabel == value) {
            return;
        }
        this._onLabel = value;
        this._setInnerValue();
    }
    private _offLabel: any;

    /**
     * 开关状态关闭时显示的文本(只支持字符串)
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get offLabel(): any {
        return this._offLabel;
    }

    public set offLabel(value: any) {
        if (this._offLabel == value) {
            return;
        }
        this._offLabel = value;
        this._setInnerValue();
    }
    private _size: 'default' | 'small' | 'medium' = 'default';

    /**
     * size 默认 'default' 可选值 ‘small’
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get size(): 'default' | 'small' | 'medium' {
        return this._size;
    }

    public set size(value: 'default' | 'small' | 'medium') {
        if (this._size == value) {
            return;
        }
        this._size = value;
        this._setSwitchClass();
    }

    private _checked: boolean = false;

    /**
     * 选中 默认值false;
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get checked(): boolean {
        return this._checked;
    };

    public set checked(value: boolean) {
        this.writeValue(value);
        this._propagateChange(value);
    }

    /**
     * 可以忽略, 主要使checked 属性支持双向数据绑定.
     */
    @Output()
    public checkedChange = new EventEmitter<boolean>();

    /**
     * 对外暴露事件,
     */
    @Output()
    public change = this.checkedChange;

    private _disabled: boolean = false;

    /**
     * 是否禁用 类型 boolean 默认值 false;
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get disabled(): boolean {
        return this._disabled;
    };

    public set disabled(value: boolean) {
        this._disabled = value;
        this._setSwitchClass();
    }

    private _readonly: boolean = false;

    /**
     * 是否只读 类型 boolean 默认值 false;
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get readonly(): boolean {
        return this._readonly;
    };

    public set readonly(value: boolean) {
        this._readonly = value;
        this._setSwitchClass();
    }

    /**
     * @internal
     */
    public _$switchClick() {
        if (!this.disabled && !this.readonly) {
            this.checked = !this.checked;

            // 发出事件
            this.checkedChange.emit(this.checked);
            this._propagateChange(this.checked);
            this._onTouched();
        }
    }

    /**
     * @internal
     */
    public _$switchClass: {};

    /**
     * 更新控件样式的方法
     */
    private _setSwitchClass() {
        this._$switchClass = {
            'jigsaw-switch': 'true',
            'jigsaw-switch-small': this.size === 'small',
            'jigsaw-switch-medium': this.size === 'medium',
            'jigsaw-switch-checked': this.checked,
            'jigsaw-switch-disabled': this.disabled && !this.checked,
            'jigsaw-switch-checked-disabled': this.disabled && this.checked,
            'jigsaw-switch-readonly': this.readonly
        };
        this._changeDetector.markForCheck();
    }

    /**
     * 设置选中和费选中的值.
     */
    private _setInnerValue() {
        this._$content = this.checked ? this.onLabel : this.offLabel;
        this._changeDetector.markForCheck();
    }

    public ngOnInit() {
        this._setSwitchClass();
        this._setInnerValue();
    }

    private _propagateChange: any = () => {
    };
    private _onTouched: any = () => {
    };

    public writeValue(value: any): void {
        this._checked = !!value;
        this._setSwitchClass();
        this._setInnerValue();
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    public setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [JigsawSwitch],
    declarations: [JigsawSwitch],
    providers: [],
})
export class JigsawSwitchModule { }
