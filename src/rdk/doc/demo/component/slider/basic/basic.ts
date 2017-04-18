/**
 * Created by 10177553 on 2017/4/13.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <h4>1. 基本滑动条,滑动事件变化. </h4>
        <rdk-switch [(checked)]="disabled" size="small"></rdk-switch>
        <rdk-slider [value]="value1" [disabled]="disabled" (change)="slderChange($event)"></rdk-slider>
        <hr>
        <br>
        <h4>2. 设置了min和max的滑动条</h4>
        <rdk-slider [(value)]="value" [min]="min" [max]="max"></rdk-slider> <span>取值: {{value}}</span>
        <hr>
        <br>
        <h4>3. 改变step</h4>
        <rdk-slider [(value)]="valueStep" min="0" max="2" step="0.01"></rdk-slider> <span>取值: {{valueStep}}</span>
        
        <hr>
        <br>
        <h4>4. 双触点滑动条</h4>
        <rdk-slider [(value)]="valueStep" min="0" max="2" step="0.01"></rdk-slider> <span>取值: {{valueStep}}</span>
    `
})
export class RdkSliderDemoBasic implements OnInit {
    constructor() { }

    value1: number = 30;

    value: number = 10;
    disabled: boolean = false;

    min = 1;
    max = 20;

    valueStep = 1;

    slderChange(value) {
        console.info("当前值: " + value);
    }
    ngOnInit() { }

}
