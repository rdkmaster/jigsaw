import {Component, ViewChild} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TabHeadlessDemoComponent {

    checkWithHeight:boolean = false;
    checkWithoutHeight:boolean = false;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================

    summary: string = '';
    description: string = '';
}
