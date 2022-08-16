import { Component } from "@angular/core";
import {SearchInputTextService} from "../doc.service";

@Component({
    selector: 'search-input-history-storage-key',
    templateUrl: "./demo.component.html"
})
export class SearchInputHistoryStorageKeyDemoComponent {
    constructor(public text: SearchInputTextService) {
    }
}
