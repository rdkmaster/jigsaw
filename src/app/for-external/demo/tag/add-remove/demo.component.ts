import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "tag-add-remove",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})

export class TagAddRemoveComponent extends AsyncDescription {
    public demoPath = "demo/tag/add-remove";
    public selectedSize = {size: "medium"};

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
}
