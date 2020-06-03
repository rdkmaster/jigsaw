import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/mobile_public_api";

@Component({
    templateUrl: 'demo.component.html'
})
export class SliderVerticalDemoComponent {
    vertical: boolean = true;
    value = new ArrayCollection([30, 40, 60]);

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
