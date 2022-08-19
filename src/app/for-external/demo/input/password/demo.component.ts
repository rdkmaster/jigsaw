import {Component} from "@angular/core";
import {InputTextService} from "../doc.service";

@Component({
    selector: "input-password",
    templateUrl: './demo.component.html',
})

export class InputPasswordComponent {
    constructor(public doc: InputTextService) {}
}
