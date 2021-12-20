import {Component} from "@angular/core";
import {
    ChartIconCustomPie,
    InternalUtils,
    JigsawTheme,
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ChartIconBasicDemoComponent {
    constructor() {
        setInterval(() => {
            this.data = this.data.map(x => InternalUtils.randomNumber(0, 10));
        }, 1000);
    }

    data = [5, 3, 9, 6, 5, 9, 7, 3, 5, 2];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
