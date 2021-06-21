import { Component, QueryList, ViewChildren } from "@angular/core";
import { JigsawTag } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class TagSelectableDemoComponent {
    tags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Disabled1', 'Disabled2'];
    tags1 = [
        {label: 'Tag1', selected: true}, {label: 'Tag2'}, {label: 'Tag3'},
        {label: 'Tag4'}, {label: 'Tag5'}, {label: 'Disabled1'}, {label: 'Disabled2'}
    ];

    onSelect(tag: string, selected: boolean) {
        console.log(tag, ':', selected);
    }

    onSelect1(tag: { label: string, selected: boolean }) {
        const idx = this.tags1.indexOf(tag);
        this.tags1.forEach(tag => tag.selected = false);
        this.tags1[idx].selected = true;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '设置`selectedColor`属性可以让Tag在选中后，自动切换为此属性指定的颜色，从而形成一种被选中的效果';
    description: string = "";
}
