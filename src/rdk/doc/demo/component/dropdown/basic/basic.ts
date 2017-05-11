/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {DropDownTrigger, DropdownInputValue} from "../../../../../component/dropdown/dropdown";
@Component({
    templateUrl: './basic.html',
})
export class RdkDropDownInput implements OnInit {

    private openTrigger = DropDownTrigger.click;
    private stopTrigger = DropDownTrigger.click;

    constructor(private _render: Renderer2,
                private _elementRef: ElementRef) {
    }

    changeTriger() {
        if (this.openTrigger === DropDownTrigger.click) {
            this.openTrigger = DropDownTrigger.mouseover;
        } else {
            this.openTrigger = DropDownTrigger.click;
        }
    }

    private disabled = false;

    public changeDisabled() {
        this.disabled = !this.disabled;
    }

    public selectedCity: DropdownInputValue = [{label: "北京", closable: false}];
    private citys = [
        {label: "北京", closable: false},
        {label: "上海", closable: false},
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

    public clickProcess(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }

    public basicSelectChange() {
        setTimeout(() => {
            let width = this._elementRef.nativeElement.querySelector('.drop-down-father').offsetWidth + 'px';
            if (document.querySelector('rdk-tile-select')) {
                this._render.setStyle(document.querySelector('.drop-down-child'), 'width', width)
            }
            ;
        }, 0);
    }

    ngOnInit() {
    }

}
