import { Component } from '@angular/core';
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
})
export class ComboSelectTextTagDemoComponent {
    textTag = false;
    clearable = true;
    multipleSelect = false;

    cities = [
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

    selectedCity = new ArrayCollection([{ label: "北京", closable: false }]);

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '利用textTag属性来控制文本的表现形式';
    description: string = '';
}
