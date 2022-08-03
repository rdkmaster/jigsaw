import {Component} from "@angular/core";
import {TransferTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class TransferDemoComponent {
    constructor(public text: TransferTextService) {
    }
}
