import { Component } from "@angular/core";
import { TableColumnDefinesTextService } from "./doc.service";
import { TableColumnDefinesDemoModule } from "./demo.module";

@Component({
    templateUrl: './demo.component.html',
})
export class TableColumnDefinesAllComponent {
    constructor(public doc: TableColumnDefinesTextService) { }
}

