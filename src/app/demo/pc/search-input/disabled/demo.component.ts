import { Component } from "@angular/core";
import {SearchInputTextService} from "../text.service";

@Component({
    selector: 'disabled-search-input',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class SearchInputDisabledDemoComponent {
    public disabled1 = false;
    public disabled2 = false;
    constructor(public text: SearchInputTextService) {
    }
}
