import {Component} from "@angular/core";
import {ButtonTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ButtonAllComponent {
    constructor(public doc: ButtonTextService) {}
}

