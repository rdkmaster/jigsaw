import {
    NgModule, Component, EventEmitter, Input, Output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'rdk-input',
    templateUrl: 'input.html',
    styleUrls: ['input.scss'],
    host: {
        '[style.width.px]': 'width',
        '[style.height.px]': 'height',
        '[style.line-height.px]': 'height'
    }
})
export class InputComponent{
    private _value: any; //input表单值

    //input form表单值
    @Input()
    get value() { return this._value; }
    set value(newValue: any) {
        if (this._value != newValue) {
            this._value = newValue;
            this.valueChange.emit(newValue);
        }
    }

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Input() width: number;

    @Input() height: number;

    @Input() clearable: boolean = true;

    constructor(){
    }

    private _clearValue(): void{
        this.value = null;
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [InputComponent],
    exports: [InputComponent],
})
export class InputModule{

}


