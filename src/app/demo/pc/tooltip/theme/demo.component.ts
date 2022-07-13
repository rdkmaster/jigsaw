import { Component } from "@angular/core";
import {TooltipTextService} from "../text.service";

@Component({
    selector: 'theme-tooltip',
    templateUrl: './demo.component.html'
})
export class TooltipThemeDemoComponent {
    constructor(public text: TooltipTextService) {
    }
}
