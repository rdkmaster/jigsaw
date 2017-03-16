import {
    Component, Directive, NgModule, forwardRef, Input, HostListener, ContentChildren, QueryList,
    AfterContentInit, Optional
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

type RadioValue = {
    value: any,
    viewValue: any
};

@Directive({
    selector: 'radio-group',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioGroup),
        multi: true
    }]
})
export class RadioGroup implements ControlValueAccessor, AfterContentInit{
    _value: any = null;

    @Input()
    get value(): any { return this._value; }
    set value(newValue: any) {
        if (this._value != newValue) {
            this._value = newValue;
            this._updateSelectedRadioFromValue();
        }
    }

    @ContentChildren(forwardRef(() => RadioButton))
    _radios: QueryList<RadioButton> = null;

    constructor(){

    }

    ngAfterContentInit(){

    }

    private _updateSelectedRadioFromValue(): void {
        if (this._radios != null) {
            this._radios.forEach(radio => {
                radio.checked = this.value == radio.radioValue.value;
            });
        }
    }

    //outside to inside
    writeValue(outsideValue: any): void {
        this.value = outsideValue;
    };

    _controlValueAccessorChangeFn: (value: any) => void = (value) => {};
    onTouched: () => any = () => {};

    //inside to outside
    //注册一个方法, 当 inside value updated then need call it : fn(newValue)
    registerOnChange(fn: (newValue : any) => void): void {
        this._controlValueAccessorChangeFn = fn;
    }

    //inside to outside
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}

@Component({
    selector: 'radio-button',
    templateUrl: 'radio.html',
    styleUrls: ['radio.scss'],
    host: {
        "(click)": "onClick()"
    }
})
export class RadioButton{
    @Input() radioValue: RadioValue;

    checked: boolean = false;

    radioGroup: RadioGroup;

    constructor(@Optional() radioGroup: RadioGroup){
        this.radioGroup = radioGroup;
    }

    onClick(){
        if(!this.checked){
            this.checked = true;
        }
        if (this.radioGroup) {
            this.radioGroup.value = this.radioValue.value;//更新内部value
            this.radioGroup._controlValueAccessorChangeFn(this.radioValue.value);//更新外部(双向绑定)
            this.radioGroup.onTouched();
        }

    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [RadioGroup, RadioButton],
    exports: [RadioGroup, RadioButton]
})
export class RadioModule{

}
