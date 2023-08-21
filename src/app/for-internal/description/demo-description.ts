import { AfterContentInit, Component, Input, NgModule, OnInit } from "@angular/core";
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
import { MockData } from "../../libs/app.interceptor";

const urlParams = CommonUtils.parseUrlParam(location.search.substr(1));


@Component({
    selector: 'jigsaw-demo-description, j-demo-description',
    styles: [`
        hr {
            margin: 3px 0 10px 0;
        }

        div {
            padding-top: 6px;
        }

        .summary {
            font-size: 16px;
        }

        .links {
            margin-left: 12px;
            font-size: 12px;
        }

        .demo-control-bar {
            background-color: var(--bg-container) !important;
            padding: 16px 16px 8px 16px;
        }

        .demo-control-bar jigsaw-button-bar {
            margin-bottom: 8px;
            margin-left: 16px;
            display: block;
        }

        .demo-control-bar p {
            margin-bottom: 4px;
            font-weight: bold;
        }
    `],
    template: `
        <div style="max-width: calc(100vw - 340px)">
            <span class="summary" [innerHtml]="summary"></span>
            <span class="links">
                <span *ngIf="!!content">|</span>
                <a *ngIf="!!content" (click)="toggleDesc()">{{showDetail ? '隐藏' : '展开'}}详情</a>
                |
                <a (click)="openDemoCode()">查看本DEMO源码</a>
                |
                <a jigsaw-float [jigsawFloatTarget]="settingsPanel" [jigsawFloatOptions]="{borderType: 'pointer'}">设置</a>
            </span>
            <br *ngIf="showDetail">
            <jigsaw-markdown *ngIf="showDetail" [markdown]="content"></jigsaw-markdown>
            <br>
            <span class="links" *ngIf="showDetail && !!content">
                <a (click)="showDetail = !showDetail">{{showDetail ? '隐藏' : '展开'}}详情</a> |
                <a (click)="openDemoCode()">查看本DEMO源码</a>
            </span>
        </div>
        <hr>

        <ng-template #settingsPanel>
            <div class="demo-control-bar">
                <p>切换皮肤</p>
                <jigsaw-button-bar [(selectedItems)]="selectedTheme" trackItemBy="name,majorStyle" [data]="themes"
                                   [multipleSelect]="false" (selectedItemsChange)="themeSelectChange($event)">
                </jigsaw-button-bar>
                <p>切换语言</p>
                <jigsaw-button-bar [data]="[{label: '中文', value: 'zh'}, {label: 'English', value: 'en'}]"
                                   [(selectedItems)]="selectedLanguage"
                                   (selectedItemsChange)="changeLanguage($event[0])">
                </jigsaw-button-bar>
            </div>
        </ng-template>
    `
})
export class JigsawDemoDescription implements OnInit, AfterContentInit {
    public selectedTheme: any[];
    public themes = new ArrayCollection([
        { label: "VMax Light", name: 'vmax-pro', majorStyle: 'light' },
        { label: "VMax Dark", name: 'vmax-pro', majorStyle: 'dark' },
        { label: "OES Light", name: 'paletx-pro', majorStyle: 'light' },
        { label: "OES Dark", name: 'paletx-pro', majorStyle: 'dark' },
        { label: "Ux2.0 Light", name: 'idea', majorStyle: 'light' },
        { label: "MASBD Light", name: 'masbd', majorStyle: 'light' },
        { label: "ZJCM Light", name: 'zjcm', majorStyle: 'light' },
        { label: "AWADE Light", name: 'awade', majorStyle: 'light' },
        { label: "AWADE Dark", name: 'awade', majorStyle: 'dark' }
    ]);

    constructor(private _translateService: TranslateService, private _themeService: JigsawThemeService) {
    }

    ngAfterContentInit() {
        this.themeInit();
    }

    selectedLanguage = [{label: '中文', value: 'zh'}];

