/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {DropDownMode, RdkDropDown} from "../../../../../component/dropdown/dropdown";

@Component({
    templateUrl: 'labelField.html',
})
export class DropDownLabelFieldDemo implements OnInit {

    constructor() { }

    mode = DropDownMode.multiple;


    public selectedCity = [{name: "北京"}];
    public labelField="name";
    private citys = [
        {name: "北京"},
        {name: "上海"},
        {name: "南京"},
        {name: "深圳"},
        {name: "长沙"}
    ];
    public clickProcess(event:Event){
        event.stopPropagation();
        event.preventDefault();
    }
    ngOnInit() { }

}
