import {Component} from "@angular/core";
import {NotificationTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html",
})
export class NotificationDemoComponent {
    constructor(public doc: NotificationTextService) {
    }
}
