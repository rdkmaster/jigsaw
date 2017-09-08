import {Component, Renderer2, ViewContainerRef} from '@angular/core';
import {ArrayCollection, LocalPageableArray, PageableArray} from "jigsaw/core/data/array-collection";
import {Http} from "@angular/http";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class ComboSelectAutoCompleteDemo {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, public http: Http) {
        this.cities2 = new PageableArray(http, {
            url: 'http://localhost:4200/mock-data/array-collection/paging-cities.json',
            params: {aa: 11, bb: 22},
            method: 'get'
        });
        this.cities2.fromAjax();
    }

    cities2: PageableArray;
    selectedCity2: ArrayCollection<any>=new ArrayCollection([{id: 1, name: '北京'}]);
    handleFilter2(filterKey){
        this.cities2.filter(filterKey, ['name']);
    }

    cities = new LocalPageableArray([
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

    public selectedCity = new ArrayCollection([this.cities[0]]);

    handleFilter(filterKey) {
        this.cities.filter(filterKey, ['label']);
    }

}
