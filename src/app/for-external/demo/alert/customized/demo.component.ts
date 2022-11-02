import { Component, ViewEncapsulation } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'alert-customized',
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizeAlertDemoComponent extends AsyncDescription {
    public demoPath = 'demo/alert/customized';
}
