/**
 * Created by 10177553 on 2017/3/15.
 */
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'rdk-switch',
    templateUrl: './switch.html',
    styleUrls: ['./style/switch.scss']
})

export class RdkSwitch implements OnInit{
    prefixCls: string = 'rdk-switch';
    _checked: boolean = false;
    _disabled: boolean = false;
    _content: any;
    _switchClass: {};

    @Input() checkedChildren: any;
    @Input() unCheckedChildren: any;
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

    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

    _switchClick() {
        if(!this.disabled) {
            this.checked = !this.checked;

            // 发出事件
            this.change.emit(this.checked);
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
        this._content = this.checked ? this.checkedChildren : this.unCheckedChildren;
    }

    ngOnInit() {
        this.setSwitchClass();
        this.setInnerValue();
    }
}
