import {Component} from "@angular/core";
import {HeaderTextService} from "../text.service";

@Component({
    selector: "second-level-header",
    templateUrl: './demo.component.html'
})
export class HeaderSecondLevelComponent {
    constructor(public text: HeaderTextService) {}
}
