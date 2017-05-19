/**
 * Created by 10177553 on 2017/4/13.
 */

import {Component, OnInit} from '@angular/core';

@Component({
    template: `
        <rdk-combo-select [pane]="dropcontent"
                          placeholder="请输入姓名~"
                          class="drop"
                          [value]="selectedCity">
        </rdk-combo-select>
        <ng-template #dropcontent>
            <rdk-tile-select [(selectedItems)]="selectedCity"
                             labelField="label"
                             [multipleSelect]="true"
                             [searchable]="true"
                             [data]="citys"
                             tileOptionWidth="100px">
            </rdk-tile-select>
        </ng-template>
    `,
    styles: []
})
export class ComboSelectMultipleDemo implements OnInit {

    constructor() {
    }

    public selectedCity = [{label: "北京"}];
    citys = [
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ];

    ngOnInit() {
    }

}
