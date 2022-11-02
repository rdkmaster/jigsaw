import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'textarea-select',
    templateUrl: './demo.component.html'
})
export class TextareaSelectDemoComponent extends AsyncDescription {
    public demoPath = "demo/textarea/select";

    public select: boolean = true;
}
