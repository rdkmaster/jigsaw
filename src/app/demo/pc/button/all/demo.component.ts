import {Component} from "@angular/core";
import {ButtonTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ButtonAllComponent {
    constructor(public text: ButtonTextService) {}
}

