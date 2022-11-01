import {Component} from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'progress-basic',
    templateUrl: './demo.component.html',
})
export class ProgressBasicComponent extends AsyncDescription {
    public demoPath = "demo/progress/basic";
    public selectedSize = { size: "default" };

    public progressValue: number = 32;
}
