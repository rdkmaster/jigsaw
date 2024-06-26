import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tooltip-html-renderer',
    templateUrl: './demo.component.html'
})
export class TooltipHtmlDemoComponent extends AsyncDescription {
    public demoPath = "demo/tooltip/html-renderer";

    public simpleHtml: string = '一个<span style="color:red">支持富文本</span>的提示';
    public actionHtml: string = '<i class="iconfont iconfont-e9ad"><a (click)="onclick()">点击这里</a>可以触发交互动作';

    public onclick() {
        alert('你点击了tooltip里的超链了！')
    }
}
