import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {DropDownTrigger, DropdownInputValue} from "../../../../../component/dropdown/dropdown";
@Component({
    templateUrl: 'open.html',
    styleUrls: ['open.scss'],
})
export class OpenDropDownDemo {

    private open: boolean = true;
    public autoClose: boolean = true;

    toggleOpen() {
        this.open = !this.open
    }

    toggleAutoClose() {
        this.autoClose = !this.autoClose
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

}
