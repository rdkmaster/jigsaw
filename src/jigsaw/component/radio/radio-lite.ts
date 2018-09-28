import {Component, EventEmitter, forwardRef, Input, NgModule, Output} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "./radio";
import {GroupOptionValue} from "../list-and-tile/group-common";
import {ArrayCollection} from "../../core/data/array-collection";
import {AbstractJigsawComponent} from "../common";
import {InternalUtils} from "../../core/utils/internal-utils";

@Component({
    selector: 'jigsaw-radios-lite, j-radios-lite',
    template: `
        <j-radios [(value)]="value" (valueChange)="radioChange($event)" [trackItemBy]="trackItemBy">
            <j-radio-option *ngFor="let item of data; trackBy: _$trackByFn" [value]="item" [disabled]="item?.disabled">
                {{item && item[labelField] ? item[labelField] : item}}
            </j-radio-option>
        </j-radios>`,
    host: {
        '[class.jigsaw-radios-lite]': 'true',
        '[class.jigsaw-radios-error]': '!valid'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRadiosLite), multi: true},
    ]
})
export class JigsawRadiosLite extends AbstractJigsawComponent implements ControlValueAccessor {

    @Input()
    public valid: boolean = true;

    @Input()
    public data: ArrayCollection<GroupOptionValue> | GroupOptionValue[];

    @Input()
    public value: any;

    private _trackItemBy: string | string[];

    @Input()
    public get trackItemBy(): string | string[] {
        if (!this._trackItemBy && this.data && typeof this.data[0] !== 'string') {
            this._trackItemBy = this.labelField;
        }
        return this._trackItemBy;
    }

    public set trackItemBy(value: string | string[]) {
        if (!value) {
            return;
        }
        this._trackItemBy = typeof value === 'string' ? value.split(/\s*,\s*/g) : value;
    }

    @Input()
    public labelField: string = 'label';

    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    public get _$trackByFn() {
        return InternalUtils.trackByFn(this._trackItemBy);
    };

    radioChange(item) {
        this.valueChange.emit(item);
        this._propagateChange(item);
    }

    ngOnInit() {
        super.ngOnInit();
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
