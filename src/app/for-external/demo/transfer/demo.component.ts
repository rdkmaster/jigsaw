import { Component } from "@angular/core";
import {AsyncDescription} from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class TransferDemoComponent extends AsyncDescription {
    public demoPath = "demo/transfer";

}
