import {Component, Input, NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import sdk from '@stackblitz/sdk';
import {CommonUtils} from "../../jigsaw/common/core/utils/common-utils";
import {JigsawMarkdownModule} from "../markdown/markdown";
import {MockData} from "../app.interceptor";

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
        const moduleCode = project.files[`src/app/demo.module.ts`];
        project.files[`src/app/demo.module.ts`] = fixDemoModuleTs(moduleCode);
        const cmpCode = project.files[`src/app/demo.component.ts`];
        project.files[`src/app/demo.component.ts`] = fixDemoComponentTs(cmpCode, moduleCode);
        const htmlCode = project.files[`src/app/demo.component.html`];
        project.files[`src/app/demo.component.html`] = fixDemoComponentHtml(htmlCode);

        project.dependencies = getDependencies();
        project.title = `Jigsaw demo url: ${location.href}`;
        project.description = this.summary.replace(/<\/?\w+.*?>/g, '') + `\n\n${project.title}`;
        project.template = 'angular-cli';
        project.tags = ['jigsaw', 'angular', 'zte', 'awade'];

        const moduleClassName = findModuleClassName(project.files['src/app/demo.module.ts']);
        project.files['src/app/app.module.ts'] = getAppModuleTs(moduleClassName);
        project.files['src/app/app.component.ts'] = getAppComponentTS();
        project.files['src/app/app.component.html'] = getAppComponentHtml();
        project.files['src/app/app.interceptor.ts'] = getAjaxInterceptor(project.files);
        project.files['src/app/live-demo-wrapper.css'] = require('!!raw-loader!../../../src/app/live-demo-wrapper.css');
        project.files['src/main.ts'] = getMainTs();
        project.files['src/polyfills.ts'] = getPolyfills();
        const [angularJson, styles] = getAngularJson(project.dependencies);
        project.files['angular.json'] = angularJson;
        project.files['src/index.html'] = getIndexHtml(project.title, styles);

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

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
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
                <li>访问 <a href="https://jigsaw-zte.github.io/" target="_blank"></a> 可以了解中兴大数据UED的更多信息；</li>
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

function getAjaxInterceptor(files: any) {
    let code = require('!!raw-loader!../../../src/app/app.interceptor.ts');
    code = fixImport(code);

    // 不能位于在replace之后
    let urls = findMockDataUrls(code, files);
    // merge all mock data json file into this class
    let re = /\bthis\.dataSet\s*\[\s*['"](.*?)['"]\s*]\s*=\s*require\s*\(['"](\.\.\/mock-data\/)?.+['"]\s*\);?\s*/g;
    code = code.replace(re, (found, prop) => {
        const using = urls.indexOf(`mock-data/${prop}`) != -1;
        return using ? `this.dataSet['${prop}'] = ${JSON.stringify(MockData.dataSet[prop])};` : '';
    });
    if (urls.indexOf(`mock-data/big-table-data`) == -1) {
        code = code.replace(/this\.dataSet\['big-table-data'] = .*;?\s*/, '');
    }

    return code;
}

function findMockDataUrls(interceptorCode: string, files: any): string[] {
    let match = interceptorCode.match(/\bthis\.dataSet\s*\[\s*['"].*?['"]\s*]\s*=\s*require\b/g);
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
            let re = new RegExp('[\'"`/]' + url + '[\'"`]');
            if (files[file].match(re)) {
                return true;
            }
        }
        return false;
    });
}

function getAngularJson(deps: any): [string, string] {
    const json: any = {
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "jigsaw-seed": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/jigsaw-seed",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "./node_modules/bootstrap/dist/css/bootstrap.min.css",
              "./node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css",
              "./node_modules/font-awesome/css/font-awesome.min.css",
              "./node_modules/ztree/css/zTreeStyle/zTreeStyle.css",
              "./node_modules/perfect-scrollbar/css/perfect-scrollbar.css",
              "./node_modules/@rdkmaster/icon-font/css/iconfont.css",
              "src/styles.scss"
            ],
            "scripts": [
              "./node_modules/echarts/dist/echarts.min.js",
              "./node_modules/jquery/dist/jquery.min.js",
              "./node_modules/moment/min/moment.min.js",
              "./node_modules/bootstrap/dist/js/bootstrap.min.js",
              "./node_modules/ztree/js/jquery.ztree.all.js",
              "./node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js",
              "./node_modules/peity/jquery.peity.min.js"
            ]
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "jigsaw-seed:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "jigsaw-seed:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "jigsaw-seed:build"
          }
        },
        "test": {
           "builder": "@angular-devkit/build-angular:karma",
           "options": {
              "main": "src/test.ts",
              "tsConfig": "src/tsconfig.spec.json",
              "karmaConfig": "karma.conf.js"
           }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "tsconfig.app.json",
              "tsconfig.spec.json",
              "e2e/tsconfig.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        },
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "jigsaw-seed:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "jigsaw-seed:serve:production"
            }
          }
        }
      }
    }},
  "defaultProject": "jigsaw-seed"
};
    const options = json.projects['jigsaw-seed'].architect.build.options;
    // 由于stackblitz加载这里的styles会有问题，因此把这里的styles依赖挪到index.html里去
    const styles: string = options.styles.concat(["./node_modules/@rdkmaster/jigsaw/prebuilt-themes/zte.css"])
        .filter(style => style.match(/^(\.\/)?node_modules\/.+/))
        .map(style => {
            const re = style.indexOf('@') == -1 ? /.*?\/node_modules\/(.*?)\/(.*)/ : /.*?\/node_modules\/(.*?\/.*?)\/(.*)/;
            const match = style.match(re);
            const version = deps[match[1]];
            const href = `https://unpkg.com/${match[1]}@${version}/${match[2]}`;
            return `  <link rel="stylesheet" type="text/css" href="${href}">`
        })
        .join('\n');
    options.styles = ["/src/app/live-demo-wrapper.css"];

    return [JSON.stringify(json, null, '  '), styles];
}

