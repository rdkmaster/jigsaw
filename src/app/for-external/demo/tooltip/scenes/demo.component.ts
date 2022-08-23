import { Component } from "@angular/core";
import { TooltipTextService } from "../doc.service";

@Component({
    selector: 'tooltip-scenes',
    templateUrl: './demo.component.html'
})
export class TooltipScenesDemoComponent {
    constructor(public doc: TooltipTextService) {
    }
}
