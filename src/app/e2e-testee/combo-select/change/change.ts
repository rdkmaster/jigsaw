/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, OnInit} from '@angular/core';
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: 'change.html',
})
export class ComboSelectChangeDemo {

    constructor() { }

    public selectedCity = new ArrayCollection([{label: "北京"}]);

     citys = [
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"},
        {label: "盐城"},
        {label: "徐州"},
        {label: "连云港"},
        {label: "哈尔滨"}
    ];

    public selected:string = '';
    select(data){
        this.selected = data.label;
    }

    public removed:string = '';
    remove(data){
        this.removed = data.label;
    }

    valueChange(value){
        console.log(value);
    }
}
