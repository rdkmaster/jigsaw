import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerContainerDemoComponent {
    width: string;
    height: string;

    selectedPosition = 'left';

    offsetLeft: string;
    offsetTop: string;
    offsetRight: string;
    offsetBottom: string;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
