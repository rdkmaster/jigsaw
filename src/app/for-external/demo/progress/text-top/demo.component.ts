import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'progress-text-top',
    templateUrl: './demo.component.html',
})
export class ProgressTextTopComponent extends AsyncDescription {
    public demoPath = "demo/progress/text-top";
    public selectedSize = { size: "default" };

    public progressValue: number = 32;
}
