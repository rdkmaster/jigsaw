import {Component} from "@angular/core";
import {DialogTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class DialogAllComponent {
    constructor(public text: DialogTextService) {}
}

