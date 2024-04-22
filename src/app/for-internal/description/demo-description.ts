import { Component, Input, NgModule, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import {
    CommonUtils,
    JigsawFloatModule,
    ArrayCollection,
    TranslateHelper,
    JigsawNotification,
    JigsawButtonBarModule,
    JigsawThemeService
} from "jigsaw/public_api";
import { JigsawMarkdownModule } from "../../libs/markdown/markdown";
import { ActivatedRoute, Router } from "@angular/router";

const urlParams = CommonUtils.parseUrlParam(location.search.substr(1));

@Component({
    selector: 'jigsaw-demo-description, j-demo-description',
    styleUrls: ['./demo-description.css'],
    templateUrl: './demo-description.html'
})
export class JigsawDemoDescription implements OnInit, OnDestroy {
    public selectedTheme: any[];
    public themes;

    constructor(private _translateService: TranslateService, private _themeService: JigsawThemeService,
        private _activatedRoute: ActivatedRoute, private _router: Router, private _renderer: Renderer2) {
    }

    public width = 450;

    private _removeWindowResizeListener: Function;

    resize() {
        console.log((document.documentElement.clientWidth / Number(this.width)) * 100);
        document.getElementsByTagName('html')[0].style.fontSize =
            (document.documentElement.clientWidth / Number(this.width)) + 'px';
    }

    selectedLanguage = [{ label: '中文', value: 'zh' }];

    changeLanguage(lang: { value: 'zh' | 'en' }) {
        TranslateHelper.changeLanguage(this._translateService, lang.value);
        // 这里别用showInfo，因为notification自身的语言此时还未被加载，导致标题发生错误
        JigsawNotification.show('提示：Jigsaw的几乎所有demo本身，包括一些通过Input属性传给组件的文本（如placeholder），' +
            '都未支持中英双语切换。这个切换语言动作只能影响到封装在组件内部的词条，可用于测试这些词条在中英双语下的表现。');
    }

    themeSelectChange(themeArr: ArrayCollection<any>) {
        const themeName = themeArr[0].name, majorStyle = themeArr[0].majorStyle;
        localStorage.setItem("jigsawDemoTheme", JSON.stringify({ name: themeName, majorStyle: majorStyle }));
        this._themeService.changeTheme(themeName, majorStyle);
    }

    themeInit() {
        const themeString = localStorage.getItem("jigsawDemoTheme");
        if (themeString === null) {
            this.selectedTheme = [{ name: "paletx-pro", majorStyle: 'light' }];
        } else {
            const themeData = JSON.parse(themeString);
            this.selectedTheme = [themeData];
            this._themeService.changeTheme(themeData.name, themeData.majorStyle);
        }
    }

    @Input()
    public showDetail: boolean = undefined;
    @Input()
    public content: string = '';
    @Input()
    public codes: any;

    private _summary: string;

    @Input()
    get summary(): string {
        return this._summary;
    }

    set summary(value: string) {
        value = value ? value : '这个demo暂无使用说明，有任何疑问的话，' +
            '请将你的疑问<a href="https://github.com/rdkmaster/jigsaw" target="_blank">填写</a>在issue里，' +
            '我们会尽快协助你解决问题';
        this._summary = value.replace(/`(.*?)`/g, '<code>$1</code>');
    }

    toggleDesc() {
        this.showDetail = !this.showDetail;
    }

    ngOnInit() {
        if (this.showDetail === undefined) {
            this.showDetail = urlParams['open-desc'] == 'true';
        }
        this._activatedRoute.url.subscribe(() => {
            const isPc = this._router.url.startsWith('/pc');
            if (this._removeWindowResizeListener) {
                this._removeWindowResizeListener();
                this._removeWindowResizeListener = null;
            }
            this.themes = isPc ? new ArrayCollection([
                { label: "VMax Light", name: 'vmax-pro', majorStyle: 'light' },
                { label: "VMax Dark", name: 'vmax-pro', majorStyle: 'dark' },
                { label: "OES Light", name: 'paletx-pro', majorStyle: 'light' },
                { label: "OES Dark", name: 'paletx-pro', majorStyle: 'dark' },
                { label: "Ux2.0 Light", name: 'idea', majorStyle: 'light' },
                { label: "MASBD Light", name: 'masbd', majorStyle: 'light' },
                { label: "ZJCM Light", name: 'zjcm', majorStyle: 'light' },
                { label: "AWADE Light", name: 'awade', majorStyle: 'light' },
                { label: "AWADE Dark", name: 'awade', majorStyle: 'dark' },
                { label: "COPILOT Light", name: 'copilot', majorStyle: 'light' },
                { label: "COPILOT Dark", name: 'copilot', majorStyle: 'dark' }
            ]) : new ArrayCollection([
                { label: "OES Mobile Light", name: 'paletx-pro-mobile', majorStyle: 'light' }
            ])
            if (!isPc) {
                this._removeWindowResizeListener = this._renderer.listen(
                    'window', 'resize', () => this.resize());
                this.resize();
            }
            const themeString = localStorage.getItem("jigsawDemoTheme");
            if (themeString != null) {
                const themeData = JSON.parse(themeString);
                if (this.themes.some((theme) => {
                    return theme.name == themeData.name
                })) {
                    this.selectedTheme = [themeData];
                    this._themeService.changeTheme(themeData.name, themeData.majorStyle);
                    return
                }
            }
            const themeName = isPc ? "paletx-pro" : "paletx-pro-mobile";
            this.selectedTheme = [{ name: themeName, majorStyle: 'light' }];
            console.log(this.selectedTheme);
            this._themeService.changeTheme(themeName, "light")
            localStorage.setItem("jigsawDemoTheme", JSON.stringify({ name: themeName, majorStyle: 'light' }));
        });
    }

    ngOnDestroy() {
        if (this._removeWindowResizeListener) {
            this._removeWindowResizeListener();
            this._removeWindowResizeListener = null;
        }
    }
}

@NgModule({
    declarations: [JigsawDemoDescription],
    imports: [JigsawMarkdownModule, CommonModule, JigsawFloatModule, JigsawButtonBarModule],
    exports: [JigsawDemoDescription]
})
export class JigsawDemoDescriptionModule {
}
