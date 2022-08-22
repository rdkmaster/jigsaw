import {Component} from "@angular/core";
import {BreadcrumbTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class BreadcrumbAllComponent {
    constructor(public doc: BreadcrumbTextService) {}
}