    changeLanguage(lang: { value: 'zh' | 'en' }) {
        TranslateHelper.changeLanguage(this._translateService, lang.value);
        // 这里别用showInfo，因为notification自身的语言此时还未被加载，导致标题发生错误
        JigsawNotification.show('提示：Jigsaw的几乎所有demo本身，包括一些通过Input属性传给组件的文本（如placeholder），' +
            '都未支持中英双语切换。这个切换语言动作只能影响到封装在组件内部的词条，可用于测试这些词条在中英双语下的表现。');
    }

    themeSelectChange(themeArr: ArrayCollection<any>) {
        const themeName = themeArr[0].name, majorStyle = themeArr[0].majorStyle;
        localStorage.setItem("jigsawDemoTheme", JSON.stringify({name: themeName, majorStyle: majorStyle}));
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

    openDemoCode() {
        const projectData = this.createProjectData();
        if (!projectData) {
            alert('如需使用这个功能，请执行patch-demos.js对这些demo打补丁，打补丁过程会修改demo的源码，请备份demo的修改，避免丢失。');
            return;
        }
        window.name = 'jigsaw-demo-main';
        const url = location.href.replace(/#/, '#/demo-code');
        const win: any = window.open(url, 'jigsaw-demo-code');
        win.getJigsawDemoCode = () => (projectData);
    }

    createProjectData(): any {
        const project: any = {files: {}};
        let hasFile = false;
        for (let file in this.codes) {
            if (!this.codes.hasOwnProperty(file)) {
                continue;
            }
            hasFile = true;
            let code = this.codes[file];
            if (file.match(/.+\.ts$/i)) {
                code = fixImport(code);
                code = fixTemplateUrl(code);
                code = fixStyleUrls(code);
                code = fixCodeForDemoOnly(code);
            }
            project.files[`src/app/${file}`] = code;
        }
        if (!hasFile) {
            return;
        }
        const moduleCode = project.files[`src/app/app-develop/demo.module.ts`];
        project.files[`src/app/app-develop/demo.module.ts`] = fixDemoModuleTs(moduleCode);
        const cmpCode = project.files[`src/app/app-develop/demo.component.ts`];
        project.files[`src/app/app-develop/demo.component.ts`] = fixDemoComponentTs(cmpCode, moduleCode);
        const htmlCode = project.files[`src/app/app-develop/demo.component.html`];
        project.files[`src/app/app-develop/demo.component.html`] = fixDemoComponentHtml(htmlCode);

        project.dependencies = getDependencies();
        project.title = `Jigsaw demo url: ${location.href}`;
        project.description = this.summary.replace(/<\/?\w+.*?>/g, '') + `\n\n${project.title}`;
        project.template = 'angular-cli';
        project.tags = ['jigsaw', 'angular', 'zte', 'awade'];

        const moduleClassName = findModuleClassName(project.files['src/app/for-internal/demo.module.ts']);
        const [angularJson, styles, scripts] = getAngularJson(project.dependencies);
        project.files['src/app/app.module.ts'] = getAppModuleTs(moduleClassName);
        project.files['src/app/app.component.ts'] = getAppComponentTS();
        project.files['src/app/app.component.html'] = getAppComponentHtml();
        project.files['src/app/app.interceptor.ts'] = getAjaxInterceptor(project.files);
        project.files['src/app/app.component.css'] = require('!!raw-loader!../live-demo-wrapper.css').default;
        project.files['src/main.ts'] = getMainTs(scripts);
        project.files['src/polyfills.ts'] = getPolyfills();
        project.files['angular.json'] = angularJson;
        project.files['src/index.html'] = getIndexHtml(project.title, styles);
        return project;
    }

    toggleDesc() {
        this.showDetail = !this.showDetail;
    }

    ngOnInit() {
        if (this.showDetail === undefined) {
            this.showDetail = urlParams['open-desc'] == 'true';
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


function getPolyfills() {
    return `import 'zone.js/dist/zone';`;
}

function getMainTs(scripts: string) {
    return `
import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// =============================================================================
// 注意！这部分代码是为了适配当前这个运行时而做的针对性修改，实际情况下不能这么搞，
// 请不要以这部分代码作为种子工程
// =============================================================================
const scripts = ${scripts};
loadScript();

function loadScript() {
    if (scripts.length == 0) {
        platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
          // Ensure Angular destroys itself on hot reloads.
          if (window['ngRef']) {
            window['ngRef'].destroy();
          }
          window['ngRef'] = ref;

          // Otherwise, log the boot error
        }).catch(err => console.error(err));
        return;
    }
    const src = scripts.shift();
    const elements = document.head.getElementsByTagName('script');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.getAttribute('src') == src) {
            loadScript();
            return;
        }
    }

    console.log('Loading', src);
    const element = document.createElement('script');
    element.type = 'text/javascript';
    element.src = src;
    element.onload = () => {
        element.onload = null;
        loadScript();
    };
    document.head.appendChild(element);
}
    `.trim();
}

function getIndexHtml(title: string, styles: string) {
    return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>

  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
${styles}
</head>
<body style="margin: 12px">
    <jigsaw-app>
        <div style="padding: 12px">
            <h3>Demo正在运行，请稍候...</h3>
            <ul style="line-height: 24px;margin:12px 0 0 12px;list-style:circle;">
                <li>访问 <a href="https://jigsaw-zte.gitee.io/" target="_blank"></a> 可以了解中兴大数据UED的更多信息；</li>
                <li>如果长时间停留在这个界面，那很可能Demo的运行出了问题，你可以继续浏览左边的代码；</li>
                <li>如果这个页面的控制台上有异常打印，那请你将这些打印通过
                <a href="https://github.com/rdkmaster/jigsaw/issues/new">提交issue</a>
                的方式告知我们，这可以帮助我们修复这个问题；</li>
            </ul>
        </div>
    </jigsaw-app>
</body>
</html>`.trim();
}

function getAppComponentTS() {
    return `
import { Component,ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'jigsaw-app',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}`.trim();
}

function getAppComponentHtml() {
    return `
<jigsaw-root>
  <div class="app-wrap">
    <jigsaw-demo></jigsaw-demo>
  </div>
</jigsaw-root>`.trim();
}

function getAppModuleTs(moduleClassName: string) {
    return `
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JigsawRootModule } from "@rdkmaster/jigsaw";
import { AjaxInterceptor } from "./app.interceptor";
import { AppComponent } from "./app.component";
import { ${moduleClassName} } from "./demo.module";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AjaxInterceptor,
            multi: true,
        },
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        JigsawRootModule, ${moduleClassName}
    ]
})
export class AppModule {
}`.trim();
}

function getAjaxInterceptor(files: any) {
    let code = require('!!raw-loader!../../../../src/app/libs/app.interceptor.ts').default;
    code = fixImport(code);

    // 不能位于在replace之后
    let urls = findMockDataUrls(code, files);
    // merge all mock data json file into this class
    let re = /\bthis\.dataSet\s*\[\s*['"](.*?)['"]\s*]\s*=\s*require\s*\(['"](\.\.\/mock-data\/)?.+['"]\s*\);?\s*/g;
    code = code.replace(re, (found, prop) => {
        const file = `mock-data/${prop}`;
        const using = urls.indexOf(file) != -1;
        return using ? `this.dataSet['${prop}'] = ${JSON.stringify(MockData.get(file))};` : '';
    });
    if (urls.indexOf(`mock-data/big-table-data`) == -1) {
        code = code.replace(/this\.dataSet\['big-table-data'] = .*;?\s*/, '');
    }

    return code;
}

function findMockDataUrls(interceptorCode: string, files: any): string[] {
    let match = interceptorCode.match(/\bthis\.dataSet\s*\[\s*['"].*?['"]\s*]\s*=/g);
    if (!match) {
        console.error('ERROR: parse app.interceptor.ts failed, no mock-data url found!');
        return [];
    }
    let allUrls = [];
    match.forEach(item => allUrls.push('mock-data/' + item.match(/['"]\s*(.*?)\s*['"]/)[1]));
    if (allUrls.length == 0) {
        console.error('ERROR: parse app.interceptor.ts failed, no mock-data url found! allUrls.length == 0');
        return [];
    }
    return allUrls.filter(url => {
        for (let file in files) {
            if (!files.hasOwnProperty(file)) {
                continue;
            }
            if (!file.match(/^src\/app\/.*\.ts$/i)) {
                continue;
            }
            // 如果demo的代码的注释部分有这个url，则会有bug，仅靠静态分析如何解决？
            const re = new RegExp('[\'"`/]' + url + '[\'"`]');
            if (files[file].match(re)) {
                return true;
            }
        }
        return false;
    });
}

