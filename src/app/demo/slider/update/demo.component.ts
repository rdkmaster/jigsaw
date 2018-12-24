import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class SliderUpdateDemoComponent {
    rangeMax = 100;

    rangeValue = new ArrayCollection([30, 50, 60]);

    rangeValueStr = '30-50-60';

    updateValue() {
        this.rangeMax = 200;
        this.rangeValue.set(2, 200);
        this.rangeValue.refresh();
    }

    handleChange($event) {
        this.rangeValueStr = this.rangeValue[0] + '-' + this.rangeValue[1] + '-' + this.rangeValue[2];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawSlider.value',
        'JigsawSlider.disabled',
        'JigsawSlider.change',
        'JigsawSlider.min',
        'JigsawSlider.max',
        'JigsawSlider.marks',
        'JigsawSlider.vertical',
    ];
}
