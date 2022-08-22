import {Component} from "@angular/core";
import {HeaderTextService} from "../doc.service";

@Component({
    selector: "header-level3",
    templateUrl: './demo.component.html'
})
export class HeaderThirdLevelComponent {
    constructor(public doc: HeaderTextService) {}
}
