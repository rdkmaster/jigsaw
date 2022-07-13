import {Component} from "@angular/core";
import {ButtonTextService} from "../text.service";

@Component({
    selector: 'width-height-button',
    templateUrl: './demo.component.html'
})
export class ButtonWidthHeightDemoComponent {
    constructor(public text: ButtonTextService) {
    }
}
