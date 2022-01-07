import { Component } from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ComboSelectSelectIconDemo {
    cities = [
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" },
        { label: "盐城" },
        { label: "徐州" },
        { label: "连云港" },
        { label: "哈尔滨" }
    ];

    icon = "iconfont iconfont-e24c";
    rotate = true;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何定制combo-select组件的下拉按钮，以及是否旋转';
    description: string = '';
}
