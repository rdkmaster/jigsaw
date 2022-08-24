import { Component } from "@angular/core";
import { TreeTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ZtreeAllComponent {
    constructor(public doc: TreeTextService) { }
}

