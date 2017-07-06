/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component} from '@angular/core';
import {DropDownTrigger} from "jigsaw/component/combo-select/combo-select";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
@Component({
    templateUrl: './basic.html',
    styleUrls: ['basic.scss'],
})
export class ComboSelectBasicDemo{

     openTrigger = DropDownTrigger.mouseenter;
     closeTrigger = DropDownTrigger.mouseleave;

    changeTrigger() {
        if (this.openTrigger === DropDownTrigger.click) {
            this.openTrigger = DropDownTrigger.mouseenter;
            this.closeTrigger = DropDownTrigger.mouseleave;
        } else {
            this.openTrigger = DropDownTrigger.click;
            this.closeTrigger = DropDownTrigger.click;
        }
    }

    public selectedCity = new ArrayCollection();
     citys = [
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
