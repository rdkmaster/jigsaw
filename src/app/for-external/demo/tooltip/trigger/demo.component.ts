import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tooltip-trigger',
    templateUrl: './demo.component.html'
})
export class TooltipTriggerDemoComponent extends AsyncDescription {
    public demoPath = "demo/tooltip/trigger";

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
}
