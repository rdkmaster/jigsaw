import {Component} from "@angular/core";
import {BadgeTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class BadgeAllComponent {
    constructor(public text: BadgeTextService) {}
}

