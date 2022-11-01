import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'search-input-history-storage-key',
    templateUrl: "./demo.component.html"
})
export class SearchInputHistoryStorageKeyDemoComponent extends AsyncDescription {
    public demoPath = "demo/search-input/history-storage-key";

}
