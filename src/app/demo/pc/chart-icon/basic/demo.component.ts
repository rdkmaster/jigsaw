import {Component} from "@angular/core";
import {
    InternalUtils,
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ChartIconBasicDemoComponent {
    constructor() {
        setInterval(() => {
            this.shortData = this.shortData.map(_ => InternalUtils.randomNumber(0, 10));
            this.longData.push(InternalUtils.randomNumber(0, 10));
            this.longData = this.longData.slice(1);
        }, 1000);
    }

    longData = [5, 3, 9, 9, 6, 7, 9, 6, 7, 3, 3, 6, 5, 9, 6, 9, 6, 7, 3, 5, 2];
    shortData = [5, 3, 9, 6];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了chart-icon的基本用法，注：chart-icon一般尺寸都很小，本demo为了演示方便特意将其做的很大；';
    description: string = '';
}
