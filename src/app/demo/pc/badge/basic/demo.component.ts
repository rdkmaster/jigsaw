import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap jigsaw-icon {
            margin-right: 50px;
            line-height: 1;
        }
        .live-demo-wrap jigsaw-switch,
        .live-demo-wrap jigsaw-input,
        .live-demo-wrap jigsaw-checkbox,
        .live-demo-wrap jigsaw-button-bar,
        .live-demo-wrap jigsaw-radios-lite,
        .live-demo-wrap jigsaw-tile-lite {
            margin-right: 20px;
        }
    `]
})
export class BadgeBasicDemoComponent {
    public nice = "Nice";
    public dot = "dot";

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
    summary: string = '这个DEMO演示了`jigsaw-badge`指令的简单用法，支持将文本、数字、图标等内容作为徽标的内容，也支持边框和背景，还支持偏移微调徽标的位置。';
    description: string = '';
}
