import {
    NgModule, Component, DoCheck, EventEmitter, Input, Renderer, ElementRef, forwardRef, ChangeDetectionStrategy,
    SimpleChanges, OnChanges
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import { RouterModule } from '@angular/router';

export const inputRoutes = [
  {
    path: "",
    component: InputComponent
  }
];

@Component({
    selector: 'rdk-input',
    templateUrl: 'input.html',
    styleUrls: ['input.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }],
    //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor, OnChanges/*, DoCheck*/{
    _value: any; //input表单值

    //input form表单值
    get value(): any { return this._value; }
    set value(newValue: any) {
        if (this._value != newValue) {
            this._value = newValue;
            this._onChange(newValue);
            this._onTouched();
        }
    }

    @Input()
    width: number;

    inputValueChangeEmit = new EventEmitter;

    constructor(private renderer: Renderer, private el: ElementRef){
    }

    ngOnInit(){
        this.width && this.renderer.setElementStyle(this.el.nativeElement.querySelector('input'), 'width', this.width + 'px');
    }

    clearValue(){
        this.value = '';
    }

    //outside to inside
    writeValue(outsideValue: any): void {
        this.value = outsideValue;
    };

    _onChange = (value: any) => {};
    _onTouched = () => {};

    //inside to outside
    //注册一个方法, 当 inside value updated then need call it : fn(newValue)
    registerOnChange(fn: (newValue : any) => void): void {
        this._onChange = fn;
    };

    //inside to outside
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    //监测非输入属性变化
    /*oldValue: string = this.value;//备份属性
    ngDoCheck() {
        console.log('ngDoCheck');
        if(this.value !== this.oldValue){
            console.log('inputValue is changed');
            this.inputValueChangeEmit.emit(this.value);//发送事件到根组件
            this.oldValue = this.value;//变更备份属性
        }
    }*/

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {//迭代changes对象
         let chng = changes[propName];
         let cur  = JSON.stringify(chng.currentValue);//变更属性当前值
         let prev = JSON.stringify(chng.previousValue);//变更属性之前的值
         console.log(propName + " cur: " + cur +", and prev: " + prev);
         }
    };

}

@NgModule({
    imports: [CommonModule,
      FormsModule,
      //RouterModule.forChild(inputRoutes)
    ],
    declarations: [InputComponent],
    exports: [InputComponent],
})
export class InputModule{

}


