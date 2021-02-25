import {Component, ViewChild} from "@angular/core";
import {JigsawTooltip} from "jigsaw/public_api";

@Component({
    templateUrl: 'demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class MovingTooltipDemoComponent {
    @ViewChild('tooltip', {read: JigsawTooltip})
    tooltip: JigsawTooltip;

    onMoving() {
        this.tooltip.reposition();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo演示了如何让Tooltip紧跟宿主的位置';
    description: string = '';
}
