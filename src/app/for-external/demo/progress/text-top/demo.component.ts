import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {ProgressTextService} from "../doc.service";

@Component({
    selector: 'progress-text-top',
    templateUrl: './demo.component.html',
})
export class ProgressTextTopComponent {
    public sizes: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "default"},
    ]);
    public selectedSize = {label: "大", size: "default"};

    progressValue: number = 32;
    constructor(public doc: ProgressTextService) {
    }

}
