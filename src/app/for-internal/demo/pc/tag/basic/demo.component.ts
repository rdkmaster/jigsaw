import {Component, QueryList, ViewChildren} from "@angular/core";
import {JigsawTag} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TagBasicDemoComponent {
    public tagText: string = '初始文本';
    public tagTitle: string = '初始提示内容';

    handleClose(tag) {
        console.log(tag)
    }

    @ViewChildren(JigsawTag)
    tags: QueryList<JigsawTag>;

    resetAllTags() {
        console.log(this.tags);
        this.tags.forEach(tag => tag.show());
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
