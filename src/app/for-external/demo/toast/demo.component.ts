import { Component } from "@angular/core";
import { ToastTextService } from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class ToastDemoComponent {
    constructor(public doc: ToastTextService) {
    }
}
