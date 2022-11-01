import {Component} from '@angular/core';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'button-key',
    templateUrl: './demo.component.html'
})
export class ButtonKeyComponent extends AsyncDescription {
    public demoPath = "demo/button/key";
    public selectedSize = { size: "default" };
}
