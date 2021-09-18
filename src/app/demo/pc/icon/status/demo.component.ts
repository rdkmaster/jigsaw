import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles: [
        `
            .jigsaw-icon {
                margin-right: 10px
            }
        `
    ]
})
export class IconStatusDemoComponent {
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个Demo演示了Icon组件的基本用法';
    description: string = '';
}
