/**
 * Created by 10177553 on 2017/5/17.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <rdk-slider [range]="range"  min="10" max="200" [value]="value" [vertical]="vertical" style="height: 360px; width: 120px;"></rdk-slider>
    `
})
export class SliderVerticalDemo implements OnInit {

    vertical: boolean = true;

    value = [30, 40, 60]

    range = true;

    constructor() { }

    ngOnInit() { }

}
