import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'numeric-input-step',
    templateUrl: './demo.component.html'
})
export class NumericInputStepDemoComponent extends AsyncDescription {
    public demoPath = "demo/numeric-input/step";
    public selectedSize = { size: "default" };
}
