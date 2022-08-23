import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import { ProgressTextService } from "../doc.service";

@Component({
    selector: 'progress-basic',
    templateUrl: './demo.component.html',
})
export class ProgressBasicComponent {
    public progressValue: number = 32;

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "大", size: "default" },
    ]);
    public selectedSize = { label: "大", size: "default" };
    constructor(public doc: ProgressTextService) {
    }

}
