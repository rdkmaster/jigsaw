import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'search-input-manual-search',
    templateUrl: "./demo.component.html"
})
export class SearchInputManualSearchDemoComponent extends AsyncDescription {
    public demoPath = "demo/search-input/manual-search";

    public value: string = '';
}
