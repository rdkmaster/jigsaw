import { Component } from "@angular/core";
import { AsyncDescription } from "../../../template/demo-template/demo-template";

@Component({
    selector: "navigation-bar-background",
    templateUrl: "./demo.component.html"
})
export class NavigationBarBackgroundDemoComponent extends AsyncDescription {
    public demoPath = "demo/navigation-bar/background";

    public logoSrc: string = 'app/for-external/assets/img/logo-dark.png';
    public logoAlt: string = '图片路径错误，无法显示';
    public navigationButton: string = 'iconfont iconfont-e2a8'
    public title: string = '功能标题'
}
