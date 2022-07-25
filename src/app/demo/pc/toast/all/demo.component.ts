import {Component} from "@angular/core";
import {ToastTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ToastDemoAllComponent {
    constructor(public text: ToastTextService) {}
}

