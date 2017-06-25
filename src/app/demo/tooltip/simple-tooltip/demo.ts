import {Component} from "@angular/core";

@Component({
    template: `
        编辑tooltip <rdk-input width="370" [(value)]="tooltipMessage"></rdk-input>

        <p style="padding-top: 10px">
        <rdk-button width="180px" [rdkTooltip]="tooltipMessage">
            鼠标挪到这里显示tooltip
        </rdk-button>
    `
})
export class SimpleTooltipDemoComponent {
    tooltipMessage:string = '这是一个内联tooltip  <span class="fa fa-thumbs-up"></span>';
}

