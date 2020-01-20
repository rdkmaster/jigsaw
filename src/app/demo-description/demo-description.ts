import {Component, Input, NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import sdk from '@stackblitz/sdk';
import {CommonUtils} from "../../jigsaw/common/core/utils/common-utils";
import {JigsawMarkdownModule} from "../markdown/markdown";

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
    `],
    template: `
        <div>
            <span class="summary" [innerHtml]="summary"></span>
            <span class="links">
                <span *ngIf="!!content">|</span>
                <a *ngIf="!!content" (click)="toggleDesc()">{{showDetail ? '隐藏' : '展开'}}详情</a>
                |
                <a (click)="gotoStackblitz()">查看本DEMO源码</a>
            </span>
            <br *ngIf="showDetail">
            <jigsaw-markdown *ngIf="showDetail" [markdown]="content"></jigsaw-markdown>
            <br>
            <span class="links" *ngIf="showDetail && !!content">
                <a (click)="showDetail = !showDetail">{{showDetail ? '隐藏' : '展开'}}详情</a> |
                <a (click)="gotoStackblitz()">查看本DEMO源码</a>
            </span>
            <hr>
        </div>
    `
})
export class JigsawDemoDescription implements OnInit {
    @Input() showDetail: boolean = undefined;

    @Input() content: string = '';

    @Input() codes: any;

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

    gotoStackblitz() {
        const project: any = {files: {}};
        let hasFile = false;
        for (let file in this.codes) {
            if (!this.codes.hasOwnProperty(file)) {
                continue;
            }
            hasFile = true;
            let code = this.codes[file];
            if (file.match(/.+\.ts$/i)) {
                code = this.fixImport(code);
                code = this.fixTemplateUrl(code);
                code = this.fixStyleUrls(code);
                code = this.fixCodeForDemoOnly(code);
            }
            if (file.match(/.+\.html$/i)) {
                code = this.fixDemoComponentHtml(code);
            }
            if (file.match(/.+\.scss$/i)) {
                console.error('ERROR: do not use scss file in demo! we can not pass them in jlunker.');
                console.error(`       path=${file}`);
                continue;
            }
            if (file == 'demo.module.ts') {
                code = this.fixDemoModuleTs(code, file);
            } else if (file == 'demo.component.ts') {
                code = this.fixDemoComponentTs(code, file);
            } else if (file == 'demo.component.html') {
                code = this.fixDemoComponentHtml(code);
            }
            project.files[`src/app/${file}`] = code;
        }
        if (!hasFile) {
            return;
        }

        const moduleClassName = this.findModuleClassName(project.files['src/app/demo.module.ts']);
        const title = 'xxxxxxxxxxxx';
        project.files['src/app/app.module.ts'] = getAppModuleTs(moduleClassName);
        project.files['src/app/app.component.ts'] = getAppComponentTS();
        project.files['src/app/app.component.html'] = getAppComponentHtml();
        project.files['src/app/live-demo-wrapper.css'] = require('!!raw-loader!../../src/app/live-demo-wrapper.css');
        project.files['src/index.html'] = getIndexHtml(title);
        project.files['src/main.ts'] = getMainTs();
        project.files['src/polyfills.ts'] = getPolyfills();
        project.files['angular.json'] = getAngularJson();

        project.dependencies = getDependencies();
        project.title = title;
        project.description = 'auto generated jigsaw demo';
        project.template = 'angular-cli';
        project.tags = ['jigsaw', 'angular', 'zte', 'awade'];

        sdk.openProject(project);
    }

    toggleDesc() {
        this.showDetail = !this.showDetail;
        location.hash = 'open-desc=' + this.showDetail;
    }

    ngOnInit() {
        if (this.showDetail === undefined) {
            const p = CommonUtils.parseUrlParam(location.hash.substring(1));
            this.showDetail = p['open-desc'] == 'true';
        }
    }

    fixImport(code: string): string {
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
                rawImports.push('import {AjaxInterceptor} from "../app.interceptor"');
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

    fixTemplateUrl(code: string): string {
        return code.replace(/\btemplateUrl\s*:\s*['"]\s*(.*?)\s*['"]/g, (found, templateUrl) => {
            if (templateUrl.substring(0, 2) !== './') {
                templateUrl = './' + templateUrl;
            }
            return 'templateUrl: "' + templateUrl + '"';
        });
    }

    fixStyleUrls(code: string): string {
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

    fixCodeForDemoOnly(code: string): string {
        return code.replace(/\/\* #for-live-demo-only#([\s\S]*?)\*\//g, (found, codeForDemo) => codeForDemo.trim());
    }

    fixDemoModuleTs(moduleCode: string, demoPath: string): string {
        // @NgModule()里必须包含一个exports，用于将组件暴露给上级组件
        const comp = this.findExportsComponent(moduleCode);
        if (!comp) {
            console.error('ERROR: need a "exports" property in the module code, ' +
                'and the value of which should contains only one component!');
            console.error(`       module path=${demoPath}`);
            return;
        }

        // 删除 JigsawDemoDescriptionModule 相关的东西
        moduleCode = moduleCode.replace(/import\s*{\s*JigsawDemoDescriptionModule\s*}\s*from.*\r?\n/, '');
        moduleCode = moduleCode.replace(/\bJigsawDemoDescriptionModule\b\s*,?/g, '');
        return moduleCode;
    }

    findExportsComponent(moduleCode: string): string {
        // 如果demo代码中，把exports这行给注释掉了，则会有bug，仅靠静态分析如何解决这个问题？
        const match = moduleCode.match(/@NgModule\s*\(\s*{[\s\S]*\bexports\s*:\s*\[\s*(\w+)\s*]/);
        return match && match[1] ? match[1] : '';
    }

    fixDemoComponentTs(cmpCode: string, moduleCode: string): string {
        let mainComp = this.findExportsComponent(moduleCode);
        if (!mainComp) {
            console.error('ERROR: need a "exports" property in the module code, ' +
                'and the value of which should contains only one component!');
            return '';
        }

        // 给组件加上jigsaw-live-demo的selector，这个在index.html里会用到
        return cmpCode.replace(/@Component\s*\(\s*{([\s\S]*?)}\s*\)[\s\S]*?export\s+class\s+(\w+?)\b/g,
            (found, props, className) => {
                if (className != mainComp) {
                    // 在demo.component.ts文件中可能被定义了多个组件
                    return found;
                }
                if (found.match(/selector\s*:/)) {
                    console.error('ERROR: do NOT set "selector" property for the main component, remove it and try again');
                }
                return found.replace(/@Component\s*\(\s*{/, '@Component({\n    selector: "jigsaw-demo",');
            });
    }

    fixDemoComponentHtml(html: string): string {
        return html
            .replace(/<!-- ignore the following lines[\s\S]*<!-- start to learn the demo from here -->\r?\n/, '')
            .replace(/<jigsaw-demo-description\s+.+>[\s\S]*?<\/jigsaw-demo-description>/, '');
    }

    findModuleClassName(moduleCode: string): string {
        const match = moduleCode.match(/@NgModule\s*\(\s*{[\s\S]*?}\s*\)[\s\S]*?export\s+class\s+(\w+?)\b/);
        return match[1];
    }
}

@NgModule({
    declarations: [JigsawDemoDescription],
    imports: [JigsawMarkdownModule, CommonModule],
    exports: [JigsawDemoDescription]
})
export class JigsawDemoDescriptionModule {
}

function getPolyfills() {
    return `import 'zone.js/dist/zone';`;
}

function getMainTs() {
    return `
import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/demo.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  } else {
    window['ngRef'] = ref;
  }

  // Otherwise, log the boot error
}).catch(err => console.error(err));
    `.trim();
}

function getIndexHtml(title: string) {
    return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>

  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

</head>
<body>
    <jigsaw-app>
        <div style="padding: 12px">
            <h3>Demo正在运行，请稍候...</h3>
            <ul style="line-height: 24px;margin:12px 0 0 12px;list-style:circle;">
                <li>访问 <a href="http://rdk.zte.com.cn" target="_blank"></a> 可以了解中兴大数据UED的更多信息；</li>
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
import { Component } from "@angular/core";

@Component({
    selector: 'jigsaw-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
}`.trim();
}

function getAppComponentHtml() {
    return `<jigsaw-root><jigsaw-demo></jigsaw-demo></jigsaw-root>`;
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

function getAngularJson() {
    const json: any = '/* angular.json goes here */';
    let options: any = json.projects['jigsaw-seed'].architect.build.options;
    options.styles = options.styles.filter(style => style.match(/^(\.\/)?node_modules\/.+/));
    options.styles.push("./node_modules/@rdkmaster/jigsaw/prebuilt-themes/zte.css", "./app/live-demo-wrapper.css");
    return JSON.stringify(json, null, '  ');
}

function getDependencies() {
    const json: any = '/* package.json goes here */';
    return {...json.dependencies, ...json.devDependencies};
}
