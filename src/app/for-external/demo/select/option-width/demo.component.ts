import {Component} from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "select-option-width",
    templateUrl: "./demo.component.html"
})

export class SelectOptionWidthDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/option-width";
    public selectedSize = { size: "medium" };

    public optionWidth = 400;
}
