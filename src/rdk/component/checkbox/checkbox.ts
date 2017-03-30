/**
 * Created by 10177553 on 2017/3/14.
 */

import {
    Component, Input, EventEmitter, Output, OnInit
} from '@angular/core';
import {AbstractRDKComponent} from "../core";


export enum CheckBoxStatus {
    unchecked, checked, indeterminate
}
export type CheckBoxValue = boolean | CheckBoxStatus;

@Component({
    selector: 'rdk-checkbox',
    templateUrl: './checkbox.html',
    styleUrls: ['./checkbox.scss'],
    host: {
        '[style.width]': 'width',
    }
})

/**
 * checkbox 组件
 */
export class RdkCheckBox extends AbstractRDKComponent implements OnInit {

    private _checked: CheckBoxStatus = CheckBoxStatus.unchecked;
    @Input()
    public get checked(): CheckBoxValue {
        return this._checked
    }

    public set checked(value: CheckBoxValue) {
        this._checked = this._fixCheckValue(value);
        this._setCheckBoxClass();
    }

    @Output()
    public checkedChange: EventEmitter<CheckBoxValue> = new EventEmitter();

    @Output()
    public change = this.checkedChange;

    private _disabled: boolean = false;
    @Input()
    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(value: boolean) {
        this._disabled = value;
        this._setCheckBoxClass();
    }

    private _enableIndeterminate: boolean = false;
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
        if (!this._enableIndeterminate && this._checked === CheckBoxStatus.indeterminate) {
            this._checked = this._fixCheckValue(this._checked);
            this._setCheckBoxClass();
            setTimeout(() => this.checkedChange.emit(this._checked));
        }
    }

    public ngOnInit() {
        this._setCheckBoxClass();
    }

    private _valueCandidates: CheckBoxStatus[] = [CheckBoxStatus.unchecked, CheckBoxStatus.checked];

    private _toggle(): void {
        const index = this._valueCandidates.indexOf(this._checked);
        this._checked = this._valueCandidates[(index + 1) % this._valueCandidates.length];
        this.checkedChange.emit(this._checked);
    }

    private _fixCheckValue(value:CheckBoxValue):CheckBoxStatus {
        let v:CheckBoxStatus;
        if (value === undefined || value == null) {
            v = CheckBoxStatus.unchecked;
        } else if (typeof value === 'number') {
            v = value > CheckBoxStatus.indeterminate ? CheckBoxStatus.checked : value;
        } else {
            v = value ? CheckBoxStatus.checked : CheckBoxStatus.unchecked;
        }
        if (!this.enableIndeterminate && v == CheckBoxStatus.indeterminate) {
            v = CheckBoxStatus.checked;
        }
        return v;
    }

    /**
     * checkbox点击调用的事件
     * @param event
     * @private
     */
    private _onCheckboxClick(event: Event) {
        event.stopPropagation();
        event.preventDefault();

        if (!this.disabled) {
            this._toggle();
            this._setCheckBoxClass();
        }
    }

    /**
     * 更新checkbox的样式信息
     */
    private _checkboxClass: { };

    private _setCheckBoxClass() {
        this._checkboxClass = {
            'rdk-checkbox': 'true',
            'rdk-checkbox-checked': this._checked,
            'rdk-checkbox-indeterminate': this._checked === CheckBoxStatus.indeterminate,
            'rdk-checkbox-disabled': this.disabled
        }
    }
}
