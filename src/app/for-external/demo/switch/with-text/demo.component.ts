import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'switch-with-text',
    templateUrl: './demo.component.html',
})
export class SwitchWithTextDemoComponent extends AsyncDescription {
    public demoPath = "demo/switch/with-text";

    public checked: boolean;

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "default" }
    ]);
    public selectedSize = { label: "中", size: "medium" };
}
