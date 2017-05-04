/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {DropDownMode, RdkDropDown} from "../../../../../component/dropdown/dropdown";

@Component({
    templateUrl: 'change.html',
})
export class DropDownChangeDemo implements OnInit {

    constructor() { }

    mode = DropDownMode.multiple;


    public selectedCity = [{label: "北京"}];

    private citys = [
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

    change(evt){
        console.log("--------------")
        console.log(evt)
    }

    public clickProcess(event:Event){
        event.stopPropagation();
        event.preventDefault();
    }

    ngOnInit() { }

}
