import {Component} from "@angular/core";
import {SearchInputTextService} from "../text.service";

@Component({
    selector: 'basic-search-input',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class SearchInputBasicDemoComponent {
    value1: string;
    value2: string;
    constructor(public text: SearchInputTextService) {
    }
}
