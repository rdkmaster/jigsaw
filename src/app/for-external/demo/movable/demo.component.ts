import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class MovableAllComponent extends DemoSetBase {
    public demoPath = "demo/movable";
    public docPath = ['component/JigsawMovable'];
}

