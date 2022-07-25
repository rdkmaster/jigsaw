import {Component} from "@angular/core";
import {ColorSelectTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ColorSelectAllComponent {
    constructor(public text: ColorSelectTextService) {}
}

