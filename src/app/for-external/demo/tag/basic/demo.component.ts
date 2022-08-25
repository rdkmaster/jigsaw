import { Component, QueryList, ViewChildren } from "@angular/core";
import { ArrayCollection, JigsawTag } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "tag-basic",
    templateUrl: "./demo.component.html",
})

export class TagBasicComponent extends AsyncDescription {
    public demoPath = "demo/tag/basic";

    @ViewChildren(JigsawTag)
    tags: QueryList<JigsawTag>;
    public selectedSize = { label: "大", size: "medium" };
    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "大", size: "medium" }
    ]);
}
