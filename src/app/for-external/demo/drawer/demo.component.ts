import {Component} from "@angular/core";
import {DrawerTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class DrawerAllComponent {
    constructor(public doc: DrawerTextService) {}
}

