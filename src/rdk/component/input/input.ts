import {
    NgModule, Component, EventEmitter, Input, Output, ContentChildren, Directive, QueryList,
    ElementRef, ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AbstractRDKComponent} from "../core";
import {Observable} from "rxjs";

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
export class RdkInput extends AbstractRDKComponent {
    private _value: string | number; //input表单值
    private _longIndent: boolean = false;
    private _focused: boolean;
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

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

    @Output('blur')
    get onBlur(): Observable<FocusEvent> {
        return this._blurEmitter.asObservable();
    }

    @Output('focus')
    get onFocus(): Observable<FocusEvent> {
        return this._focusEmitter.asObservable();
    }

    @ContentChildren(RdkPrefixIcon) _iconFront: QueryList<RdkPrefixIcon> = null;

    @ViewChild('input') _inputElement: ElementRef;

    public focus(){
        this._inputElement.nativeElement.focus();
    }

    private _clearValue(event): void {
        this.value = null;
    }

    private _handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
    }

    private _handleBlur(event: FocusEvent) {
        this._focused = false;
        this._blurEmitter.emit(event);
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


