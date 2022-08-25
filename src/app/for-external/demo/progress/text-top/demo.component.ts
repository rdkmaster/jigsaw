import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'progress-text-top',
    templateUrl: './demo.component.html',
})
export class ProgressTextTopComponent extends AsyncDescription {
    public demoPath = "demo/progress/text-top";

    public progressValue: number = 32;

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "大", size: "default" },
    ]);
    public selectedSize = { label: "大", size: "default" };
}
