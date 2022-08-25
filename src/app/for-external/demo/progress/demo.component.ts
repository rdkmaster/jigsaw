import { Component } from "@angular/core";
import {AsyncDescription} from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class ProgressDemoComponent extends AsyncDescription {
    public demoPath = "demo/progress";

}
