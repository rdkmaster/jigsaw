/**
 * Created by 10177553 on 2017/4/10.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <rdk-drop-down placeholder="请输入姓名~" [value]="name">
            <input type="text" placeholder="请输入姓名~"/>
        </rdk-drop-down>
    `
})
export class RdkDropDownInput implements OnInit {
    name: string = "Lily";

    constructor() { }

    ngOnInit() { }

}
