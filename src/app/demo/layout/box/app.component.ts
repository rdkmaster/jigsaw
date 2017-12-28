import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class BoxDemoComponent {
    direction = 'h';
    directionArr = ['h', 'hr', 'v', 'vr'];

    justify = 'around';
    justifyArr = ['start', 'end', 'center', 'between', 'around'];

    align = 'center';
    alignArr = ['start', 'end', 'center', 'baseline', 'stretch'];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}


