import { Component } from "@angular/core";
import { ChartIconTextService } from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class ChartIconDemoComponent {
    constructor(public doc: ChartIconTextService) {
    }
}
