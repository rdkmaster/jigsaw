import {Component} from "@angular/core";
import {UploadTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class UploadAllComponent {
    constructor(public text: UploadTextService) {}
}
