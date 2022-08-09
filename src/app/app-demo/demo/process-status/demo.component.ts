import {Component} from "@angular/core";
import {ProcessStatusTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class ProcessStatusDemoComponent {
    constructor( public text: ProcessStatusTextService) {
    }
}
