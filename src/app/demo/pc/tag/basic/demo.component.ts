import {Component, QueryList, ViewChildren} from "@angular/core";
import {TagTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";
import {JigsawTag} from "../../../../../jigsaw/pc-components/tag/tag";

@Component({
    selector: "basic-tag",
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

    @ViewChildren(JigsawTag)
    tags: QueryList<JigsawTag>;

    resetAllTags() {
        console.log(this.tags);
        this.tags.forEach(tag => tag.show());
    }
    constructor(public text: TagTextService) {}

}
