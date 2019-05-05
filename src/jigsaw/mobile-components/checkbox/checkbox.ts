/**
 * Created by 10177553 on 2017/3/14.
 */

import {
    Component, Input, EventEmitter, Output, OnInit, AfterContentInit, Renderer2, ElementRef, forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import {AbstractJigsawComponent} from '../../common/common';
import {CheckBoxStatus} from "./typings";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {JigsawMobileCheckBoxModule} from "./index";

export type CheckBoxValue = boolean | CheckBoxStatus;

/**
 * 复选框组件，支持勾选、非勾选、中间状态3种状态。
 *
 * 这是一个表单友好组件。
 *
 * $demo = checkbox/full
 * $demo = checkbox/basic
 */
@Component({
    selector: 'jigsaw-mobile-checkbox, jm-checkbox',
    templateUrl: './checkbox.html',
    host: {
        '[style.width]': 'width',
        '[class.jigsaw-checkbox-host]': 'true',
        '[class.jigsaw-checkbox-error]': '!valid'
    },
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawMobileCheckBox), multi: true },
    ]
})
export class JigsawMobileCheckBox extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, AfterContentInit {

    private _enableIndeterminate: boolean = false;

    /**
     * 复选框是否启用中间状态的开关
     * - 等于`true`时，用户可以点出中间状态；
     * - 等于`false`时，用户不可点出中间状态（默认）；
     *
     * 编程模式赋值复选框状态时，不受此开关的影响，即即使`enableIndeterminate`被设置为false，
     * 应用依然可以在代码中直接将组件的状态设置为`CheckBoxStatus.indeterminate`。
     *
     * $demo = checkbox/basic
     */
    @Input()
    public get enableIndeterminate(): boolean {
        return this._enableIndeterminate;
    }

    public set enableIndeterminate(value: boolean) {
        this._enableIndeterminate = value;
        this._valueCandidates = [CheckBoxStatus.unchecked, CheckBoxStatus.checked];
        if (value) {
            this._valueCandidates.push(CheckBoxStatus.indeterminate);
        }
    }

    private _checked: CheckBoxStatus = CheckBoxStatus.unchecked;

    /**
     * 用于设置复选框的状态，支持的所有状态参考`CheckBoxStatus`，默认值是`CheckBoxStatus.unchecked`
     *
     * $demo = checkbox/basic
     */
    @Input()
    public get checked(): CheckBoxValue {
        return this._checked
    }

    public set checked(value: CheckBoxValue) {
        this.writeValue(value);
    }

    /**
     * 选中状态变化时发出此事件，此事件可以简化为`change`
     *
     * @type {EventEmitter<CheckBoxValue>}
     */
    @Output()
    public checkedChange: EventEmitter<CheckBoxValue> = new EventEmitter();

    /**
     * 选中状态变化时发出此事件
     *
     * @type {EventEmitter<CheckBoxValue>}
     */
    @Output()
    public change = this.checkedChange;

    private _disabled: boolean = false;

    /**
     * 设置按钮不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     * $demo = checkbox/disabled
     */
    @Input()
    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(value: boolean) {
        this._disabled = value;
        this._setCheckBoxClass();
    }

    @Input()
    public valid: boolean = true;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        super();
    }

    public ngOnInit() {
        this._setCheckBoxClass();
    }

    public ngAfterContentInit() {
        const labelEl = this._elementRef.nativeElement.querySelector('.jigsaw-checkbox-label');
        if (labelEl.innerText.trim() === '') {
            this._renderer.setStyle(labelEl, 'padding', '0');
        }
    }

    private _valueCandidates: CheckBoxStatus[] = [CheckBoxStatus.unchecked, CheckBoxStatus.checked];

    private _toggle(): void {
        const index = this._valueCandidates.indexOf(this._checked);
        if (index == -1) {
            this._checked = this._valueCandidates[1];
        } else {
            this._checked = this._valueCandidates[(index + 1) % this._valueCandidates.length];
        }

        this.checkedChange.emit(this._checked);
        this._propagateChange(this._checked);
    }

    private _fixCheckValue(value: CheckBoxValue): CheckBoxStatus {
        let v: CheckBoxStatus;
        if (CommonUtils.isUndefined(value)) {
            v = CheckBoxStatus.unchecked;
        } else if (typeof value === 'number') {
            v = value > CheckBoxStatus.indeterminate ? CheckBoxStatus.checked : value;
        } else {
            v = value ? CheckBoxStatus.checked : CheckBoxStatus.unchecked;
        }
        return v;
    }

    /**
     * checkbox点击调用的事件
     * @param event
     * @internal
     */
    public _$onCheckboxClick(event: Event) {
        event.stopPropagation();
        event.preventDefault();

        if (!this.disabled) {
            this._toggle();
            this._setCheckBoxClass();
        }
    }

    /**
     * 更新checkbox的样式信息
     * @internal
     */
    public _$checkboxClass: {};

    private _setCheckBoxClass() {
        this._$checkboxClass = {
            'jigsaw-checkbox': 'true',
            'jigsaw-checkbox-checked': this._checked,
            'jigsaw-checkbox-indeterminate': this._checked === CheckBoxStatus.indeterminate,
            'jigsaw-checkbox-disabled': this.disabled
        }
    }

    private _propagateChange:any = () => {};

    public writeValue(value: any): void {
        this._checked = this._fixCheckValue(value);
        this._setCheckBoxClass();
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}
