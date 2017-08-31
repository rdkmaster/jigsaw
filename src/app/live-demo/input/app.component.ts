import {Component, ElementRef, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class InputLiveDemoComponent {


    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, public elementRef: ElementRef) {
    }

    // demo-1
    demo1InputValue: any;

    // demo-2
    demo2InputValue: any = '已关闭清除按钮';

    // demo-3
    demo3InputValue: any;
    valueChanged(message: string) {
        this.elementRef.nativeElement.querySelector('.demo-3 .message')
            .innerHTML = `监听到input值变成了<span>${message}</span>`;
    }
}

