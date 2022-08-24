import { Component } from "@angular/core";
import { TooltipTextService } from "../doc.service";

@Component({
    selector: 'tooltip-trigger',
    templateUrl: './demo.component.html'
})
export class TooltipTriggerDemoComponent {
    public openTrigger = "mouseenter";
    public closeTrigger = "mouseleave";
    public open = false;

    public openFloat(e) {
        e.preventDefault();
        e.stopPropagation();
        this.open = true;
    }

    public closeFloat(e) {
        e.preventDefault();
        e.stopPropagation();
        this.open = false;
    }

    constructor(public doc: TooltipTextService) {
    }
}
