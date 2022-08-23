import { Component } from "@angular/core";
import { TableActionsTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TableActionsAllComponent {
    constructor(public doc: TableActionsTextService) { }
}

