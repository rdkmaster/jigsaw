/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {RdkDropDown} from "../../../../../component/dropdown/dropdown";

@Component({
    templateUrl: 'dropDownWidth.html',
})
export class DropDownWidthDemo implements AfterViewInit {
    public dropDownWidth="120%";
    public selectedCity = [{label: "北京"}];

    @ViewChild(RdkDropDown) dropDown:RdkDropDown;

    constructor() {
    }

    ngAfterViewInit() {
        this.dropDown.change.subscribe(data => {
            console.log(data);
        })
    }

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

    public preventAutoHide(event:Event){
        event.stopPropagation();
        event.preventDefault();
    }
}
