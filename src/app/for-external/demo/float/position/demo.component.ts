import { Component } from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'float-position',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class FloatPositionDemoComponent extends AsyncDescription {
    public demoPath = "demo/float/position";

}
