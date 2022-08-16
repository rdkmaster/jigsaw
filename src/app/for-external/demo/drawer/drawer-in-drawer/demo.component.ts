import {Component} from "@angular/core";
import {DrawerTextService} from "../doc.service";

@Component({
    selector: 'drawer-in-drawer',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerInDrawerDemoComponent {
    constructor(public text: DrawerTextService) {
    }
}
