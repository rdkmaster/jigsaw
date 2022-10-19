import { Component } from "@angular/core";
import {AsyncDescription} from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class CheckBoxDemoComponent extends AsyncDescription {
    demoPath = 'demo/checkbox';
}
