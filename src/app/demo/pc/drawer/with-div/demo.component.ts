import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerWithDivDemoComponent {
    width: string = 'auto';
    height: string = 'calc(100% - 30px)';

    selectedPosition = 'left';

    offsetLeft: string;
    offsetTop: string = '28';
    offsetRight: string;
    offsetBottom: string;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
