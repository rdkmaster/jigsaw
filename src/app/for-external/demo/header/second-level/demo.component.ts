import {Component} from "@angular/core";
import {HeaderTextService} from "../doc.service";

@Component({
    selector: "header-level2",
    templateUrl: './demo.component.html'
})
export class HeaderSecondLevelComponent {
    constructor(public text: HeaderTextService) {}
}
