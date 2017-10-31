import {Component, EventEmitter, Input, OnInit, Output, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-rate',
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
export class JigsawRateComponent implements OnInit {
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

}
