import {Component} from "@angular/core";
import {NotificationTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class NotificationAllComponent {
    constructor(public text: NotificationTextService) {}
}

