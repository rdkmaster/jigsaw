import {Component, QueryList, ViewChildren} from "@angular/core";
import {JigsawTag} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TagWithIconDemoComponent {

    @ViewChildren(JigsawTag)
    tags: QueryList<JigsawTag>;

    resetAllTags() {
        console.log(this.tags);
        this.tags.forEach(tag => tag.show());
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = 'Tag与图标混用';
    description: string = '';
}
