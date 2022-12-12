import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawNavigationBarPrestDemoComponent {
    public logoSrc: string = '/app/for-internal/demo/pc/navigation-bar/basic/assets/logo-dark.png';
    public logoAlt: string = '图片路径错误，无法显示';
    public navigationButton: string = 'iconfont iconfont-e2a8'
    public title: string = '功能标题'

    public backgroundData = new ArrayCollection([
        { label: "preset-dark", id: 1 },
        { label: "preset-zte-blue", id: 2 },
    ]);

    public selectedBackground = [{ label: "preset-dark", id: 1 }];
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
