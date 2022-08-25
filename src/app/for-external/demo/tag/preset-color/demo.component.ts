import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "tag-preset-color",
    templateUrl: "./demo.component.html",
    styles: [`
    jigsaw-tag{
        width: 136px;
    }
    `]
})
export class TagPresetColorComponent extends AsyncDescription {
    public demoPath = "demo/tag/preset-color";

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "大", size: "medium" },
    ]);
    public selectedSize = { label: "大", size: "medium" };
}
