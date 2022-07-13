import {Component} from "@angular/core";
import {JigsawInput} from "jigsaw/public_api";
import {InputTextService} from "../text.service";

@Component({
    selector: 'disabled-input',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class InputDisabledComponent {

    enabled: boolean;
    constructor(public text: InputTextService) {
    }
}
