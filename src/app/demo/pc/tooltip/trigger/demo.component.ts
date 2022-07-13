import {Component} from "@angular/core";
import {TooltipTextService} from "../text.service";

@Component({
    selector: 'trigger-tooltip',
    templateUrl: './demo.component.html'
})
export class TooltipTriggerDemoComponent {
    public openTrigger = "mouseenter";
    public closeTrigger = "mouseleave";
    public open = false;

    public openFloat() {
        this.open = true;
    }

    public closeFloat() {
        this.open = false;
    }

    constructor(public text: TooltipTextService) {
    }
}
