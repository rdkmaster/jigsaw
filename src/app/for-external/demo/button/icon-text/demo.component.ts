import {Component} from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";


@Component({
    selector: 'button-icon-text',
    templateUrl: './demo.component.html'
})
export class ButtonIconTextComponent extends AsyncDescription {
    public demoPath = "demo/button/icon-text";
    public selectedSize = { size: "default" };

    public onClick() {
        alert('Hello Jigsaw Button ^_^');
    }
}
