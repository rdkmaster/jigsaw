/**
 * Created by 10177553 on 2017/3/14.
 */

import {
    Component, Input, EventEmitter, Output, OnInit
} from '@angular/core';

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
    styleUrls: ['./checkbox.scss']
})

/**
 * checkbox 组件
 */
export class RdkCheckBox implements OnInit{
    private _checked: CheckBoxStatus | boolean = CheckBoxStatus.unchecked;
    private _disabled: boolean = false;
    private checkboxClass: { };

    @Input()
    get checked(): boolean | CheckBoxStatus { return this._checked };
    set checked(value: boolean | CheckBoxStatus) {
        this._checked = value;
        this.setCheckBoxClass();
    };
    @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * 设置checkbox 状态
     * @param value boolean 或者 CheckBoxStatus
     */
    setCheckboxStatus(value: boolean| CheckBoxStatus) {
        this._checked = value;
        this.setCheckBoxClass();
    }

    @Input()
    get disabled(): boolean { return this._disabled; };
    set disabled(value: boolean) {
        this._disabled = value;
        this.setCheckBoxClass();
    };

    /** Event emitted when the checkbox's `checked` value changes. */
    @Output() change: EventEmitter<RdkCheckboxChange> = new EventEmitter<RdkCheckboxChange>();

    toggle(): void {
        this.checked = !this.checked;
        this._emitChangeEvent();
    }

    // change事件.
    private _emitChangeEvent() {
        let event = new RdkCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this.change.emit(event);
    }

    /**
     * checkbox点击调用的事件
     * @param event
     * @private
     */
    _onCheckboxClick(event: Event) {
        event.stopPropagation();
        event.preventDefault();

        if(!this.disabled) {
            this.toggle();
            this.setCheckBoxClass();
        }
    }

    /**
     * 更新checkbox的样式信息
     */
    setCheckBoxClass() {
        this.checkboxClass = {
            'rdk-checkbox': 'true',
            'rdk-checkbox-checked': this.checked,
            'rdk-checkbox-indeterminate': this.checked === CheckBoxStatus.indeterminate,
            'rdk-checkbox-disabled': this.disabled
        }
    }

    ngOnInit() {
        this.setCheckBoxClass();
    }
}
