import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class UploadAllComponent extends DemoSetBase {
    public demoPath = "demo/upload";
    public docPath = ['component/JigsawUpload'];
}

