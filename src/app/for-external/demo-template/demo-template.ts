import {
    AfterViewInit,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    OnDestroy,
    Output,
    Renderer2,
    ViewChild,
} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {JigsawButtonBarModule, JigsawSelectModule, JigsawTabsModule,} from "jigsaw/public_api";
import {JigsawMarkdownModule} from "../../libs/markdown/markdown";

declare const Prism: any;

type DemoSource = {
    label: string, language: string, file?: string,
    content?: string | Observable<string>
};

@Component({
    selector: "demo-template",
    templateUrl: "./demo-template.html",
    styleUrls: ["./demo-template.scss"],
})
export class DemoTemplate implements AfterViewInit {
    constructor(private _renderer: Renderer2, private _http: HttpClient) {
    }

    @ViewChild("codeContainer")
    public codeContainer: ElementRef;

    @ViewChild("demoContent")
    public demoContent: ElementRef;

    @Input()
    public description: string = "";

    @Input()
    // 类似 "small小,default中,large大" 这样的文本，多个备选项用逗号分隔
    public sizeController: string = '';

    public get _$sizeController(): {label: string, size: string}[] {
        if (typeof this.sizeController != 'string') {
            return [];
        }
        return this.sizeController?.split(/,/).map(s => {
            const match = s.match(/([a-z]+)(.+)$/);
            return {label: match[2], size: match[1]};
        });
    }

    @Input()
    public selectedSize: {size: string};

    @Input()
    public demoSources: DemoSource[] = [
        {label: "HTML", content: "暂无源码", language: "html"},
        {label: "Typescript", content: "// 暂无源码", language: "ts"},
    ];

    @Output()
    public selectedSizeChange = new EventEmitter<object>();

    public expand: boolean = false;
    public selectedIndex: number = 0;

    rerunPrism() {
        setTimeout(Prism.highlightAll, 0);
    }

    ngAfterViewInit() {
        const spans = this.demoContent.nativeElement.querySelectorAll(".demo-showcase>span");
        if (!spans.length) {
            return;
        }
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

@Directive()
export class AsyncDescription implements OnDestroy {
    constructor(private _http: HttpClient, private _element: ElementRef) {
        const onScroll = this._onScroll.bind(this);
        document.addEventListener('scroll', onScroll);
        setTimeout(onScroll, 100);
    }

    public selectedSize: {size: string};
    protected demoPath: string;

    private _description: string;

    public get description(): string {
        return this._description || `正在下载描述信息...`;
    }

    private _onScroll() {
        if (this._description || !this.demoPath || !this._element) {
            return;
        }
        if (document.scrollingElement.scrollTop + document.body.clientHeight < this._element.nativeElement.offsetTop) {
            return;
        }
        this._description = `正在下载描述信息...`;
        fetch(`/app/for-external/${this.demoPath}/readme.md`)
            .then(resp => {
                if (resp.ok) {
                    resp.text().then(desc => this._description = desc);
                } else {
                    this._description = `无法下载描述信息 ${this.demoPath}`;
                }
            });
    }

    public get demoSources(): DemoSource[] {
        const sources: DemoSource[] = window['demoSourceFileInfo']?.[this.demoPath] || [];
        sources.filter(src => !src.content)
            .forEach(src => src.content = this._http.get(`/app/for-external/demo/${src.file}`, {responseType: "text"}));
        return sources;
    }

    ngOnDestroy(): void {
        document.removeEventListener('scroll', this._onScroll);
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
export class DemoTemplateModule {
}
