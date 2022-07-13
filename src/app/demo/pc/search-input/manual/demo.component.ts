import {Component} from "@angular/core";
import {SearchInputTextService} from "../text.service";

@Component({
    selector: "manual-search-input",
    templateUrl: './demo.component.html',
    styleUrls: ['../public.css']
})

export class SearchInputManualComponent {
    public value: string = "";
    constructor(public text: SearchInputTextService) {}
}
