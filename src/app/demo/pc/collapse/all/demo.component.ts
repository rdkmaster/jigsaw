import {Component} from "@angular/core";
import {CollapseTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class CollapseAllComponent {
    constructor(public text: CollapseTextService) {}
}

