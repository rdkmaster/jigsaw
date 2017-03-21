import {
    Component, Directive, NgModule, forwardRef, Input, ContentChildren, QueryList,
    Optional, EventEmitter, Output, AfterContentInit, OnInit, ChangeDetectorRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Directive({
    selector: 'rdk-radio-group'
})
export class RadioGroup implements OnInit, AfterContentInit{
    private _value: any = null;
    private _contentInit: boolean = false;

    //设置对象的标识
    @Input() trackItemBy: any;

    //显示在界面上的属性名
    @Input() labelField: string = 'label';

    @Input()
    get value() { return this._value; }
    set value(newValue: any) {
        if (this._value != newValue) {
            this._value = newValue;
            this._contentInit && this._updateSelectedRadio();
        }
    }

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(forwardRef(() => RadioButton))
    private _radios: QueryList<RadioButton> = null;

    constructor(){

    }

    private _updateSelectedRadio(): void {
        this._radios && this._radios.forEach(radio => {
            radio.checked = this._compareJsonObj(this.value, radio.radioItem);
            radio.cdRef.detectChanges();
        });
        this.valueChange.emit(this.value);
    }

    //比较两个radio是否相等
    private _compareJsonObj(item1, item2): boolean{
        for(let i = 0; i < this.trackItemBy.length; i++){
            if (item1[this.trackItemBy[i]] == item2[this.trackItemBy[i]]) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }

    /*
    * 初始化对象标识，转化为数组
    * */
    private _initTrackItemBy(): void{
        if(!this.trackItemBy){ //标识没有输入值，采用显示属性名
            this.trackItemBy = this.labelField;
        }
        if(this.trackItemBy.indexOf(",") != -1){ //标识是多个
            this.trackItemBy = this.trackItemBy.replace(" ","").split(",");
        }else { //标识是单个
            let arr = [];
            arr.push(this.trackItemBy);
            this.trackItemBy = arr;
        }
    }

    ngOnInit(){
        this._initTrackItemBy();
    }

    ngAfterContentInit(){
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
export class RadioButton implements OnInit{
    @Input() radioItem: any;

    private _radioView: string;

    public checked: boolean = false;

    private _radioGroup: RadioGroup;

    constructor(@Optional() radioGroup: RadioGroup, public cdRef: ChangeDetectorRef){
        this._radioGroup = radioGroup;
    }

    private _onClick(): void{
        if(!this.checked){
            this.checked = true;
        }
        if (this._radioGroup) {
            this._radioGroup.value = this.radioItem;//更新内部value
        }
    }

    ngOnInit(){
        //初始化radio显示值
        this._radioView = this.radioItem[this._radioGroup.labelField];
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [RadioGroup, RadioButton],
    exports: [RadioGroup, RadioButton]
})
export class RadioModule{

}
