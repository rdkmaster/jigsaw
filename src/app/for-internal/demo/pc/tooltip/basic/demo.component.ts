import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TooltipBasicDemoComponent {
    tooltipMessage: string = '一个提示';

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
