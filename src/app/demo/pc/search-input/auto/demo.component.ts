import {Component} from "@angular/core";
import {SearchInputTextService} from "../text.service";

@Component({
    selector: "auto-search-input",
    templateUrl: './demo.component.html',
    styleUrls: ['../public.css']
})

export class SearchInputAutoComponent {
    public value: string = "";
    constructor(public text: SearchInputTextService) {}
}
