import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class SliderMultiValueComponent {
    rangeValue1 = new ArrayCollection([20, 50, 80]);
    rangeValue2 = new ArrayCollection([20, 50, 80]);

    get sortedValue(): string {
        return [...this.rangeValue1].sort((a, b) => a - b).join('-');
    }

    handleChange() {
        this.rangeValue2.sort((a, b) => a - b);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo主要给出如何处理slider多个值的情形';
    description: string = '';
}
