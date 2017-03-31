/**
 * Created by 10177553 on 2017/3/29.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
    <div class="container">
        <rdk-tabs (selectChange)="testEvent($event)">
            <tab-pane label="tab 1" icon="fa fa-gift"> tab content 1</tab-pane>
            <tab-pane label="tab 2123123123123123123"> <input type="text" placeholder="请输入姓名~"></tab-pane>
            <tab-pane label="tab 3"> tab content 3</tab-pane>
            <tab-pane label="tab 4" [disabled]="true"> tab content 3</tab-pane>
            <tab-pane label="tab 5" icon="fa fa-bicycle"> tab content 5</tab-pane>
        </rdk-tabs>
    </div>
    `,
    styles:[ `
        .container {
            border: 1px solid #e9e9e9;
            border-radius: 4px;
            display: inline-block;
            width: 100%;
            position: relative;
            margin: 0 0 16px;
            -webkit-transition: all .2s;
            transition: all .2s;
            /*width: 360px;*/
        }
    `]
})
export class RdkTabsDemoComponent implements OnInit {

    testEvent(value) {
        console.info(value);
    }

    constructor() { }

    ngOnInit() { }

}
