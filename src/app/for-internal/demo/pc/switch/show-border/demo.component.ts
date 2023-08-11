import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls:['./demo.component.css']
})
export class SwitchShowBorderDemoComponent {
    checked: boolean;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    showBorder:boolean;
}
