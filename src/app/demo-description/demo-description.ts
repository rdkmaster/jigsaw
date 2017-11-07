import {Component, Input, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMarkdownModule} from "../markdown/markdown";

@Component({
    selector: 'jigsaw-demo-description, j-demo-description',
    styles: [`
        hr {
            margin: 12px 0 12px 0;
        }
        
        .summary {
            font-size: 15px;
        }

        .links {
            font-size: 12px;
        }
    `],
    template: `
        <span class="summary" [innerHtml]="summary"></span>
        <span class="links">
            <a *ngIf="!!content" (click)="showDetail = !showDetail">{{showDetail ? '隐藏' : '展开'}}详情</a>
            <span *ngIf="!!content">|</span>
            <a (click)="gotoPlunker()">查看&编辑源码</a>
        </span>
        <br *ngIf="showDetail">
        <jigsaw-markdown *ngIf="showDetail" [markdown]="content"></jigsaw-markdown><br>
        <span class="links" *ngIf="showDetail && !!content">
            <a (click)="showDetail = !showDetail">{{showDetail ? '隐藏' : '展开'}}详情</a> |
            <a (click)="gotoPlunker()">查看&编辑源码</a>
        </span>
        <hr>
    `
})
export class JigsawDemoDescription {
    showDetail: boolean = false;

    @Input() content: string = '';
    @Input() sources: string[] = [];

    private _summary: string;

    @Input()
    get summary(): string {
        return this._summary;
    }

    set summary(value: string) {
        value = value ? value : '我们还没来得及编写这个demo的说明，' +
            '你可以给我们<a href="https://github.com/rdkmaster/jigsaw" target="_blank">推送PR</a>来改进这个demo，' +
            '从而帮助到其他正在使用这个demo的人。';
        value = value.replace(/`(.*?)`/g, '<code>$1</code>');
        this._summary = `<strong>${value}</strong>`;
    }

    gotoPlunker() {
        const pathName = location.pathname;
        let match = pathName.match(/(\/.*?\/.*?)(\/|$)/);
        if (!match) {
            alert('unexpected demo url[' + pathName + '], please send us an issue here:\n' +
                'https://github.com/rdkmaster/jigsaw/issues/new');
            return;
        }
        const url = '/live-demo' + match[1] + '/index.html';
        console.log(url);
        window.open(url, '_blank');
    }
}

@NgModule({
    declarations: [JigsawDemoDescription],
    imports: [JigsawMarkdownModule, CommonModule],
    exports: [JigsawDemoDescription]
})
export class JigsawDemoDescriptionModule {
}
