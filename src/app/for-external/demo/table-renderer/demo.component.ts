import {Component} from "@angular/core";
import {TableRendererTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TableRendererAllComponent {
    constructor(public doc: TableRendererTextService) {}
}

