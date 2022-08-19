import {Component} from "@angular/core";
import {SearchInputTextService} from "../doc.service";

@Component({
    selector: 'search-input-auto-search',
    templateUrl: "./demo.component.html"
})
export class SearchInputAutoSearchDemoComponent {
    value: string = '';
    constructor(public doc: SearchInputTextService) {
    }
}
