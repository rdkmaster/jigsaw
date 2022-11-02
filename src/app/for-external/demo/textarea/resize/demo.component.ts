import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'textarea-resize',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TextareaResizeDemoComponent extends AsyncDescription {
    public demoPath = "demo/textarea/resize";

}
