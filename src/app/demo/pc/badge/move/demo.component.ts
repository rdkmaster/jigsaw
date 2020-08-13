import {Component, ElementRef, Renderer2, ViewChild} from "@angular/core";

@Component({
    templateUrl: 'demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BadgeMoveDemoComponent {
    @ViewChild('target')
    target: ElementRef;

    constructor(private renderer: Renderer2) {
    }

    move(offset: number, direction: 'hor' | 'ver') {
        if (!this.target) {
            return;
        }
        const prop = direction == 'hor' ? 'left' : 'top';
        this.renderer.setStyle(this.target.nativeElement, prop, `${offset}px`);
    }

    setOpacity(opacity: number) {
        if (!this.target) {
            return;
        }
        this.renderer.setStyle(this.target.nativeElement, 'opacity', opacity);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '用于测试Badge指令在宿主对象移动时计算的位置是否正确';
    description: string = '';
}
