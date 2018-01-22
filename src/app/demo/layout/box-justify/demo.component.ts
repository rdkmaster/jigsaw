import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxJustifyDemoComponent {
    direction = 'horizontal';
    directionArr = ['horizontal', 'horizontal-reverse', 'vertical', 'vertical-reverse'];

    justify = 'around';
    justifyArr = ['start', 'end', 'center', 'between', 'around'];

    align = 'center';
    alignArr = ['start', 'end', 'center', 'baseline', 'stretch'];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了box的对齐方式';
    description: string = require('!!raw-loader!./readme.md');
}


