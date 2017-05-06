/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';

@Component({
    templateUrl: 'dropDownWidth.html',
})
export class DropDownWidthDemo implements OnInit {
    public dropDownWidth="120%";
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

    ngOnInit() { }
    public preventAutoHide(event:Event){
        event.stopPropagation();
        event.preventDefault();
    }
}
