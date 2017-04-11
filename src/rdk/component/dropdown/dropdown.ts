/**
 * Created by 10177553 on 2017/4/10.
 */

import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

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
    constructor() { }

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
    public required: boolean = false;

    @Input()
    public mode: DropDownMode = DropDownMode.single;

    @Input()
    public trigger: DropDownTrigger = DropDownTrigger.click;

    private _isOpened: boolean = false;

    private _toggleClick() {
        this._isOpened = !this._isOpened;
    }

    ngOnInit() { }

}
