import {Component, Input, NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
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
                <a (click)="gotoPlunker()">查看&编辑DEMO源码</a>
            </span>
            <br *ngIf="showDetail">
            <jigsaw-markdown *ngIf="showDetail" [markdown]="content"></jigsaw-markdown>
            <br>
            <span class="links" *ngIf="showDetail && !!content">
                <a (click)="showDetail = !showDetail">{{showDetail ? '隐藏' : '展开'}}详情</a> |
                <a (click)="gotoPlunker()">查看&编辑DEMO源码</a>
            </span>
            <hr>
        </div>
    `
})
export class JigsawDemoDescription implements OnInit {
    @Input() showDetail: boolean = undefined;

    @Input() content: string = '';

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

    gotoPlunker() {
        const pathName = location.pathname;
        let match = pathName.match(/(\/jigsaw\/pc)?(\/.*?\/.*?)(\/.*)*$/);
        if (!match) {
            alert('unexpected demo url[' + pathName + '], please send us an issue here:\n' +
                'https://github.com/rdkmaster/jigsaw/issues/new');
            return;
        }
        const host = location.hostname == 'localhost' ? 'http://rdk.zte.com.cn' : '';
        const url = `${host}/jigsaw/live-demo/${match[2].substring(1)}/index.html`;
        console.log(url);
        window.open(url, '_blank');
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
