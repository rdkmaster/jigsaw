/**
 * Created by 10177553 on 2017/4/13.
 */

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {JigsawComboSelect} from "jigsaw/component/combo-select/combo-select";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './app.component.html',
})
export class ComboSelectWidthDemo implements AfterViewInit {
    selectedCity = new ArrayCollection([{label: "北京"}]);

    @ViewChild(JigsawComboSelect) comboSelect: JigsawComboSelect;

    ngAfterViewInit() {
        this.comboSelect.select.subscribe(data => {
            console.log(data);
        })
    }

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


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
