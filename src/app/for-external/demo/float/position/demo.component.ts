import { Component } from '@angular/core';
import { FloatTextService } from "../doc.service";

@Component({
    selector: 'float-position',
    templateUrl: './demo.component.html'
})
export class FloatPositionDemoComponent {
    floatPosition1 = "bottomLeft";
    floatPosition2 = "bottomRight";
    floatPosition3 = "topLeft";
    floatPosition4 = "topRight";
    floatPosition5 = "leftTop";
    floatPosition6 = "leftBottom";
    floatPosition7 = "rightTop";
    floatPosition8 = "rightBottom";
    constructor(public doc: FloatTextService) {
    }
}
