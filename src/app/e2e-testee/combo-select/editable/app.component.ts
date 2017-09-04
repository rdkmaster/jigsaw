import {Component, Renderer2, ViewContainerRef} from '@angular/core';
import {ComboSelectValue} from "jigsaw/component/combo-select/combo-select";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class ComboSelectEditableDemo{
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    editable: boolean = true;

    toggleEditable() {
        this.editable = !this.editable;
        this.citys.forEach(item => item.closable = this.editable);
        this.selectedCity.forEach(item => item.closable = this.editable);
    }

     citys:ComboSelectValue[] = [
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"},
        {label: "盐城"},
        {label: "徐州"},
        {label: "连云港"},
        {label: "连云港1"},
        {label: "连云港2"},
        {label: "连云港3"},
        {label: "哈尔滨"}
    ];

    citysBak = this.citys;
    filter: string = '';

    public selectedCity = new ArrayCollection([this.citys[0]]);

    handleFilter(filter){
        if(filter){
            this.citys = this.citysBak.filter(city => city.label.includes(filter));
        }else{
            //空字符串
            this.citys = this.citysBak;
        }
    }

    handleSelecttedItemsChange(){
        this.filter='';
    }

}
