import {
    NgModule, Component, QueryList, Input, forwardRef, Optional, OnDestroy,
    OnInit, Output, EventEmitter, ChangeDetectorRef, Directive, Renderer2, ElementRef,
    ViewChildren, AfterViewInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractJigsawComponent} from "../common";
import {CallbackRemoval, CommonUtils} from '../../core/utils/common-utils';
import {InternalUtils} from '../../core/utils/internal-utils';
import {ArrayCollection} from "../../core/data/array-collection";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@Directive({
    selector: '.jigsaw-select-option-list',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    }
})
export class OptionList extends AbstractJigsawComponent {

}

@Component({
    selector: 'jigsaw-select, j-select',
    templateUrl: 'select.html',
    host: {
        "(click)": "_toggleClick($event)",
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSelect), multi: true},
    ]
})
export class JigsawSelect extends AbstractJigsawComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnInit {

    /**
     * @internal
     */
    public _$optionListHidden: boolean = true; // 设置option列表是否显示
    private _value: any; // select表单值
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
            this._propagateChange(newValue);
        }
        this.writeValue(newValue);
    }

    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    //设置对象的标识
    @Input() public trackItemBy: string | string[];

    //显示在界面上的属性名
    @Input() public labelField: string = 'label';

    @Input() public placeholder: string;

    @Input() public optionWidth: string;

    @Input() public optionHeight: string;

    @Input() public optionCount: number;

    private _dataCallbackRemoval: CallbackRemoval;

    private _data: ArrayCollection<object>;

    @Input()
    public get data(): ArrayCollection<object> | object[] {
        return this._data;
    }

    public set data(value: ArrayCollection<object> | object[]) {
        this._data = value instanceof ArrayCollection ? value : new ArrayCollection(value);
        if (this._dataCallbackRemoval) {
            this._dataCallbackRemoval()
        }
        this._dataCallbackRemoval = this._data.onRefresh(this._setOptionListHeight, this);
        if (this.initialized) {
            // 初始化之后赋值，要计算下拉的高度
            this._setOptionListHeight();
        }
    }

    //获取映射的子组件option
    @ViewChildren(forwardRef(() => JigsawOption))
    private _options: QueryList<JigsawOption> = null;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        super();
        this._renderer.addClass(this._elementRef.nativeElement, 'jigsaw-select-host');
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
    };

    private _setOptionListHeight() {
        if (this.optionCount) {
            if (this._data && this._data.length > this.optionCount) {
                this.optionHeight = this._elementRef.nativeElement.offsetHeight * this.optionCount + 'px';
            }
        }
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.value) {
            this._$selectedLabel = this.value[this.labelField];
        }
        this.trackItemBy = InternalUtils.initTrackItemBy(<string>this.trackItemBy, this.labelField);
        this._setOptionListHeight();
    }

    ngAfterViewInit() {
        if (this.value) {
            this._updateSelectedOption();
        }
    }

    ngOnDestroy() {
        if (this._documentListen) {
            // 解绑document上的点击事件
            this._documentListen();
        }
        if (this._dataCallbackRemoval) {
            this._dataCallbackRemoval()
        }
    }

    private _propagateChange: any = () => {
    };

    public writeValue(value: any): void {
        if (!value || this._value == value) {
            return;
        }
        this._value = value;
        if (this.initialized) {
            this._$selectedLabel = value[this.labelField];
            this._updateSelectedOption();
            this.valueChange.emit(this.value);
        }
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}

@Component({
    selector: 'jigsaw-select-option, j-select-option',
    templateUrl: 'option.html',
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

    constructor(@Optional() selectCmp: JigsawSelect,
                public cdRef: ChangeDetectorRef,
                private _renderer: Renderer2,
                private _elementRef: ElementRef) {
        this._selectCmp = selectCmp;
        this._renderer.addClass(this._elementRef.nativeElement, 'jigsaw-select-option-host');
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
    imports: [CommonModule, FormsModule, PerfectScrollbarModule],
    declarations: [JigsawSelect, JigsawOption, OptionList],
    exports: [JigsawSelect, JigsawOption]
})
export class JigsawSelectModule {
}