function getDependencies() {
    const json: any = {
  "name": "Jigsaw-Seed",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --poll 500 --proxy-config proxy-config.json",
    "build": "ng build --prod --aot",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": false,
  "dependencies": {
    "@angular/animations": "~8.0.0",
    "@angular/common": "~8.0.0",
    "@angular/compiler": "~8.0.0",
    "@angular/core": "~8.0.0",
    "@angular/forms": "~8.0.0",
    "@angular/platform-browser": "~8.0.0",
    "@angular/platform-browser-dynamic": "~8.0.0",
    "@angular/router": "~8.0.0",
    "@ngx-translate/core": "~11.0.1",
    "@rdkmaster/icon-font": "~1.0.6",
    "@rdkmaster/jigsaw": "^8.0.0",
    "bootstrap": "~3.3.7",
    "core-js": "~3.0.1",
    "echarts": "~4.1.0",
    "eonasdan-bootstrap-datetimepicker": "~4.17.47",
    "font-awesome": "~4.7.0",
    "jquery": "~3.1.1",
    "ngx-perfect-scrollbar": "~8.0.0",
    "peity": "~3.2.1",
    "perfect-scrollbar": "~1.4.0",
    "rxjs": "~6.4.0",
    "web-animations-js": "~2.3.2",
    "zone.js": "~0.9.1",
    "ztree": "~3.5.24",
    "jszip": "3.2.1",
    "file-saver": "~2.0.1"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.800.0",
    "@angular/cli": "~8.0.0",
    "@angular/compiler-cli": "~8.0.0",
    "@angular/language-service": "~8.0.0",
    "@types/jasmine": "~3.3.8",
    "@types/node": "~10.0.10",
    "codelyzer": "~5.1.0",
    "jasmine-core": "~3.4.0",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~4.1.0",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "~2.0.1",
    "karma-jasmine": "~2.0.1",
    "karma-jasmine-html-reporter": "~1.4.0",
    "karma-phantomjs-launcher": "~1.0.4",
    "protractor": "~5.4.0",
    "ts-node": "~7.0.0",
    "tslint": "~5.15.0",
    "typescript": "~3.4.3"
  }
};
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
        return getError('Need a "exports" property in the module code, ' +
            'and the value of which should contains only one component!');
    }

    // 给组件加上jigsaw-demo的selector，这个在index.html里会用到
    return cmpCode
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
        .replace(/\s*\/\/\s*={60,}\s+\/\/[\s\S]*\/\/\s*={60,}\s+/, '');
}

function getError(detail: string): string {
    const error = '看来Jigsaw自动生成的Demo代码出了问题了，请把这些文本拷贝一下，并在这里创建一个issue：\n' +
        'https://github.com/rdkmaster/jigsaw/issues/new\n' +
        '这样可以协助我们解决这个问题。\n错误信息为：\n';
    return error + detail + '\nurl: ' + location.href;
}

function fixDemoComponentHtml(html: string): string {
    return html
        .replace(/<!-- ignore the following lines[\s\S]*<!-- start to learn the demo from here -->\r?\n/, '')
        .replace(/<jigsaw-demo-description\s+.+>[\s\S]*?<\/jigsaw-demo-description>/, '');
}

function findModuleClassName(moduleCode: string): string {
    const match = moduleCode.match(/@NgModule\s*\(\s*{[\s\S]*?}\s*\)[\s\S]*?export\s+class\s+(\w+?)\b/);
    return match[1];
}

