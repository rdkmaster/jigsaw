import {Component} from "@angular/core";
import {InputTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class InputAllComponent {
    constructor(public doc: InputTextService) {}
}

