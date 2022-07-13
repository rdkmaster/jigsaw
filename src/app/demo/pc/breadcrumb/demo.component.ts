import {Component} from "@angular/core";
import {BreadcrumbTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class BreadcrumbAllComponent {
    constructor(public text: BreadcrumbTextService) {}
}

