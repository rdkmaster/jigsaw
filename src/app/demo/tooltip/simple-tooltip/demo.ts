import {Component} from "@angular/core";

@Component({
    template: `
        编辑tooltip <jigsaw-input width="370" [(value)]="tooltipMessage"></jigsaw-input>

        <p style="padding-top: 10px">
        <jigsaw-button width="180px" [jigsawTooltip]="tooltipMessage">
            鼠标挪到这里显示tooltip
        </jigsaw-button>
    `
})
export class SimpleTooltipDemoComponent {
    tooltipMessage:string = '这是一个内联tooltip  <span class="fa fa-thumbs-up"></span>';
}

