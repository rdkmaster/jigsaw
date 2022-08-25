import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'button-text',
    templateUrl: './demo.component.html'
})
export class ButtonTextDemoComponent extends AsyncDescription {
    public demoPath = "demo/button/text";

    public onClick() {
        alert('Hello jigsaw button!');
    }

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" },
        { label: "默认", size: "default" }
    ]);
    public selectedSize = { label: "默认", size: "default" };
}
