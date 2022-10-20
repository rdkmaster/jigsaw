import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class AutoCompleteInputDemoComponent extends DemoSetBase {
    public demoPath = "demo/auto-complete-input";
    public docPath = ['component/JigsawAutoCompleteInput'];
}

