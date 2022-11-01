import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'progress-circle-progress',
    templateUrl: "./demo.component.html"
})
export class CircleProgressDemoComponent extends AsyncDescription {
    public demoPath = "demo/progress/circle-progress";

}
