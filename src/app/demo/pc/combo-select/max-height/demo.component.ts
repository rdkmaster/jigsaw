import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
})
export class ComboSelectMaxHeightDemo {

    selectedCity = new ArrayCollection([{label: "北京"}]);
    selectedCity2 = new ArrayCollection([{label: "北京"}]);

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
        {label: "哈尔滨"},
        {label: "南通"},
        {label: "淮安"},
        {label: "无锡"},
        {label: "常州"},
        {label: "扬州"},
        {label: "苏州"},
        {label: "杭州"},
        {label: "长春"},
        {label: "乌鲁木齐"}
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了combo-select如何设置高度和实现多行滚动显示';
    description: string = require('!!raw-loader!../events/readme.md');
}
