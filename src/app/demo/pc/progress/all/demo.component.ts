import {Component} from "@angular/core";
import {ProgressTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ProgressAllComponent {
    constructor(public text: ProgressTextService) {}
}

