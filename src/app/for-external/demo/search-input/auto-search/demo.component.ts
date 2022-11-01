import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'search-input-auto-search',
    templateUrl: "./demo.component.html"
})
export class SearchInputAutoSearchDemoComponent extends AsyncDescription {
    public demoPath = "demo/search-input/auto-search";

    public value: string = '';
}
