import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class TabAllComponent extends DemoSetBase {
    public demoPath = "demo/tab";
    public docPath = ['component/JigsawTab'];
}

