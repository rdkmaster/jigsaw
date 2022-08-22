import {Component} from "@angular/core";
import {LoadingTextService} from "./doc.service";
@Component({
    templateUrl: "demo.component.html",
})
export class LoadingDemoComponent {
    constructor(public doc: LoadingTextService) {
    }
}
