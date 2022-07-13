import {Component} from "@angular/core";
import {DrawerTextService} from "../text.service";

@Component({
    selector: 'with-tab-drawer',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerWithTabDemoComponent {
    constructor(public text: DrawerTextService) {
    }
}
