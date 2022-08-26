import {Component} from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'button-login',
    templateUrl: './demo.component.html'
})
export class ButtonLoginComponent extends AsyncDescription {
    public demoPath = "demo/button/login";
    public selectedSize = { size: "default" };

    public onClick() {
        alert('Hello Jigsaw Button ^_^');
    }
}
