/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
})
export class ComboSelectChangeDemo {

    selectedCity = new ArrayCollection([{label: "北京"}]);

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
        {label: "哈尔滨"}
    ];

    selected: string = '';

    select(data) {
        this.selected = data.label;
    }

    removed: string = '';

    remove(data) {
        this.removed = data.label;
    }

    valueChange(value) {
        console.log(value);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何利用事件将下拉视图与`JigsawComboSelect`组件实现无缝融合';
    description: string = require('!!raw-loader!../events/readme.md');
    tags: string[] = [
        'JigsawComboSelect.select',
        'JigsawComboSelect.remove',
        'JigsawComboSelect.value',
        'JigsawComboSelect.valueChange',
        'JigsawComboSelect.clearable',
        'JigsawComboSelect.placeholder',
        'JigsawComboSelect.maxWidth',
    ];
}
