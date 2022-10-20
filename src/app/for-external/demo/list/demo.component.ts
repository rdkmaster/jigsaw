import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class ListAllComponent extends DemoSetBase {
    public demoPath = "demo/list";
    public docPath = ['component/JigsawList'];
}

