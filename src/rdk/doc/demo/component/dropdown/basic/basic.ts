/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {DropDownMode, RdkDropDown, DropDownTrigger} from "../../../../../component/dropdown/dropdown";

@Component({
    templateUrl: './basic.html',
    styles: []
})
export class RdkDropDownInput implements OnInit {
    //todo    阻止click冒泡事件可以实现autoCloseDropDown 这一属性
    public clickProcess(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }

    constructor() {
    }

    ngOnInit() {
    }

}
