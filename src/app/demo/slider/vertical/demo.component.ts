/**
 * Created by 10177553 on 2017/5/17.
 */
import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/core/data/array-collection";

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
    tags: string[] = [
        'JigsawSlider.vertical',
        'JigsawSlider.height',
    ];
}
