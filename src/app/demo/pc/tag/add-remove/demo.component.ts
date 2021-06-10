import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class TagAddRemoveDemoComponent {
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '添加`[isAdd]="true"`来设置Tag为Add状态，本demo最多可添加5个Tag，注意观察`disabled`效果';
    description: string = "";
}
