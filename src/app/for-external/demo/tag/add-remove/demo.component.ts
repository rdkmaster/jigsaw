import {Component, ViewChild} from "@angular/core";
import {TagTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";
import {JigsawInput} from "jigsaw/public_api";

@Component({
    selector: "tag-add-remove",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})

export class TagAddRemoveComponent {
    public selectedLabel = {label: "大", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "medium"}
    ]);
    @ViewChild('input')
    input: JigsawInput;

    tags = ['Tag1', 'Tag2', 'Tag3'];
    adding = false;
    message: string;

    showInput() {
        this.adding = true;
        setTimeout(() => {
            this.input.focus();
        }, 100);
    }

    addTag(tag: string) {
        if (!tag) {
            this.message = 'Tag名称不能为空！';
            this.input.focus();
            return;
        }
        if (this.tags.indexOf(tag) > -1) {
            this.message = '该Tag名称已存在！';
            this.input.select();
            return;
        }
        this.message = '';

        this.tags.push(tag);
        this.adding = false;
    }

    removeTag(tag: string) {
        const idx = this.tags.indexOf(tag);
        this.tags.splice(idx, 1);
    }

    constructor(public doc: TagTextService) {}

}
