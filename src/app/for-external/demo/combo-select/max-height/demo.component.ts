import { Component } from '@angular/core';
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'combo-select-max-height',
    templateUrl: './demo.component.html',
})
export class ComboSelectMaxHeightDemoComponent extends AsyncDescription {
    public demoPath = "demo/combo-select/max-height";


    public selectedCity = new ArrayCollection([{ label: "北京" }]);
    public selectedCity2 = new ArrayCollection([{ label: "北京" }]);

    public cities = [
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" },
        { label: "盐城" },
        { label: "徐州" },
        { label: "连云港" },
        { label: "哈尔滨" },
        { label: "南通" },
        { label: "淮安" },
        { label: "无锡" },
        { label: "常州" },
        { label: "扬州" },
        { label: "苏州" },
        { label: "杭州" },
        { label: "长春" },
        { label: "乌鲁木齐" }
    ];
}
