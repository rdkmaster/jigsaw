/**
 * Created by 10177553 on 2017/4/13.
 */

import {
    Component, OnInit
} from '@angular/core';
import {ArrayCollection} from "jigsaw/core/data/array-collection";
@Component({
    templateUrl: 'autoWidth.html'
})
export class ComboSelectAutoWidthDemo implements OnInit {

    public selectedCity = new ArrayCollection([{label: "北京", closable: false}]);
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

    ngOnInit() {

    }

}
