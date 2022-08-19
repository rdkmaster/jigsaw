import {Component} from "@angular/core";
import {ButtonBarTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ButtonBarAllComponent {
    constructor(public doc: ButtonBarTextService) {}
}

