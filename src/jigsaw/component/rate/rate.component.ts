import {Component, ViewEncapsulation, EventEmitter, Input, OnInit, Output, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-rate',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './rate.component.html',
    styleUrls: ['./rate.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JigsawRateComponent),
            multi: true
        }
    ],
})
export class JigsawRateComponent implements OnInit,  ControlValueAccessor{
    @Input() value: number;
    @Input() allowHalf: boolean;
    @Input() max: number;
    @Input() icon: string;
    @Input() disabled: boolean;
    @Output() valueChange: EventEmitter<number>;

    constructor() {
    }

    ngOnInit() {
    }
    writeValue(value: any): void {
    }
    registerOnChange(fn: (_: any) => {}): void {
    }
}
