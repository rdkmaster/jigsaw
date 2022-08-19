import { Component } from "@angular/core";
import { ListTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ListAllComponent {
    constructor(public doc: ListTextService) { }
}

