/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {RdkDropDown} from "../../../../../component/dropdown/dropdown";
import {TagGroupValue} from "../../../../../component/tag/tag";

@Component({
    templateUrl: 'labelField.html',
})
export class DropDownLabelFieldDemo {

    public labelField = "name";
    public selectedCity: TagGroupValue = [{name: "北京", closable: false}];
    private citys = [
        {name: "北京", closable: false},
        {name: "上海", closable: false},
        {name: "南京"},
        {name: "深圳"},
        {name: "长沙"},
        {name: "西安"},
        {name: "盐城"},
        {name: "徐州"},
        {name: "连云港"},
        {name: "连云港1"},
        {name: "连云港2"},
        {name: "连云港3"},
        {name: "哈尔滨"}
    ];

}
