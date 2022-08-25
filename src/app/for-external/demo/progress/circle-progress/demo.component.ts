import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'circle-progress',
    templateUrl: "./demo.component.html"
})
export class CircleProgressDemoComponent extends AsyncDescription {
    public demoPath = "demo/progress/circle-progress";

}
