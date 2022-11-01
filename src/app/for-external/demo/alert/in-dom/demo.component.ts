import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "alert-in-dom",
    templateUrl: "./demo.component.html"
})
export class AlertInDomDemoComponent extends AsyncDescription {
    public demoPath = 'demo/alert/in-dom';
}
