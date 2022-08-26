import {Component} from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'button-text',
    templateUrl: './demo.component.html'
})
export class ButtonTextDemoComponent extends AsyncDescription {
    public demoPath = "demo/button/text";
    public selectedSize = { size: "default" };

    public onClick() {
        alert('Hello jigsaw button!');
    }
}
