import {
    AfterContentInit,
    AfterViewInit,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { JigsawButtonBarModule, JigsawSelectModule, JigsawTabsModule, } from "jigsaw/public_api";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";

declare const Prism: any;

type DemoSource = {
    label: string, language: string, file?: string,
    content?: string | Observable<string>
};

const demoSourceFileInfo = require('./description-and-sources.json');

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

    public get _$sizeController(): { label: string, size: string }[] {
        if (typeof this.sizeController != 'string') {
            return [];
        }
        return this.sizeController?.split(/,/).map(s => {
            const match = s.match(/([a-z]+)(.+)$/);
            return { label: match[2], size: match[1] };
        });
    }

    @Input()
    public selectedSize: { size: string };

    @Input()
    public demoSources: DemoSource[] = [
        { label: "HTML", content: "暂无源码", language: "html" },
        { label: "Typescript", content: "// 暂无源码", language: "ts" },
    ];

    @Output()
    public selectedSizeChange = new EventEmitter<object>();

    public expand: boolean = false;
    public selectedIndex: number = 0;

    rerunPrism() {
        setTimeout(Prism.highlightAll, 100);
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

const descriptionLoadedEvent: EventEmitter<string> = new EventEmitter<string>();

@Directive()
export class AsyncDescription implements OnDestroy {
    constructor(protected _http: HttpClient, protected _element: ElementRef) {
        const onScroll = this._onScroll.bind(this);
        document.addEventListener('scroll', onScroll);
        setTimeout(onScroll, 100);
    }

    public selectedSize: { size: string };
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
        fetch(`app/for-external/${this.demoPath}/readme.md`)
            .then(resp => {
                if (resp.ok) {
                    resp.text().then(desc => {
                        this._description = desc;
                        descriptionLoadedEvent.emit(this.demoPath);
                    });
                } else {
                    this._description = `无法下载描述信息 ${this.demoPath}`;
                }
            });
    }

    public get demoSources(): DemoSource[] {
        const sources: DemoSource[] = demoSourceFileInfo[this.demoPath] || [];
        sources.filter(src => !src.content)
            .forEach(src => src.content = this._http.get(`app/for-external/demo/${src.file}`, { responseType: "text" }));
        return sources;
    }

    ngOnDestroy(): void {
        document.removeEventListener('scroll', this._onScroll);
    }
}

@Directive()
export class DemoSetBase extends AsyncDescription implements OnInit, AfterContentInit, OnDestroy {
    private readonly _subscription: Subscription;
    private _demoSelector: string;
    public docContent: string = '';
    protected docPath: string[] = [];
    public navigationData = [];

    constructor(public route: ActivatedRoute, public http: HttpClient, public el: ElementRef, public renderer: Renderer2, public router: Router) {
        super(http, el);
        route.fragment.subscribe(fragment => {
            this._demoSelector = fragment;
            this._scrollIntoView();
        });
        this._subscription = descriptionLoadedEvent.subscribe(() => this._scrollIntoView());
    }

    private _scrollIntoView(): void {
        if (!this._demoSelector) {
            return;
        }
        const node = document.querySelector(this._demoSelector);
        if (!node) {
            console.warn('demo selector not found:', this._demoSelector);
            return;
        }
        node.scrollIntoView();
    }

    ngOnInit(): void {
        if (this.docPath.length === 0) {
            return;
        }
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        this.docPath.forEach((doc, i) => {
            this.http.get(`app/for-external/assets/docs/fragments/${doc}.html`, { headers, responseType: 'text' }).subscribe((data) => {
                this.docContent += data;
            })
        })
    }

    ngAfterContentInit(): void {
        const demoWrapper = this.el.nativeElement.getElementsByClassName('demo-wrapper')[0];
        if (demoWrapper.length === 0) {
            return;
        }
        this.navigationData = demoWrapper.children;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._subscription.unsubscribe();
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
