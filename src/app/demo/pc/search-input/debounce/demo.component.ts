import { Component } from "@angular/core";
import {SearchInputTextService} from "../doc.service";

@Component({
    selector: 'search-input-debounce',
    templateUrl: "./demo.component.html"
})
export class SearchInputDebounceDemoComponent {
    public debounceTime: number = 0;
    public searchKey: string = "";

    public searchTrigger($event) {
        console.log("demo search event:", $event);
        this.searchKey = $event;
    }
    constructor(public text: SearchInputTextService) {
    }
}