function getAngularJson(deps: any): [string, string, string] {
    const json: any = CommonUtils.deepCopy(require('../../../../angular.json'));
    if (json.hasOwnProperty('jigsawTips')) {
        return null;
    }
    const options = json.projects['jigsaw-seed'].architect.build.options;
    const toUnpkgUrl = (entry: string): string => {
        const re = entry.indexOf('@') == -1 ? /\bnode_modules\/(.*?)\/(.*)/ : /\bnode_modules\/(.*?\/.*?)\/(.*)/;
        const match = entry.match(re);
        let version = deps[match[1]];
        version = !!version ? `@${version}` : '';
        return `https://unpkg.com/${match[1]}${version}/${match[2]}`;
    };
    // 由于stackblitz加载这里的styles会有问题，因此把这里的styles依赖挪到index.html里去
    const styles: string = options.styles.concat(["./node_modules/@rdkmaster/jigsaw/prebuilt-themes/paletx-pro-light.css"])
        .filter(style => style.match(/^(\.\/)?node_modules\/.+/))
        .map(style => `  <link rel="stylesheet" type="text/css" href="${toUnpkgUrl(style)}">`)
        .join('\n');
    options.styles = [];

    const scripts: string = JSON.stringify(options.scripts.map(script => toUnpkgUrl(script)), null, '  ');
    options.scripts = [];

    return [JSON.stringify(json, null, '  '), styles, scripts];
}

