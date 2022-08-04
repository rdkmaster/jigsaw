import {Component} from "@angular/core";
import {ProgressTextService} from "../doc.service";

@Component({
    selector: 'progress-text-follow',
    templateUrl: './demo.component.html',
})
export class ProgressTextFollowComponent {
    progressValue: number = 32;
    constructor(public text: ProgressTextService) {
    }

}