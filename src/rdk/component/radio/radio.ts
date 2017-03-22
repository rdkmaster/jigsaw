import {
    Component, Directive, NgModule, forwardRef, Input, ContentChildren, QueryList,
    Optional, EventEmitter, Output, AfterContentInit, OnInit, ChangeDetectorRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AbstractRDKComponent} from '../../core/api/component-api';
import {CommonUtils} from '../../core/utils/common-utils';
import {InternalUtils} from '../../core/utils/internal-utils';

@Directive({
    selector: 'rdk-radio-group'
})
export class RadioGroup extends AbstractRDKComponent implements OnInit, AfterContentInit {
    private _value: any = null;
    private _contentInit: boolean = false;

    @Input()
    public get value(): any {
        return this._value;
    }

    public set value(newValue: any) {
        if (this._value != newValue) {
            this._value = newValue;
            this._contentInit && this._updateSelectedRadio();
        }
    }

    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    //设置对象的标识
    @Input() public trackItemBy: any;

    //显示在界面上的属性名
    @Input() public labelField: string = 'label';

    @ContentChildren(forwardRef(() => RadioButton))
    private _radios: QueryList<RadioButton> = null;

    private _updateSelectedRadio(): void {
        this._radios && this._radios.forEach(radio => {
            radio.checked = CommonUtils.compareWithKeyProperty(this.value, radio.radioItem, this.trackItemBy);
            radio.cdRef.detectChanges();
        });
        this.valueChange.emit(this.value);
    }

    ngOnInit() {
        this.trackItemBy = InternalUtils.initTrackItemBy(this.trackItemBy, this.labelField);
    }

    ngAfterContentInit() {
        this._contentInit = true;
        this._updateSelectedRadio();
    }

}

@Component({
    selector: 'rdk-radio-button',
    templateUrl: 'radio.html',
    styleUrls: ['radio.scss'],
    host: {
        "(click)": "_onClick()"
    }
})
export class RadioButton implements OnInit {
    @Input() public radioItem: any;

    private _radioLabel: string;

    private _radioGroup: RadioGroup;

    public checked: boolean = false;

    constructor(@Optional() radioGroup: RadioGroup, public cdRef: ChangeDetectorRef) {
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
        this._radioLabel = this.radioItem[this._radioGroup.labelField];
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [RadioGroup, RadioButton],
    exports: [RadioGroup, RadioButton]
})
export class RadioModule {

}
