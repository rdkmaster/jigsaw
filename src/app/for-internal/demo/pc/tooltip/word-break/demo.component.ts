import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class TooltipWordBreakDemoComponent {
    tooltipMessage: string = 'You can further modify this code snippet based on your actual requirements, adjusting it according to your Angular project structure and styling needs. 你可以根据实际情况进一步修改这段代码，根据你的 Angular 项目结构和样式需求进行调整。';

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
