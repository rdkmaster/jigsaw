import {Component} from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'button-directive',
    templateUrl: './demo.component.html'
})
export class ButtonDirectiveDemoComponent extends AsyncDescription {
    public demoPath = "demo/button/directive";
    public selectedSize = { size: "default" };

    public size: string = "";

    public onClick() {
        alert('hello jigsaw button');
    }
}
