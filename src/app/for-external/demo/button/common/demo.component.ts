import {Component} from '@angular/core';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'button-common',
    templateUrl: './demo.component.html'
})
export class ButtonCommonComponent extends AsyncDescription {
    public demoPath = "demo/button/common";
    public selectedSize = {size: "default"};
}
