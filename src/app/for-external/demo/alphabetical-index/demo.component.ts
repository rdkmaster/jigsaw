import {Component} from "@angular/core";
import {AlphabeticalTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html",
})
export class AlphabeticalIndexDemoComponent {
    constructor(public text: AlphabeticalTextService) {
    }
}
