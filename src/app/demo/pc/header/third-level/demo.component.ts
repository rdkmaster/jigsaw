import {Component} from "@angular/core";
import {HeaderTextService} from "../text.service";

@Component({
    selector: "third-level-header",
    templateUrl: './demo.component.html'
})
export class HeaderThirdLevelComponent {
    constructor(public text: HeaderTextService) {}
}
