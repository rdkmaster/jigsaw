import {Component} from "@angular/core";
import {TimeSectionTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TimeSectionAllComponent {
    constructor(public text: TimeSectionTextService) {}
}

