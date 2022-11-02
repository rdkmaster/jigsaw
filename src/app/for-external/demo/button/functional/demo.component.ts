import {Component} from '@angular/core';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'button-functional',
    templateUrl: './demo.component.html'
})
export class ButtonFunctionalComponent extends AsyncDescription {
    public demoPath = "demo/button/functional";
    public selectedSize = { size: "default" };

    public onClick() {
        alert('Hello Jigsaw Button ^_^');
    }
}
