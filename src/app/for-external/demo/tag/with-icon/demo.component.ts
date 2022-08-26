import {Component, QueryList, ViewChildren} from "@angular/core";
import {JigsawTag} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "tag-with-icon",
    templateUrl: "./demo.component.html"
})
export class TagWithIconComponent extends AsyncDescription {
    public demoPath = "demo/tag/with-icon";
    public selectedSize = {size: "medium"};

    @ViewChildren(JigsawTag)
    tags: QueryList<JigsawTag>;
}
