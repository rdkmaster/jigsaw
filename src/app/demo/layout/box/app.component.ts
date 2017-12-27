import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class FlexDemoComponent {
    direction = 'row';
    directionArr = ['row', 'row-reverse', 'column', 'column-reverse'];

    justify = 'space-around';
    justifyArr = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];

    align = 'center';
    alignArr = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}


