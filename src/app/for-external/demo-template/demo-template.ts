import { Component, NgModule, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JigsawMarkdownModule } from "../../libs/markdown/markdown";
import { JigsawButtonBarModule, ArrayCollection } from "jigsaw/public_api";


@Component({
    selector: 'demo-template',
    templateUrl: './demo-template.html',
    styleUrls: ['./demo-template.scss']
})

export class DemoTemplate {
    constructor(private _renderer: Renderer2) {
    }

    @ViewChild('code')
    code: ElementRef;

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

    expand: boolean = false;

    onClick(size: object) {
        this.selectedLabelChange.emit(size);
    }

    showCode() {
        this.expand = true;
        this._renderer.setStyle(this.code.nativeElement, "height", this.code.nativeElement.scrollHeight + 'px')
    }

    hideCode() {
        this.expand = false;
        this._renderer.setStyle(this.code.nativeElement, "height", 0)
    }
}

@NgModule({
    imports: [CommonModule, JigsawMarkdownModule, JigsawButtonBarModule],
    declarations: [DemoTemplate],
    exports: [DemoTemplate]
})
export class DemoTemplateModule {

}
