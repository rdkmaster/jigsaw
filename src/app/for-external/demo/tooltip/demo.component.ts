import { Component } from "@angular/core";
import { TooltipTextService } from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class TooltipDemoComponent {
    constructor(public doc: TooltipTextService) {
    }
}
