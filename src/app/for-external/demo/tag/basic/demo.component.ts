import {Component, QueryList, ViewChildren} from "@angular/core";
import {TagTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";
import {JigsawTag} from "jigsaw/public_api";

@Component({
    selector: "tag-basic",
    templateUrl: "./demo.component.html",
})

export class TagBasicComponent {
    public selectedLabel = {label: "大", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "medium"}
    ]);
    handleClose(tag) {
        console.log(tag)
    }
    constructor(public text: TagTextService) {}
    @ViewChildren(JigsawTag)
    tags: QueryList<JigsawTag>;

    resetAllTags() {
        console.log(this.tags);
        this.tags.forEach(tag => tag.show());
    }
}
