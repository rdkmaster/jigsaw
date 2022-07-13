import { Component } from "@angular/core";
import {SearchInputTextService} from "../text.service";

@Component({
    selector: 'debounce-search-input',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class SearchInputDebounceDemoComponent {
    public debounceTime: number = 0;
    public searchKey: string = "暂无";

    public searchTrigger($event) {
        console.log("demo search event:", $event);
        this.searchKey = $event;
    }
    constructor(public text: SearchInputTextService) {
    }
}
