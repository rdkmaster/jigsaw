import {Component, ElementRef, Input, NgModule, OnInit, ViewEncapsulation} from "@angular/core";
import * as marked from 'marked';

@Component({
    selector: 'jigsaw-markdown, j-markdown',
    template: '<ng-content></ng-content>',
    host: {
        '[class.markdown-wrap]': 'true'
    },
    styleUrls: ['./markdown.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JigsawMarkdown implements OnInit {
    constructor(private _elementRef: ElementRef) {
    }

    private _markdown:string;

    @Input()
    public get markdown(): string {
        return this._markdown;
    }

    public set markdown(value: string) {
        this._markdown = value;
        this._parseMarkdown(value);
    }

    @Input()
    public prefixWhiteSpaceLength:number = NaN;

    private _calculateWhiteSpaceLength(markdown:string):number {
        if (!markdown) {
            return 0;
        }
        const match = markdown.match(/\n( *)\S[\s\S]*$/);
        return match ? match[1].length : 0;
    }

    private _parseMarkdown(markdown):string {
        if (!markdown) {
            return '';
        }
        if (isNaN(this.prefixWhiteSpaceLength)) {
            this.prefixWhiteSpaceLength = this._calculateWhiteSpaceLength(markdown);
        }

        // strip the leading white spaces
        const mdLines = markdown.split(/\r?\n/g);
        markdown = '';
        mdLines.forEach(line => {
            markdown += line.substring(this.prefixWhiteSpaceLength) + '\n';
        });

        markdown = marked(markdown.trim());
        // add class to raise the css priority
        markdown = markdown.replace(/<(\w+)(\s|>)/g, (found, tag, border) => {
            tag = tag.toLowerCase();
            switch (tag) {
                case 'p':
                case 'blockquote':
                case 'ul':
                case 'ol':
                case 'dl':
                case 'table':
                case 'pre':
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                case 'code':
                case 'tt':
                case 'kbd':
                case 'hr':
                case 'img':
                    return `<${tag} class="md-${tag}"${border}`;
                default:
                    return found;
            }
        });
        this._elementRef.nativeElement.innerHTML = markdown;
    }

    ngOnInit() {
        this._markdown = this._elementRef.nativeElement.innerHTML;
        this._parseMarkdown(this._markdown);
    }
}

@NgModule({
    declarations: [JigsawMarkdown],
    exports: [JigsawMarkdown]
})
export class JigsawMarkdownModule {
}
