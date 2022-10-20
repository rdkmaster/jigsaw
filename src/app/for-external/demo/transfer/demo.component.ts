import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class TransferDemoComponent extends DemoSetBase {
    public demoPath = "demo/transfer";
    public docPath = ['component/JigsawTransfer'];
}
