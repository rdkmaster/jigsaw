import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class IconBasicDemoComponent {

    public onClick() {
        alert('你戳到我啦');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个Demo演示了Icon组件的基本用法';
    description: string = '';
    tags: string[] = [
        'JigsawIcon'
    ];
}
