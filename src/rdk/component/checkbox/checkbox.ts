/**
 * Created by 10177553 on 2017/3/14.
 */

import {
    Component, Input, EventEmitter, Output, OnInit, AfterContentInit, Renderer2, ElementRef
} from '@angular/core';
import {AbstractRDKComponent} from '../core';


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
export class RdkCheckBox extends AbstractRDKComponent implements OnInit, AfterContentInit {

    /*
    * enableIndeterminate为true时，用户可以点出中间状态；
    * 为false时，用户不可点出中间状态，但可赋予组件中间状态
    * */
    private _enableIndeterminate: boolean = false;
    @Input()
    public get enableIndeterminate(): boolean {
        return this._enableIndeterminate;
    }

    public set enableIndeterminate(value: boolean) {
        this._enableIndeterminate = value;
        this._valueCandidates = [CheckBoxStatus.unchecked, CheckBoxStatus.checked];
        if (value) {
            this._valueCandidates.push(CheckBoxStatus.indeterminate);
        }
    }

    private _checked: CheckBoxStatus = CheckBoxStatus.unchecked;
    @Input()
    public get checked(): CheckBoxValue {
        return this._checked
    }

    public set checked(value: CheckBoxValue) {
        this._checked = this._fixCheckValue(value);
        this._setCheckBoxClass();
    }

    @Output()
    public checkedChange: EventEmitter<CheckBoxValue> = new EventEmitter();

    @Output()
    public change = this.checkedChange;

    private _disabled: boolean = false;
    @Input()
    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(value: boolean) {
        this._disabled = value;
        this._setCheckBoxClass();
    }

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef){
        super();
    }

    public ngOnInit() {
        this._setCheckBoxClass();
    }

    public ngAfterContentInit(){
        const labelEl = this._elementRef.nativeElement.querySelector('.rdk-checkbox-label');
        if(labelEl.innerText.trim() === ''){
            this._renderer.setStyle(labelEl, 'padding', '0');
        }
    }

    private _valueCandidates: CheckBoxStatus[] = [CheckBoxStatus.unchecked, CheckBoxStatus.checked];

    private _toggle(): void {
        const index = this._valueCandidates.indexOf(this._checked);
        if(index == -1){
            this._checked = this._valueCandidates[1];
        }else{
            this._checked = this._valueCandidates[(index + 1) % this._valueCandidates.length];
        }

        this.checkedChange.emit(this._checked);
    }

    private _fixCheckValue(value:CheckBoxValue):CheckBoxStatus {
        let v:CheckBoxStatus;
        if (value === undefined || value == null) {
            v = CheckBoxStatus.unchecked;
        } else if (typeof value === 'number') {
            v = value > CheckBoxStatus.indeterminate ? CheckBoxStatus.checked : value;
        } else {
            v = value ? CheckBoxStatus.checked : CheckBoxStatus.unchecked;
        }
        return v;
    }

    /**
     * checkbox点击调用的事件
     * @param event
     * @private
     */
    public _$onCheckboxClick(event: Event) {
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
    public _$checkboxClass: { };

    private _setCheckBoxClass() {
        this._$checkboxClass = {
            'rdk-checkbox': 'true',
            'rdk-checkbox-checked': this._checked,
            'rdk-checkbox-indeterminate': this._checked === CheckBoxStatus.indeterminate,
            'rdk-checkbox-disabled': this.disabled
        }
    }
}
