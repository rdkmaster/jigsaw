import {Component} from "@angular/core";
import {SearchInputTextService} from "../doc.service";

@Component({
    selector: 'search-input-manual-search',
    templateUrl: "./demo.component.html"
})
export class SearchInputManualSearchDemoComponent {
    value: string= '';
    constructor(public text: SearchInputTextService) {
    }
}
