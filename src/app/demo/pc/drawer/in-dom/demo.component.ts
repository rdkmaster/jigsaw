import {Component} from "@angular/core";
import {DrawerTextService} from "../text.service";

@Component({
    selector: 'in-dom-drawer',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerInDomDemoComponent {
    selectedPosition = 'left';
    autoSize = false;
    width: string = '300';
    height: string = '200';

    constructor(public text: DrawerTextService) {
    }
}
