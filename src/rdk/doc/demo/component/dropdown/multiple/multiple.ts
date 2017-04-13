/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {DropDownMode, RdkDropDown} from "../../../../../component/dropdown/dropdown";

@Component({
    template: `
        <rdk-drop-down placeholder="请输入姓名~" #drop  class="drop" [mode]="mode" [value]="selectedCity">
            <rdk-tile-select [(selectedItems)]="selectedCity" labelField="label"
                 [multipleSelect]="true" [searchable]="true"
                 [data]="citys" 
                 tileOptionWidth="100px">
            </rdk-tile-select>
        </rdk-drop-down>
    `,
    styles: [`
        .drop {
            position: relative;
            width: 240px;
        }
    `]
})
export class DropDownMultipleDemo implements OnInit {
    @ViewChild("drop") drop: RdkDropDown;

    constructor(private _changeDetector: ChangeDetectorRef) { }

    mode = DropDownMode.multiple;


    public selectedCity = [{label: "北京"}];

    citys = [
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ];
    // public selectedCity = this.citys;

    ngOnInit() { }

}
