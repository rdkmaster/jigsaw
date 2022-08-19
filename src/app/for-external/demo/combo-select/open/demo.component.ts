import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/public_api";
import {ComboSelectTextService} from "../doc.service";

@Component({
    selector: 'combo-select-open',
    templateUrl: './demo.component.html'
})
export class ComboSelectOpenDemoComponent {
    public open: boolean = false;

    public toggleOpen() {
        this.open = !this.open
    }

    public selectedCity = new ArrayCollection([{label: "北京", closable: false}]);
    public cities = [
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
