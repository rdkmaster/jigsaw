import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles: [
        `
            .jigsaw-stauts-host {
                margin-right 4px;
            }
        `
    ]
})
export class StatusBasicDemoComponent {
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了jigsaw-status的基本用法';
    description: string = '';
}
