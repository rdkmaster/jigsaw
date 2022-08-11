import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class TooltipHtmlDemoComponent {
    simpleHtml: string = '一个<span style="color:red">支持富文本</span>的提示';
    actionHtml: string = '<i class="iconfont iconfont-e9ad"><a (click)="onclick()">点击这里</a>可以触发交互动作';

    onclick() {
        alert('你点击了tooltip里的超链了！')
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo演示了Tooltip将内容渲染为html的效果，以及如何在html里添加简单的交互动作';
    description: string = '';
}
