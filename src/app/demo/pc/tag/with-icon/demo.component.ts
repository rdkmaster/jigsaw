import {Component, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {TagTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";
import {JigsawInput} from "../../../../../jigsaw/pc-components/input/input";
import {JigsawTag} from "../../../../../jigsaw/pc-components/tag/tag";

@Component({
    selector: "with-icon-tag",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})

export class TagWithIconComponent {
    public selectedLabel = {label: "大", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "medium"}
    ]);
    @ViewChildren(JigsawTag)
    tags: QueryList<JigsawTag>;

    resetAllTags() {
        console.log(this.tags);
        this.tags.forEach(tag => tag.show());
    }

    constructor(public text: TagTextService) {}

}
