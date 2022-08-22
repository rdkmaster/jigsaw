import {Component} from "@angular/core";
import {PaginationTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class PaginationAllComponent {
    constructor(public doc: PaginationTextService) {}
}

