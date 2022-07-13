import { Component } from "@angular/core";
import {SearchInputTextService} from "../text.service";

@Component({
    selector: 'history-storage-key-search-input',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class SearchInputHistoryStorageKeyDemoComponent {
    constructor(public text: SearchInputTextService) {
    }
}
