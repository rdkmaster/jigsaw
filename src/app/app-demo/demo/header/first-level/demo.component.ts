import {Component} from "@angular/core";
import {HeaderTextService} from "../doc.service";

@Component({
    selector: "header-level1",
    templateUrl: './demo.component.html'
})
export class HeaderFirstLevelComponent {
    constructor(public text: HeaderTextService) {}
}
