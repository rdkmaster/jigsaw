import {Component} from "@angular/core";
import {SearchInputTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class SearchInputAllComponent {
    constructor(public doc: SearchInputTextService) {}
}

