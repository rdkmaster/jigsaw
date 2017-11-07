/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html',
})
export class ComboSelectChangeDemo extends DemoBase {

    selectedCity = new ArrayCollection([{label: "北京"}]);

    cities = [
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

    selected: string = '';

    select(data) {
        this.selected = data.label;
    }

    removed: string = '';

    remove(data) {
        this.removed = data.label;
    }

    valueChange(value) {
        console.log(value);
    }
}
