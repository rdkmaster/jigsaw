import { Component } from '@angular/core';
import { FloatTextService } from "../doc.service";

@Component({
    selector: 'float-position',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class FloatPositionDemoComponent {
    constructor(public doc: FloatTextService) {
    }
}
