import { Component } from "@angular/core";
import { AlphabeticalDocService } from "./doc.service";

@Component({
    templateUrl: "demo.component.html",
})
export class AlphabeticalIndexDemoComponent {
    constructor(public doc: AlphabeticalDocService) {
    }
}
