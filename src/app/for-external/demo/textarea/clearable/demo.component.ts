import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'textarea-clearable',
    templateUrl: './demo.component.html'
})
export class TextareaClearableDemoComponent extends AsyncDescription {
    public demoPath = "demo/textarea/clearable";

    public textareaValue: any;
}
