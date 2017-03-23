/**
 * Created by 10177553 on 2017/3/14.
 */

import {
    Component, Input, EventEmitter, Output, OnInit
} from '@angular/core';
import {AbstractRDKComponent} from "../../core/api/component-api";

export class RdkCheckboxChange {
    /** The source RdkCheckBox of the event. */
    source: RdkCheckBox;
    /** The new `checked` value of the checkbox. */
    checked: boolean | CheckBoxStatus;
}

export enum CheckBoxStatus {
    unchecked, checked, indeterminate
}

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
export class RdkCheckBox extends AbstractRDKComponent implements OnInit{
    private _checked: CheckBoxStatus | boolean = CheckBoxStatus.unchecked;
    private _disabled: boolean = false;
    private _checkboxClass: { };

    @Input()
    public get checked(): boolean | CheckBoxStatus { return this._checked };
    public set checked(value: boolean | CheckBoxStatus) {
        this._checked = value;
        this._setCheckBoxClass();
    };
    @Output() public checkedChange: EventEmitter<boolean| CheckBoxStatus> = new EventEmitter<boolean>();

    /**
     * 设置checkbox 状态
     * @param value boolean 或者 CheckBoxStatus
     */
    public setCheckboxStatus(value: boolean| CheckBoxStatus) {
        this._checked = value;
        this._setCheckBoxClass();
    }

    @Input()
    public get disabled(): boolean { return this._disabled; };
    public set disabled(value: boolean) {
        this._disabled = value;
        this._setCheckBoxClass();
    };

    /** Event emitted when the checkbox's `checked` value changes. */
    @Output() public change = new EventEmitter<RdkCheckboxChange>();

    public ngOnInit() {
        this._setCheckBoxClass();
    }

    private _toggle(): void {
        this.checked = !this.checked;
        this._emitChangeEvent();
    }

    // change事件.
    private _emitChangeEvent() {
        let event = new RdkCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this.change.emit(event);
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

        if(!this.disabled) {
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
