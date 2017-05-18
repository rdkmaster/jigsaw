/**
 * Created by 10177553 on 2017/5/17.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <rdk-slider value="120" min="20" [vertical]="vertical" style="height: 360px; width: 120px;"></rdk-slider>
    `
})
export class SliderVerticalDemo implements OnInit {

    vertical: boolean = true;

    constructor() { }

    ngOnInit() { }

}
