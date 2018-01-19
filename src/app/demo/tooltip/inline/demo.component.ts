import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class SimpleTooltipDemoComponent {
    tooltipMessage: string = '这是一个内联tooltip  <span class="fa fa-thumbs-up"></span>';

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

