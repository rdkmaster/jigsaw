import { Component, Input } from "@angular/core";
import { BreadcrumbNode } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class BreadcrumbFoldDemoComponent {
    public data: (string | BreadcrumbNode)[] = [
        {
            label: "主页",
            icon: "iconfont iconfont-e647"
        },
        "业务管理",
        "业务清单-1",
        {
            label: "业务清单-2"
        },
        {
            label: "业务清单-3"
        },
        {
            label: "业务样本"
        }
    ];

    public foldThreshold = 4;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "面包屑的标签数超过指定数目时进行折叠";
    description: string = "在组件标签内设置foldThreshold的值，控制面包屑的折叠。一旦面包屑的标签数超过设定的值，会进行折叠。";
}
