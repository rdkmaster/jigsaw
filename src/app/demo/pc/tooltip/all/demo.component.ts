import {Component} from "@angular/core";
import {TooltipTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TooltipAllComponent {
    constructor(public text: TooltipTextService) {}
}

