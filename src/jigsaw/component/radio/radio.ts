import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChildren
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractJigsawComponent} from "../core";
import {CommonUtils} from '../../core/utils/common-utils';
import {InternalUtils} from '../../core/utils/internal-utils';
import {ArrayCollection} from "../../core/data/array-collection";

@Component({
    selector: 'jigsaw-radio-group',
    templateUrl: 'radio-group.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRadioGroup), multi: true },
    ]
})
export class JigsawRadioGroup extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, AfterViewInit {

    private _value: any = null;

    @Input()
    public get value(): any {
        return this._value;
    }

    public set value(newValue: any) {
        if (newValue && this._value != newValue) {
            this._propagateChange(newValue);
        }
        this.writeValue(newValue);
    }

    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    //设置对象的标识
    @Input() public trackItemBy: string|string[];

    //显示在界面上的属性名
    @Input() public labelField: string = 'label';

    private _data: ArrayCollection<object>;

    @Input()
    public get data(): ArrayCollection<object>|object[] {
        return this._data;
    }

    public set data(value: ArrayCollection<object>|object[]) {
        this._data = value instanceof ArrayCollection ? value : new ArrayCollection(value);
    }

    @ViewChildren(forwardRef(() => JigsawRadioButton))
    private _radios: QueryList<JigsawRadioButton> = null;

    private _updateSelectedRadio(): void {
        if (this._radios.length) {
            this._radios.forEach(radio => {
                radio.checked = CommonUtils.compareWithKeyProperty(this.value, radio.radioItem, <string[]>this.trackItemBy);
                radio.cdRef.detectChanges();
            });
        }
        this.valueChange.emit(this.value);
    }

    ngOnInit() {
        super.ngOnInit();
        this.trackItemBy = InternalUtils.initTrackItemBy(<string>this.trackItemBy, this.labelField);
    }

    ngAfterViewInit() {
        if (this.value) {
            this._updateSelectedRadio();
        }
    }

    private _propagateChange:any = () => {};

    public writeValue(value: any): void {
        if (value && this._value != value) {
            this._value = value;
            if (this.initialized) {
                this._updateSelectedRadio();
            }
        }
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}

@Component({
    selector: 'jigsaw-radio-button',
    templateUrl: 'radio.html',
    styleUrls: ['radio.scss'],
    host: {
        "(click)": "_onClick()"
    }
})
export class JigsawRadioButton implements OnInit {
    @Input() public radioItem: any;

    /**
     * @internal
     */
    public _$radioLabel: string;

    private _radioGroup: JigsawRadioGroup;

    public checked: boolean = false;

    constructor(@Optional() radioGroup: JigsawRadioGroup, public cdRef: ChangeDetectorRef) {
        this._radioGroup = radioGroup;
    }

    private _onClick(): void {
        if (!this.checked) {
            this.checked = true;
        }
        if (this._radioGroup) {
            this._radioGroup.value = this.radioItem;//更新内部value
        }
    }

    ngOnInit() {
        //初始化radio显示值
        this._$radioLabel = this.radioItem[this._radioGroup.labelField];
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawRadioGroup, JigsawRadioButton],
    exports: [JigsawRadioGroup, JigsawRadioButton]
})
export class JigsawRadioModule {

}
