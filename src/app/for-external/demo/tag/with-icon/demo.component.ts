import {Component, QueryList, ViewChildren} from "@angular/core";
import {JigsawTag, ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "tag-with-icon",
    templateUrl: "./demo.component.html"
})
export class TagWithIconComponent extends AsyncDescription {
    public demoPath = "demo/tag/with-icon";

    public selectedSize = {label: "大", size: "medium"};
    public sizes: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "medium"}
    ]);
    @ViewChildren(JigsawTag)
    tags: QueryList<JigsawTag>;
}
