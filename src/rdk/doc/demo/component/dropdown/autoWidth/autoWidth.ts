/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';

@Component({
    templateUrl: 'autoWidth.html',
})
export class DropDownAutoWidthDemo implements OnInit {
    constructor(private _render: Renderer2,
                private _elementRef: ElementRef) {
    }

    @ViewChild("dropcontent", {read: ElementRef}) dropcontent: ElementRef;

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
        {label: "连云港1"},
        {label: "连云港2"},
        {label: "连云港3"},
        {label: "哈尔滨"}
    ];
    public clickProcess(event:Event){
        event.stopPropagation();
        event.preventDefault();
    }
    public basicSelectChange() {
        setTimeout(() => {
            let width = this._elementRef.nativeElement.querySelector('.drop-down-father').offsetWidth + 'px';
            if(document.querySelector('rdk-tile-select')){
                this._render.setStyle(document.querySelector('.drop-down-child'),'width',width)
            };
        }, 0)
    }

    ngOnInit() {

    }

}
