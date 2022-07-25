import {Component} from "@angular/core";
import {InputTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class InputAllComponent {
    constructor(public text: InputTextService) {}
}

