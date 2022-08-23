import { Component } from "@angular/core";
import { DrawerTextService } from "../doc.service";

@Component({
    selector: 'drawer-with-scrollbar',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DrawerWithScrollbarDemoComponent {
    constructor(public doc: DrawerTextService) {
    }
}
