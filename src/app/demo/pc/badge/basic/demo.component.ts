import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        jigsaw-icon {
            margin-right: 50px;
        }
    `]
})

export class BadgeBasicDemoComponent {
    public select($event) {
        console.log($event);
    }

    public visible = "visible";

    public cities = [
        {label: "北京", id: 1},
        {label: "上海-一个很长的地址", id: 2},
        {label: "南京", id: 3},
        {label: "深圳", id: 4},
        {label: "长沙", id: 5},
        {label: "西安", id: 6}
    ]
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO详细演示了`jigsaw-badge`指令的简单用法';
    description: string = '';
}
