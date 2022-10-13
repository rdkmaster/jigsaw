import {Component} from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'progress-functional',
    templateUrl: './demo.component.html',
})
export class ProgressFunctionalComponent extends AsyncDescription {
    public demoPath = "demo/progress/functional";
    public selectedSize = { size: "default" };

    public progressValue: number = 32;
}
