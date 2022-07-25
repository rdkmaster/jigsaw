import {Component} from "@angular/core";
import {PaginationTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class PaginationAllComponent {
    constructor(public text: PaginationTextService) {}
}

