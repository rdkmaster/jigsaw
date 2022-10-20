import {Component} from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "button-icon",
    templateUrl: "./demo.component.html"
})
export class ButtonIconComponent extends AsyncDescription {
    public demoPath = "demo/button/icon";
    public selectedSize = { size: "default" };

    public onClick() {
        alert("Hello Jigsaw Button ^_^");
    }
}
