/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, OnInit, ChangeDetectorRef, ViewChild, Renderer2, ElementRef} from '@angular/core';
import {DropDownMode, RdkDropDown} from "../../../../../component/dropdown/dropdown";

@Component({
    templateUrl: 'dropDownWidth.html',
})
export class DropDownWidthDemo implements OnInit {

    constructor(private _render: Renderer2,
                private _elementRef: ElementRef) {
    }


    mode = DropDownMode.multiple;

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
    public clickProcess(event:Event){
        event.stopPropagation();
        event.preventDefault();
    }
    public basicSelectChange() {
         setTimeout(() => {
             console.log(parseFloat(this.dropDownWidth));
             let value= typeof this.dropDownWidth === 'string' ? this.dropDownWidth : this.dropDownWidth + '';
             const match = value ? value.match(/^\s*(\d+)(%|px)\s*$/) : null;
             let width;
             if (match && match[2] == '%') {
                 width = parseInt(match[1]) / 100 * this._elementRef.nativeElement.querySelector('.drop-down-father').offsetWidth  + 'px';
             } else {
                 width = this._elementRef.nativeElement.querySelector('.drop-down-father').offsetWidth + 'px';
             }

             if(document.querySelector('rdk-tile-select')){
                 this._render.setStyle(document.querySelector('.drop-down-child'),'width',width)
             };
         }, 0)
    }
}
