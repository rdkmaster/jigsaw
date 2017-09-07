import {Component, ContentChild, EventEmitter, forwardRef, Input, NgModule, Output, TemplateRef} from '@angular/core';
import {ArrayCollection, LocalPageableArray} from "jigsaw/core/data/array-collection";
import {JigsawComboSelectModule} from "./index";
import {ComboSelectValue} from "./combo-select";
import {CallbackRemoval} from "../../core/utils/common-utils";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'j-auto-complete',
    templateUrl: './auto-complete.html',
    providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawAutoComplete), multi: true},
]
})
export class JigsawAutoComplete implements ControlValueAccessor{
    @ContentChild(TemplateRef)
    public _$contentTemplateRef: any;

    /**
     * internal
     */
    public _$value: ArrayCollection<ComboSelectValue>;

    @Input()
    public get value(): ArrayCollection<ComboSelectValue> {
        return this._$value;
    }

    public set value(value: ArrayCollection<ComboSelectValue>) {
        this.writeValue(value);
    }

    @Output() public valueChange = new EventEmitter<any[]>();

    @Input()
    public data = new LocalPageableArray();

    @Input()
    public selectedItems = new ArrayCollection();

    private _filterKey: string[];

    @Input()
    public get filterKey(): string | string[] {
        return this._filterKey;
    }

    public set filterKey(value: string | string[]) {
        if(typeof value == 'string'){
            if(value.match(/[,]/)){
                this._filterKey = value.split(',');
            }else{
                this._filterKey = [value];
            }
        }else{
            this._filterKey = value;
        }
    }

    @Input()
    public trackItemBy: string | string[];

    @Input()
    public clearable: boolean;

    @Input()
    public maxWidth: string;

    private _removeRefreshCallback: CallbackRemoval;

    /**
     * internal
     */
    public _$dataBak = this.data;

    /**
     * internal
     */
    public _$handleFilter(filter) {
        if (filter) {
            this._$dataBak = this.data.filter(filter, this.filterKey);
        } else {
            //空字符串
            this._$dataBak = this.data;
        }
    }

    private _propagateChange: any = () => {
    };

    public writeValue(value: any): void {
        if (!value || this._$value === value || !(value instanceof ArrayCollection)) {
            return;
        }

        this._$value = value;
        this.valueChange.emit(this._$value);
        this._propagateChange(this._$value);

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
        this._removeRefreshCallback = value.onRefresh(() => {
            this.valueChange.emit(this._$value);
            this._propagateChange(this._$value);
        });
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

}

@NgModule({
    declarations: [JigsawAutoComplete],
    bootstrap: [JigsawAutoComplete],
    imports: [JigsawComboSelectModule],
    exports: [JigsawAutoComplete]
})
export class JigsawAutoCompleteModule {

}
