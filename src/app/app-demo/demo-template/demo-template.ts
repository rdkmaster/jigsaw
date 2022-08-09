import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JigsawMarkdownModule } from "../markdown/markdown";
import { JigsawButtonBarModule, ArrayCollection } from "jigsaw/public_api";


@Component({
    selector: 'demo-template',
    templateUrl: './demo-template.html',
    styleUrls: ['./demo-template.scss']
})

export class DemoTemplate {
    @Input()
    public text: string = '';
    @Input()
    public data: object[] | '' = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "default" },
        { label: "大", size: "large" }
    ]);
    @Input()
    public selectedLabel: object = { label: "中", size: "default" };
    @Output()
    public selectedLabelChange = new EventEmitter<object>();
    constructor() {
    }
    onClick(size: object) {
        this.selectedLabelChange.emit(size);
    }
}

@NgModule({
    imports: [CommonModule, JigsawMarkdownModule, JigsawButtonBarModule],
    declarations: [DemoTemplate],
    exports: [DemoTemplate]
})
export class DemoTemplateModule {

}
