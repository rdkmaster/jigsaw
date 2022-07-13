import { Component } from "@angular/core";
import {ProgressTextService} from "../text.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'circle-progress',
    templateUrl: "./demo.component.html"
})
export class CircleProgressDemoComponent {
    constructor(public text: ProgressTextService) {
    }
}
