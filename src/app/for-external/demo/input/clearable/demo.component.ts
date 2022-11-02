import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'input-clearable',
    templateUrl: './demo.component.html'
})
export class InputClearableDemoComponent extends AsyncDescription {
    public demoPath = "demo/input/clearable";

}
