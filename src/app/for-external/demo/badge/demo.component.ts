import { Component } from "@angular/core";
import { BadgeTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class BadgeAllComponent {
    constructor(public doc: BadgeTextService) { }
}

