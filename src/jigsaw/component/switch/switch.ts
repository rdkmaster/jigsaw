import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

/**
 * @description 开关组件
 *
 * 何时使用
 * 只有两种状态切换时.
 */
@Component({
    selector: 'jigsaw-switch',
    templateUrl: './switch.html',
    //styleUrls: ['./switch.scss']
})

export class JigsawSwitch implements OnInit{
    /**
     * @internal
     */
    public _$content: any; // 当前显示的内容.

    /**
     * 开关状态打开时的文本.(只支持字符串)
     */
    @Input()
    public onLabel: any;

    /**
     * 开关状态关闭时显示的文本(只支持字符串)
     */
    @Input()
    public offLabel: any;

    /**
     * size 默认 'default' 可选值 ‘small’
     * @type {string}
     */
    @Input()
    public size: string = 'default';

    private _checked: boolean = false;

    /**
     * 选中 默认值false;
     * @returns {boolean}
     */
    @Input()
    public get checked(): boolean  { return this._checked};
    public set checked(value: boolean) {
        this._checked = value;

        this._setSwitchClass();
        this._setInnerValue();
    }

    /**
     * 可以忽略, 主要使checked 属性支持双向数据绑定.
     * @type {EventEmitter<boolean>}
     */
    @Output() public checkedChange = new EventEmitter<boolean>();

    /**
     * 对外暴露事件,
     * @type {EventEmitter<boolean>}
     */
    @Output() public change = this.checkedChange;

    private _disabled: boolean = false;

    /**
     * 是否禁用 类型 boolean 默认值 false;
     * @returns {boolean}
     */
    @Input()
    public get disabled(): boolean { return this._disabled; };
    public set disabled(value: boolean) {
        this._disabled = value;
        this._setSwitchClass();
    }

    /**
     * @internal
     */
    public _$switchClick() {
        if(!this.disabled) {
            this.checked = !this.checked;

            // 发出事件
            this.checkedChange.emit(this.checked);
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
            'jigsaw-switch-small': this.size === 'small'? true : false,
            'jigsaw-switch-checked': this.checked,
            'jigsaw-switch-disabled': this.disabled
        }
    }

    /**
     * 设置选中和费选中的值.
     */
    private _setInnerValue() {
        this._$content = this.checked ? this.onLabel : this.offLabel;
    }

    public ngOnInit() {
        this._setSwitchClass();
        this._setInnerValue();
    }
}
