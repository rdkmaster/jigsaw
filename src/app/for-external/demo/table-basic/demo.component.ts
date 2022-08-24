import { Component } from "@angular/core";
import { TableBasicTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TableBasicAllComponent {
    constructor(public doc: TableBasicTextService) { }
}

