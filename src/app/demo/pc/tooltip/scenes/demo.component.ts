import { Component } from "@angular/core";
import {TooltipTextService} from "../text.service";

@Component({
    selector: 'scenes-tooltip',
    templateUrl: './demo.component.html'
})
export class TooltipScenesDemoComponent {
    constructor(public text: TooltipTextService) {
    }
}
