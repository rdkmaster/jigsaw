import {Component} from "@angular/core";
import {SearchInputTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class SearchInputAllComponent {
    constructor(public text: SearchInputTextService) {}
}

