import {Component} from "@angular/core";
import {InputTextService} from "../text.service";

@Component({
    selector: 'valid-input',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class InputValidComponent {
    constructor(public text: InputTextService) {
    }
}
