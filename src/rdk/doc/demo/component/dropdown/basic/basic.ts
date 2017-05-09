/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component, OnInit} from '@angular/core';

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

    public inputValue: string = "hello angular";

    constructor() {
    }

    ngOnInit() {
    }

}
