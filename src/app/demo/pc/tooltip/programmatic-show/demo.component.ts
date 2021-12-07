import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TooltipShowDemoComponent {
    public openTrigger = "mouseenter";
    public closeTrigger = "mouseleave";
    public open = false;

    public openFloat() {
        this.open = true;
    }

    public closeFloat() {
        this.open = false;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo演示了如何通过编程的方式打开一个tooltip，并跟踪其开关状态';
    description: string = '';
}
