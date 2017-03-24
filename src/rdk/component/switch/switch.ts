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
    private _content: any; // 当前显示的内容.

    @Input()
    public onLabel: any;
    @Input()
    public offLabel: any;
    @Input()
    public size: string = 'default';

    private _checked: boolean = false;

    @Input()
    public get checked(): boolean  { return this._checked};
    public set checked(value: boolean) {
        this._checked = value;

        this._setSwitchClass();
        this._setInnerValue();
    }
    @Output() public checkedChange = new EventEmitter<boolean>();

    /**
     * 对外暴露事件,
     * @type {EventEmitter<boolean>}
     */
    @Output() public change = this.checkedChange;

    private _disabled: boolean = false;
    @Input()
    public get disabled(): boolean { return this._disabled; };
    public set disabled(value: boolean) {
        this._disabled = value;
        this._setSwitchClass();
    }

    private _switchClick() {
        if(!this.disabled) {
            this.checked = !this.checked;

            // 发出事件
            this.checkedChange.emit(this.checked);
        }
    }

    private _switchClass: {};

    /**
     * 更新控件样式的方法
     */
    private _setSwitchClass() {
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
    private _setInnerValue() {
        this._content = this.checked ? this.onLabel : this.offLabel;
    }

    public ngOnInit() {
        this._setSwitchClass();
        this._setInnerValue();
    }
}
