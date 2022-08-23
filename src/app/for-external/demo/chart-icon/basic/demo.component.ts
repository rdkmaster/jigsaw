import { Component } from "@angular/core";
import {
    InternalUtils,
} from "jigsaw/public_api";
import { ChartIconTextService } from "../doc.service";

@Component({
    selector: 'chart-icon-basic',
    templateUrl: './demo.component.html'
})
export class ChartIconBasicDemoComponent {
    public longData = [5, 3, 9, 9, 6, 7, 9, 6, 7, 3, 3, 6, 5, 9, 6, 9, 6, 7, 3, 5, 2];
    public shortData = [5, 3, 9, 6];

    constructor(public doc: ChartIconTextService) {
        setInterval(() => {
            this.shortData = this.shortData.map(_ => InternalUtils.randomNumber(0, 10));
            this.longData.push(InternalUtils.randomNumber(0, 10));
            this.longData = this.longData.slice(1);
        }, 1000);
    }
}
