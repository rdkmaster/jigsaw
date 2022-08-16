import {Component} from "@angular/core";
import {TagTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "tag-selectable",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})

export class TagSelectableComponent {
    public selectedLabel = {label: "大", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "medium"}
    ]);
    tags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Disabled1', 'Disabled2'];
    tags1 = [
        {label: 'Tag1', selected: true}, {label: 'Tag2'}, {label: 'Tag3'},
        {label: 'Tag4'}, {label: 'Tag5'}, {label: 'Disabled1'}, {label: 'Disabled2'}
    ];
    selectedColor = ['preset-magenta'];

    onSelect(tag: string, selected: boolean) {
        console.log(tag, ':', selected);
    }

    onSelect1(tag: { label: string, selected: boolean }) {
        const idx = this.tags1.indexOf(tag);
        this.tags1.forEach ( tag => tag.selected = false);
        this.tags1[idx].selected = true;
    }
    constructor(public text: TagTextService) {}

}
