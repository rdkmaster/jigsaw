import {Component} from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "switch-basic",
    templateUrl: "./demo.component.html"
})

export class SwitchBasicComponent extends AsyncDescription {
    public demoPath = "demo/switch/basic";
    public selectedSize = { size: "medium" };

    public checked: boolean;
}
