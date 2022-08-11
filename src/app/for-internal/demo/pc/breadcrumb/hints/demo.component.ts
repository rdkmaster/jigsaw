import { Component } from "@angular/core";
import { BreadcrumbNode } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class BreadcrumbHintDemoComponent {
    public data: BreadcrumbNode[] = [
        {
            label: "主页",
            icon: "iconfont iconfont-e647",
            hint: "点击即可返回主页"
        },
        {
            label: "业务管理",
            hint: "这是业务管理"
        },
        {
            label: "业务清单-1",
            icon: "iconfont iconfont-e526"
        },
        {
            label: "业务清单-2"
        },
        {
            label: "业务清单-3"
        },
        {
            label: "业务样本",
            hint: "业务样本就是除了业务管理和业务清单以外的内容。"
        }
    ];
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "面包屑的标签可以配置一些提示信息，带有提示信息的标签右侧会出现一个问号图标";
    description: string = "";
}
