import {Component} from "@angular/core";
import {InputTextService} from "../text.service";

@Component({
    selector: "password-input",
    templateUrl: './demo.component.html',
})

export class InputPasswordComponent {
    constructor(public text: InputTextService) {}
}
