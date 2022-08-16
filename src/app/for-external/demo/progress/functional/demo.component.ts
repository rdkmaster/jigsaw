import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {ProgressTextService} from "../doc.service";

@Component({
    selector: 'progress-functional',
    templateUrl: './demo.component.html',
})
export class ProgressFunctionalComponent {
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "default"},
    ]);
    public selectedLabel = {label: "大", size: "default"};

    progressValue: number = 32;
    constructor(public text: ProgressTextService) {
    }

}
