import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class TextareaAllComponent extends DemoSetBase {
    public demoPath = "demo/textarea";
    public docPath = ['component/JigsawTextarea'];
}

