import {Component, ViewEncapsulation} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizeAlertDemoComponent {
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '使用`JigsawAlert`组件自定义一个对话框';
    description: string = '';
    tags: string[] = ['JigsawAlert'];
}

