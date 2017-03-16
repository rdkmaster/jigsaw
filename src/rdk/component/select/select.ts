import {
    NgModule, Component, ContentChildren, QueryList, AfterContentInit, Input, forwardRef, Optional, Renderer, OnDestroy,
    OnInit, Compiler, ComponentFactory, ViewChild, ViewContainerRef
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DataSourceService} from '../../../app/data-source.service';

type OptionValue = {
    value: any,
    viewValue: any
};

@Component({
    selector: 'rdk-select',
    templateUrl: 'select.html',
    styleUrls: ['select.scss'],
    host: {
      "(click)": "_toggleClick($event)",
    },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectComponent),
        multi: true
    }]
})
export class SelectComponent implements AfterContentInit, ControlValueAccessor, OnDestroy, OnInit{
    optionListHidden: boolean = true; //设置option列表是否显示
    viewValue: any; //select显示值
    _value: any; //select表单值
    _options: any; //select的option属性

    //用于数据源获取option数据，加载option
    @Input() url: string;
    @ViewChild('insert', {read: ViewContainerRef}) insert;
    dynamicOptionCmptArr = [];

    //获取映射的子组件option
    @ContentChildren(forwardRef(() => OptionComponent))
    contentOptions: QueryList<OptionComponent> = null;

    //document事件解绑函数
    documentListen: Function;

    //select form表单值
    get value(): any { return this._value; }
    set value(newValue: any) {
        if (this._value != newValue) {
            this._value = newValue;
            this._updateSelectedOption();
        }
    }

    constructor(renderer: Renderer, private dsService: DataSourceService, private compiler: Compiler){
        this.documentListen = renderer.listenGlobal('document', 'click', () => this.optionListHidden = true);
    }

    ngOnDestroy(){
        this.documentListen();//解绑document上的点击事件
    }

    ngOnInit(){
        if(this.url){
            this.dsService.getData(this.url).then(optionValues => {
                optionValues.forEach(optionValue => {
                    let factory: ComponentFactory<any> = this._compileToComponent(optionValue);
                    let optionCmpt = this.insert.createComponent(factory)._component;
                    this.dynamicOptionCmptArr.push(optionCmpt);
                });
                this._getOptions();
                this._updateSelectedOption();
            });
        }
    }

    //子组件初始化钩子
    ngAfterContentInit() {
        this._getOptions();
    }

    //动态编译option
    private _compileToComponent(optionValue): ComponentFactory<any> {
        @Component({
            selector: 'rdk-option',
            templateUrl: 'option.html',
            styleUrls: ['option.scss'],
            host: {
                "(click)": "onClick()"
            }
        })
        class DynamicComponent extends OptionComponent{
            optionValue = optionValue;
            constructor(@Optional() selectCmp: SelectComponent){
                super(selectCmp);
            }

        }
        @NgModule({
            declarations: [DynamicComponent]
        })
        class DynamicModule {
        }
        return this.compiler.compileModuleAndAllComponentsSync(DynamicModule).componentFactories.find(x => x.componentType === DynamicComponent);
    }

    //点击组件，显示\隐藏option列表
    _toggleClick(event: Event){
        event.stopPropagation();
        this.optionListHidden = !this.optionListHidden;
    }
    //获取select的options
    private _getOptions(){
        if (this.contentOptions && this.contentOptions.length) { //content加载的子组件
            this._options = this.contentOptions;
        }else if(this.dynamicOptionCmptArr.length){ //数据源加载的子组件
            this._options = this.dynamicOptionCmptArr;
        }
    }

    //更改option选中状态
    private _updateSelectedOption(): void {
        this._options && this._options.forEach((option) => {
            option.selected = this.value == option.optionValue.value;//设置option选中状态
            if(this.value == option.optionValue.value){
                this.viewValue = option.optionValue.viewValue;//设置select显示值
            }
        });
    };

    //outside to inside
    writeValue(outsideValue: any): void {
        this.value = outsideValue;
    };

    _onChange = (value: any) => {};
    _onTouched = () => {};

    //inside to outside
    //注册一个方法, 当 inside value updated then need call it : fn(newValue)
    registerOnChange(fn: (newValue : any) => void): void {
        this._onChange = fn;
    };

    //inside to outside
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

}


@Component({
    selector: 'rdk-option',
    templateUrl: 'option.html',
    styleUrls: ['option.scss'],
    host: {
        "(click)": "onClick()"
    }
})
export class OptionComponent{
    @Input()
    optionValue: OptionValue;

    selected:boolean = false;//选中状态

    selectCpt: SelectComponent;

    constructor(@Optional() selectCpt: SelectComponent){
        this.selectCpt = selectCpt;
    }

    onClick(){
        if(!this.selected){
            this.selected = true;
            if (this.selectCpt) {
                this.selectCpt.value = this.optionValue.value;//更新内部value
                this.selectCpt._onChange(this.optionValue.value);//更新外部(双向绑定)
                this.selectCpt._onTouched();
            }
        }
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [SelectComponent, OptionComponent],
    exports: [SelectComponent, OptionComponent]
})
export class SelectModule{

}
