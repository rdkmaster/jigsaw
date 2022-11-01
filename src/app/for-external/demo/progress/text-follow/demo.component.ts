import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'progress-text-follow',
    templateUrl: './demo.component.html',
})
export class ProgressTextFollowComponent extends AsyncDescription {
    public demoPath = "demo/progress/text-follow";

    public progressValue: number = 32;
}
