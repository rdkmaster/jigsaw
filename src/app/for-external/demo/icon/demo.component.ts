import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class IconAllComponent extends DemoSetBase {
    public demoPath = "demo/icon";
    public docPath = ['component/JigsawIcon'];
}

