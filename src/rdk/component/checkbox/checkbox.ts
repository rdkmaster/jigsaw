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
    checked: boolean;
}

@Component({
    selector: 'rdk-checkbox',
    templateUrl: './checkbox.html',
    styleUrls: ['./style/checkbox.scss']
})

/**
 * checkbox 组件
 */
export class RdkCheckBox implements OnInit{
    prefixCls: string = 'rdk-checkbox';
    _checked: boolean = false;
    _disabled: boolean = false;
    _indeterminate: boolean = false;
    checkboxClass: { };

    @Input()
    get checked(): boolean { return this._checked };
    set checked(value: boolean) {
        this._checked = value;
        this.setCheckBoxClass();
    };

    @Input()
    get disabled(): boolean { return this._disabled; };
    set disabled(value: boolean) {
        this._disabled = value;
        this.setCheckBoxClass();
    };

    @Input()
    get indeterminate() {return this._indeterminate;}
    set indeterminate(value: boolean) {
        this.setIndeterminate(value);
    }

    /**
     * 设置中间状态
     * @param isIndeterminate  是否为中间状态
     */
    setIndeterminate(isIndeterminate: boolean) {
        this._indeterminate = isIndeterminate;
        this.setCheckBoxClass();
    }
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
            'rdk-checkbox-indeterminate': this.indeterminate,
            'rdk-checkbox-disabled': this.disabled
        }
    }

    ngOnInit() {
        this.setCheckBoxClass();
    }
}
