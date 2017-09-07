import {Component, Renderer2, ViewContainerRef} from '@angular/core';
import {ArrayCollection, LocalPageableArray} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AutoCompleteDemo {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    citys = new LocalPageableArray([
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
    ]);

    public selectedCity = new ArrayCollection([this.citys[0]]);

    citysBak = this.citys;

    handleFilter(filter) {
        if (filter) {
            this.citysBak = this.citys.filter(city => city.label.includes(filter));
        } else {
            //空字符串
            this.citysBak = this.citys;
        }
    }

}
