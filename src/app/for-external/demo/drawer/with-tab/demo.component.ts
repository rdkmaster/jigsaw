import {Component} from "@angular/core";
import {DrawerTextService} from "../doc.service";

@Component({
    selector: 'drawer-with-tab',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerWithTabDemoComponent {
    constructor(public doc: DrawerTextService) {
    }
}
