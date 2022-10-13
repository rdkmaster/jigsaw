import { Component } from '@angular/core';
import { ArrayCollection } from "jigsaw/public_api";
import { AsyncDescription } from 'app/for-external/demo-template/demo-template';

@Component({
    selector: 'combo-select-auto-width',
    templateUrl: './demo.component.html'
})
export class ComboSelectAutoWidthDemo extends AsyncDescription {
    public demoPath = "demo/combo-select/auto-width";

    public selectedCity = new ArrayCollection([{ label: "北京", closable: false }]);
    public cities = [
        { label: "北京", closable: false },
        { label: "上海", closable: false },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" },
        { label: "盐城" },
        { label: "徐州" },
        { label: "连云港" },
        { label: "连云港1" },
        { label: "连云港2" },
        { label: "连云港3" },
        { label: "哈尔滨" }
    ];
}
