import {Component} from "@angular/core";
import {ButtonBarTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ButtonBarAllComponent {
    constructor(public text: ButtonBarTextService) {}
}

