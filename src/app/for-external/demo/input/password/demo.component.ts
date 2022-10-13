import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "input-password",
    templateUrl: './demo.component.html',
})

export class InputPasswordComponent extends AsyncDescription {
    public demoPath = "demo/input/password";

}
