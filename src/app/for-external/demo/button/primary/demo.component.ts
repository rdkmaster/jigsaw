import {Component} from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'button-primary',
    templateUrl: './demo.component.html'
})
export class ButtonPrimaryComponent extends AsyncDescription {
    public demoPath = "demo/button/primary";
    public selectedSize = { size: "default" };
}
