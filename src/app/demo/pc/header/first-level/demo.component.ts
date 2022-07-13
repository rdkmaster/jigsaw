import {Component} from "@angular/core";
import {HeaderTextService} from "../text.service";

@Component({
    selector: "first-level-header",
    templateUrl: './demo.component.html'
})
export class HeaderFirstLevelComponent {
    constructor(public text: HeaderTextService) {}
}
