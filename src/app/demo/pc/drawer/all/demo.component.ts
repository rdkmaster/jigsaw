import {Component} from "@angular/core";
import {DrawerTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class DrawerAllComponent {
    constructor(public text: DrawerTextService) {}
}

