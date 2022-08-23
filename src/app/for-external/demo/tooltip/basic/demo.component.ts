import { Component } from "@angular/core";
import { TooltipTextService } from "../doc.service";

@Component({
    selector: 'tooltip-basic',
    templateUrl: './demo.component.html'
})
export class TooltipBasicDemoComponent {
    public tooltipMessage: string = '一个提示';

    constructor(public doc: TooltipTextService) {
    }
}
