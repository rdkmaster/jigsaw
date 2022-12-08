import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawNavigationBarBasicDemoComponent {
    public logoSrc: string = '/app/for-internal/demo/pc/navigation-bar/basic/assets/logo-dark.png';
    public logoAlt: string = '图片路径错误，无法显示';
    public buttonIcon: string = 'iconfont iconfont-e2a8'
    public title:string = '功能标题'

    public eventTxt = '';
    public clickEvent(text){
        this.eventTxt = text + '被点击了！'
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
