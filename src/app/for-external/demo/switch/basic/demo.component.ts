import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "switch-basic",
    templateUrl: "./demo.component.html"
})

export class SwitchBasicComponent extends AsyncDescription {
    public demoPath = "demo/switch/basic";

    public checked: boolean;

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "default" }
    ]);
    public selectedSize = { label: "中", size: "medium" };
}
