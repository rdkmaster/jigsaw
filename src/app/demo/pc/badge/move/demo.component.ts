import {Component, ViewChild, AfterViewInit, Renderer2, ElementRef} from "@angular/core";
import {JigsawInfoAlert} from "jigsaw/public_api";

@Component({
    templateUrl: 'demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BadgeMoveDemoComponent {
    @ViewChild('target', {read: ElementRef})
    target: ElementRef;

    constructor(public _renderer: Renderer2) {
    }

    updateStyle(style: string, value: string) {
        if (!this.target) {
            return;
        }
        this._renderer.setStyle(this.target.nativeElement, style, value);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '当一个对象既可以拖动又可以单击时，需要一些技巧来这两个操作带来的避免冲突';
    description: string = '';
}
