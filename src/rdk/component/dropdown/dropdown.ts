/**
 * Created by 10177553 on 2017/4/10.
 */

import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, Renderer2} from '@angular/core';

export enum DropDownMode {
    single,
    multiple
}

export enum DropDownTrigger {
    click,
    hover
}

@Component({
    selector: 'rdk-drop-down',
    templateUrl: 'dropdown.html',
    styleUrls: ['dropdown.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class RdkDropDown implements OnInit {
    constructor(private _render: Renderer2) { }

    private _value: string| Array<any>;

    @Input()
    public get value() { return this._value; }

    public set value(value) {
        this._value = value;
    }

    @Output()
    public changeValue = new EventEmitter<string| Array<any>>(); // 双向绑定

    /**
     * 对外值变化事件.
     * @type {EventEmitter<string|Array<any>>}
     */
    @Output()
    public change = this.changeValue;

    @Input()
    public placeholder: string;

    @Input()
    public disabled: boolean;

    @Input()
    public mode: DropDownMode = DropDownMode.single;

    @Input()
    public trigger: DropDownTrigger = DropDownTrigger.click;

    private _dropDownWidth: string;

    @Input()
    public get dropDownWidth():string {
        return this._dropDownWidth;
    };
    public set dropDownWidth(width) {
        this._dropDownWidth = width;
    }

    private _isOpened: boolean = false;

    private _toggleClick() {
        event.preventDefault();
        event.stopPropagation();

        this._isOpened = !this._isOpened;
    }

    private _contentClick() {
        event.preventDefault();
        event.stopPropagation();

        if(this.mode === DropDownMode.multiple) return;

        this.close();
    }

    private _hoverHandle(isHover): void {
        if(this.trigger === DropDownTrigger.click) return;

        if(isHover == 1) {
            this._isOpened = true;
        } else {
            this._isOpened = false;
        }
    }

    public open() {
        this._isOpened = true;
    }

    public close() {
        this._isOpened = false;
    }

    ngOnInit() {
        this._render.listen('window', 'click',() => {
            this.close();
        })
    }

}
