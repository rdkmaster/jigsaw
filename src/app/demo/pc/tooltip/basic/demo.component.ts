import {Component} from "@angular/core";
import {TooltipTextService} from "../text.service";

@Component({
    selector: 'basic-tooltip',
    templateUrl: './demo.component.html'
})
export class TooltipBasicDemoComponent {
    tooltipMessage: string = '一个提示';
    constructor(public text: TooltipTextService) {
    }
}
