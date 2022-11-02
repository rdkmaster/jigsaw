import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: 'demo.component.html'
})
export class FloatDemoComponent extends DemoSetBase {
    public demoPath = "demo/float";
    public docPath = ['directive/JigsawFloat'];
}
