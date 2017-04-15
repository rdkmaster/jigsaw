/**
 * Created by 10177553 on 2017/4/13.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <rdk-slider [value]="value1"></rdk-slider>
        <rdk-slider [value]="value2"></rdk-slider>
    `
})
export class RdkSliderDemoBasic implements OnInit {
    constructor() { }

    value1: number = 30;
    value2: number = 50;

    ngOnInit() { }

}
