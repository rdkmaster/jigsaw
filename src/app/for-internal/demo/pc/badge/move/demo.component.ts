import {Component, ViewChild, Renderer2, ElementRef} from "@angular/core";

@Component({
    templateUrl: 'demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BadgeMoveDemoComponent {
    @ViewChild('target', {read: ElementRef})
    target: ElementRef;

    public offsetLeft: number = 30;
    public offsetTop: number = 100;

    constructor(public _renderer: Renderer2) {
    }

    updateStyle(style: string, value: string) {
        if (!this.target) {
            return;
        }
        this._renderer.setStyle(this.target.nativeElement, style, value);
    }

    updateHandler(){
        this.offsetLeft = this.target.nativeElement.offsetLeft;
        this.offsetTop = this.target.nativeElement.offsetTop;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '当一个对象既可以拖动又可以单击时，需要一些技巧来这两个操作带来的避免冲突';
    description: string = '';
}
