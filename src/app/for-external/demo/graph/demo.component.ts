import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: 'demo.component.html'
})
export class GraphDemoComponent extends DemoSetBase {
    public demoPath = "demo/graph";
    public docPath = ['component/JigsawGraph'];
}
