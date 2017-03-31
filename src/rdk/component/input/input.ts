import {NgModule, Component, EventEmitter, Input, Output, ContentChildren, Directive, QueryList} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AbstractRDKComponent} from "../core";

@Directive({ selector: '[rdk-prefix-icon]' })
export class RdkPrefixIcon {}

@Component({
    selector: 'rdk-input',
    templateUrl: 'input.html',
    styleUrls: ['input.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height'
    }
})
//TODO（by陈旭） 缺少keyup、blur等事件
export class RdkInput extends AbstractRDKComponent {
    private _value: string | number; //input表单值
    private _longIndent: boolean = false;

    //input form表单值
    @Input()
    public get value(): string | number {
        return this._value;
    }

    public set value(newValue: string | number) {
        if (this._value != newValue) {
            this._value = newValue;
            this.valueChange.emit(newValue);
        }
    }

    @Output() public valueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

    @Input() public clearable: boolean = true;

    @ContentChildren(RdkPrefixIcon) _iconFront: QueryList<RdkPrefixIcon> = null;

    private _clearValue(): void {
        this.value = null;
    }

    ngAfterContentInit(){
        this._iconFront && this._iconFront.length ? this._longIndent = true : null;
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [RdkInput, RdkPrefixIcon],
    exports: [RdkInput,RdkPrefixIcon],
})
export class RdkInputModule {

}


