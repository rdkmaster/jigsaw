/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
})
export class ComboSelectLabelFieldDemo {
    selectedCity = new ArrayCollection([{name: "北京"}]);
    cities = [
        {name: "北京"},
        {name: "上海"},
        {name: "南京"},
        {name: "深圳"},
        {name: "长沙"},
        {name: "西安"},
        {name: "盐城"},
        {name: "徐州"},
        {name: "连云港"},
        {name: "哈尔滨"}
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawComboSelect.labelField'
    ];
}
