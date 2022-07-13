import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/public_api";
import {InputTextService} from "../text.service";

@Component({
    selector: 'select-input',
    templateUrl: './demo.component.html'
})
export class InputSelectDemoComponent {

    select: boolean;
    constructor(public text: InputTextService) {
    }
}
