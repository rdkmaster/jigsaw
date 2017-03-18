/**
 * Created by 10177553 on 2017/3/15.
 */
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'rdk-switch',
    templateUrl: './switch.html',
    styleUrls: ['./switch.scss']
})

export class RdkSwitch implements OnInit{
    private _checked: boolean = false;
    private _disabled: boolean = false;
    private _content: any;
    private _switchClass: {};

    @Input() onLabel: any;
    @Input() offLabel: any;
    @Input() size: string = 'default';

    @Input()
    get disabled(): boolean { return this._disabled; };
    set disabled(value: boolean) {
        this._disabled = value;
        this.setSwitchClass();
    }

    @Input()
    get checked(): boolean  { return this._checked};
    set checked(value: boolean) {
        this._checked = value;

        this.setSwitchClass();
        this.setInnerValue();
    }
    @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * 对外暴露事件,
     * @type {EventEmitter<boolean>}
     */
    @Output() change = this.checkedChange;

    _switchClick() {
        if(!this.disabled) {
            this.checked = !this.checked;

            // 发出事件
            this.checkedChange.emit(this.checked);
        }
    }

    /**
     * 更新控件样式的方法
     */
    setSwitchClass() {
        this._switchClass = {
            'rdk-switch': 'true',
            'rdk-switch-small': this.size === 'small'? true : false,
            'rdk-switch-checked': this.checked,
            'rdk-switch-disabled': this.disabled
        }
    }

    /**
     * 设置选中和费选中的值.
     */
    setInnerValue() {
        this._content = this.checked ? this.onLabel : this.offLabel;
    }

    ngOnInit() {
        this.setSwitchClass();
        this.setInnerValue();
    }
}
