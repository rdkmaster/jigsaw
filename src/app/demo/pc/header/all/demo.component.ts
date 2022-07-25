import {Component} from "@angular/core";
import {HeaderTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class HeaderAllComponent {
    constructor(public text: HeaderTextService) {}
}

