import {Component, EventEmitter, forwardRef, Input, NgModule, Output} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "./radio";
import {GroupOptionValue} from "../list-and-tile/group-common";
import {ArrayCollection} from "../../core/data/array-collection";
import {AbstractJigsawComponent} from "../common";
import {InternalUtils} from "../../core/utils/internal-utils";

@Component({
    selector: 'jigsaw-radios-lite, j-radio-lite',
    template: `
        <j-radios [(value)]="value" (valueChange)="radioChange($event)" [trackItemBy]="trackItemBy">
            <j-radio-option *ngFor="let item of data; trackBy: _$trackByFn" [value]="item">
                {{item[labelField]}}
            </j-radio-option>
        </j-radios>`,
    host: {
        'jigsaw-radios-lite': 'true'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRadiosLite), multi: true},
    ]
})
export class JigsawRadiosLite extends AbstractJigsawComponent implements ControlValueAccessor {

    @Input()
    public data: ArrayCollection<GroupOptionValue> | GroupOptionValue[];

    @Input()
    public value: any;

    @Input()
    public trackItemBy: string | string[];

    @Input()
    public labelField: string = 'label';

    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    public get _$trackByFn() {
        return InternalUtils.trackByFn(this.trackItemBy);
    };

    radioChange(item) {
        this.valueChange.emit(item);
        this._propagateChange(item);
    }

    ngOnInit() {
        super.ngOnInit();
        if (!this.trackItemBy && this.data && typeof this.data[0] !== 'string') {
            this.trackItemBy = this.labelField;
        }
    }

    private _propagateChange: any = () => {
    };

    public writeValue(value: any): void {

    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}

@NgModule({
    imports: [CommonModule, JigsawRadioModule],
    declarations: [JigsawRadiosLite],
    exports: [JigsawRadiosLite]
})
export class JigsawRadioLiteModule {
}
