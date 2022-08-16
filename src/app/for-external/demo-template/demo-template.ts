import { Component, NgModule, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JigsawMarkdownModule } from "../../libs/markdown/markdown";
import { JigsawButtonBarModule, ArrayCollection, JigsawTabsModule } from "jigsaw/public_api";

declare const Prism: any;

@Component({
    selector: 'demo-template',
    templateUrl: './demo-template.html',
    styleUrls: ['./demo-template.scss']
})

export class DemoTemplate {
    constructor(private _renderer: Renderer2) {
    }

    @ViewChild('codeCntr')
    codeCntr: ElementRef;

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

    @Input()
    public codes = [{ label: "HTML", value: '暂无源码', language: 'html' }, { label: "Typescript", value: '//  暂无源码', language: 'typescript' }];

    @Output()
    public selectedLabelChange = new EventEmitter<object>();

    expand: boolean = false;

    selectedIndex: number = 0;

    onClick(size: object) {
        this.selectedLabelChange.emit(size);
    }

    showCode() {
        this.expand = true;
        this._renderer.setStyle(this.codeCntr.nativeElement, "height", '100%')
    }

    hideCode() {
        this.expand = false;
        this._renderer.setStyle(this.codeCntr.nativeElement, "height", 0)
    }

    reRunPrism() {
        setTimeout(() => {
            Prism.highlightAll();
        }, 0);
    }
}

@NgModule({
    imports: [CommonModule, JigsawMarkdownModule, JigsawButtonBarModule, JigsawTabsModule],
    declarations: [DemoTemplate],
    exports: [DemoTemplate]
})
export class DemoTemplateModule {

}
