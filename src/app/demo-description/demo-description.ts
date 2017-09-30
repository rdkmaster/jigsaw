import {Component, Input, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMarkdownModule} from "../markdown/markdown";

@Component({
    selector: 'jigsaw-demo-description, j-demo-description',
    styles: [`
        hr {
            margin: 12px 0 12px 0;
        }
    `],
    template: `
        <span [innerHtml]="summary"></span>
        <a (click)="showDetail = !showDetail">[{{showDetail ? '隐藏' : '展开'}}详情]</a>
        <jigsaw-markdown *ngIf="showDetail" [markdown]="content"></jigsaw-markdown><br>
        <a *ngIf="showDetail" (click)="showDetail = !showDetail">[{{showDetail ? '隐藏' : '展开'}}详情]</a>
        <hr>
    `
})
export class JigsawDemoDescription {
    showDetail:boolean = false;

    @Input() content: string = '';
    @Input() sourceFiles: string[] = [];

    private _summary:string;

    @Input()
    get summary(): string {
        return this._summary;
    }

    set summary(value: string) {
        value = value.replace(/`(.*?)`/g, '<code>$1</code>');
        this._summary = `<strong>${value}</strong>`;
    }
}

@NgModule({
    declarations: [JigsawDemoDescription],
    imports: [JigsawMarkdownModule, CommonModule],
    exports: [JigsawDemoDescription]
})
export class JigsawDemoDescriptionModule {
}
