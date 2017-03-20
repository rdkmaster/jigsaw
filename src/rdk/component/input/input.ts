import {
    NgModule, Component, EventEmitter, Input, Renderer, ElementRef, Output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'rdk-input',
    templateUrl: 'input.html',
    styleUrls: ['input.scss']
})
export class InputComponent{
    _value: any; //input表单值

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

    constructor(private renderer: Renderer, private el: ElementRef){
    }

    ngOnInit(){
        this.width && this.renderer.setElementStyle(this.el.nativeElement.querySelector('input'), 'width', this.width + 'px');
    }

    private _clearValue(): void{
        this.value = '';
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [InputComponent],
    exports: [InputComponent],
})
export class InputModule{

}


