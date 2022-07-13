import {Component} from "@angular/core";
import {TooltipTextService} from "../text.service";

@Component({
    selector: 'html-render-tooltip',
    templateUrl: './demo.component.html'
})
export class TooltipHtmlDemoComponent {
    simpleHtml: string = '一个<span style="color:red">支持富文本</span>的提示';
    actionHtml: string = '<i class="iconfont iconfont-e9ad"><a (click)="onclick()">点击这里</a>可以触发交互动作';

    onclick() {
        alert('你点击了tooltip里的超链了！')
    }
    constructor(public text: TooltipTextService) {
    }
}
