import { Component } from "@angular/core";
import { HeaderTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class HeaderDemoComponent {
    constructor(public doc: HeaderTextService) {
    }
}
