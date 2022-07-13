import {Component} from "@angular/core";
import {TagTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: "preset-color-tag",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})

export class TagPresetColorComponent {
    public selectedLabel = {label: "大", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "medium"}
    ]);
    constructor(public text: TagTextService) {}
}
