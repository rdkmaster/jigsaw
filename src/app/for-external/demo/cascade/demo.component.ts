import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class CascadeAllComponent extends DemoSetBase {
    public demoPath = "demo/cascade";
    public docPath = ['component/JigsawCascade'];
}

