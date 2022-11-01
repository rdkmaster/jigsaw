import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'search-input-debounce',
    templateUrl: "./demo.component.html"
})
export class SearchInputDebounceDemoComponent extends AsyncDescription {
    public demoPath = "demo/search-input/debounce";

    public debounceTime: number = 0;
    public searchKey: string = "";

    public searchTrigger($event) {
        console.log("demo search event:", $event);
        this.searchKey = $event;
    }
}
