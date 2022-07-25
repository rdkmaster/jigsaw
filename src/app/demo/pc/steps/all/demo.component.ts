import {Component} from "@angular/core";
import {StepsTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class StepsAllComponent {
    constructor(public text: StepsTextService) {}
}

