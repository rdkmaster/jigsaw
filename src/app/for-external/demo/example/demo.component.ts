import { Component } from "@angular/core";
import { ExampleTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ExampleDemoComponent {
    constructor(public text: ExampleTextService) { }
}

