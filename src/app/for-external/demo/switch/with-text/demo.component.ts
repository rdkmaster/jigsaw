import {Component} from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'switch-with-text',
    templateUrl: './demo.component.html',
})
export class SwitchWithTextDemoComponent extends AsyncDescription {
    public demoPath = "demo/switch/with-text";
    public selectedSize = { size: "medium" };

    public checked: boolean;
}
