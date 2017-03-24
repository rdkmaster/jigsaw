/**
 * Created by 10177553 on 2017/3/14.
 */

import {
    Component, Input, EventEmitter, Output, OnInit
} from '@angular/core';
import {AbstractRDKComponent} from "../../core/api/component-api";



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
    private _checked: CheckBoxStatus | boolean = CheckBoxStatus.unchecked;
    private _disabled: boolean = false;
    private _checkboxClass: { };

    @Input()
    public get checked(): CheckBoxValue {
        return this._checked
    }
    public set checked(value: CheckBoxValue) {
        this._checked = value;
        this._setCheckBoxClass();
    }

    @Output()
    public checkedChange: EventEmitter<CheckBoxValue> = new EventEmitter();

    @Output()
    public change = this.checkedChange;

    @Input()
    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(value: boolean) {
        this._disabled = value;
        this._setCheckBoxClass();
    }

    public ngOnInit() {
        this._setCheckBoxClass();
    }

    private _toggle(): void {
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
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
    private _setCheckBoxClass() {
        this._checkboxClass = {
            'rdk-checkbox': 'true',
            'rdk-checkbox-checked': this.checked,
            'rdk-checkbox-indeterminate': this.checked === CheckBoxStatus.indeterminate,
            'rdk-checkbox-disabled': this.disabled
        }
    }
}
