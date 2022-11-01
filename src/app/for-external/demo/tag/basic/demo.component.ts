import {Component, QueryList, ViewChildren} from "@angular/core";
import {JigsawTag} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "tag-basic",
    templateUrl: "./demo.component.html",
})

export class TagBasicComponent extends AsyncDescription {
    public demoPath = "demo/tag/basic";
    public selectedSize = { size: "medium" };

    @ViewChildren(JigsawTag)
    tags: QueryList<JigsawTag>;
}
