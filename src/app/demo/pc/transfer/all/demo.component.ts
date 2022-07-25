import {Component} from "@angular/core";
import {TransferTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TransferAllComponent {
    constructor(public text: TransferTextService) {}
}

