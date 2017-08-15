import {
    NgModule, Component, ContentChildren, QueryList, AfterContentInit, Input, forwardRef, Optional, OnDestroy,
    OnInit, Output, EventEmitter, ChangeDetectorRef, Directive, Renderer2, ElementRef, ViewChildren, AfterViewInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AbstractJigsawComponent} from "../core";
import {CommonUtils} from '../../core/utils/common-utils';
import {InternalUtils} from '../../core/utils/internal-utils';
import {JigsawScrollBarModule} from '../../directive/scrollbar/scrollbar';
import {ArrayCollection} from "../../core/data/array-collection";

@Directive({
    selector: '.jigsaw-option-list',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    }
})
export class OptionList extends AbstractJigsawComponent{

}

@Component({
    selector: 'jigsaw-select',
    templateUrl: 'select.html',
    //styleUrls: ['select.scss'],
    host: {
        "(click)": "_toggleClick($event)",
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height'
    }
})
export class JigsawSelect extends AbstractJigsawComponent implements AfterViewInit, OnDestroy, OnInit {
    /**
     * @internal
     */
    public _$optionListHidden: boolean = true; // 设置option列表是否显示
    private _value: any; // select表单值
    private _contentInit: boolean = false; //子组件加载标记
    private _documentListen: Function; // document事件解绑函数

    /**
     * @internal
     */
    public _$selectedLabel: string;

    //select form表单值
    @Input()
    public get value(): any {
        return this._value;
    }

    public set value(newValue: any) {
        if (newValue && this._value != newValue) {
            this._value = newValue;
            this._$selectedLabel = newValue[this.labelField];
            this._contentInit && this._updateSelectedOption();
        }
    }

    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    //设置对象的标识
    @Input() public trackItemBy: string|string[];

    //显示在界面上的属性名
    @Input() public labelField: string = 'label';

    @Input() public placeholder: string;

    @Input() public optionWidth: string;

    @Input() public optionHeight: string;

    @Input() public optionCount: number;

    @Input() data: ArrayCollection<object>;

    //获取映射的子组件option
    @ViewChildren(forwardRef(() => JigsawOption))
    private _options: QueryList<JigsawOption> = null;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        super()
    }

    //点击组件，显示\隐藏option列表
    private _toggleClick(event: Event): void {
        event.stopPropagation();
        this._$optionListHidden = !this._$optionListHidden;
        if (this._$optionListHidden) {
            this._documentListen();
        } else {
            this._documentListen = this._renderer.listen('document', 'click', () => this._$optionListHidden = true);
        }
    }
    //更改option选中状态
    private _updateSelectedOption(): void {
        this._options.length && this._options.forEach((option) => {
            option.selected = CommonUtils.compareWithKeyProperty(this.value, option.optionItem, <string[]>this.trackItemBy);
            option.cdRef.detectChanges();
        });
        this.valueChange.emit(this.value);
    };

    private _setOptionListHeight(){
        if(this.optionCount){
            if ( this.data && this.data.length > this.optionCount) {
                this.optionHeight = this._elementRef.nativeElement.offsetHeight * this.optionCount + 'px';
            }

        }
    }

    ngOnInit() {
        this.trackItemBy = InternalUtils.initTrackItemBy(<string>this.trackItemBy, this.labelField);
        this._setOptionListHeight();
    }

    ngAfterViewInit() {
        this._contentInit = true;
        this.value && this._updateSelectedOption();
    }

    ngOnDestroy() {
        this._documentListen && this._documentListen();//解绑document上的点击事件
    }

}

@Component({
    selector: 'jigsaw-select-option',
    templateUrl: 'option.html',
    //styleUrls: ['option.scss'],
    host: {
        "(click)": "_onClick()",
        '[style.height]': '_height',
        '[style.line-height]': '_height'
    }
})
export class JigsawOption implements OnInit {
    @Input() public optionItem: any;

    /**
     * @internal
     */
    public _$optionLabel: string;

    private _selectCmp: JigsawSelect;

    private _height: string;

    public selected: boolean = false;//选中状态

    constructor(@Optional() selectCmp: JigsawSelect, public cdRef: ChangeDetectorRef) {
        this._selectCmp = selectCmp;
    }

    private _onClick(): void {
        if (!this.selected) {
            this.selected = true;
            if (this._selectCmp) {
                this._selectCmp.value = this.optionItem;//更新内部value
            }
        }
    }

    ngOnInit() {
        //初始化option显示值
        this._$optionLabel = this.optionItem[this._selectCmp.labelField];
        this._selectCmp.height ? this._height = this._selectCmp.height : null;
    }

}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawScrollBarModule],
    declarations: [JigsawSelect, JigsawOption, OptionList],
    exports: [JigsawSelect, JigsawOption]
})
export class JigsawSelectModule {

}
