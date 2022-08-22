import {
    Component,
    NgModule,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild,
    Renderer2,
    AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawMarkdownModule } from "../../libs/markdown/markdown";
import {
    JigsawButtonBarModule,
    ArrayCollection,
    JigsawTabsModule,
    JigsawSelectModule,
} from "jigsaw/public_api";

declare const Prism: any;

@Component({
    selector: "demo-template",
    templateUrl: "./demo-template.html",
    styleUrls: ["./demo-template.scss"],
})
export class DemoTemplate implements AfterViewInit {
    constructor(private _renderer: Renderer2) {}

    @ViewChild("codeCntr")
    codeCntr: ElementRef;

    @ViewChild("demoContent")
    demoContent: ElementRef;

    @Input()
    public text: string = "";

    @Input()
    public data: object[] | "" = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "default" },
        { label: "大", size: "large" },
    ]);

    @Input()
    public selectedSize: object = { label: "中", size: "default" };

    @Input()
    public codes = [
        { label: "HTML", value: "暂无源码", language: "html" },
        { label: "Typescript", value: "//  暂无源码", language: "typescript" },
    ];

    @Output()
    public selectedSizeChange = new EventEmitter<object>();

    expand: boolean = false;

    selectedIndex: number = 0;

    onClick(size: object) {
        this.selectedSizeChange.emit(size);
    }

    showCode() {
        this.expand = true;
        this._renderer.setStyle(this.codeCntr.nativeElement, "height", "100%");
    }

    hideCode() {
        this.expand = false;
        this._renderer.setStyle(this.codeCntr.nativeElement, "height", 0);
    }

    reRunPrism() {
        setTimeout(() => {
            Prism.highlightAll();
        }, 0);
    }

    ngAfterViewInit() {
        const spans = this.demoContent.nativeElement.querySelectorAll(
            ".demo-showcase>span"
        );
        if (spans.length) {
            let spanWidth = 0;
            spans.forEach((span) => {
                if (span.offsetWidth > spanWidth) {
                    spanWidth = span.offsetWidth;
                }
            });

            spans.forEach((span) => {
                span.style.width = spanWidth + "px";
            });
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        JigsawMarkdownModule,
        JigsawButtonBarModule,
        JigsawTabsModule,
        JigsawSelectModule
    ],
    declarations: [DemoTemplate],
    exports: [DemoTemplate],
})
export class DemoTemplateModule {}
