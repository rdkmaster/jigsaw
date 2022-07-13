import {Component} from "@angular/core";
import {TableTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TableAllComponent {
    constructor(public text: TableTextService) {}
}

