import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/public_api";
import {ComboSelectTextService} from "../doc.service";

@Component({
    selector: 'combo-select-single',
    templateUrl: './demo.component.html'
})
export class ComboSelectSingleDemoComponent {
    valueChange(value) {
        console.log(value);
    }

    selectedCity: ArrayCollection<any> = new ArrayCollection([{label: "北京", closable: false}]);
    cities = [
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

    constructor(public doc: ComboSelectTextService) {
    }

}
