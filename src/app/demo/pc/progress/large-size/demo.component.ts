import {Component} from "@angular/core";
import {ProgressTextService} from "../text.service";

@Component({
    selector: 'large-size-progress',
    templateUrl: './demo.component.html',
})
export class ProgressLargeSizeComponent {
    progressValue: number = 32;
    constructor(public text: ProgressTextService) {
    }

}
