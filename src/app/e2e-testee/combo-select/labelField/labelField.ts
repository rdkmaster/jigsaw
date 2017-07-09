/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: 'labelField.html',
})
export class ComboSelectLabelFieldDemo {

    public labelField = "name";
    public selectedCity = new ArrayCollection([{name: "北京", closable: false}]);
     citys = [
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
