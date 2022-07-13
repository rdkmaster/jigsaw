import {Component, ViewChild} from "@angular/core";
import {JigsawTooltip} from "jigsaw/public_api";
import {TooltipTextService} from "../text.service";

@Component({
    selector: 'moving-tooltip-tooltip',
    templateUrl: 'demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class MovingTooltipDemoComponent {
    @ViewChild('tooltip', {read: JigsawTooltip})
    tooltip: JigsawTooltip;

    onMoving() {
        this.tooltip.reposition();
    }

    constructor(public text: TooltipTextService) {
    }
}
