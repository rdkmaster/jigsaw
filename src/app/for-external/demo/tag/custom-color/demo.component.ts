import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "tag-custom-color",
    templateUrl: "./demo.component.html",
    styles: [`
    jigsaw-tag{
        width: 62px;
    }
    `]
})
export class TagCustomColorComponent extends AsyncDescription {
    public demoPath = "demo/tag/custom-color";

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "大", size: "medium" },
    ]);
    public selectedSize = { label: "大", size: "medium" };
}