function getDependencies() {
    const json: any = require('./package.json');
    if (json.hasOwnProperty('jigsawTips')) {
        return null;
    }
    return {...json.dependencies, ...json.devDependencies};
}

function fixImport(code: string): string {
    let jigsawImports = [];
    let rawImports = [];
    while (true) {
        let match = code.match(/\bimport\s+{([\s\S]+?)}\s+from\s+['"](.+?)['"]/);
        if (!match) {
            break;
        }
        if (match[2].match(/jigsaw\/.+?/)) {
            let importString = match[1];
            let imports = importString.split(/,/g).map(item => item.trim());
            imports.forEach(item => {
                if (!!item) jigsawImports.push(item)
            });
        } else if (match[1].includes('AjaxInterceptor')) {
            rawImports.push('import {AjaxInterceptor} from "./app.interceptor"');
        } else {
            rawImports.push(match[0]);
        }
        code = code.substring(match.index + match[0].length);
    }
    jigsawImports = jigsawImports.sort((a, b) => a.localeCompare(b));

    let jigsawImportString = '';
    if (jigsawImports.length > 0) {
        jigsawImportString = 'import {\n';
        for (let i = 0, len = jigsawImports.length; i < len; i += 3) {
            jigsawImportString += '    ' + jigsawImports.slice(i, i + 3).join(', ') + ',\n';
        }
        jigsawImportString += '} from "@rdkmaster/jigsaw";';
    }

    return jigsawImportString + '\n' + rawImports.join(';\n') + code;
}

function fixTemplateUrl(code: string): string {
    return code.replace(/\btemplateUrl\s*:\s*['"]\s*(.*?)\s*['"]/g, (found, templateUrl) => {
        if (templateUrl.substring(0, 2) !== './') {
            templateUrl = './' + templateUrl;
        }
        return 'templateUrl: "' + templateUrl + '"';
    });
}

function fixStyleUrls(code: string): string {
    return code.replace(/\bstyleUrls\s*:\s*(\[[\s\S]*?])/g, (found, urlString) => {
        let urls = eval(urlString);
        urls = urls.map(url => {
            if (url.substring(0, 2) !== './') {
                url = './' + url;
            }
            return url;
        });
        return 'styleUrls: ["' + urls.join('", "') + '"]';
    });
}

function fixCodeForDemoOnly(code: string): string {
    return code.replace(/\/\* #for-live-demo-only#([\s\S]*?)\*\//g, (found, codeForDemo) => codeForDemo.trim());
}

function fixDemoModuleTs(moduleCode: string): string {
    // 删除 JigsawDemoDescriptionModule 相关的东西
    moduleCode = moduleCode.replace(/import\s*{\s*JigsawDemoDescriptionModule\s*}\s*from.*\r?\n/, '');
    moduleCode = moduleCode.replace(/\bJigsawDemoDescriptionModule\b\s*,?/g, '');
    return moduleCode;
}

function findExportsComponent(moduleCode: string): string {
    // 如果demo代码中，把exports这行给注释掉了，则会有bug，仅靠静态分析如何解决这个问题？
    const match = moduleCode.match(/@NgModule\s*\(\s*{[\s\S]*\bexports\s*:\s*\[\s*(\w+)\s*]/);
    return match && match[1] ? match[1] : '';
}

function fixDemoComponentTs(cmpCode: string, moduleCode: string): string {
    let mainComp = findExportsComponent(moduleCode);
    if (!mainComp) {
        return 'throw `看来Jigsaw自动生成的Demo代码出了问题了，请把这些文本拷贝一下，并在这里创建一个issue：  ' +
            'https://github.com/rdkmaster/jigsaw/issues/new  这样可以协助我们解决这个问题。' +
            '错误详情为：Need a "exports" property in the module code, and the value of which should contains only one component，' +
            'DEMO的URL为：' + location.href + '`\n\n\n// ============================\n// 以下这些是此demo的原始代码\n' +
            cmpCode.replace(/^/gm, '// --> ');
    }

    cmpCode = cmpCode
    // 给组件加上jigsaw-demo的selector，这个在index.html里会用到
        .replace(/@Component\s*\(\s*{([\s\S]*?)}\s*\)[\s\S]*?export\s+class\s+(\w+?)\b/g,
            (found, props, className) => {
                if (className != mainComp) {
                    // 在demo.component.ts文件中可能被定义了多个组件
                    return found;
                }
                // 后面会自动给添加一个selector，这里如果有，就要删掉
                return found.replace(/\bselector\s*:\s*['"].*?['"],?\s*/, '')
                    .replace(/@Component\s*\(\s*{/, '@Component({\n    selector: "jigsaw-demo",');
            })
        // 去掉demo-desc相关的变量
        .replace(/\s*\/\/\s*={60,}\s+\/\/[\s\S]*\/\/\s*={60,}\s+/, '\n');

    // 类似 cascade/lazy-load 这样的用例，有通过require获取静态json数据，需要把这些文件加进来
    cmpCode = cmpCode.replace(/\bMockData\s*\.\s*get\s*\(\s*['"`]\s*(mock-data\/.*?)\s*['"`]\s*\);?/g,
        // 这里必须采用webpack的内部api来读取main.bundle里的数据
        (found, file) => JSON.stringify(MockData.get(file), null, '  '));

    return cmpCode;
}

function fixDemoComponentHtml(html: string): string {
    return html
        .replace(/<!-- ignore the following lines[\s\S]*<!-- start to learn the demo from here -->\r?\n/, '')
        .replace(/<j(igsaw)?-demo-description\s+.+>[\s\S]*?<\/j(igsaw)?-demo-description>/, '');
}

function findModuleClassName(moduleCode: string): string {
    const match = moduleCode.match(/@NgModule\s*\(\s*{[\s\S]*?}\s*\)[\s\S]*?export\s+class\s+(\w+?)\b/);
    return match[1];
}

